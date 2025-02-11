import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  recommendation: string = 'Loading...';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // Call the API to get the recommendation.
    // The session cookie (set when starting the session/submitting answers) is sent automatically.
    this.apiService.getRecommendation().subscribe(
      response => {
        console.log("Received Recommendation:", response);
        // Assuming your API returns an object with a 'name' property
        this.recommendation = response.name || "No recommendations found.";
      },
      error => {
        console.error("Error fetching recommendation", error);
        this.recommendation = "Error fetching recommendation.";
      }
    );
  }
}
