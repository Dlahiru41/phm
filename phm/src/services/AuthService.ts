import { UserRole } from '../types/models';
import { api } from './apiClient';

export interface UserWithDetails {
  userId: string;
  email: string;
  nic: string;
  role: UserRole | string;
  name?: string;
  phoneNumber?: string;
  address?: string;
  languagePreference?: string;
  createdAt?: string;
  phmId?: string;
  areaCode?: string;
  assignedRegion?: string;
  officerId?: string;
  officeLocation?: string;
  jurisdiction?: string;
}

interface LoginResponse {
  token: string;
  user: UserWithDetails;
}

export class AuthService {
  static getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  static async login(usernameOrEmail: string, password: string): Promise<UserWithDetails | null> {
    try {
      const res = await api.post<LoginResponse>('/auth/login', {
        usernameOrEmail: usernameOrEmail.trim(),
        password,
      });
      if (!res?.token || !res?.user) return null;
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('currentUser', JSON.stringify(res.user));
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userRole', res.user.role);
      return res.user;
    } catch {
      return null;
    }
  }

  static async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        await api.post('/auth/logout');
      } catch {
        // ignore
      }
    }
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
  }

  static checkAuth(): boolean {
    return sessionStorage.getItem('isAuthenticated') === 'true' && !!this.getToken();
  }

  static getCurrentUser(): UserWithDetails | null {
    const userStr = sessionStorage.getItem('currentUser');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as UserWithDetails;
    } catch {
      return null;
    }
  }

  static getUserRole(): UserRole | null {
    const user = this.getCurrentUser();
    return user ? (user.role as UserRole) : null;
  }

  static isParent(): boolean {
    return this.getUserRole() === UserRole.PARENT;
  }

  static isPHM(): boolean {
    return this.getUserRole() === UserRole.PHM;
  }

  static isMOH(): boolean {
    return this.getUserRole() === UserRole.MOH_OFFICER;
  }

  static isLoggedIn(): boolean {
    return this.checkAuth();
  }

  static getDashboardPath(): string {
    const role = this.getUserRole();
    switch (role) {
      case UserRole.PARENT:
        return '/parent-dashboard-desktop';
      case UserRole.PHM:
        return '/phm-dashboard';
      case UserRole.MOH_OFFICER:
        return '/moh';
      default:
        return '/';
    }
  }

  static async refreshProfile(): Promise<UserWithDetails | null> {
    try {
      const user = await api.get<UserWithDetails>('/users/me');
      if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    } catch {
      return this.getCurrentUser();
    }
  }
}
