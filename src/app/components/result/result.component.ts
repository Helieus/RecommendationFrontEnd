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
  destinationId: number = 0; 
  feedbackSubmitted: boolean = false;
  feedbackMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    console.log('ResultComponent ngOnInit called.');
    this.apiService.getRecommendation().subscribe(
      response => {
        console.log("Received Recommendation:", response);
        this.recommendation = response.name || "No recommendations found.";
        this.destinationId = response.id;
      },
      error => {
        console.error("Error fetching recommendation", error);
        this.recommendation = "Error fetching recommendation.";
      }
    );
  }

  /**
   * Called when a feedback button is clicked.
   * Immediately hides the buttons and shows a restart option.
   * @param feedbackId - 1: Like, 2: Dislike
   */
  submitFeedback(feedbackId: number): void {
    // Immediately hide feedback buttons and update UI
    this.feedbackSubmitted = true;
    this.feedbackMessage = "Submitting your feedback...";

    const feedbackDto = {
      DestinationId: this.destinationId,
      FeedbackId: feedbackId
    };

    console.log("Submitting feedback:", feedbackDto);

    this.apiService.submitFeedback(feedbackDto).subscribe(
      response => {
        console.log("Feedback submitted successfully:", response);
        this.feedbackMessage = "Thanks for your feedback! Please restart your session.";
      },
      error => {
        console.error("Error submitting feedback:", error);
        this.feedbackMessage = "Thanks for your feedback! Please restart your session.";

      }
    );
  }

  restartSession(): void {
    this.router.navigate(['/']);
  }
}
