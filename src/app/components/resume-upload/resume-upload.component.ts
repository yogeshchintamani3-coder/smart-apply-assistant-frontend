import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-upload.component.html',
  styleUrls: ['./resume-upload.component.css']
})
export class ResumeUploadComponent implements OnInit {
  resumes: any[] = [];
  isUploading = false;
  uploadSuccess = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadResumes();
  }

  loadResumes(): void {
    this.apiService.getResumes().subscribe({
      next: (data) => this.resumes = data,
      error: (err) => console.error('Error loading resumes', err)
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.isUploading = true;
      this.uploadSuccess = '';
      this.apiService.uploadResume(file).subscribe({
        next: (data) => {
          this.isUploading = false;
          this.uploadSuccess = 'Resume uploaded successfully!';
          this.resumes.push(data);
          setTimeout(() => this.uploadSuccess = '', 3000);
        },
        error: (err) => {
          this.isUploading = false;
          console.error('Upload error', err);
        }
      });
    }
  }
}
