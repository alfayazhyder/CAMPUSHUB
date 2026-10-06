import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="login-page">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
      <div class="login-container">
        <div class="logo-area">
          <div class="logo-icon">🎓</div>
          <h1 class="logo-title">CampusHub</h1>
          <p class="logo-subtitle">Your complete college companion</p>
        </div>
        <div *ngIf="!selectedRole" class="role-section">
          <p class="role-label">Login as</p>
          <div class="role-cards">
            <button class="role-card student-card" (click)="selectRole('STUDENT')">
              <span class="role-icon">🎒</span>
              <span class="role-name">Student</span>
              <span class="role-desc">View your academic records</span>
            </button>
            <button class="role-card staff-card" (click)="selectRole('STAFF')">
              <span class="role-icon">👩‍🏫</span>
              <span class="role-name">Staff</span>
              <span class="role-desc">Manage student data</span>
            </button>
            <button class="role-card admin-card" (click)="selectRole('ADMIN')">
              <span class="role-icon">🛠️</span>
              <span class="role-name">Admin</span>
              <span class="role-desc">Full system control</span>
            </button>
          </div>
        </div>
        <div *ngIf="selectedRole" class="form-section">
          <div class="back-btn-row">
            <button class="back-btn" (click)="selectedRole = ''">← Back</button>
            <div class="selected-role-badge" [ngClass]="selectedRole.toLowerCase() + '-badge'">
              {{
                selectedRole === 'STAFF'
                  ? '👩‍🏫 Staff Login'
                  : selectedRole === 'ADMIN'
                    ? '🛠️ Admin Login'
                    : '🎒 Student Login'
              }}
            </div>
          </div>
          <div class="input-group">
            <label>Username</label>
            <input
              type="text"
              [(ngModel)]="username"
              placeholder="{{
                selectedRole === 'STUDENT' ? 'e.g. ALFAYAZ202529BCA01' : 'Enter username'
              }}"
              class="form-input"
              (keyup.enter)="onLogin()"
            />
          </div>
          <div class="input-group">
            <label>Password</label>
            <input
              type="password"
              [(ngModel)]="password"
              placeholder="Enter your password"
              class="form-input"
              (keyup.enter)="onLogin()"
            />
          </div>
          <div *ngIf="errorMessage" class="error-msg">⚠️ {{ errorMessage }}</div>
          <button
            class="login-btn"
            [class.loading]="isLoading"
            (click)="onLogin()"
            [disabled]="isLoading"
          >
            <span *ngIf="!isLoading">Login →</span>
            <span *ngIf="isLoading" class="spinner">⟳</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      .login-page {
        min-height: 100vh;
        background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', sans-serif;
        position: relative;
        overflow: hidden;
      }
      .blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.25;
        animation: float 8s ease-in-out infinite;
      }
      .blob-1 {
        width: 400px;
        height: 400px;
        background: #6c63ff;
        top: -100px;
        left: -100px;
        animation-delay: 0s;
      }
      .blob-2 {
        width: 300px;
        height: 300px;
        background: #f72585;
        bottom: -50px;
        right: -80px;
        animation-delay: 2s;
      }
      .blob-3 {
        width: 250px;
        height: 250px;
        background: #4cc9f0;
        top: 50%;
        left: 60%;
        animation-delay: 4s;
      }
      @keyframes float {
        0%,
        100% {
          transform: translateY(0px) scale(1);
        }
        50% {
          transform: translateY(-30px) scale(1.05);
        }
      }
      .login-container {
        background: rgba(255, 255, 255, 0.06);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 24px;
        padding: 48px 40px;
        width: 100%;
        max-width: 480px;
        box-shadow: 0 32px 80px rgba(0, 0, 0, 0.4);
        position: relative;
        z-index: 10;
      }
      .logo-area {
        text-align: center;
        margin-bottom: 36px;
      }
      .logo-icon {
        font-size: 52px;
        margin-bottom: 10px;
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0%,
        100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
      }
      .logo-title {
        font-size: 32px;
        font-weight: 800;
        background: linear-gradient(135deg, #a78bfa, #60a5fa);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .logo-subtitle {
        color: rgba(255, 255, 255, 0.55);
        font-size: 14px;
        margin-top: 6px;
      }
      .role-label {
        color: rgba(255, 255, 255, 0.7);
        text-align: center;
        margin-bottom: 20px;
        font-size: 15px;
        font-weight: 500;
      }
      .role-cards {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .role-card {
        display: flex;
        align-items: center;
        gap: 16px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 14px;
        padding: 18px 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: left;
        width: 100%;
      }
      .role-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
      }
      .student-card:hover {
        border-color: #60a5fa;
        background: rgba(96, 165, 250, 0.1);
      }
      .staff-card:hover {
        border-color: #34d399;
        background: rgba(52, 211, 153, 0.1);
      }
      .admin-card:hover {
        border-color: #f87171;
        background: rgba(248, 113, 113, 0.1);
      }
      .role-icon {
        font-size: 28px;
      }
      .role-name {
        display: block;
        color: white;
        font-weight: 700;
        font-size: 16px;
      }
      .role-desc {
        display: block;
        color: rgba(255, 255, 255, 0.45);
        font-size: 12px;
        margin-top: 2px;
      }
      .back-btn-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 28px;
      }
      .back-btn {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        font-size: 14px;
        padding: 0;
        font-family: 'Inter', sans-serif;
        transition: color 0.2s;
      }
      .back-btn:hover {
        color: white;
      }
      .selected-role-badge {
        font-size: 13px;
        font-weight: 600;
        padding: 6px 14px;
        border-radius: 20px;
      }
      .student-badge {
        background: rgba(96, 165, 250, 0.2);
        color: #93c5fd;
        border: 1px solid rgba(96, 165, 250, 0.3);
      }
      .staff-badge {
        background: rgba(52, 211, 153, 0.2);
        color: #6ee7b7;
        border: 1px solid rgba(52, 211, 153, 0.3);
      }
      .admin-badge {
        background: rgba(248, 113, 113, 0.2);
        color: #fca5a5;
        border: 1px solid rgba(248, 113, 113, 0.3);
      }
      .input-group {
        margin-bottom: 20px;
      }
      .input-group label {
        display: block;
        color: rgba(255, 255, 255, 0.7);
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 8px;
      }
      .form-input {
        width: 100%;
        padding: 14px 16px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 10px;
        color: white;
        font-size: 15px;
        font-family: 'Inter', sans-serif;
        outline: none;
        transition: all 0.3s ease;
      }
      .form-input::placeholder {
        color: rgba(255, 255, 255, 0.3);
      }
      .form-input:focus {
        border-color: #a78bfa;
        background: rgba(167, 139, 250, 0.1);
        box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.15);
      }
      .error-msg {
        background: rgba(248, 113, 113, 0.15);
        border: 1px solid rgba(248, 113, 113, 0.3);
        color: #fca5a5;
        padding: 12px 16px;
        border-radius: 10px;
        font-size: 14px;
        margin-bottom: 20px;
      }
      .login-btn {
        width: 100%;
        padding: 15px;
        background: linear-gradient(135deg, #7c3aed, #2563eb);
        border: none;
        border-radius: 12px;
        color: white;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Inter', sans-serif;
        letter-spacing: 0.5px;
      }
      .login-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 12px 30px rgba(124, 58, 237, 0.4);
      }
      .login-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
      .spinner {
        display: inline-block;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoginComponent {
  selectedRole = '';
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  selectRole(role: string) {
    this.selectedRole = role;
    this.username = '';
    this.password = '';
    this.errorMessage = '';
  }

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    const loginData = { username: this.username.toUpperCase().trim(), password: this.password };

    // Updated with environment template literal
    this.http.post<any>(`${environment.apiUrl}/api/auth/login`, loginData).subscribe({
      next: (user) => {
        this.isLoading = false;
        localStorage.setItem('userId', String(user.id));
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userUsername', user.username);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userCourse', user.course ?? '');
        localStorage.setItem('userBatch', user.batch ?? '');

        if (user.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (user.role === 'TEACHER' || user.role === 'NON_TEACHER') {
          this.router.navigate(['/staff']);
        } else if (user.role === 'STUDENT') {
          this.router.navigate(['/student']);
        } else {
          this.errorMessage = 'Unknown role. Please contact admin.';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Invalid username or password. Please try again.';
      },
    });
  }
}
