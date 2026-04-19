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
   * Backend returns: { count: X, items: [...] }
   * Endpoint: GET /api/v1/admin/moh-accounts (requires JWT token + admin role)
   */
  static async getMohUsers(): Promise<any[]> {
    try {
      const response = await api.get<{ count: number; items: any[] }>('/admin/moh-accounts');
      console.log('Admin getMohUsers response:', response);

      // Handle the actual response structure
      if (response?.items && Array.isArray(response.items)) {
        console.log('Returning MOH users:', response.items);
        return response.items;
      }

      console.warn('Unexpected response structure from getMohUsers:', response);
      return [];
    } catch (error) {
      console.error('Error fetching MOH users:', error);
      throw error;
    }
  }
}

