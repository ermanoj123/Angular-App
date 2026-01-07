export interface DashboardData {
    user: UserInfo;
    stats: UserStats;
}

export interface UserInfo {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

export interface UserStats {
    lastLogin: Date;
    accountCreated: Date;
    accountAgeDays: number;
    isActive: boolean;
}
