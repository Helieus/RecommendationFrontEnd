import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  recommendation: string = 'Loading...';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getRecommendation().subscribe(response => {
      console.log("Received Recommendation:", response);
      this.recommendation = response.name || "No recommendations found.";
    }, error => {
      console.error("Error fetching recommendation", error);
      this.recommendation = "Error fetching recommendation.";
    });
  }
}
