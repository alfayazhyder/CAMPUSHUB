import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="display: flex; height: 100vh; font-family: Arial, sans-serif;">
      <div
        style="width: 280px; background-color: #2c3e50; color: white; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;"
      >
        <div>
          <h2 style="text-align: center; margin-bottom: 20px;">CampusHub</h2>

          <div
            style="text-align: center; background-color: #34495e; padding: 10px; border-radius: 4px; margin-bottom: 15px;"
          >
            <p style="margin: 0; font-size: 11px; color: #bdc3c7;">SYSTEM IDENTITY</p>
            <h4 style="margin: 5px 0 0 0; color: #2ecc71;" *ngIf="userRole === 'STUDENT'">
              🎓 {{ username }}
            </h4>
            <h4 style="margin: 5px 0 0 0; color: #f1c40f;" *ngIf="userRole === 'ADMIN'">
              🛠️ Admin Control Panel
            </h4>
            <h4 style="margin: 5px 0 0 0; color: #3498db;" *ngIf="userRole === 'TEACHER'">
              👨‍🏫 Faculty Portal
            </h4>
          </div>

          <hr style="border-color: #34495e; margin-bottom: 15px;" />

          <ul
            style="list-style-type: none; padding: 0; margin: 0; max-height: 60vh; overflow-y: auto;"
          >
            <li
              *ngIf="userRole === 'ADMIN'"
              (click)="currentTab = 'manage-members'"
              [style.background-color]="currentTab === 'manage-members' ? '#34495e' : 'transparent'"
              style="padding: 10px; cursor: pointer; border-radius: 4px; margin-bottom: 5px; font-weight: bold; color: #f1c40f;"
            >
              👥 Manage Members
            </li>

            <li
              (click)="currentTab = 'attendance'"
              [style.background-color]="currentTab === 'attendance' ? '#34495e' : 'transparent'"
              style="padding: 10px; cursor: pointer; border-radius: 4px; margin-bottom: 5px;"
            >
              1) Attendance
            </li>
            <li
              (click)="currentTab = 'first-internal'"
              [style.background-color]="currentTab === 'first-internal' ? '#34495e' : 'transparent'"
              style="padding: 10px; cursor: pointer; border-radius: 4px; margin-bottom: 5px;"
            >
              2) First internal mark
            </li>
            <li
              (click)="currentTab = 'second-internal'"
              [style.background-color]="
                currentTab === 'second-internal' ? '#34495e' : 'transparent'
              "
              style="padding: 10px; cursor: pointer; border-radius: 4px; margin-bottom: 5px;"
            >
              3) Second internal mark
            </li>
            <li
              (click)="currentTab = 'semester-marks'"
              [style.background-color]="currentTab === 'semester-marks' ? '#34495e' : 'transparent'"
              style="padding: 10px; cursor: pointer; border-radius: 4px; margin-bottom: 5px;"
            >
              4) Semester exam marks
            </li>
            <li
              (click)="currentTab = 'class-timetable'"
              [style.background-color]="
                currentTab === 'class-timetable' ? '#34495e' : 'transparent'
              "
              style="padding: 10px; cursor: pointer; border-radius: 4px; margin-bottom: 5px;"
            >
              5) Class timetable
            </li>
            <li
              (click)="currentTab = 'exam-timetable'"
              [style.background-color]="currentTab === 'exam-timetable' ? '#34495e' : 'transparent'"
              style="padding: 10px; cursor: pointer; border-radius: 4px; margin-bottom: 5px;"
            >
              6) Exam timetable
            </li>

            <li
              (click)="currentTab = 'canteen'"
              [style.background-color]="currentTab === 'canteen' ? '#34495e' : 'transparent'"
              style="padding: 10px; cursor: pointer; border-radius: 4px; margin-bottom: 5px; border-top: 1px solid #34495e;"
            >
              🛒 Canteen Management
            </li>
            <li
              (click)="currentTab = 'notice'"
              [style.background-color]="currentTab === 'notice' ? '#34495e' : 'transparent'"
              style="padding: 10px; cursor: pointer; border-radius: 4px; margin-bottom: 5px;"
            >
              📌 Notice Board
            </li>
          </ul>
        </div>

        <button
          (click)="logout()"
          style="padding: 10px; background-color: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-top: 10px;"
        >
          Logout
        </button>
      </div>

      <div
        style="flex-grow: 1; padding: 30px; background-color: #ecf0f1; overflow-y: auto; box-sizing: border-box;"
      >
        <div
          *ngIf="userRole === 'TEACHER' || userRole === 'ADMIN'"
          style="background: white; padding: 15px 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; align-items: center; gap: 15px;"
        >
          <h3 style="margin:0; color:#2c3e50;">Active Dashboard:</h3>
          <select
            [(ngModel)]="selectedCourse"
            (change)="loadAcademicRecords()"
            style="padding: 8px; border-radius: 4px; border: 1px solid #bdc3c7;"
          >
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
            <option value="BCOM">BCOM</option>
          </select>
          <select
            [(ngModel)]="selectedBatch"
            (change)="loadAcademicRecords()"
            style="padding: 8px; border-radius: 4px; border: 1px solid #bdc3c7;"
          >
            <option value="2025-29">2025-29</option>
            <option value="2026-30">2026-30</option>
          </select>
          <button
            (click)="loadAcademicRecords()"
            style="padding: 8px 15px; background-color: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Refresh Data
          </button>
        </div>

        <div
          *ngIf="userRole === 'STUDENT'"
          style="background: white; padding: 15px 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);"
        >
          <h2 style="margin:0;">My Academic Records ({{ studentCourse }} {{ studentBatch }})</h2>
        </div>

        <div
          *ngIf="
            ['attendance', 'first-internal', 'second-internal', 'semester-marks'].includes(
              currentTab
            )
          "
        >
          <h2 style="text-transform: uppercase;">📋 Module: {{ currentTab.replace('-', ' ') }}</h2>

          <div
            *ngIf="userRole === 'ADMIN' || userRole === 'TEACHER'"
            style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 10px;"
          >
            <input
              type="text"
              [(ngModel)]="newRecord.studentUsername"
              placeholder="Student Username"
              style="padding: 8px;"
            />
            <input
              type="text"
              [(ngModel)]="newRecord.studentName"
              placeholder="Student Full Name"
              style="padding: 8px;"
            />
            <input
              type="text"
              [(ngModel)]="newRecord.subject"
              placeholder="Subject Name"
              style="padding: 8px;"
            />

            <input
              *ngIf="currentTab === 'attendance'"
              type="number"
              [(ngModel)]="newRecord.attendancePercentage"
              placeholder="Attendance %"
              style="padding: 8px;"
            />
            <input
              *ngIf="currentTab === 'first-internal'"
              type="number"
              [(ngModel)]="newRecord.firstInternalMark"
              placeholder="1st Internal Mark"
              style="padding: 8px;"
            />
            <input
              *ngIf="currentTab === 'second-internal'"
              type="number"
              [(ngModel)]="newRecord.secondInternalMark"
              placeholder="2nd Internal Mark"
              style="padding: 8px;"
            />
            <input
              *ngIf="currentTab === 'semester-marks'"
              type="number"
              [(ngModel)]="newRecord.semesterMark"
              placeholder="Semester Mark"
              style="padding: 8px;"
            />

            <button
              (click)="saveAcademicRecord()"
              style="padding: 8px 15px; background-color: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;"
            >
              Save Record
            </button>
          </div>

          <div
            style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
          >
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
              <thead>
                <tr style="background-color: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                  <th style="padding: 12px;">Student Name</th>
                  <th style="padding: 12px;">Subject</th>
                  <th *ngIf="currentTab === 'attendance'" style="padding: 12px;">Attendance %</th>
                  <th *ngIf="currentTab === 'first-internal'" style="padding: 12px;">
                    1st Internal
                  </th>
                  <th *ngIf="currentTab === 'second-internal'" style="padding: 12px;">
                    2nd Internal
                  </th>
                  <th *ngIf="currentTab === 'semester-marks'" style="padding: 12px;">
                    Semester Mark
                  </th>
                  <th *ngIf="userRole === 'ADMIN' || userRole === 'TEACHER'" style="padding: 12px;">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let record of activeRecords" style="border-bottom: 1px solid #dee2e6;">
                  <td style="padding: 12px;">
                    <b>{{ record.studentName }}</b
                    ><br /><small>{{ record.studentUsername }}</small>
                  </td>
                  <td style="padding: 12px;">{{ record.subject }}</td>
                  <td *ngIf="currentTab === 'attendance'" style="padding: 12px;">
                    {{ record.attendancePercentage }}%
                  </td>
                  <td *ngIf="currentTab === 'first-internal'" style="padding: 12px;">
                    {{ record.firstInternalMark }}
                  </td>
                  <td *ngIf="currentTab === 'second-internal'" style="padding: 12px;">
                    {{ record.secondInternalMark }}
                  </td>
                  <td *ngIf="currentTab === 'semester-marks'" style="padding: 12px;">
                    {{ record.semesterMark }}
                  </td>
                  <td *ngIf="userRole === 'ADMIN' || userRole === 'TEACHER'" style="padding: 12px;">
                    <button
                      (click)="deleteAcademicRecord(record.id)"
                      style="background: #e74c3c; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <p *ngIf="activeRecords.length === 0" style="color:#7f8c8d; margin-top: 15px;">
              No records found for this view.
            </p>
          </div>
        </div>

        <div *ngIf="currentTab === 'canteen'">
          <h2>🛒 Canteen Management</h2>
          <div
            *ngIf="userRole === 'ADMIN' || userRole === 'TEACHER'"
            style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 500px; margin-bottom: 20px;"
          >
            <h3>Add Menu Item</h3>
            <input
              type="text"
              [(ngModel)]="newCanteenItem.itemName"
              placeholder="Item Name"
              style="padding: 8px; margin-right: 10px;"
            />
            <input
              type="text"
              [(ngModel)]="newCanteenItem.category"
              placeholder="Category"
              style="padding: 8px; margin-right: 10px;"
            />
            <input
              type="number"
              [(ngModel)]="newCanteenItem.price"
              placeholder="Price"
              style="padding: 8px; margin-right: 10px; width: 80px;"
            />
            <button
              (click)="addCanteenItem()"
              style="padding: 8px 15px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
            >
              Add
            </button>
          </div>
          <div
            style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
          >
            <div
              *ngFor="let item of canteenItems"
              style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;"
            >
              <span
                ><b>{{ item.itemName }}</b> ({{ item.category }}) - Rs. {{ item.price }}</span
              >
              <button
                *ngIf="userRole === 'ADMIN' || userRole === 'TEACHER'"
                (click)="deleteCanteenItem(item.id)"
                style="background-color: #c0392b; color: white; border: none; padding: 5px 10px; border-radius: 4px;"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  // User Session Data
  userRole: string | null = '';
  username: string | null = '';
  studentCourse: string | null = '';
  studentBatch: string | null = '';

  // Dashboard State
  currentTab: string = 'attendance';
  selectedCourse: string = 'BCA';
  selectedBatch: string = '2025-29';

  // Data Arrays
  activeRecords: any[] = [];
  canteenItems: any[] = [];
  noticeItems: any[] = [];

  // Form Objects
  newRecord = {
    id: null,
    studentUsername: '',
    studentName: '',
    course: '',
    batch: '',
    subject: '',
    attendancePercentage: 0,
    firstInternalMark: 0,
    secondInternalMark: 0,
    semesterMark: 0,
  };
  newCanteenItem = { itemName: '', category: '', price: 0 };

  constructor(
    private router: Router,
    private apiService: ApiService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    this.username = localStorage.getItem('username');
    this.studentCourse = localStorage.getItem('course') || 'BCA';
    this.studentBatch = localStorage.getItem('batch') || '2025-29';

    if (!this.userRole) {
      this.router.navigate(['/login']);
      return;
    }

    // Default view routing
    this.currentTab = this.userRole === 'ADMIN' ? 'manage-members' : 'attendance';

    // Safety delay to allow HTML to render before data fetch
    setTimeout(() => {
      this.loadAcademicRecords();
      this.loadCanteen();
    }, 100);
  }

  // ==================== NEW ACADEMIC ENGINE ====================
  loadAcademicRecords() {
    if (this.userRole === 'STUDENT') {
      // Students only fetch their exact personal row
      this.apiService.getStudentRecords(this.username!).subscribe((data) => {
        this.activeRecords = data;
        this.cdr.detectChanges();
      });
    } else {
      // Teachers load entire selected cohorts
      this.apiService
        .getCohortRecords(this.selectedCourse, this.selectedBatch)
        .subscribe((data) => {
          this.activeRecords = data;
          this.cdr.detectChanges();
        });
    }
  }

  saveAcademicRecord() {
    // Attach the currently selected dropdown parameters to the saved record so it goes to the right dashboard
    this.newRecord.course = this.selectedCourse;
    this.newRecord.batch = this.selectedBatch;

    this.apiService.saveAcademicRecord(this.newRecord).subscribe(() => {
      this.loadAcademicRecords();
      // Reset form but keep the username/name active in case teacher is entering multiple subjects for one kid
      this.newRecord.subject = '';
      this.newRecord.attendancePercentage = 0;
      this.newRecord.firstInternalMark = 0;
      this.newRecord.secondInternalMark = 0;
      this.newRecord.semesterMark = 0;
      this.cdr.detectChanges();
    });
  }

  deleteAcademicRecord(id: number) {
    if (confirm('Delete this academic record?')) {
      this.apiService.deleteAcademicRecord(id).subscribe(() => {
        this.loadAcademicRecords();
      });
    }
  }

  // ==================== CANTEEN / LOGOUT REGION ====================
  loadCanteen() {
    this.apiService.getData('api/canteen').subscribe((data: any) => {
      this.canteenItems = data;
      this.cdr.detectChanges();
    });
  }
  addCanteenItem() {
    this.http.post('http://localhost:8080/api/canteen', this.newCanteenItem).subscribe(() => {
      this.loadCanteen();
      this.newCanteenItem = { itemName: '', category: '', price: 0 };
    });
  }
  deleteCanteenItem(id: number) {
    this.apiService.deleteData('api/canteen', id).subscribe(() => this.loadCanteen());
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

