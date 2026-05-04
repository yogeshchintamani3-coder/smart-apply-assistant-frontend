import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  prefForm: FormGroup;
  isSaving = false;
  successMessage = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.prefForm = this.fb.group({
      roles: ['', Validators.required],
      locations: ['', Validators.required],
      experienceLevel: [''],
      jobTypes: [''],
      naukriEmail: ['', [Validators.email]],
      naukriPassword: [''],
      autoApplyEnabled: [false]
    });
  }

  ngOnInit(): void {
    this.loadPreferences();
  }

  loadPreferences(): void {
    this.apiService.getPreferences().subscribe({
      next: (data) => {
        if (data) {
          this.prefForm.patchValue({
            roles: data.roles || '',
            locations: data.locations || '',
            experienceLevel: data.experienceLevel || '',
            jobTypes: data.jobTypes || '',
            naukriEmail: data.naukriEmail || '',
            naukriPassword: data.naukriPassword || '',
            autoApplyEnabled: data.autoApplyEnabled || false
          });
        }
      },
      error: (err) => console.error('Error loading preferences', err)
    });
  }

  savePreferences(): void {
    if (this.prefForm.valid) {
      this.isSaving = true;
      this.successMessage = '';
      this.apiService.updatePreferences(this.prefForm.value).subscribe({
        next: () => {
          this.isSaving = false;
          this.successMessage = 'Preferences saved successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.isSaving = false;
          console.error('Error saving preferences', err);
        }
      });
    }
  }
}
