import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  // Prepopulate with default valid values (assuming 1 is valid for all)
  userPreferences: any = {
    budgetLevelId: 1,
    transportModeId: 1,
    preferredDestinationTypeId: 1,
    preferredActivitiesId: 1,
    preferredAccommodationId: 1,
    cuisineImportanceId: 1,
    tourismStyleId: 1,
    tripDurationId: 1,
    travelGroupId: 1,
    sceneryVibeId: 1
  };

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // Log the initial default values for debugging.
    console.log('Initial user preferences:', this.userPreferences);
  }

  submit(): void {
    // Log the userPreferences from the form
    console.log('Submitting with user preferences:', this.userPreferences);

    // Force numeric conversion to be sure they are numbers.
    const transformedAnswers = {
      BudgetLevelId: Number(this.userPreferences.budgetLevelId),
      TransportModeId: Number(this.userPreferences.transportModeId),
      PreferredDestinationTypeId: Number(this.userPreferences.preferredDestinationTypeId),
      PreferredActivitiesId: Number(this.userPreferences.preferredActivitiesId),
      PreferredAccommodationId: Number(this.userPreferences.preferredAccommodationId),
      CuisineImportanceId: Number(this.userPreferences.cuisineImportanceId),
      TourismStyleId: Number(this.userPreferences.tourismStyleId),
      TripDurationId: Number(this.userPreferences.tripDurationId),
      TravelGroupId: Number(this.userPreferences.travelGroupId),
      SceneryVibeId: Number(this.userPreferences.sceneryVibeId)
    };

    // Log the final payload
    console.log("Submitting payload:", transformedAnswers);

    // Send the payload directly (without wrapping in a "userAnswers" property)
    const payload = transformedAnswers;

    this.apiService.submitAnswers(payload).subscribe(
      response => {
        console.log("Answers submitted successfully:", response);
        console.log("Navigating to /result");
        this.router.navigate(['/result']);
      },
      error => {
        console.error("Error submitting answers:", error);
        this.router.navigate(['/result']);
      }
    );
  }
}
