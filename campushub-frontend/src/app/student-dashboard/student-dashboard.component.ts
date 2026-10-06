import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="student-layout">
      <aside class="sidebar">
        <div class="sidebar-logo">
          <span class="logo-icon">🎓</span><span class="logo-text">CampusHub</span>
        </div>
        <div class="student-info-card">
          <div class="stu-avatar">{{ studentName.charAt(0) }}</div>
          <div class="stu-name">{{ studentName }}</div>
          <div class="stu-pills">
            <span class="pill course-pill">{{ course }}</span>
            <span class="pill batch-pill">{{ batch }}</span>
          </div>
        </div>
        <nav class="sidebar-nav">
          <div class="nav-section-label">ACADEMIC</div>
          <button
            class="nav-item"
            [class.active]="tab === 'attendance'"
            (click)="tab = 'attendance'; loadAcademic()"
          >
            📋 Attendance
          </button>
          <button
            class="nav-item"
            [class.active]="tab === 'first-internal'"
            (click)="tab = 'first-internal'; loadAcademic()"
          >
            📝 First Internal
          </button>
          <button
            class="nav-item"
            [class.active]="tab === 'second-internal'"
            (click)="tab = 'second-internal'; loadAcademic()"
          >
            📝 Second Internal
          </button>
          <button
            class="nav-item"
            [class.active]="tab === 'semester'"
            (click)="tab = 'semester'; loadAcademic()"
          >
            🎓 Semester Marks
          </button>
          <button
            class="nav-item"
            [class.active]="tab === 'internal-mark'"
            (click)="tab = 'internal-mark'; loadAcademic()"
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
          <div class="nav-section-label" style="margin-top:14px">INFO</div>
          <button
            class="nav-item"
            [class.active]="tab === 'fees'"
            (click)="tab = 'fees'; loadFee()"
          >
            💰 Fee Status
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
        <div *ngIf="tab === 'home'" class="home-view">
          <h1 class="page-title">Hello, {{ studentName }} 👋</h1>
          <p class="page-sub">
            Here is your academic overview for {{ course }} – {{ batch }} batch.
          </p>
          <div class="quick-grid">
            <div class="quick-card" (click)="tab = 'attendance'; loadAcademic()">
              <div class="qc-icon">📋</div>
              <div class="qc-label">Attendance</div>
            </div>
            <div class="quick-card" (click)="tab = 'first-internal'; loadAcademic()">
              <div class="qc-icon">📝</div>
              <div class="qc-label">First Internal</div>
            </div>
            <div class="quick-card" (click)="tab = 'second-internal'; loadAcademic()">
              <div class="qc-icon">📝</div>
              <div class="qc-label">Second Internal</div>
            </div>
            <div class="quick-card" (click)="tab = 'semester'; loadAcademic()">
              <div class="qc-icon">🎓</div>
              <div class="qc-label">Semester Marks</div>
            </div>
            <div class="quick-card" (click)="tab = 'internal-mark'; loadAcademic()">
              <div class="qc-icon">📝</div>
              <div class="qc-label">Internal Mark</div>
            </div>
            <div class="quick-card" (click)="tab = 'timetable'; loadTimetable()">
              <div class="qc-icon">📅</div>
              <div class="qc-label">Class Timetable</div>
            </div>
            <div class="quick-card" (click)="tab = 'exam'; loadExamTimetable()">
              <div class="qc-icon">🗓️</div>
              <div class="qc-label">Exam Timetable</div>
            </div>
            <div class="quick-card" (click)="tab = 'fees'; loadFee()">
              <div class="qc-icon">💰</div>
              <div class="qc-label">Fee Status</div>
            </div>
            <div class="quick-card" (click)="tab = 'canteen'; loadCanteen()">
              <div class="qc-icon">🍽️</div>
              <div class="qc-label">Canteen Menu</div>
            </div>
            <div class="quick-card" (click)="tab = 'notices'; loadNotices()">
              <div class="qc-icon">📌</div>
              <div class="qc-label">Notice Board</div>
            </div>
          </div>
        </div>
        <div
          *ngIf="
            [
              'attendance',
              'first-internal',
              'second-internal',
              'semester',
              'internal-mark',
            ].includes(tab)
          "
        >
          <h1 class="page-title">
            {{
              tab === 'attendance'
                ? '📋 Attendance'
                : tab === 'first-internal'
                  ? '📝 First Internal Marks'
                  : tab === 'second-internal'
                    ? '📝 Second Internal Marks'
                    : tab === 'internal-mark'
                      ? '📝 Internal Mark'
                      : '🎓 Semester Marks'
            }}
          </h1>
          <div class="subject-cards">
            <div *ngFor="let r of myRecords" class="subject-card">
              <div class="sub-name">{{ r.subject }}</div>
              <div *ngIf="tab === 'attendance'" class="sub-value">
                <div class="progress-ring">
                  <svg viewBox="0 0 60 60" class="ring-svg">
                    <circle
                      cx="30"
                      cy="30"
                      r="24"
                      stroke="rgba(255,255,255,0.1)"
                      stroke-width="6"
                      fill="none"
                    />
                    <circle
                      cx="30"
                      cy="30"
                      r="24"
                      [attr.stroke]="r.attendancePercentage >= 75 ? '#34d399' : '#f87171'"
                      stroke-width="6"
                      fill="none"
                      stroke-linecap="round"
                      [attr.stroke-dasharray]="150.796"
                      [attr.stroke-dashoffset]="150.796 * (1 - r.attendancePercentage / 100)"
                      transform="rotate(-90 30 30)"
                    />
                  </svg>
                  <div
                    class="ring-value"
                    [class.good]="r.attendancePercentage >= 75"
                    [class.bad]="r.attendancePercentage < 75"
                  >
                    {{ r.attendancePercentage }}%
                  </div>
                </div>
                <div
                  class="att-status"
                  [class.good]="r.attendancePercentage >= 75"
                  [class.bad]="r.attendancePercentage < 75"
                >
                  {{ r.attendancePercentage >= 75 ? '✅ Good Standing' : '⚠️ Low Attendance' }}
                </div>
              </div>
              <div *ngIf="tab === 'first-internal'" class="sub-value">
                <div class="mark-display">
                  {{ r.firstInternalMark }}<span class="mark-total">/50</span>
                </div>
              </div>
              <div *ngIf="tab === 'second-internal'" class="sub-value">
                <div class="mark-display">
                  {{ r.secondInternalMark }}<span class="mark-total">/50</span>
                </div>
              </div>
              <div *ngIf="tab === 'semester'" class="sub-value">
                <div class="mark-display">
                  {{ r.semesterMark }}<span class="mark-total">/100</span>
                </div>
              </div>
              <div *ngIf="tab === 'internal-mark'" class="sub-value">
                <div class="mark-display">
                  {{ r.internalMark }}<span class="mark-total">/30</span>
                </div>
              </div>
            </div>
            <div *ngIf="myRecords.length === 0" class="empty-state">
              📂 No records available yet. Please contact your faculty.
            </div>
          </div>
        </div>
        <div *ngIf="tab === 'timetable'">
          <h1 class="page-title">📅 Class Timetable</h1>
          <div class="timetable-grid">
            <div class="tt-header">Time Slot</div>
            <div class="tt-header" *ngFor="let d of days">{{ d }}</div>
            <div class="tt-time fixed-time">8:30 – 9:00</div>
            <div class="tt-slot fixed-slot" *ngFor="let d of days">📰 Newspaper Reading</div>
            <div class="tt-time">9:00 – 10:00</div>
            <div class="tt-slot" *ngFor="let d of days">{{ getSlot(d, 'HOUR1') }}</div>
            <div class="tt-time fixed-time">10:00 – 10:30</div>
            <div class="tt-slot fixed-slot" *ngFor="let d of days">☕ Break</div>
            <div class="tt-time">10:30 – 11:30</div>
            <div class="tt-slot" *ngFor="let d of days">{{ getSlot(d, 'HOUR2') }}</div>
            <div class="tt-time">11:30 – 12:30</div>
            <div class="tt-slot" *ngFor="let d of days">{{ getSlot(d, 'HOUR3') }}</div>
            <div class="tt-time fixed-time">12:30 – 1:15</div>
            <div class="tt-slot fixed-slot" *ngFor="let d of days">🍽️ Lunch Break</div>
            <div class="tt-time">1:15 – 2:15</div>
            <div class="tt-slot" *ngFor="let d of days">{{ getSlot(d, 'HOUR4') }}</div>
            <div class="tt-time">2:15 – 3:15</div>
            <div class="tt-slot" *ngFor="let d of days">{{ getSlot(d, 'HOUR5') }}</div>
            <div class="tt-time fixed-time">3:15 – 3:30</div>
            <div class="tt-slot fixed-slot" *ngFor="let d of days">☕ Break</div>
            <div class="tt-time">3:30 – 4:30</div>
            <div class="tt-slot" *ngFor="let d of days">{{ getSlot(d, 'HOUR6') }}</div>
          </div>
        </div>
        <div *ngIf="tab === 'exam'">
          <h1 class="page-title">🗓️ Exam Timetable</h1>
          <div class="exam-cards">
            <div *ngFor="let e of examList" class="exam-card">
              <div class="exam-subject">{{ e.subject }}</div>
              <div class="exam-details">
                <span>📅 {{ e.examDate }}</span>
                <span>⏰ {{ e.examTime }}</span>
                <span>📍 {{ e.venue }}</span>
              </div>
            </div>
            <div *ngIf="examList.length === 0" class="empty-state">📂 No exams scheduled yet.</div>
          </div>
        </div>
        <div *ngIf="tab === 'fees'">
          <h1 class="page-title">💰 Fee Status</h1>
          <div *ngIf="feeRecord" class="fee-card">
            <div
              class="fee-status-banner"
              [class.paid-banner]="feeRecord.status === 'PAID'"
              [class.pending-banner]="feeRecord.status === 'PENDING'"
            >
              <div class="fee-status-icon">{{ feeRecord.status === 'PAID' ? '✅' : '⚠️' }}</div>
              <div class="fee-status-text">
                {{ feeRecord.status === 'PAID' ? 'Fees Paid' : 'Payment Pending' }}
              </div>
            </div>
            <div class="fee-details">
              <div class="fee-row">
                <span class="fee-label">Amount Paid</span
                ><span class="fee-val">₹{{ feeRecord.amountPaid }}</span>
              </div>
              <div class="fee-row">
                <span class="fee-label">Date of Payment</span
                ><span class="fee-val">{{ feeRecord.datePaid || '—' }}</span>
              </div>
              <div class="fee-row">
                <span class="fee-label">Course</span
                ><span class="fee-val">{{ feeRecord.course }}</span>
              </div>
              <div class="fee-row">
                <span class="fee-label">Batch</span
                ><span class="fee-val">{{ feeRecord.batch }}</span>
              </div>
            </div>
          </div>
          <div *ngIf="!feeRecord" class="empty-state">
            💰 No fee record found. Please contact the admin office.
          </div>
        </div>
        <div *ngIf="tab === 'canteen'">
          <h1 class="page-title">🍽️ Today's Canteen Menu</h1>
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
          <div class="menu-grid">
            <div *ngFor="let item of filteredCanteen()" class="menu-item">
              <div class="menu-name">{{ item.itemName }}</div>
              <div class="menu-price">₹{{ item.price }}</div>
            </div>
            <div *ngIf="filteredCanteen().length === 0" class="empty-state">
              🍽️ Menu not updated yet.
            </div>
          </div>
        </div>
        <div *ngIf="tab === 'notices'">
          <h1 class="page-title">📌 Notice Board</h1>
          <div class="notices-list">
            <div *ngFor="let n of noticeList" class="notice-card">
              <h3>{{ n.title }}</h3>
              <p>{{ n.description }}</p>
              <div class="notice-date">📅 {{ n.datePosted }}</div>
            </div>
            <div *ngIf="noticeList.length === 0" class="empty-state">
              📌 No upcoming events or notices at this time.
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
      .student-layout {
        display: flex;
        height: 100vh;
        background: #0f1117;
      }
      .sidebar {
        width: 250px;
        background: linear-gradient(180deg, #1a1d2e, #12141f);
        border-right: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        flex-direction: column;
        padding: 20px 14px;
        flex-shrink: 0;
        overflow-y: auto;
      }
      .sidebar-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 18px;
      }
      .logo-icon {
        font-size: 24px;
      }
      .logo-text {
        font-size: 18px;
        font-weight: 800;
        color: white;
      }
      .student-info-card {
        background: rgba(96, 165, 250, 0.1);
        border: 1px solid rgba(96, 165, 250, 0.2);
        border-radius: 14px;
        padding: 16px;
        margin-bottom: 20px;
        text-align: center;
      }
      .stu-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        font-weight: 800;
        color: white;
        margin: 0 auto 10px;
      }
      .stu-name {
        color: white;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 8px;
      }
      .stu-pills {
        display: flex;
        gap: 6px;
        justify-content: center;
        flex-wrap: wrap;
      }
      .pill {
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 700;
      }
      .course-pill {
        background: rgba(96, 165, 250, 0.2);
        color: #93c5fd;
      }
      .batch-pill {
        background: rgba(167, 139, 250, 0.2);
        color: #c4b5fd;
      }
      .nav-section-label {
        color: rgba(255, 255, 255, 0.3);
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 6px;
        padding: 0 4px;
      }
      .sidebar-nav {
        display: flex;
        flex-direction: column;
        gap: 3px;
        flex: 1;
      }
      .nav-item {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.5);
        padding: 10px 12px;
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
        background: rgba(96, 165, 250, 0.15);
        color: #93c5fd;
        border: 1px solid rgba(96, 165, 250, 0.25);
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
        margin-top: 12px;
      }
      .main-content {
        flex: 1;
        overflow-y: auto;
        padding: 28px 32px;
      }
      .page-title {
        color: white;
        font-size: 24px;
        font-weight: 800;
        margin-bottom: 6px;
      }
      .page-sub {
        color: rgba(255, 255, 255, 0.4);
        font-size: 14px;
        margin-bottom: 28px;
      }
      .quick-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 14px;
        margin-top: 24px;
      }
      .quick-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 14px;
        padding: 20px;
        cursor: pointer;
        transition: all 0.25s;
        text-align: center;
      }
      .quick-card:hover {
        transform: translateY(-3px);
        background: rgba(96, 165, 250, 0.1);
        border-color: rgba(96, 165, 250, 0.3);
      }
      .qc-icon {
        font-size: 28px;
        margin-bottom: 8px;
      }
      .qc-label {
        color: rgba(255, 255, 255, 0.7);
        font-size: 13px;
        font-weight: 600;
      }
      .subject-cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }
      .subject-card {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 22px;
      }
      .sub-name {
        color: rgba(255, 255, 255, 0.6);
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 16px;
      }
      .mark-display {
        font-size: 42px;
        font-weight: 800;
        color: white;
      }
      .mark-total {
        font-size: 18px;
        color: rgba(255, 255, 255, 0.3);
      }
      .progress-ring {
        position: relative;
        width: 80px;
        height: 80px;
        margin: 0 auto 12px;
      }
      .ring-svg {
        width: 80px;
        height: 80px;
      }
      .ring-value {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 14px;
        font-weight: 800;
      }
      .ring-value.good {
        color: #34d399;
      }
      .ring-value.bad {
        color: #f87171;
      }
      .att-status {
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 8px;
      }
      .att-status.good {
        background: rgba(52, 211, 153, 0.15);
        color: #6ee7b7;
      }
      .att-status.bad {
        background: rgba(248, 113, 113, 0.15);
        color: #fca5a5;
      }
      .timetable-grid {
        display: grid;
        grid-template-columns: 110px repeat(6, 1fr);
        gap: 2px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        overflow: hidden;
        font-size: 11px;
      }
      .tt-header {
        background: rgba(96, 165, 250, 0.15);
        color: #93c5fd;
        font-size: 11px;
        font-weight: 700;
        padding: 10px 6px;
        text-align: center;
      }
      .tt-time {
        background: rgba(255, 255, 255, 0.04);
        color: rgba(255, 255, 255, 0.45);
        font-size: 10px;
        padding: 12px 8px;
        display: flex;
        align-items: center;
        font-weight: 600;
      }
      .fixed-time {
        color: rgba(255, 255, 255, 0.2);
        font-style: italic;
      }
      .tt-slot {
        background: rgba(255, 255, 255, 0.03);
        padding: 10px 6px;
        color: rgba(255, 255, 255, 0.65);
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .fixed-slot {
        color: rgba(255, 255, 255, 0.2);
        font-style: italic;
      }
      .exam-cards {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .exam-card {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 18px 22px;
      }
      .exam-subject {
        color: white;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      .exam-details {
        display: flex;
        gap: 20px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 13px;
      }
      .fee-card {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        overflow: hidden;
        max-width: 500px;
      }
      .fee-status-banner {
        padding: 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
      .paid-banner {
        background: linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.1));
        border-bottom: 1px solid rgba(52, 211, 153, 0.2);
      }
      .pending-banner {
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.2), rgba(239, 68, 68, 0.1));
        border-bottom: 1px solid rgba(248, 113, 113, 0.2);
      }
      .fee-status-icon {
        font-size: 42px;
      }
      .fee-status-text {
        font-size: 22px;
        font-weight: 800;
        color: white;
      }
      .fee-details {
        padding: 20px 24px;
      }
      .fee-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }
      .fee-row:last-child {
        border-bottom: none;
      }
      .fee-label {
        color: rgba(255, 255, 255, 0.4);
        font-size: 13px;
      }
      .fee-val {
        color: white;
        font-size: 14px;
        font-weight: 600;
      }
      .category-tabs {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
      }
      .cat-btn {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.6);
        padding: 10px 22px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        transition: all 0.2s;
      }
      .cat-btn.active {
        background: rgba(96, 165, 250, 0.2);
        border-color: #60a5fa;
        color: #93c5fd;
      }
      .menu-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
      }
      .menu-item {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 18px;
      }
      .menu-name {
        color: white;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 6px;
      }
      .menu-price {
        color: #93c5fd;
        font-size: 18px;
        font-weight: 800;
      }
      .notices-list {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .notice-card {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-left: 3px solid #60a5fa;
        border-radius: 12px;
        padding: 20px 24px;
      }
      .notice-card h3 {
        color: white;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      .notice-card p {
        color: rgba(255, 255, 255, 0.6);
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 10px;
      }
      .notice-date {
        color: rgba(255, 255, 255, 0.3);
        font-size: 12px;
      }
      .empty-state {
        background: rgba(255, 255, 255, 0.03);
        border: 1px dashed rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 40px;
        text-align: center;
        color: rgba(255, 255, 255, 0.3);
        font-size: 14px;
      }
    `,
  ],
})
export class StudentDashboardComponent implements OnInit {
  studentName = '';
  username = '';
  course = '';
  batch = '';
  tab = 'home';
  myRecords: any[] = [];
  timetableSlots: any[] = [];
  examList: any[] = [];
  feeRecord: any = null;
  canteenList: any[] = [];
  canteenTab = 'SNACKS';
  noticeList: any[] = [];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    if (localStorage.getItem('userRole') !== 'STUDENT') {
      this.router.navigate(['/login']);
      return;
    }
    this.studentName = localStorage.getItem('userName') || 'Student';
    this.username = localStorage.getItem('userUsername') || '';
    this.course = localStorage.getItem('userCourse') || '';
    this.batch = localStorage.getItem('userBatch') || '';
  }

  loadAcademic() {
    // Updated with environment literal
    this.http
      .get<any[]>(`${environment.apiUrl}/api/academic/student/${this.username}`)
      .subscribe((d) => (this.myRecords = d));
  }

  loadTimetable() {
    // Updated with environment literal
    this.http
      .get<any[]>(`${environment.apiUrl}/api/timetable?course=${this.course}&batch=${this.batch}`)
      .subscribe((d) => (this.timetableSlots = d));
  }

  getSlot(day: string, slotKey: string): string {
    const s = this.timetableSlots.find((t) => t.day === day && t.slotKey === slotKey);
    return s ? `${s.subject}\n${s.faculty}` : '—';
  }

  loadExamTimetable() {
    // Updated with environment literal
    this.http
      .get<any[]>(
        `${environment.apiUrl}/api/exam-timetable?course=${this.course}&batch=${this.batch}`,
      )
      .subscribe((d) => (this.examList = d));
  }

  loadFee() {
    // Updated with environment literal
    this.http
      .get<any>(`${environment.apiUrl}/api/fees/student/${this.username}`)
      .subscribe({ next: (d) => (this.feeRecord = d), error: () => (this.feeRecord = null) });
  }

  loadCanteen() {
    // Updated with environment literal
    this.http
      .get<any[]>(`${environment.apiUrl}/api/canteen`)
      .subscribe((d) => (this.canteenList = d));
  }

  filteredCanteen() {
    return this.canteenList.filter((c) => c.category === this.canteenTab);
  }

  loadNotices() {
    // Updated with environment literal
    this.http
      .get<any[]>(`${environment.apiUrl}/api/notices`)
      .subscribe((d) => (this.noticeList = d));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
