import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ================= GENERAL CRUD (Canteen, Notice) =================
  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  deleteData(endpoint: string, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}/${id}`);
  }

  // ================= ACADEMIC DATA ENGINE =================
  getCohortRecords(course: string, batch: string): Observable<any[]> {
    let params = new HttpParams().set('course', course).set('batch', batch);
    return this.http.get<any[]>(`${this.baseUrl}/api/academic/cohort`, { params });
  }

  getStudentRecords(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/academic/student/${username}`);
  }

  saveAcademicRecord(record: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/academic/save`, record);
  }

  deleteAcademicRecord(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/academic/delete/${id}`, { responseType: 'text' });
  }
}
