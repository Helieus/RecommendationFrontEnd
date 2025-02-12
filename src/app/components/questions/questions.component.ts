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
    // For testing purposes, override with hard-coded values (all 1)
    const hardCodedAnswers = {
      BudgetLevelId: 1,
      TransportModeId: 1,
      PreferredDestinationTypeId: 1,
      PreferredActivitiesId: 1,
      PreferredAccommodationId: 1,
      CuisineImportanceId: 1,
      TourismStyleId: 1,
      TripDurationId: 1,
      TravelGroupId: 1,
      SceneryVibeId: 1
    };

    // Log the hard-coded values
    console.log('Submitting with hard-coded values:', hardCodedAnswers);

    // Force numeric conversion to be sure they are numbers.
    const transformedAnswers = {
      BudgetLevelId: Number(hardCodedAnswers.BudgetLevelId),
      TransportModeId: Number(hardCodedAnswers.TransportModeId),
      PreferredDestinationTypeId: Number(hardCodedAnswers.PreferredDestinationTypeId),
      PreferredActivitiesId: Number(hardCodedAnswers.PreferredActivitiesId),
      PreferredAccommodationId: Number(hardCodedAnswers.PreferredAccommodationId),
      CuisineImportanceId: Number(hardCodedAnswers.CuisineImportanceId),
      TourismStyleId: Number(hardCodedAnswers.TourismStyleId),
      TripDurationId: Number(hardCodedAnswers.TripDurationId),
      TravelGroupId: Number(hardCodedAnswers.TravelGroupId),
      SceneryVibeId: Number(hardCodedAnswers.SceneryVibeId)
    };

    // IMPORTANT: Send the payload directly (do not wrap it in a "userAnswers" property)
    const payload = transformedAnswers;

    // Log the payload to be submitted
    console.log("Submitting payload:", payload);

    this.apiService.submitAnswers(payload).subscribe(
      response => {
        console.log("Answers submitted successfully:", response);
        this.router.navigate(['/result']);
      },
      error => {
        console.error("Error submitting answers:", error);
      }
    );
  }
}
