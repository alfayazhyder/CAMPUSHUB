import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-staff-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="staff-layout">
      <aside class="sidebar">
        <div class="sidebar-logo">
          <span class="logo-icon">🎓</span><span class="logo-text">CampusHub</span>
        </div>
        <div
          class="staff-badge"
          [class.teacher-badge]="isTeacher"
          [class.nonteacher-badge]="!isTeacher"
        >
          {{ isTeacher ? '👩‍🏫 Teaching Staff' : '🧑‍💼 Non-Teaching Staff' }}
        </div>
        <div class="staff-name">{{ staffName }}</div>
        <nav class="sidebar-nav" *ngIf="isTeacher">
          <div class="nav-section-label">SELECT COHORT</div>
          <div class="cohort-selectors">
            <select class="cohort-select" [(ngModel)]="selectedBatch" (change)="loadAcademic()">
              <option value="2025-29">2025-29 Batch</option>
              <option value="2026-30">2026-30 Batch</option>
            </select>
            <select class="cohort-select" [(ngModel)]="selectedCourse" (change)="loadAcademic()">
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
              <option value="BCOM">BCOM</option>
            </select>
          </div>
          <div class="nav-section-label" style="margin-top:16px">MODULES</div>
          <button
            class="nav-item"
            [class.active]="tab === 'attendance'"
            (click)="tab = 'attendance'"
          >
            📋 Attendance
          </button>
          <button
            class="nav-item"
            [class.active]="tab === 'first-internal'"
            (click)="tab = 'first-internal'"
          >
            📝 First Internal
          </button>
          <button
            class="nav-item"
            [class.active]="tab === 'second-internal'"
            (click)="tab = 'second-internal'"
          >
            📝 Second Internal
          </button>
          <button class="nav-item" [class.active]="tab === 'semester'" (click)="tab = 'semester'">
            🎓 Semester Marks
          </button>
          <button
            class="nav-item"
            [class.active]="tab === 'internal-mark'"
            (click)="tab = 'internal-mark'"
          >
            📝 Internal Mark
          </button>
          <button
            class="nav-item"
            [class.active]="tab === 'timetable'"
            (click)="tab = 'timetable'; loadTimetable()"
          >
            📅 Class Timetable
          </button>
          <button
            class="nav-item"
            [class.active]="tab === 'exam'"
            (click)="tab = 'exam'; loadExamTimetable()"
          >
            🗓️ Exam Timetable
          </button>
        </nav>
        <nav class="sidebar-nav" *ngIf="!isTeacher">
          <div class="nav-section-label">MODULES</div>
          <button
            class="nav-item"
            [class.active]="tab === 'fees'"
            (click)="tab = 'fees'; loadFees()"
          >
            💰 Fee Details
          </button>
          <button
            class="nav-item"
            [class.active]="tab === 'canteen'"
            (click)="tab = 'canteen'; loadCanteen()"
          >
            🍽️ Canteen Menu
          </button>
          <button
            class="nav-item"
            [class.active]="tab === 'notices'"
            (click)="tab = 'notices'; loadNotices()"
          >
            📌 Notice Board
          </button>
        </nav>
        <button class="logout-btn" (click)="logout()">⎋ Logout</button>
      </aside>
      <main class="main-content">
        <div *ngIf="tab === 'home'" class="welcome-section">
          <h1 class="page-title">Welcome, {{ staffName }} 👋</h1>
          <p class="page-sub">
            {{
              isTeacher
                ? 'Manage academic records for your students.'
                : 'Manage fees, canteen, and events.'
            }}
          </p>
          <div class="welcome-cards">
            <div *ngIf="isTeacher" class="wcard" (click)="tab = 'attendance'">
              📋 <br />Attendance
            </div>
            <div *ngIf="isTeacher" class="wcard" (click)="tab = 'first-internal'">
              📝 <br />First Internal
            </div>
            <div *ngIf="isTeacher" class="wcard" (click)="tab = 'timetable'; loadTimetable()">
              📅 <br />Timetable
            </div>
            <div *ngIf="!isTeacher" class="wcard" (click)="tab = 'fees'; loadFees()">
              💰 <br />Fee Details
            </div>
            <div *ngIf="!isTeacher" class="wcard" (click)="tab = 'canteen'; loadCanteen()">
              🍽️ <br />Canteen
            </div>
            <div *ngIf="!isTeacher" class="wcard" (click)="tab = 'notices'; loadNotices()">
              📌 <br />Notice Board
            </div>
          </div>
        </div>
        <div
          *ngIf="
            isTeacher &&
            [
              'attendance',
              'first-internal',
              'second-internal',
              'semester',
              'internal-mark',
            ].includes(tab)
          "
        >
          <div class="page-header">
            <h1 class="page-title">
              {{
                tab === 'attendance'
                  ? '📋 Attendance'
                  : tab === 'first-internal'
                    ? '📝 First Internal Marks'
                    : tab === 'second-internal'
                      ? '📝 Second Internal Marks'
                      : tab === 'internal-mark'
                        ? '📝 Internal Mark (out of 30)'
                        : '🎓 Semester Marks'
              }}
            </h1>
            <span class="cohort-pill">{{ selectedBatch }} · {{ selectedCourse }}</span>
          </div>
          <div class="form-card">
            <h3>{{ editingId ? '✏️ Edit Record' : '➕ Add Record' }}</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Student Username</label
                ><input
                  class="input"
                  [(ngModel)]="aForm.studentUsername"
                  placeholder="e.g. ALFAYAZ202529BCA01"
                />
              </div>
              <div class="form-group">
                <label>Student Name</label
                ><input class="input" [(ngModel)]="aForm.studentName" placeholder="Full name" />
              </div>
              <div class="form-group">
                <label>Subject</label
                ><input
                  class="input"
                  [(ngModel)]="aForm.subject"
                  placeholder="e.g. Programming in C"
                />
              </div>
              <div class="form-group" *ngIf="tab === 'attendance'">
                <label>Attendance %</label
                ><input
                  class="input"
                  type="number"
                  [(ngModel)]="aForm.attendancePercentage"
                  placeholder="0-100"
                />
              </div>
              <div class="form-group" *ngIf="tab === 'first-internal'">
                <label>First Internal Mark</label
                ><input
                  class="input"
                  type="number"
                  [(ngModel)]="aForm.firstInternalMark"
                  placeholder="Out of 50"
                />
              </div>
              <div class="form-group" *ngIf="tab === 'second-internal'">
                <label>Second Internal Mark</label
                ><input
                  class="input"
                  type="number"
                  [(ngModel)]="aForm.secondInternalMark"
                  placeholder="Out of 50"
                />
              </div>
              <div class="form-group" *ngIf="tab === 'semester'">
                <label>Semester Mark</label
                ><input
                  class="input"
                  type="number"
                  [(ngModel)]="aForm.semesterMark"
                  placeholder="Out of 100"
                />
              </div>
              <div class="form-group" *ngIf="tab === 'internal-mark'">
                <label>Internal Mark</label
                ><input
                  class="input"
                  type="number"
                  [(ngModel)]="aForm.internalMark"
                  placeholder="Out of 30"
                />
              </div>
            </div>
            <div class="form-actions">
              <button class="btn-primary" (click)="saveAcademicRecord()">
                {{ editingId ? 'Update' : 'Save Record' }}
              </button>
              <button *ngIf="editingId" class="btn-secondary" (click)="cancelAEdit()">
                Cancel
              </button>
            </div>
          </div>
          <div class="table-card">
            <h3>Records ({{ academicRecords.length }})</h3>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th *ngIf="tab === 'attendance'">Attendance %</th>
                  <th *ngIf="tab === 'first-internal'">1st Internal</th>
                  <th *ngIf="tab === 'second-internal'">2nd Internal</th>
                  <th *ngIf="tab === 'semester'">Semester</th>
                  <th *ngIf="tab === 'internal-mark'">Internal Mark</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of academicRecords">
                  <td>
                    <b class="name-cell">{{ r.studentName }}</b
                    ><br /><small class="uname">{{ r.studentUsername }}</small>
                  </td>
                  <td>{{ r.subject }}</td>
                  <td *ngIf="tab === 'attendance'">
                    <span
                      class="mark-badge"
                      [class.good]="r.attendancePercentage >= 75"
                      [class.warn]="r.attendancePercentage < 75"
                      >{{ r.attendancePercentage }}%</span
                    >
                  </td>
                  <td *ngIf="tab === 'first-internal'">{{ r.firstInternalMark }}/50</td>
                  <td *ngIf="tab === 'second-internal'">{{ r.secondInternalMark }}/50</td>
                  <td *ngIf="tab === 'semester'">{{ r.semesterMark }}/100</td>
                  <td *ngIf="tab === 'internal-mark'">{{ r.internalMark }}/30</td>
                  <td class="actions-cell">
                    <button class="btn-edit" (click)="editAcademicRecord(r)">✏️</button>
                    <button class="btn-delete" (click)="deleteAcademicRecord(r.id)">🗑️</button>
                  </td>
                </tr>
                <tr *ngIf="academicRecords.length === 0">
                  <td colspan="5" class="empty-row">No records yet. Add one above.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div *ngIf="tab === 'timetable'">
          <div class="page-header">
            <h1 class="page-title">📅 Class Timetable</h1>
            <span class="cohort-pill">{{ selectedBatch }} · {{ selectedCourse }}</span>
          </div>
          <div class="timetable-grid">
            <div class="tt-header">Time</div>
            <div class="tt-header" *ngFor="let d of days">{{ d }}</div>
            <div class="tt-time fixed-time">8:30 – 9:00</div>
            <div class="tt-slot fixed-slot" *ngFor="let d of days">📰 Newspaper Reading</div>
            <div class="tt-time">9:00 – 10:00</div>
            <div
              class="tt-slot editable"
              *ngFor="let d of days"
              (click)="openSlotEdit(d, 'HOUR1', '9:00 – 10:00')"
            >
              {{ getSlot(d, 'HOUR1') || '+ Add Subject' }}
            </div>
            <div class="tt-time fixed-time">10:00 – 10:30</div>
            <div class="tt-slot fixed-slot" *ngFor="let d of days">☕ Break</div>
            <div class="tt-time">10:30 – 11:30</div>
            <div
              class="tt-slot editable"
              *ngFor="let d of days"
              (click)="openSlotEdit(d, 'HOUR2', '10:30 – 11:30')"
            >
              {{ getSlot(d, 'HOUR2') || '+ Add Subject' }}
            </div>
            <div class="tt-time">11:30 – 12:30</div>
            <div
              class="tt-slot editable"
              *ngFor="let d of days"
              (click)="openSlotEdit(d, 'HOUR3', '11:30 – 12:30')"
            >
              {{ getSlot(d, 'HOUR3') || '+ Add Subject' }}
            </div>
            <div class="tt-time fixed-time">12:30 – 1:15</div>
            <div class="tt-slot fixed-slot" *ngFor="let d of days">🍽️ Lunch Break</div>
            <div class="tt-time">1:15 – 2:15</div>
            <div
              class="tt-slot editable"
              *ngFor="let d of days"
              (click)="openSlotEdit(d, 'HOUR4', '1:15 – 2:15')"
            >
              {{ getSlot(d, 'HOUR4') || '+ Add Subject' }}
            </div>
            <div class="tt-time">2:15 – 3:15</div>
            <div
              class="tt-slot editable"
              *ngFor="let d of days"
              (click)="openSlotEdit(d, 'HOUR5', '2:15 – 3:15')"
            >
              {{ getSlot(d, 'HOUR5') || '+ Add Subject' }}
            </div>
            <div class="tt-time fixed-time">3:15 – 3:30</div>
            <div class="tt-slot fixed-slot" *ngFor="let d of days">☕ Break</div>
            <div class="tt-time">3:30 – 4:30</div>
            <div
              class="tt-slot editable"
              *ngFor="let d of days"
              (click)="openSlotEdit(d, 'HOUR6', '3:30 – 4:30')"
            >
              {{ getSlot(d, 'HOUR6') || '+ Add Subject' }}
            </div>
          </div>
          <div *ngIf="slotEditOpen" class="modal-overlay" (click)="slotEditOpen = false">
            <div class="modal-box" (click)="$event.stopPropagation()">
              <h3>Edit Slot: {{ editSlot.day }} {{ editSlot.timeLabel }}</h3>
              <div class="form-group" style="margin-bottom:14px">
                <label>Subject</label
                ><input class="input" [(ngModel)]="editSlot.subject" placeholder="Subject name" />
              </div>
              <div class="form-group" style="margin-bottom:20px">
                <label>Faculty</label
                ><input class="input" [(ngModel)]="editSlot.faculty" placeholder="Faculty name" />
              </div>
              <div class="form-actions">
                <button class="btn-primary" (click)="saveSlot()">Save</button>
                <button class="btn-secondary" (click)="slotEditOpen = false">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <div *ngIf="tab === 'exam'">
          <div class="page-header">
            <h1 class="page-title">🗓️ Exam Timetable</h1>
            <span class="cohort-pill">{{ selectedBatch }} · {{ selectedCourse }}</span>
          </div>
          <div class="form-card">
            <h3>{{ editingId ? '✏️ Edit Exam' : '➕ Add Exam' }}</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Subject</label
                ><input class="input" [(ngModel)]="examForm.subject" placeholder="Subject name" />
              </div>
              <div class="form-group">
                <label>Date</label
                ><input class="input" type="date" [(ngModel)]="examForm.examDate" />
              </div>
              <div class="form-group">
                <label>Time</label
                ><input class="input" [(ngModel)]="examForm.examTime" placeholder="e.g. 10:00 AM" />
              </div>
              <div class="form-group">
                <label>Venue</label
                ><input class="input" [(ngModel)]="examForm.venue" placeholder="e.g. Room 201" />
              </div>
            </div>
            <div class="form-actions">
              <button class="btn-primary" (click)="saveExam()">
                {{ editingId ? 'Update' : 'Add Exam' }}
              </button>
              <button *ngIf="editingId" class="btn-secondary" (click)="cancelAEdit()">
                Cancel
              </button>
            </div>
          </div>
          <div class="table-card">
            <h3>Scheduled Exams ({{ examList.length }})</h3>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Venue</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let e of examList">
                  <td class="name-cell">{{ e.subject }}</td>
                  <td>{{ e.examDate }}</td>
                  <td>{{ e.examTime }}</td>
                  <td>{{ e.venue }}</td>
                  <td class="actions-cell">
                    <button class="btn-edit" (click)="editExam(e)">✏️</button
                    ><button class="btn-delete" (click)="deleteExam(e.id)">🗑️</button>
                  </td>
                </tr>
                <tr *ngIf="examList.length === 0">
                  <td colspan="5" class="empty-row">No exams scheduled yet.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div *ngIf="tab === 'fees'">
          <div class="page-header">
            <h1 class="page-title">💰 Fee Details</h1>
            <div class="btn-group">
              <button
                *ngFor="let b of batches"
                class="filter-btn"
                [class.selected]="feeBatch === b"
                (click)="feeBatch = b; loadFees()"
              >
                {{ b }}
              </button>
              <button
                *ngFor="let c of courses"
                class="filter-btn"
                [class.selected]="feeCourse === c"
                (click)="feeCourse = c; loadFees()"
              >
                {{ c }}
              </button>
            </div>
          </div>
          <div class="form-card">
            <h3>{{ editingId ? '✏️ Edit Fee Record' : '➕ Add Fee Record' }}</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Student Username</label
                ><input
                  class="input"
                  [(ngModel)]="feeForm.studentUsername"
                  placeholder="Username"
                />
              </div>
              <div class="form-group">
                <label>Student Name</label
                ><input class="input" [(ngModel)]="feeForm.studentName" placeholder="Full name" />
              </div>
              <div class="form-group">
                <label>Course</label
                ><select class="input" [(ngModel)]="feeForm.course">
                  <option *ngFor="let c of courses" [value]="c">{{ c }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Batch</label
                ><select class="input" [(ngModel)]="feeForm.batch">
                  <option *ngFor="let b of batches" [value]="b">{{ b }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Amount Paid (₹)</label
                ><input
                  class="input"
                  type="number"
                  [(ngModel)]="feeForm.amountPaid"
                  placeholder="0"
                />
              </div>
              <div class="form-group">
                <label>Date Paid</label
                ><input class="input" type="date" [(ngModel)]="feeForm.datePaid" />
              </div>
              <div class="form-group">
                <label>Status</label
                ><select class="input" [(ngModel)]="feeForm.status">
                  <option value="PAID">PAID</option>
                  <option value="PENDING">PENDING</option>
                </select>
              </div>
            </div>
            <div class="form-actions">
              <button class="btn-primary" (click)="saveFee()">
                {{ editingId ? 'Update' : 'Add Record' }}
              </button>
              <button *ngIf="editingId" class="btn-secondary" (click)="cancelAEdit()">
                Cancel
              </button>
            </div>
          </div>
          <div class="table-card">
            <h3>Fee Records ({{ feeList.length }})</h3>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Amount</th>
                  <th>Date Paid</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let f of feeList">
                  <td>
                    <b class="name-cell">{{ f.studentName }}</b
                    ><br /><small class="uname">{{ f.studentUsername }}</small>
                  </td>
                  <td>₹{{ f.amountPaid }}</td>
                  <td>{{ f.datePaid || '—' }}</td>
                  <td>
                    <span
                      class="status-badge"
                      [class.paid]="f.status === 'PAID'"
                      [class.pending]="f.status === 'PENDING'"
                      >{{ f.status }}</span
                    >
                  </td>
                  <td class="actions-cell">
                    <button class="btn-edit" (click)="editFee(f)">✏️</button
                    ><button class="btn-delete" (click)="deleteFee(f.id)">🗑️</button>
                  </td>
                </tr>
                <tr *ngIf="feeList.length === 0">
                  <td colspan="5" class="empty-row">No fee records found.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div *ngIf="tab === 'canteen'">
          <h1 class="page-title">🍽️ Canteen Menu</h1>
          <div class="category-tabs">
            <button
              class="cat-btn"
              [class.active]="canteenTab === 'SNACKS'"
              (click)="canteenTab = 'SNACKS'"
            >
              🥐 Snacks
            </button>
            <button
              class="cat-btn"
              [class.active]="canteenTab === 'LUNCH'"
              (click)="canteenTab = 'LUNCH'"
            >
              🍛 Lunch
            </button>
          </div>
          <div class="form-card">
            <h3>{{ editingId ? '✏️ Edit Item' : '➕ Add ' + canteenTab + ' Item' }}</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Item Name</label
                ><input
                  class="input"
                  [(ngModel)]="canteenForm.itemName"
                  placeholder="e.g. Samosa"
                />
              </div>
              <div class="form-group">
                <label>Price (₹)</label
                ><input
                  class="input"
                  type="number"
                  [(ngModel)]="canteenForm.price"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div class="form-actions">
              <button class="btn-primary" (click)="saveCanteen()">
                {{ editingId ? 'Update' : 'Add Item' }}
              </button>
              <button *ngIf="editingId" class="btn-secondary" (click)="cancelAEdit()">
                Cancel
              </button>
            </div>
          </div>
          <div class="table-card">
            <h3>
              {{ canteenTab === 'SNACKS' ? '🥐 Snacks' : '🍛 Lunch' }} Menu ({{
                filteredCanteen().length
              }}
              items)
            </h3>
            <table class="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let c of filteredCanteen(); let i = index">
                  <td>{{ i + 1 }}</td>
                  <td class="name-cell">{{ c.itemName }}</td>
                  <td>₹{{ c.price }}</td>
                  <td class="actions-cell">
                    <button class="btn-edit" (click)="editCanteen(c)">✏️</button
                    ><button class="btn-delete" (click)="deleteCanteen(c.id)">🗑️</button>
                  </td>
                </tr>
                <tr *ngIf="filteredCanteen().length === 0">
                  <td colspan="4" class="empty-row">No items yet. Add one above.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div *ngIf="tab === 'notices'">
          <h1 class="page-title">📌 Notice Board</h1>
          <div class="form-card">
            <h3>{{ editingId ? '✏️ Edit Notice' : '➕ Post New Notice' }}</h3>
            <div class="form-group" style="margin-bottom:14px">
              <label>Title</label
              ><input class="input" [(ngModel)]="noticeForm.title" placeholder="Notice title" />
            </div>
            <div class="form-group" style="margin-bottom:14px">
              <label>Description</label
              ><textarea
                class="input"
                rows="4"
                [(ngModel)]="noticeForm.description"
                placeholder="Write the notice here..."
              ></textarea>
            </div>
            <div class="form-group" style="margin-bottom:14px">
              <label>Date</label
              ><input class="input" type="date" [(ngModel)]="noticeForm.datePosted" />
            </div>
            <div class="form-actions">
              <button class="btn-primary" (click)="saveNotice()">
                {{ editingId ? 'Update' : 'Post Notice' }}
              </button>
              <button *ngIf="editingId" class="btn-secondary" (click)="cancelAEdit()">
                Cancel
              </button>
            </div>
          </div>
          <div class="notices-list">
            <div *ngFor="let n of noticeList" class="notice-card">
              <div class="notice-header">
                <h3>{{ n.title }}</h3>
                <div class="actions-cell">
                  <button class="btn-edit" (click)="editNotice(n)">✏️</button>
                  <button class="btn-delete" (click)="deleteNotice(n.id)">🗑️</button>
                </div>
              </div>
              <p class="notice-desc">{{ n.description }}</p>
              <div class="notice-date">📅 {{ n.datePosted }}</div>
            </div>
            <div
              *ngIf="noticeList.length === 0"
              class="empty-row"
              style="padding:30px; text-align:center; color:rgba(255,255,255,0.3)"
            >
              No notices posted yet.
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
      }
      .staff-layout {
        display: flex;
        height: 100vh;
        background: #0f1117;
      }
      .sidebar {
        width: 260px;
        background: linear-gradient(180deg, #1a1d2e, #12141f);
        border-right: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        flex-direction: column;
        padding: 24px 16px;
        flex-shrink: 0;
        overflow-y: auto;
      }
      .sidebar-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 16px;
      }
      .logo-icon {
        font-size: 26px;
      }
      .logo-text {
        font-size: 19px;
        font-weight: 800;
        color: white;
      }
      .staff-badge {
        padding: 8px 14px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 6px;
        text-align: center;
      }
      .teacher-badge {
        background: rgba(52, 211, 153, 0.15);
        border: 1px solid rgba(52, 211, 153, 0.3);
        color: #6ee7b7;
      }
      .nonteacher-badge {
        background: rgba(167, 139, 250, 0.15);
        border: 1px solid rgba(167, 139, 250, 0.3);
        color: #c4b5fd;
      }
      .staff-name {
        color: rgba(255, 255, 255, 0.4);
        font-size: 12px;
        text-align: center;
        margin-bottom: 20px;
      }
      .nav-section-label {
        color: rgba(255, 255, 255, 0.3);
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 8px;
        padding: 0 4px;
      }
      .cohort-selectors {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 8px;
      }
      .cohort-select {
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 8px;
        color: white;
        padding: 9px 12px;
        font-size: 13px;
        outline: none;
      }
      .cohort-select option {
        background: #1a1d2e;
      }
      .sidebar-nav {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
      }
      .nav-item {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.55);
        padding: 11px 12px;
        border-radius: 10px;
        cursor: pointer;
        text-align: left;
        font-size: 13px;
        font-weight: 500;
        transition: all 0.2s;
        width: 100%;
      }
      .nav-item:hover {
        background: rgba(255, 255, 255, 0.07);
        color: white;
      }
      .nav-item.active {
        background: rgba(52, 211, 153, 0.15);
        color: #6ee7b7;
        border: 1px solid rgba(52, 211, 153, 0.25);
      }
      .logout-btn {
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #fca5a5;
        padding: 11px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        margin-top: auto;
      }
      .logout-btn:hover {
        background: rgba(239, 68, 68, 0.25);
      }
      .main-content {
        flex: 1;
        overflow-y: auto;
        padding: 32px 36px;
      }
      .page-title {
        color: white;
        font-size: 26px;
        font-weight: 800;
        margin-bottom: 6px;
      }
      .page-sub {
        color: rgba(255, 255, 255, 0.4);
        font-size: 14px;
        margin-bottom: 28px;
      }
      .page-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 24px;
      }
      .cohort-pill {
        background: rgba(52, 211, 153, 0.15);
        border: 1px solid rgba(52, 211, 153, 0.3);
        color: #6ee7b7;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 600;
      }
      .welcome-section {
        padding-top: 10px;
      }
      .welcome-cards {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        margin-top: 24px;
      }
      .wcard {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 24px 32px;
        cursor: pointer;
        transition: all 0.25s;
        text-align: center;
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
        font-weight: 600;
        line-height: 2;
      }
      .wcard:hover {
        transform: translateY(-4px);
        background: rgba(52, 211, 153, 0.1);
        border-color: rgba(52, 211, 153, 0.3);
        color: white;
      }
      .form-card {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 22px;
        margin-bottom: 22px;
      }
      .form-card h3 {
        color: white;
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 16px;
      }
      .form-row {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 16px;
      }
      .form-group {
        flex: 1;
        min-width: 180px;
      }
      .form-group label {
        display: block;
        color: rgba(255, 255, 255, 0.45);
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 6px;
      }
      .input {
        width: 100%;
        padding: 10px 13px;
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 8px;
        color: white;
        font-size: 13px;
        outline: none;
        transition: all 0.2s;
        resize: vertical;
      }
      .input:focus {
        border-color: #34d399;
        background: rgba(52, 211, 153, 0.08);
      }
      .input option {
        background: #1a1d2e;
      }
      .form-actions {
        display: flex;
        gap: 10px;
      }
      .btn-primary {
        background: linear-gradient(135deg, #059669, #2563eb);
        border: none;
        color: white;
        padding: 10px 22px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        transition: all 0.2s;
      }
      .btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 20px rgba(5, 150, 105, 0.3);
      }
      .btn-secondary {
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: rgba(255, 255, 255, 0.7);
        padding: 10px 18px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
      }
      .table-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 14px;
        overflow: hidden;
      }
      .table-card h3 {
        color: white;
        font-size: 14px;
        font-weight: 700;
        padding: 18px 22px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      }
      .data-table {
        width: 100%;
        border-collapse: collapse;
      }
      .data-table th {
        background: rgba(255, 255, 255, 0.04);
        color: rgba(255, 255, 255, 0.45);
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        padding: 11px 18px;
        text-align: left;
      }
      .data-table td {
        padding: 13px 18px;
        color: rgba(255, 255, 255, 0.75);
        font-size: 13px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }
      .data-table tr:last-child td {
        border-bottom: none;
      }
      .data-table tr:hover td {
        background: rgba(255, 255, 255, 0.02);
      }
      .name-cell {
        font-weight: 600;
        color: white !important;
      }
      .uname {
        background: rgba(52, 211, 153, 0.15);
        color: #6ee7b7;
        padding: 2px 7px;
        border-radius: 5px;
        font-size: 11px;
      }
      .actions-cell {
        display: flex;
        gap: 6px;
      }
      .btn-edit {
        background: rgba(59, 130, 246, 0.2);
        border: 1px solid rgba(59, 130, 246, 0.3);
        color: #93c5fd;
        padding: 5px 10px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
      }
      .btn-delete {
        background: rgba(239, 68, 68, 0.2);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #fca5a5;
        padding: 5px 10px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
      }
      .empty-row {
        text-align: center;
        color: rgba(255, 255, 255, 0.25);
        padding: 28px !important;
      }
      .mark-badge {
        padding: 4px 10px;
        border-radius: 8px;
        font-weight: 700;
        font-size: 13px;
      }
      .mark-badge.good {
        background: rgba(52, 211, 153, 0.2);
        color: #6ee7b7;
      }
      .mark-badge.warn {
        background: rgba(248, 113, 113, 0.2);
        color: #fca5a5;
      }
      .status-badge {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 700;
      }
      .status-badge.paid {
        background: rgba(52, 211, 153, 0.2);
        color: #6ee7b7;
      }
      .status-badge.pending {
        background: rgba(248, 113, 113, 0.2);
        color: #fca5a5;
      }
      .timetable-grid {
        display: grid;
        grid-template-columns: 120px repeat(6, 1fr);
        gap: 2px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        overflow: hidden;
      }
      .tt-header {
        background: rgba(52, 211, 153, 0.15);
        color: #6ee7b7;
        font-size: 12px;
        font-weight: 700;
        padding: 12px 8px;
        text-align: center;
      }
      .tt-time {
        background: rgba(255, 255, 255, 0.04);
        color: rgba(255, 255, 255, 0.5);
        font-size: 11px;
        padding: 14px 10px;
        display: flex;
        align-items: center;
        font-weight: 600;
      }
      .fixed-time {
        color: rgba(255, 255, 255, 0.25);
        font-style: italic;
      }
      .tt-slot {
        background: rgba(255, 255, 255, 0.03);
        padding: 12px 8px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .fixed-slot {
        color: rgba(255, 255, 255, 0.25);
        font-style: italic;
      }
      .editable {
        cursor: pointer;
        transition: all 0.2s;
      }
      .editable:hover {
        background: rgba(52, 211, 153, 0.1);
        color: #6ee7b7;
      }
      .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
      }
      .modal-box {
        background: #1a1d2e;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 16px;
        padding: 28px;
        width: 400px;
      }
      .modal-box h3 {
        color: white;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      .btn-group {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .filter-btn {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.6);
        padding: 7px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.2s;
      }
      .filter-btn.selected {
        background: rgba(52, 211, 153, 0.2);
        border-color: #34d399;
        color: #6ee7b7;
        font-weight: 700;
      }
      .category-tabs {
        display: flex;
        gap: 10px;
        margin-bottom: 22px;
      }
      .cat-btn {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.6);
        padding: 10px 24px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.2s;
      }
      .cat-btn.active {
        background: rgba(52, 211, 153, 0.2);
        border-color: #34d399;
        color: #6ee7b7;
      }
      .notices-list {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .notice-card {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 20px 24px;
      }
      .notice-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      .notice-header h3 {
        color: white;
        font-size: 16px;
        font-weight: 700;
      }
      .notice-desc {
        color: rgba(255, 255, 255, 0.6);
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 10px;
      }
      .notice-date {
        color: rgba(255, 255, 255, 0.3);
        font-size: 12px;
      }
    `,
  ],
})
export class StaffDashboardComponent implements OnInit {
  isTeacher = true;
  staffName = '';
  tab = 'home';
  // Academic
  selectedBatch = '2025-29';
  selectedCourse = 'BCA';
  academicRecords: any[] = [];
  editingId: number | null = null;
  aForm: any = {
    studentUsername: '',
    studentName: '',
    subject: '',
    attendancePercentage: 0,
    firstInternalMark: 0,
    secondInternalMark: 0,
    semesterMark: 0,
    internalMark: 0,
  };
  // Timetable
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  timetableSlots: any[] = [];
  slotEditOpen = false;
  editSlot: any = {};
  // Exam
  examList: any[] = [];
  examForm: any = { subject: '', examDate: '', examTime: '', venue: '' };
  // Fee
  feeList: any[] = [];
  feeBatch = '2025-29';
  feeCourse = 'BCA';
  feeForm: any = {
    studentUsername: '',
    studentName: '',
    course: 'BCA',
    batch: '2025-29',
    amountPaid: 0,
    datePaid: '',
    status: 'PENDING',
  };
  batches = ['2025-29', '2026-30'];
  courses = ['BCA', 'BBA', 'BCOM'];
  // Canteen
  canteenList: any[] = [];
  canteenTab = 'SNACKS';
  canteenForm: any = { itemName: '', price: 0, category: 'SNACKS' };
  // Notices
  noticeList: any[] = [];
  noticeForm: any = { title: '', description: '', datePosted: '' };

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    const role = localStorage.getItem('userRole');
    if (role !== 'TEACHER' && role !== 'NON_TEACHER') {
      this.router.navigate(['/login']);
      return;
    }
    this.isTeacher = role === 'TEACHER';
    this.staffName = localStorage.getItem('userName') || 'Staff';
    if (this.isTeacher) this.loadAcademic();
  }

  loadAcademic() {
    // Updated with environment literal
    this.http
      .get<any[]>(
        `${environment.apiUrl}/api/academic/cohort?course=${this.selectedCourse}&batch=${this.selectedBatch}`,
      )
      .subscribe((d) => (this.academicRecords = this.sortRecords(d)));
  }

  sortRecords(list: any[]): any[] {
    return [...list].sort((a, b) => {
      if (a.subject !== b.subject) {
        return a.subject.localeCompare(b.subject);
      }
      const rollA = parseInt(a.studentUsername.slice(-2), 10) || 0;
      const rollB = parseInt(b.studentUsername.slice(-2), 10) || 0;
      return rollA - rollB;
    });
  }

  saveAcademicRecord() {
    const payload = { ...this.aForm, course: this.selectedCourse, batch: this.selectedBatch };
    if (this.editingId) {
      // Updated with environment literal
      this.http
        .put(`${environment.apiUrl}/api/academic/update/${this.editingId}`, payload)
        .subscribe(() => {
          this.cancelAEdit();
          this.loadAcademic();
        });
    } else {
      // Updated with environment literal
      this.http.post(`${environment.apiUrl}/api/academic/save`, payload).subscribe(() => {
        this.cancelAEdit();
        this.loadAcademic();
      });
    }
  }

  editAcademicRecord(r: any) {
    this.editingId = r.id;
    this.aForm = { ...r };
  }

  deleteAcademicRecord(id: number) {
    if (!confirm('Delete this record?')) return;
    // Updated with environment literal
    this.http
      .delete(`${environment.apiUrl}/api/academic/delete/${id}`, { responseType: 'text' })
      .subscribe(() => this.loadAcademic());
  }

  // Timetable
  loadTimetable() {
    // Updated with environment literal
    this.http
      .get<any[]>(
        `${environment.apiUrl}/api/timetable?course=${this.selectedCourse}&batch=${this.selectedBatch}`,
      )
      .subscribe((d) => (this.timetableSlots = d));
  }

  getSlot(day: string, slotKey: string): string {
    const s = this.timetableSlots.find((t) => t.day === day && t.slotKey === slotKey);
    return s ? `${s.subject} (${s.faculty})` : '';
  }

  openSlotEdit(day: string, slotKey: string, timeLabel: string) {
    const existing = this.timetableSlots.find((t) => t.day === day && t.slotKey === slotKey);
    this.editSlot = existing
      ? { ...existing, day, slotKey, timeLabel }
      : { day, slotKey, timeLabel, subject: '', faculty: '', id: null };
    this.slotEditOpen = true;
  }

  saveSlot() {
    const payload = { ...this.editSlot, course: this.selectedCourse, batch: this.selectedBatch };
    if (payload.id) {
      // Updated with environment literal
      this.http.put(`${environment.apiUrl}/api/timetable/${payload.id}`, payload).subscribe(() => {
        this.slotEditOpen = false;
        this.loadTimetable();
      });
    } else {
      // Updated with environment literal
      this.http.post(`${environment.apiUrl}/api/timetable`, payload).subscribe(() => {
        this.slotEditOpen = false;
        this.loadTimetable();
      });
    }
  }

  // Exam Timetable
  loadExamTimetable() {
    // Updated with environment literal
    this.http
      .get<any[]>(
        `${environment.apiUrl}/api/exam-timetable?course=${this.selectedCourse}&batch=${this.selectedBatch}`,
      )
      .subscribe((d) => (this.examList = d));
  }

  saveExam() {
    const payload = { ...this.examForm, course: this.selectedCourse, batch: this.selectedBatch };
    if (this.editingId) {
      // Updated with environment literal
      this.http
        .put(`${environment.apiUrl}/api/exam-timetable/${this.editingId}`, payload)
        .subscribe(() => {
          this.cancelAEdit();
          this.loadExamTimetable();
        });
    } else {
      // Updated with environment literal
      this.http.post(`${environment.apiUrl}/api/exam-timetable`, payload).subscribe(() => {
        this.cancelAEdit();
        this.loadExamTimetable();
      });
    }
  }

  editExam(e: any) {
    this.editingId = e.id;
    this.examForm = { ...e };
  }

  deleteExam(id: number) {
    if (!confirm('Delete this exam?')) return;
    // Updated with environment literal
    this.http
      .delete(`${environment.apiUrl}/api/exam-timetable/${id}`)
      .subscribe(() => this.loadExamTimetable());
  }

  // Fees
  loadFees() {
    // Updated with environment literal
    this.http
      .get<any[]>(`${environment.apiUrl}/api/fees?course=${this.feeCourse}&batch=${this.feeBatch}`)
      .subscribe((d) => (this.feeList = d));
  }

  saveFee() {
    if (this.editingId) {
      // Updated with environment literal
      this.http
        .put(`${environment.apiUrl}/api/fees/${this.editingId}`, this.feeForm)
        .subscribe(() => {
          this.cancelAEdit();
          this.loadFees();
        });
    } else {
      // Updated with environment literal
      this.http.post(`${environment.apiUrl}/api/fees`, this.feeForm).subscribe(() => {
        this.cancelAEdit();
        this.loadFees();
      });
    }
  }

  editFee(f: any) {
    this.editingId = f.id;
    this.feeForm = { ...f };
  }

  deleteFee(id: number) {
    if (!confirm('Delete this fee record?')) return;
    // Updated with environment literal
    this.http.delete(`${environment.apiUrl}/api/fees/${id}`).subscribe(() => this.loadFees());
  }

  // Canteen
  loadCanteen() {
    // Updated with environment literal
    this.http
      .get<any[]>(`${environment.apiUrl}/api/canteen`)
      .subscribe((d) => (this.canteenList = d));
  }

  filteredCanteen() {
    return this.canteenList.filter((c) => c.category === this.canteenTab);
  }

  saveCanteen() {
    const payload = { ...this.canteenForm, category: this.canteenTab };
    if (this.editingId) {
      // Updated with environment literal
      this.http
        .put(`${environment.apiUrl}/api/canteen/${this.editingId}`, payload)
        .subscribe(() => {
          this.cancelAEdit();
          this.loadCanteen();
        });
    } else {
      // Updated with environment literal
      this.http.post(`${environment.apiUrl}/api/canteen`, payload).subscribe(() => {
        this.cancelAEdit();
        this.loadCanteen();
      });
    }
  }

  editCanteen(c: any) {
    this.editingId = c.id;
    this.canteenForm = { ...c };
  }

  deleteCanteen(id: number) {
    if (!confirm('Delete this item?')) return;
    // Updated with environment literal
    this.http.delete(`${environment.apiUrl}/api/canteen/${id}`).subscribe(() => this.loadCanteen());
  }

  // Notices
  loadNotices() {
    // Updated with environment literal
    this.http
      .get<any[]>(`${environment.apiUrl}/api/notices`)
      .subscribe((d) => (this.noticeList = d));
  }

  saveNotice() {
    if (this.editingId) {
      // Updated with environment literal
      this.http
        .put(`${environment.apiUrl}/api/notices/${this.editingId}`, this.noticeForm)
        .subscribe(() => {
          this.cancelAEdit();
          this.loadNotices();
        });
    } else {
      // Updated with environment literal
      this.http.post(`${environment.apiUrl}/api/notices`, this.noticeForm).subscribe(() => {
        this.cancelAEdit();
        this.loadNotices();
      });
    }
  }

  editNotice(n: any) {
    this.editingId = n.id;
    this.noticeForm = { ...n };
  }

  deleteNotice(id: number) {
    if (!confirm('Delete this notice?')) return;
    // Updated with environment literal
    this.http.delete(`${environment.apiUrl}/api/notices/${id}`).subscribe(() => this.loadNotices());
  }

  cancelAEdit() {
    this.editingId = null;
    this.aForm = {
      studentUsername: '',
      studentName: '',
      subject: '',
      attendancePercentage: 0,
      firstInternalMark: 0,
      secondInternalMark: 0,
      semesterMark: 0,
      internalMark: 0,
    };
    this.examForm = { subject: '', examDate: '', examTime: '', venue: '' };
    this.feeForm = {
      studentUsername: '',
      studentName: '',
      course: 'BCA',
      batch: '2025-29',
      amountPaid: 0,
      datePaid: '',
      status: 'PENDING',
    };
    this.canteenForm = { itemName: '', price: 0, category: 'SNACKS' };
    this.noticeForm = { title: '', description: '', datePosted: '' };
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
