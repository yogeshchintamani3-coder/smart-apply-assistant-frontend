import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { ResumeUploadComponent } from './components/resume-upload/resume-upload.component';
import { AiTailoringComponent } from './components/ai-tailoring/ai-tailoring.component';
import { JobMatchingComponent } from './components/job-matching/job-matching.component';
import { ApplicationTrackerComponent } from './components/application-tracker/application-tracker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PreferencesComponent, ResumeUploadComponent, AiTailoringComponent, JobMatchingComponent, ApplicationTrackerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smart Apply Assistant';
}
