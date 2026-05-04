import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ai-tailoring',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-tailoring.component.html',
  styleUrls: ['./ai-tailoring.component.css']
})
export class AiTailoringComponent implements OnInit {
  resumes: any[] = [];
  selectedResumeId: number | null = null;
  jobDescription: string = '';
  
  isGeneratingResume = false;
  isGeneratingCoverLetter = false;
  
  tailoredResumeResult: string = '';
  coverLetterResult: string = '';
  errorMsg: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getResumes().subscribe({
      next: (data) => this.resumes = data,
      error: (err) => console.error('Error fetching resumes', err)
    });
  }

  generateTailoredResume(): void {
    if (!this.selectedResumeId || !this.jobDescription) {
      this.errorMsg = 'Please select a resume and provide a job description.';
      return;
    }
    
    this.errorMsg = '';
    this.isGeneratingResume = true;
    this.tailoredResumeResult = '';

    this.apiService.tailorResume(this.selectedResumeId, this.jobDescription).subscribe({
      next: (res) => {
        this.tailoredResumeResult = res.result;
        this.isGeneratingResume = false;
      },
      error: (err) => {
        this.errorMsg = 'Error tailoring resume.';
        this.isGeneratingResume = false;
        console.error(err);
      }
    });
  }

  generateCoverLetter(): void {
    if (!this.selectedResumeId || !this.jobDescription) {
      this.errorMsg = 'Please select a resume and provide a job description.';
      return;
    }
    
    this.errorMsg = '';
    this.isGeneratingCoverLetter = true;
    this.coverLetterResult = '';

    this.apiService.generateCoverLetter(this.selectedResumeId, this.jobDescription).subscribe({
      next: (res) => {
        this.coverLetterResult = res.result;
        this.isGeneratingCoverLetter = false;
      },
      error: (err) => {
        this.errorMsg = 'Error generating cover letter.';
        this.isGeneratingCoverLetter = false;
        console.error(err);
      }
    });
  }
}
