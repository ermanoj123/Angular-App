import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { DashboardData } from '../../models/dashboard.model';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    dashboardData: DashboardData | null = null;
    isLoading = true;
    errorMessage = '';

    constructor(
        private dashboardService: DashboardService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadDashboardData();
    }

    loadDashboardData(): void {
        this.isLoading = true;
        this.errorMessage = '';

        this.dashboardService.getDashboardData().subscribe({
            next: (data) => {
                this.dashboardData = data;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading dashboard data', error);
                // Enhanced error message for debugging
                if (error.status === 0) {
                    this.errorMessage = 'Network error: Cannot reach the backend. Is it running?';
                } else if (error.status === 401) {
                    this.errorMessage = 'Unauthorized: Please login again.';
                } else {
                    this.errorMessage = `Error ${error.status}: ${error.statusText || 'Unknown error'} - ${JSON.stringify(error.error)}`;
                }
                this.isLoading = false;
            }
        });
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    get fullName(): string {
        if (!this.dashboardData?.user) return '';
        const { firstName, lastName } = this.dashboardData.user;
        if (firstName && lastName) {
            return `${firstName} ${lastName}`;
        }
        return firstName || lastName || this.dashboardData.user.username;
    }

    get accountAge(): string {
        if (!this.dashboardData?.stats) return '0 days';
        const days = this.dashboardData.stats.accountAgeDays;
        if (days === 0) return 'Today';
        if (days === 1) return '1 day';
        return `${days} days`;
    }

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}
