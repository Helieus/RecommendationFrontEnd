import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  // Your user preferences model (numeric values from the form)
  userPreferences: any = {
    budgetLevelId: null,
    transportModeId: null,
    preferredDestinationTypeId: null,
    preferredActivitiesId: null,
    preferredAccommodationId: null,
    cuisineImportanceId: null,
    tourismStyleId: null,
    tripDurationId: null,
    travelGroupId: null,
    sceneryVibeId: null
  };

  sessionId: string = '';

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sessionId = this.stateService.getSession() || '';
    if (!this.sessionId) {
      this.apiService.startSession().subscribe(response => {
        this.sessionId = response.sessionId;
        this.stateService.setSession(this.sessionId);
        console.log("New session started:", this.sessionId);
      });
    }
  }

  submit(): void {
    // Transform the answer keys to match the PascalCase names expected by the API
    const transformedAnswers = {
      BudgetLevelId: this.userPreferences.budgetLevelId,
      TransportModeId: this.userPreferences.transportModeId,
      PreferredDestinationTypeId: this.userPreferences.preferredDestinationTypeId,
      PreferredActivitiesId: this.userPreferences.preferredActivitiesId,
      PreferredAccommodationId: this.userPreferences.preferredAccommodationId,
      CuisineImportanceId: this.userPreferences.cuisineImportanceId,
      TourismStyleId: this.userPreferences.tourismStyleId,
      TripDurationId: this.userPreferences.tripDurationId,
      TravelGroupId: this.userPreferences.travelGroupId,
      SceneryVibeId: this.userPreferences.sceneryVibeId
    };

    const payload = { userAnswers: transformedAnswers };

    console.log("Submitting payload:", payload);

    this.apiService.submitAnswers(payload).subscribe(
      response => {
        console.log("Answers submitted successfully:", response);
        // After submission, navigate to the result page
        this.router.navigate(['/result']);
      },
      error => {
        console.error("Error submitting answers:", error);
      }
    );
  }
}
