import { User, UserRole, Parent, PHM, MOHOfficer } from '../types/models';

// Hardcoded credentials for development
// Three user roles: Parent, PHM (Midwife), and MOH (Ministry of Health)
const HARDCODED_CREDENTIALS = {
  parent: {
    userId: 'user-parent-001',
    username: 'parent',
    password: 'parent123',
    email: 'parent@ncvms.gov.lk',
    nic: '987654321V',
    passwordHash: 'hashed_parent123',
    role: UserRole.PARENT,
    languagePreference: 'en',
    createdAt: new Date('2023-01-01'),
    phoneNumber: '+94771234567',
    address: '123 Main Street, Colombo',
    name: 'Amara Perera'
  },
  phm: {
    userId: 'user-phm-001',
    username: 'phm',
    password: 'phm123',
    email: 'phm@ncvms.gov.lk',
    nic: '123456789V',
    passwordHash: 'hashed_phm123',
    role: UserRole.PHM,
    languagePreference: 'en',
    createdAt: new Date('2023-01-01'),
    phmId: 'phm-001',
    areaCode: 'COL-01',
    assignedRegion: 'Colombo West',
    name: 'Dr. Perera'
  },
  moh: {
    userId: 'user-moh-001',
    username: 'moh',
    password: 'moh123',
    email: 'moh@ncvms.gov.lk',
    nic: '555555555V',
    passwordHash: 'hashed_moh123',
    role: UserRole.MOH_OFFICER,
    languagePreference: 'en',
    createdAt: new Date('2023-01-01'),
    officerId: 'moh-001',
    officeLocation: 'Colombo MOH Office',
    jurisdiction: 'Western Province',
    name: 'Dr. Silva'
  }
};

// Extended User interface for frontend use
export interface UserWithDetails extends User {
  username?: string;
  name?: string;
  phoneNumber?: string;
  address?: string;
  phmId?: string;
  areaCode?: string;
  assignedRegion?: string;
  officerId?: string;
  officeLocation?: string;
  jurisdiction?: string;
}

export class AuthService {
  private static isAuthenticated: boolean = false;
  private static currentUser: UserWithDetails | null = null;

  static login(usernameOrEmail: string, password: string): UserWithDetails | null {
    // Check against all user credentials
    for (const [role, creds] of Object.entries(HARDCODED_CREDENTIALS)) {
      const isValid = 
        (usernameOrEmail === creds.username || 
         usernameOrEmail === creds.email ||
         usernameOrEmail === creds.nic) &&
        password === creds.password;

      if (isValid) {
        this.isAuthenticated = true;
        this.currentUser = {
          ...creds,
          username: creds.username,
          name: creds.name
        };
        
        // Store in sessionStorage
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        sessionStorage.setItem('userRole', creds.role);
        
        return this.currentUser;
      }
    }

    return null;
  }

  static logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userRole');
  }

  static checkAuth(): boolean {
    // Check sessionStorage first
    const stored = sessionStorage.getItem('isAuthenticated');
    if (stored === 'true') {
      this.isAuthenticated = true;
      const userStr = sessionStorage.getItem('currentUser');
      if (userStr) {
        try {
          this.currentUser = JSON.parse(userStr);
        } catch (e) {
          // Handle parse error
        }
      }
      return true;
    }
    return this.isAuthenticated;
  }

  static getCurrentUser(): UserWithDetails | null {
    if (this.currentUser) {
      return this.currentUser;
    }
    const userStr = sessionStorage.getItem('currentUser');
    if (userStr) {
      try {
        const parsed = JSON.parse(userStr);
        // Convert date strings back to Date objects
        if (parsed.createdAt) {
          parsed.createdAt = new Date(parsed.createdAt);
        }
        return parsed;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  static getUserRole(): UserRole | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
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
      case 'parent':
        return '/parent-dashboard-desktop';
      case 'phm':
        return '/phm-dashboard';
      case 'moh':
        return '/moh-analytics-dashboard';
      default:
        return '/';
    }
  }
}
