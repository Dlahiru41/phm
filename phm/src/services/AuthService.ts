import { UserRole } from '../types/models';
import { api } from './apiClient';

export interface UserWithDetails {
  userId: string;
  email: string;
  nic: string;
  role: UserRole | string;
  firstLogin?: boolean;
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
  firstLogin?: boolean;
}

export class AuthService {
  static getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  private static setFirstLogin(value: boolean): void {
    if (value) {
      sessionStorage.setItem('firstLogin', 'true');
    } else {
      sessionStorage.removeItem('firstLogin');
    }
  }

  static getFirstLogin(): boolean {
    return sessionStorage.getItem('firstLogin') === 'true';
  }

  static async login(usernameOrEmail: string, password: string): Promise<UserWithDetails | null> {
    try {
      const res = await api.post<LoginResponse>('/auth/login', {
        usernameOrEmail: usernameOrEmail.trim(),
        password,
      });
      if (!res?.token || !res?.user) return null;
      this.setFirstLogin(!!res.firstLogin);
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
    this.setFirstLogin(false);
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

  static async changePassword(oldPassword: string, newPassword: string, confirmPassword: string): Promise<void> {
    await api.post<void>('/auth/change-password', {
      oldPassword,
      newPassword,
      confirmPassword,
    });
    this.setFirstLogin(false);
    sessionStorage.setItem('passwordChanged', 'true');
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

  static isAdmin(): boolean {
    return this.getUserRole() === UserRole.ADMIN;
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
      case UserRole.ADMIN:
        return '/admin';
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

  static async updateProfile(data: Partial<UserWithDetails>): Promise<void> {
    await api.put('/users/me', data);
  }

  static async forgotPassword(email: string): Promise<{ message: string } | null> {
    try {
      const res = await api.post<{ message: string }>('/auth/forgot-password', { email });
      return res;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to send OTP. Please try again.');
    }
  }

  static async resetPassword(email: string, otpCode: string, newPassword: string, confirmPassword: string): Promise<{ message: string } | null> {
    try {
      const res = await api.post<{ message: string }>('/auth/reset-password', {
        email,
        otpCode,
        newPassword,
        confirmPassword,
      });
      return res;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to reset password. Please try again.');
    }
  }
}
