import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChangePasswordRequest } from '../../models/user.model';

@Component({
    selector: 'app-change-password',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
    passwordData: ChangePasswordRequest = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    isLoading = false;
    errorMessage = '';
    successMessage = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onSubmit(): void {
        if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
            this.errorMessage = 'New password and confirm password do not match.';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';

        this.authService.changePassword(this.passwordData).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.successMessage = 'Password changed successfully.';
                this.passwordData = {
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                };
                setTimeout(() => this.router.navigate(['/dashboard']), 2000);
            },
            error: (error) => {
                this.isLoading = false;
                this.errorMessage = error.error?.message || 'An error occurred during password change.';
            }
        });
    }
}
