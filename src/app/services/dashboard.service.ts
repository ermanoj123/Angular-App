import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardData, UserStats } from '../models/dashboard.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private apiUrl = `${environment.apiUrl}/dashboard`;

    constructor(private http: HttpClient) { }

    getDashboardData(): Observable<DashboardData> {
        return this.http.get<DashboardData>(this.apiUrl);
    }

    getUserStats(): Observable<UserStats> {
        return this.http.get<UserStats>(`${this.apiUrl}/stats`);
    }
}
