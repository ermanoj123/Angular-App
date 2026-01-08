import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  editForm: any = {
    email: '',
    firstName: '',
    lastName: ''
  };
  errorMessage = '';
  successMessage = '';
  isLoading = true;
  isEditMode = false;
  isSaving = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.resetEditForm();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load profile', error);
        this.errorMessage = 'Failed to load profile';
        this.isLoading = false;
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.resetEditForm();
      this.errorMessage = '';
      this.successMessage = '';
    }
  }

  resetEditForm(): void {
    if (this.profile) {
      this.editForm = {
        email: this.profile.email || '',
        firstName: this.profile.firstName || '',
        lastName: this.profile.lastName || ''
      };
    }
  }

  saveProfile(): void {
    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.updateProfile(this.editForm).subscribe({
      next: (updatedProfile) => {
        this.profile = updatedProfile;
        this.successMessage = 'Profile updated successfully!';
        this.isEditMode = false;
        this.isSaving = false;

        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Failed to update profile', error);
        this.errorMessage = 'Failed to update profile. Email might be already taken.';
        this.isSaving = false;
      }
    });
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.resetEditForm();
    this.errorMessage = '';
    this.successMessage = '';
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
