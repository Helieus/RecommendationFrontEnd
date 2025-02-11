import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://localhost:5253/api'; // Base URL for backend

  constructor(private http: HttpClient) {}

  /** 🔹 Start a new user session */
  startSession(): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/Session/start`, {withCredentials: true});
  }

  /** 🔹 Submit user answers */
  submitAnswers(userData: any): Observable<any> {
    console.log("Submitting user answers:", userData);
    return this.http.post<any>(`${this.BASE_URL}/Recommendation/submit-answers`, userData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    
  }

  /** 🔹 Fetch recommendation */
  getRecommendation(): Observable<any> {
    console.log("Fetching recommendation...");
    return this.http.get<any>(`${this.BASE_URL}/Recommendation/recommend`, {withCredentials: true});
  }

  /** 🔹 Submit user feedback */
  submitFeedback(feedback: any): Observable<any> {
    console.log("Submitting feedback:", feedback);
    return this.http.post<any>(`${this.BASE_URL}/Feedback/submit`, feedback, {withCredentials: true});
  }

  /** 🔹 Restart session */
  restartSession(): Observable<any> {
    console.log("Restarting session...");
    return this.http.post<any>(`${this.BASE_URL}/Feedback/restart`, {});
  }
}
