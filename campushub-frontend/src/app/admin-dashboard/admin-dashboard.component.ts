import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-layout">
      <aside class="sidebar">
        <div class="sidebar-logo">
          <span class="logo-icon">🎓</span>
          <span class="logo-text">CampusHub</span>
        </div>
        <div class="admin-badge">🛠️ Admin Panel</div>
        <nav class="sidebar-nav">
          <button
            class="nav-item"
            [class.active]="currentView === 'home'"
            (click)="currentView = 'home'"
          >
            🏠 Dashboard
          </button>
          <button
            class="nav-item"
            [class.active]="currentView === 'students'"
            (click)="loadStudentView()"
          >
            🎒 Manage Students
          </button>
          <button
            class="nav-item"
            [class.active]="currentView === 'teaching'"
            (click)="loadTeachingStaff()"
          >
            👩‍🏫 Teaching Staff
          </button>
          <button
            class="nav-item"
            [class.active]="currentView === 'nonteaching'"
            (click)="loadNonTeachingStaff()"
          >
            🧑‍💼 Non-Teaching Staff
          </button>
        </nav>
        <button class="logout-btn" (click)="logout()">⎋ Logout</button>
      </aside>
      <main class="main-content">
        <div *ngIf="currentView === 'home'" class="home-view">
          <h1 class="page-title">Welcome, Admin 👋</h1>
          <p class="page-sub">Manage your entire campus from here.</p>
          <div class="stat-cards">
            <div class="stat-card blue">
              <div class="stat-icon">🎒</div>
              <div class="stat-num">{{ totalStudents }}</div>
              <div class="stat-label">Total Students</div>
            </div>
            <div class="stat-card green">
              <div class="stat-icon">👩‍🏫</div>
              <div class="stat-num">{{ totalTeachers }}</div>
              <div class="stat-label">Teaching Staff</div>
            </div>
            <div class="stat-card purple">
              <div class="stat-icon">🧑‍💼</div>
              <div class="stat-num">{{ totalNonTeachers }}</div>
              <div class="stat-label">Non-Teaching Staff</div>
            </div>
          </div>
          <div class="quick-actions">
            <h2 class="section-title">Quick Actions</h2>
            <div class="action-grid">
              <button class="action-card" (click)="loadStudentView()">
                <span class="ac-icon">➕🎒</span><span>Add Student</span>
              </button>
              <button class="action-card" (click)="loadTeachingStaff()">
                <span class="ac-icon">➕👩‍🏫</span><span>Add Teaching Staff</span>
              </button>
              <button class="action-card" (click)="loadNonTeachingStaff()">
                <span class="ac-icon">➕🧑‍💼</span><span>Add Non-Teaching Staff</span>
              </button>
            </div>
          </div>
        </div>
        <div *ngIf="currentView === 'students'">
          <h1 class="page-title">🎒 Manage Students</h1>
          <div class="filter-bar">
            <div class="filter-group">
              <label>Batch</label>
              <div class="btn-group">
                <button
                  *ngFor="let b of batches"
                  class="filter-btn"
                  [class.selected]="selectedBatch === b"
                  (click)="selectedBatch = b; loadStudentsByFilter()"
                >
                  {{ b }}
                </button>
              </div>
            </div>
            <div class="filter-group">
              <label>Course</label>
              <div class="btn-group">
                <button
                  *ngFor="let c of courses"
                  class="filter-btn"
                  [class.selected]="selectedCourse === c"
                  (click)="selectedCourse = c; loadStudentsByFilter()"
                >
                  {{ c }}
                </button>
              </div>
            </div>
          </div>
          <div class="form-card">
            <h3>{{ editingId ? '✏️ Edit Student' : '➕ Add New Student' }}</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Full Name</label
                ><input class="input" [(ngModel)]="form.name" placeholder="e.g. Al Fayaz" />
              </div>
              <div class="form-group">
                <label>Username</label
                ><input
                  class="input"
                  [(ngModel)]="form.username"
                  placeholder="e.g. ALFAYAZ202529BCA01"
                />
              </div>
              <div class="form-group">
                <label>Password</label
                ><input class="input" [(ngModel)]="form.password" placeholder="Set password" />
              </div>
              <div class="form-group">
                <label>Course</label
                ><select class="input" [(ngModel)]="form.course">
                  <option *ngFor="let c of courses" [value]="c">{{ c }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Batch</label
                ><select class="input" [(ngModel)]="form.batch">
                  <option *ngFor="let b of batches" [value]="b">{{ b }}</option>
                </select>
              </div>
            </div>
            <div class="form-actions">
              <button class="btn-primary" (click)="saveStudent()">
                {{ editingId ? 'Update' : 'Add Student' }}
              </button>
              <button *ngIf="editingId" class="btn-secondary" (click)="cancelEdit()">Cancel</button>
            </div>
          </div>
          <div class="table-card">
            <h3>{{ selectedBatch }} – {{ selectedCourse }} Students ({{ members.length }})</h3>
            <table class="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let s of members; let i = index">
                  <td>{{ i + 1 }}</td>
                  <td class="name-cell">{{ s.name }}</td>
                  <td>
                    <code class="uname">{{ s.username }}</code>
                  </td>
                  <td>{{ s.password }}</td>
                  <td class="actions-cell">
                    <button class="btn-edit" (click)="editMember(s)">✏️ Edit</button
                    ><button class="btn-delete" (click)="deleteMember(s.id)">🗑️ Delete</button>
                  </td>
                </tr>
                <tr *ngIf="members.length === 0">
                  <td colspan="5" class="empty-row">No students found. Add one above.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div *ngIf="currentView === 'teaching'">
          <h1 class="page-title">👩‍🏫 Teaching Staff</h1>
          <div class="form-card">
            <h3>{{ editingId ? '✏️ Edit Staff' : '➕ Add Teaching Staff' }}</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Full Name</label
                ><input class="input" [(ngModel)]="form.name" placeholder="e.g. Athira AG" />
              </div>
              <div class="form-group">
                <label>Username</label
                ><input class="input" [(ngModel)]="form.username" placeholder="e.g. ATHIRAAG" />
              </div>
              <div class="form-group">
                <label>Password</label
                ><input class="input" [(ngModel)]="form.password" placeholder="Set password" />
              </div>
            </div>
            <div class="form-actions">
              <button class="btn-primary" (click)="saveStaff('TEACHER')">
                {{ editingId ? 'Update' : 'Add Staff' }}
              </button>
              <button *ngIf="editingId" class="btn-secondary" (click)="cancelEdit()">Cancel</button>
            </div>
          </div>
          <div class="table-card">
            <h3>Teaching Staff ({{ members.length }})</h3>
            <table class="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let s of members; let i = index">
                  <td>{{ i + 1 }}</td>
                  <td class="name-cell">{{ s.name }}</td>
                  <td>
                    <code class="uname">{{ s.username }}</code>
                  </td>
                  <td>{{ s.password }}</td>
                  <td class="actions-cell">
                    <button class="btn-edit" (click)="editMember(s)">✏️ Edit</button
                    ><button class="btn-delete" (click)="deleteMember(s.id)">🗑️ Delete</button>
                  </td>
                </tr>
                <tr *ngIf="members.length === 0">
                  <td colspan="5" class="empty-row">No teaching staff found.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div *ngIf="currentView === 'nonteaching'">
          <h1 class="page-title">🧑‍💼 Non-Teaching Staff</h1>
          <div class="form-card">
            <h3>{{ editingId ? '✏️ Edit Staff' : '➕ Add Non-Teaching Staff' }}</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Full Name</label
                ><input class="input" [(ngModel)]="form.name" placeholder="e.g. Prathap Krishnan" />
              </div>
              <div class="form-group">
                <label>Username</label
                ><input class="input" [(ngModel)]="form.username" placeholder="e.g. PRATHAPK" />
              </div>
              <div class="form-group">
                <label>Password</label
                ><input class="input" [(ngModel)]="form.password" placeholder="Set password" />
              </div>
            </div>
            <div class="form-actions">
              <button class="btn-primary" (click)="saveStaff('NON_TEACHER')">
                {{ editingId ? 'Update' : 'Add Staff' }}
              </button>
              <button *ngIf="editingId" class="btn-secondary" (click)="cancelEdit()">Cancel</button>
            </div>
          </div>
          <div class="table-card">
            <h3>Non-Teaching Staff ({{ members.length }})</h3>
            <table class="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let s of members; let i = index">
                  <td>{{ i + 1 }}</td>
                  <td class="name-cell">{{ s.name }}</td>
                  <td>
                    <code class="uname">{{ s.username }}</code>
                  </td>
                  <td>{{ s.password }}</td>
                  <td class="actions-cell">
                    <button class="btn-edit" (click)="editMember(s)">✏️ Edit</button
                    ><button class="btn-delete" (click)="deleteMember(s.id)">🗑️ Delete</button>
                  </td>
                </tr>
                <tr *ngIf="members.length === 0">
                  <td colspan="5" class="empty-row">No non-teaching staff found.</td>
                </tr>
              </tbody>
            </table>
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
      .admin-layout {
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
      }
      .sidebar-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
      }
      .logo-icon {
        font-size: 28px;
      }
      .logo-text {
        font-size: 20px;
        font-weight: 800;
        color: white;
      }
      .admin-badge {
        background: rgba(248, 113, 113, 0.15);
        border: 1px solid rgba(248, 113, 113, 0.3);
        color: #fca5a5;
        padding: 8px 14px;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 28px;
        text-align: center;
      }
      .sidebar-nav {
        display: flex;
        flex-direction: column;
        gap: 6px;
        flex: 1;
      }
      .nav-item {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.6);
        padding: 12px 14px;
        border-radius: 10px;
        cursor: pointer;
        text-align: left;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s;
        width: 100%;
      }
      .nav-item:hover {
        background: rgba(255, 255, 255, 0.07);
        color: white;
      }
      .nav-item.active {
        background: rgba(124, 58, 237, 0.2);
        color: #a78bfa;
        border: 1px solid rgba(124, 58, 237, 0.3);
      }
      .logout-btn {
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #fca5a5;
        padding: 12px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        margin-top: auto;
        transition: all 0.2s;
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
        font-size: 28px;
        font-weight: 800;
        margin-bottom: 6px;
      }
      .page-sub {
        color: rgba(255, 255, 255, 0.4);
        font-size: 15px;
        margin-bottom: 32px;
      }
      .stat-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 36px;
      }
      .stat-card {
        border-radius: 16px;
        padding: 24px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }
      .stat-card.blue {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1));
      }
      .stat-card.green {
        background: linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.1));
      }
      .stat-card.purple {
        background: linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(124, 58, 237, 0.1));
      }
      .stat-icon {
        font-size: 32px;
        margin-bottom: 10px;
      }
      .stat-num {
        font-size: 36px;
        font-weight: 800;
        color: white;
      }
      .stat-label {
        color: rgba(255, 255, 255, 0.5);
        font-size: 13px;
        margin-top: 4px;
      }
      .section-title {
        color: white;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 16px;
      }
      .action-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      .action-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 14px;
        padding: 20px;
        cursor: pointer;
        transition: all 0.25s;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
        font-weight: 500;
      }
      .action-card:hover {
        background: rgba(124, 58, 237, 0.15);
        border-color: rgba(124, 58, 237, 0.4);
        transform: translateY(-3px);
        color: white;
      }
      .ac-icon {
        font-size: 26px;
      }
      .filter-bar {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 20px 24px;
        margin-bottom: 24px;
        display: flex;
        gap: 32px;
        flex-wrap: wrap;
      }
      .filter-group label {
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
        display: block;
      }
      .btn-group {
        display: flex;
        gap: 8px;
      }
      .filter-btn {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.6);
        padding: 8px 18px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: all 0.2s;
      }
      .filter-btn:hover {
        border-color: rgba(124, 58, 237, 0.5);
        color: white;
      }
      .filter-btn.selected {
        background: rgba(124, 58, 237, 0.3);
        border-color: #7c3aed;
        color: #c4b5fd;
        font-weight: 700;
      }
      .form-card {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        padding: 24px;
        margin-bottom: 24px;
      }
      .form-card h3 {
        color: white;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 18px;
      }
      .form-row {
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
        margin-bottom: 16px;
      }
      .form-group {
        flex: 1;
        min-width: 200px;
      }
      .form-group label {
        display: block;
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 6px;
        text-transform: uppercase;
      }
      .input {
        width: 100%;
        padding: 11px 14px;
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 8px;
        color: white;
        font-size: 14px;
        outline: none;
        transition: all 0.2s;
      }
      .input:focus {
        border-color: #7c3aed;
        background: rgba(124, 58, 237, 0.1);
      }
      .input option {
        background: #1a1d2e;
      }
      .form-actions {
        display: flex;
        gap: 10px;
      }
      .btn-primary {
        background: linear-gradient(135deg, #7c3aed, #2563eb);
        border: none;
        color: white;
        padding: 11px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.2s;
      }
      .btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
      }
      .btn-secondary {
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: rgba(255, 255, 255, 0.7);
        padding: 11px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
      }
      .table-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 14px;
        overflow: hidden;
      }
      .table-card h3 {
        color: white;
        font-size: 15px;
        font-weight: 700;
        padding: 20px 24px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      }
      .data-table {
        width: 100%;
        border-collapse: collapse;
      }
      .data-table th {
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: 12px 20px;
        text-align: left;
      }
      .data-table td {
        padding: 14px 20px;
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }
      .data-table tr:last-child td {
        border-bottom: none;
      }
      .data-table tr:hover td {
        background: rgba(255, 255, 255, 0.03);
      }
      .name-cell {
        font-weight: 600;
        color: white !important;
      }
      .uname {
        background: rgba(124, 58, 237, 0.2);
        color: #c4b5fd;
        padding: 3px 8px;
        border-radius: 5px;
        font-size: 12px;
      }
      .actions-cell {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .btn-edit {
        background: rgba(59, 130, 246, 0.2);
        border: 1px solid rgba(59, 130, 246, 0.3);
        color: #93c5fd;
        padding: 6px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
      }
      .btn-delete {
        background: rgba(239, 68, 68, 0.2);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #fca5a5;
        padding: 6px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
      }
      .empty-row {
        text-align: center;
        color: rgba(255, 255, 255, 0.3);
        padding: 30px !important;
      }
    `,
  ],
})
export class AdminDashboardComponent implements OnInit {
  currentView = 'home';
  members: any[] = [];
  totalStudents = 0;
  totalTeachers = 0;
  totalNonTeachers = 0;
  batches = ['2025-29', '2026-30'];
  courses = ['BCA', 'BBA', 'BCOM'];
  selectedBatch = '2025-29';
  selectedCourse = 'BCA';
  editingId: number | null = null;
  form: any = {
    name: '',
    username: '',
    password: '',
    course: 'BCA',
    batch: '2025-29',
    role: 'STUDENT',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    if (localStorage.getItem('userRole') !== 'ADMIN') {
      this.router.navigate(['/login']);
      return;
    }
    this.loadStats();
  }

  loadStats() {
    // Updated with environment literal
    this.http
      .get<any[]>(`${environment.apiUrl}/api/auth/members?role=STUDENT`)
      .subscribe((d) => (this.totalStudents = d.length));
    this.http
      .get<any[]>(`${environment.apiUrl}/api/auth/members?role=TEACHER`)
      .subscribe((d) => (this.totalTeachers = d.length));
    this.http
      .get<any[]>(`${environment.apiUrl}/api/auth/members?role=NON_TEACHER`)
      .subscribe((d) => (this.totalNonTeachers = d.length));
  }

  loadStudentView() {
    this.currentView = 'students';
    this.resetForm();
    this.loadStudentsByFilter();
  }

  loadStudentsByFilter() {
    // Updated with environment literal
    const url = `${environment.apiUrl}/api/auth/members?role=STUDENT&course=${this.selectedCourse}&batch=${this.selectedBatch}`;
    this.http.get<any[]>(url).subscribe((d) => (this.members = d));
  }

  loadTeachingStaff() {
    this.currentView = 'teaching';
    this.resetForm();
    // Updated with environment literal
    this.http
      .get<any[]>(`${environment.apiUrl}/api/auth/members?role=TEACHER`)
      .subscribe((d) => (this.members = d));
  }

  loadNonTeachingStaff() {
    this.currentView = 'nonteaching';
    this.resetForm();
    // Updated with environment literal
    this.http
      .get<any[]>(`${environment.apiUrl}/api/auth/members?role=NON_TEACHER`)
      .subscribe((d) => (this.members = d));
  }

  saveStudent() {
    const payload = {
      ...this.form,
      role: 'STUDENT',
      course: this.selectedCourse,
      batch: this.selectedBatch,
    };
    this.saveMember(payload, () => this.loadStudentsByFilter());
  }

  saveStaff(role: string) {
    const payload = { ...this.form, role, course: null, batch: null };
    const reload =
      role === 'TEACHER' ? () => this.loadTeachingStaff() : () => this.loadNonTeachingStaff();
    this.saveMember(payload, reload);
  }

  saveMember(payload: any, reload: () => void) {
    if (this.editingId) {
      // Updated with environment literal
      this.http
        .put(`${environment.apiUrl}/api/auth/members/${this.editingId}`, payload)
        .subscribe(() => {
          this.resetForm();
          reload();
          this.loadStats();
        });
    } else {
      // Updated with environment literal
      this.http.post(`${environment.apiUrl}/api/auth/add-member`, payload).subscribe({
        next: () => {
          this.resetForm();
          reload();
          this.loadStats();
        },
        error: (e) => alert(e.error || 'Username already exists!'),
      });
    }
  }

  editMember(m: any) {
    this.editingId = m.id;
    this.form = {
      name: m.name,
      username: m.username,
      password: m.password,
      course: m.course,
      batch: m.batch,
    };
  }

  deleteMember(id: number) {
    if (!confirm('Are you sure you want to delete this member?')) return;
    // Updated with environment literal
    this.http.delete(`${environment.apiUrl}/api/auth/members/${id}`).subscribe(() => {
      this.members = this.members.filter((m) => m.id !== id);
      this.loadStats();
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.editingId = null;
    this.form = {
      name: '',
      username: '',
      password: '',
      course: this.selectedCourse,
      batch: this.selectedBatch,
    };
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
