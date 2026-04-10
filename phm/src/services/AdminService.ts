import { api } from './apiClient';

export interface MohAccountCreatePayload {
  employeeId: string;
  name: string;
  nic: string;
  email: string;
  phoneNumber: string;
  assignedArea: string;
}

export interface MohAccountCreateResponse {
  message: string;
  mohUserId: string;
  email: string;
  tempPassword: string;
  maskedDestination: string;
  firstLogin: boolean;
}

export class AdminService {
  /**
   * Create MOH account with temporary password (NEW simplified workflow)
   * - Single API call
   * - System generates secure temporary password (12+ chars)
   * - Sends temp password via WhatsApp
   * - Returns temp password for admin reference
   */
  static async createMohAccount(payload: MohAccountCreatePayload): Promise<MohAccountCreateResponse> {
    return api.post<MohAccountCreateResponse>('/admin/moh-accounts/create', payload);
  }

  /**
   * Get list of all MOH users (for admin dashboard)
   */
  static async getMohUsers(): Promise<any[]> {
    return api.get<any[]>('/admin/moh-accounts');
  }

  /**
   * Get admin dashboard statistics
   */
  static async getAdminDashboard(): Promise<any> {
    return api.get<any>('/admin/dashboard');
  }
}

