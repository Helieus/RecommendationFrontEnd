import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoading = false;

  constructor(private router: Router, private apiService: ApiService, private stateService: StateService) {}

  start() {
    this.isLoading = true;
    this.apiService.startSession().subscribe(session => {
      console.log("Session Started:", session);
      this.stateService.setSession(session.sessionId);
      this.isLoading = false;
      this.router.navigate(['/questions']);
    }, error => {
      console.error("Error starting session", error);
      this.isLoading = false;
    });
  }
}
