import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Preferences
  getPreferences(): Observable<any> {
    return this.http.get(`${this.baseUrl}/preferences`);
  }

  updatePreferences(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/preferences`, data);
  }

  // Resumes
  getResumes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/resumes`);
  }

  uploadResume(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/resumes/upload`, formData);
  }

  // AI Customization
  tailorResume(resumeId: number, jobDescription: string): Observable<{result: string}> {
    return this.http.post<{result: string}>(`${this.baseUrl}/ai/tailor-resume`, { resumeId, jobDescription });
  }

  generateCoverLetter(resumeId: number, jobDescription: string): Observable<{result: string}> {
    return this.http.post<{result: string}>(`${this.baseUrl}/ai/cover-letter`, { resumeId, jobDescription });
  }

  // Jobs
  getMatchingJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/jobs/match`);
  }

  autoApply(job: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/jobs/apply`, job, { responseType: 'text' });
  }

  // Tracker
  getTrackedApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tracker`);
  }
}
