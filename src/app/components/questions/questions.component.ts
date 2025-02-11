import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  userPreferences: any = {}; // Store user responses

  /** 🔹 Mapping human-readable choices to numerical values for the database */
  optionsMapping: any = {
    budgetLevel: { "Cheap": 1, "Mid": 2, "Luxury": 3 },
    destinationType: { "Island": 1, "City": 2, "Mountain": 3 },
    activities: { "Hiking": 1, "Nightlife": 2, "Sightseeing": 3 },
    accommodationType: { "Budget": 1, "Mid-range": 2, "Luxury": 3 },
    cuisineImportance: { "Somewhat": 1, "Very": 2 },
    tourismStyle: { "Quiet": 1, "Lively": 2 },
    tripDuration: { "Short": 1, "Medium": 2, "Long": 3 },
    travelGroup: { "Solo": 1, "Family": 2, "Friends": 3 },
    sceneryVibe: { "Beaches": 1, "Mountains": 2, "Urban": 3 }
  };

  /** 🔹 Questions with human-readable choices */
  questions = [
    { label: "What is your budget level?", key: "budgetLevel", options: ["Cheap", "Mid", "Luxury"] },
    { label: "Preferred Destination Type?", key: "destinationType", options: ["Island", "City", "Mountain"] },
    { label: "Preferred Activities?", key: "activities", options: ["Hiking", "Nightlife", "Sightseeing"] },
    { label: "Accommodation Type?", key: "accommodationType", options: ["Budget", "Mid-range", "Luxury"] },
    { label: "Cuisine Importance?", key: "cuisineImportance", options: ["Somewhat", "Very"] },
    { label: "Tourism Style?", key: "tourismStyle", options: ["Quiet", "Lively"] },
    { label: "Trip Duration?", key: "tripDuration", options: ["Short", "Medium", "Long"] },
    { label: "Travel Group?", key: "travelGroup", options: ["Solo", "Family", "Friends"] },
    { label: "Scenery Preference?", key: "sceneryVibe", options: ["Beaches", "Mountains", "Urban"] }
  ];

  constructor(private router: Router, private apiService: ApiService, private stateService: StateService) {}

  /** 🔹 Submitting User Answers */
  submit() {
    const sessionId = this.stateService.getSession();
    if (!sessionId) {
      console.error("No session found!");
      return;
    }

    // Convert user selections to numerical values before submitting
    const formattedData: any = { sessionId };
    for (let key in this.userPreferences) {
      formattedData[key + "Id"] = this.optionsMapping[key][this.userPreferences[key]];
    }

    console.log("Submitting answers:", formattedData);

    this.apiService.submitAnswers(formattedData).subscribe(response => {
      console.log("Submitted successfully:", response);
      this.router.navigate(['/result']);
    }, error => {
      console.error("Error submitting answers", error);
    });
  }
}
