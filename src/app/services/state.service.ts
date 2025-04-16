import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private sessionId: string | null = null;
  private userPreferencesSubject = new BehaviorSubject<any>(null);
  userPreferences$ = this.userPreferencesSubject.asObservable();

  constructor() {}

  setSession(sessionId: string) {
    this.sessionId = sessionId;
    console.log("Session ID Set:", this.sessionId);
  }

  getSession(): string | null {
    return this.sessionId;
  }

  setUserPreferences(preferences: any) {
    const fullPreferences = { sessionId: this.sessionId, ...preferences };
    this.userPreferencesSubject.next(fullPreferences);
  }

  getUserPreferences(): any {
    return this.userPreferencesSubject.getValue();
  }
}
