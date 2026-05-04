import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-job-matching',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-matching.component.html',
  styleUrls: ['./job-matching.component.css']
})
export class JobMatchingComponent implements OnInit {
  jobs: any[] = [];
  isLoading = false;
  applyingTo: Set<number> = new Set();
  appliedTo: Set<number> = new Set();
  applicationMessage = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Optionally load jobs on init
  }

  fetchJobs(): void {
    this.isLoading = true;
    this.apiService.getMatchingJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching jobs', err);
        this.isLoading = false;
      }
    });
  }

  autoApply(job: any, index: number): void {
    this.applyingTo.add(index);
    this.apiService.autoApply(job).subscribe({
      next: (response) => {
        this.applyingTo.delete(index);
        this.appliedTo.add(index);
        this.applicationMessage = response;
        setTimeout(() => this.applicationMessage = '', 4000);
      },
      error: (err) => {
        this.applyingTo.delete(index);
        console.error('Apply error', err);
      }
    });
  }
}
