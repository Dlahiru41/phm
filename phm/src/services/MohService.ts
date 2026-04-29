/**
 * MOH Dashboard & Reports Service
 * Handles all API calls to MOH Dashboard and Reports endpoints
 * Base URL: /api/v1
 */

import { api } from './apiClient';

// Type definitions for MOH Dashboard responses
export interface TotalChildrenResponse {
  totalChildren: number;
}

export interface GNDistributionItem {
  gnDivision: string;
  total: number;
}

export interface VaccinationCoverageResponse {
  totalChildren: number;
  vaccinatedChildren: number;
  coverage: number;
}

export interface MissedVaccinationsResponse {
  missedVaccinations: number;
}

export interface PHMPerformanceItem {
  phmName: string;
  gnDivision: string;
  totalChildren: number;
  vaccinated: number;
  coverage: number;
}

export interface RecentChildItem {
  childId: string;
  registrationNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  gnDivision: string;
  createdAt: string;
  registeredBy: string;
}

// Type definitions for MOH Reports responses
export interface VaccinationCoverageReportResponse {
  reportType: string;
  filters: {
    startDate?: string;
    endDate?: string;
    gnDivision?: string;
  };
  data: Array<{
    gnDivision: string;
    total: number;
    vaccinated: number;
    coverage: number;
  }>;
}

export interface MissedVaccinationReportResponse {
  reportType: string;
  filters: {
    startDate?: string;
    endDate?: string;
    gnDivision?: string;
  };
  data: Array<{
    childName: string;
    gnDivision: string;
    vaccine: string;
    dueDate: string;
  }>;
}

export interface PHMPerformanceReportResponse {
  reportType: string;
  filters: {
    startDate?: string;
    endDate?: string;
    gnDivision?: string;
  };
  data: Array<{
    phm: string;
    area: string;
    total: number;
    vaccinated: number;
    missed: number;
    coverage: number;
  }>;
}

export interface AuditReportResponse {
  reportType: string;
  filters: {
    startDate?: string;
    endDate?: string;
    role?: string;
    action?: string;
  };
  data: Array<{
    date: string;
    user: string;
    role: string;
    action: string;
    details: string;
  }>;
}

export interface SystemOverviewReportResponse {
  reportType: string;
  summary: {
    totalChildren: number;
    linkedChildren: number;
    totalPhmUsers: number;
    totalMohUsers: number;
    totalVaccinationRecords: number;
    administeredRecords: number;
    pendingRecords: number;
    missedRecords: number;
    cancelledRecords: number;
    coveragePct: number;
    upcomingDueNext7Days: number;
    overdueRecords: number;
    pendingSchedules: number;
    completedSchedules: number;
    scheduledClinics: number;
    completedClinics: number;
    unreadNotifications: number;
    auditEventsLast30Days: number;
  };
  deepDive: {
    byGNDivision: Array<{
      gnDivision: string;
      registeredChildren: number;
      linkedChildren: number;
      vaccinatedChildren: number;
      missedChildren: number;
      overdueRecords: number;
      coveragePct: number;
    }>;
    byVaccine: Array<{
      vaccineId: string;
      vaccineName: string;
      totalDoses: number;
      administeredDoses: number;
      pendingDoses: number;
      missedDoses: number;
      cancelledDoses: number;
      completionRatePct: number;
    }>;
    dataQuality: {
      childrenWithoutGnDivision: number;
      childrenWithoutLinkedParent: number;
      childrenWithoutWhatsAppNumber: number;
      pendingRecordsWithoutDueDate: number;
      overduePendingSchedules: number;
    };
    databaseFootprint: {
      users: number;
      children: number;
      vaccines: number;
      vaccinationRecords: number;
      vaccinationSchedules: number;
      clinicSchedules: number;
      clinicChildren: number;
      notifications: number;
      auditLogs: number;
      reports: number;
    };
    monthlyTrend: Array<{
      month: string;
      newChildren: number;
      administeredDoses: number;
      missedDoses: number;
      completedClinics: number;
      notificationsSent: number;
      auditEvents: number;
    }>;
  };
  filters: {
    startDate: string;
    endDate: string;
    gnDivision: string;
    trendMonths: number;
  };
  insights: string[];
  generatedAt: string;
}

// Shared types for vaccination records
export interface VaccinationRecordListItem {
  recordId: string;
  childId?: string;
  childName?: string;
  registrationNumber?: string;
  vaccineId?: string;
  vaccineName?: string;
  administeredDate?: string;
  dueDate?: string;
  status?: string;
  areaCode?: string;
  areaName?: string;
  batchNumber?: string;
  administeredBy?: string;
  location?: string;
  notes?: string;
  createdAt?: string;
}

export interface VaccinationRecordListResponse {
  items: VaccinationRecordListItem[];
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
}

export interface VaccinationRecordListParams {
  page?: number;
  limit?: number;
  areaCode?: string;
  vaccineId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface VaccinationRecordDeleteResponse {
  message?: string;
}

export interface VaccinationRecordStoreItem {
  recordId: string;
  childId: string;
  vaccineId: string;
  status: string;
  administeredDate?: string;
  dueDate?: string;
  areaCode?: string;
  areaName?: string;
  childName?: string;
  registrationNumber?: string;
}

/**
 * MOH Dashboard and Reports API Service
 */
export class MohService {
  // ==========================================
  // DASHBOARD ENDPOINTS
  // ==========================================

  /**
   * Get total number of children registered in the system
   */
  async getTotalChildren(): Promise<number> {
    try {
      const response = await api.get<TotalChildrenResponse>('/moh/dashboard/total-children');
      return response?.totalChildren ?? 0;
    } catch (error) {
      console.error('Error fetching total children:', error);
      return 0;
    }
  }

  /**
   * Get children distribution by GN division
   */
  async getGNDistribution(): Promise<GNDistributionItem[]> {
    try {
      const response = await api.get<GNDistributionItem[]>('/moh/dashboard/gn-distribution');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error fetching GN distribution:', error);
      return [];
    }
  }

  /**
   * Get overall vaccination coverage percentage
   */
  async getVaccinationCoverage(): Promise<VaccinationCoverageResponse | null> {
    try {
      const response = await api.get<VaccinationCoverageResponse>('/moh/dashboard/coverage');
      return response ?? null;
    } catch (error) {
      console.error('Error fetching vaccination coverage:', error);
      return null;
    }
  }

  /**
   * Get count of missed (overdue) vaccinations
   */
  async getMissedVaccinations(): Promise<number> {
    try {
      const response = await api.get<MissedVaccinationsResponse>('/moh/dashboard/missed');
      return response?.missedVaccinations ?? 0;
    } catch (error) {
      console.error('Error fetching missed vaccinations:', error);
      return 0;
    }
  }

  /**
   * Get PHM performance summary
   */
  async getPHMPerformanceSummary(): Promise<PHMPerformanceItem[]> {
    try {
      const response = await api.get<PHMPerformanceItem[]>('/moh/dashboard/phm-performance');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error fetching PHM performance:', error);
      return [];
    }
  }

  /**
   * Get the 10 most recently registered children
   */
  async getRecentChildren(): Promise<RecentChildItem[]> {
    try {
      const response = await api.get<RecentChildItem[]>('/moh/dashboard/recent-children');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error fetching recent children:', error);
      return [];
    }
  }

  // ==========================================
  // REPORTS ENDPOINTS
  // ==========================================

  /**
   * Get vaccination coverage report with optional filtering
   */
  async getVaccinationCoverageReport(params?: {
    startDate?: string;
    endDate?: string;
    gnDivision?: string;
  }): Promise<VaccinationCoverageReportResponse | null> {
    try {
      const queryParams: Record<string, string> = {};
      if (params?.startDate) queryParams.startDate = params.startDate;
      if (params?.endDate) queryParams.endDate = params.endDate;
      if (params?.gnDivision) queryParams.gnDivision = params.gnDivision;

      const response = await api.get<VaccinationCoverageReportResponse>('/moh/reports/coverage', queryParams);
      return response ?? null;
    } catch (error) {
      console.error('Error fetching vaccination coverage report:', error);
      return null;
    }
  }

  /**
   * Get missed vaccinations report with optional filtering
   */
  async getMissedVaccinationReport(params?: {
    startDate?: string;
    endDate?: string;
    gnDivision?: string;
  }): Promise<MissedVaccinationReportResponse | null> {
    try {
      const queryParams: Record<string, string> = {};
      if (params?.startDate) queryParams.startDate = params.startDate;
      if (params?.endDate) queryParams.endDate = params.endDate;
      if (params?.gnDivision) queryParams.gnDivision = params.gnDivision;

      const response = await api.get<MissedVaccinationReportResponse>('/moh/reports/missed', queryParams);
      return response ?? null;
    } catch (error) {
      console.error('Error fetching missed vaccination report:', error);
      return null;
    }
  }

  /**
   * Get PHM performance report with optional filtering
   */
  async getPHMPerformanceReport(params?: {
    startDate?: string;
    endDate?: string;
    gnDivision?: string;
  }): Promise<PHMPerformanceReportResponse | null> {
    try {
      const queryParams: Record<string, string> = {};
      if (params?.startDate) queryParams.startDate = params.startDate;
      if (params?.endDate) queryParams.endDate = params.endDate;
      if (params?.gnDivision) queryParams.gnDivision = params.gnDivision;

      const response = await api.get<PHMPerformanceReportResponse>('/moh/reports/phm-performance', queryParams);
      return response ?? null;
    } catch (error) {
      console.error('Error fetching PHM performance report:', error);
      return null;
    }
  }

  /**
   * Get audit report with optional filtering
   */
  async getAuditReport(params?: {
    startDate?: string;
    endDate?: string;
    role?: string;
    action?: string;
  }): Promise<AuditReportResponse | null> {
    try {
      const queryParams: Record<string, string> = {};
      if (params?.startDate) queryParams.startDate = params.startDate;
      if (params?.endDate) queryParams.endDate = params.endDate;
      if (params?.role) queryParams.role = params.role;
      if (params?.action) queryParams.action = params.action;

      const response = await api.get<AuditReportResponse>('/moh/reports/audit', queryParams);
      return response ?? null;
    } catch (error) {
      console.error('Error fetching audit report:', error);
      return null;
    }
  }

  /**
   * Get system overview report with optional filtering
   */
  async getSystemOverviewReport(params?: {
    startDate?: string;
    endDate?: string;
    gnDivision?: string;
    trendMonths?: number;
  }): Promise<SystemOverviewReportResponse | null> {
    try {
      const queryParams: Record<string, string> = {};
      if (params?.startDate) queryParams.startDate = params.startDate;
      if (params?.endDate) queryParams.endDate = params.endDate;
      if (params?.gnDivision) queryParams.gnDivision = params.gnDivision;
      if (params?.trendMonths) queryParams.trendMonths = params.trendMonths.toString();

      const response = await api.get<SystemOverviewReportResponse>('/moh/reports/system-overview', queryParams);
      return response ?? null;
    } catch (error) {
      console.error('Error fetching system overview report:', error);
      return null;
    }
  }

  // ==========================================
  // DOWNLOAD & DATA ENDPOINTS
  // ==========================================

  /**
   * Download report as PDF or CSV
   */
  downloadReport(
    type: 'coverage' | 'missed' | 'phm-performance' | 'audit',
    params?: {
      startDate?: string;
      endDate?: string;
      gnDivision?: string;
      role?: string;
      action?: string;
      format?: 'pdf' | 'csv';
    }
  ): string {
    const queryParams = new URLSearchParams();
    if (params?.startDate) queryParams.set('startDate', params.startDate);
    if (params?.endDate) queryParams.set('endDate', params.endDate);
    if (params?.gnDivision) queryParams.set('gnDivision', params.gnDivision);
    if (params?.role) queryParams.set('role', params.role);
    if (params?.action) queryParams.set('action', params.action);
    if (params?.format) queryParams.set('format', params.format);

    const query = queryParams.toString();
    return `/api/v1/moh/reports/${type}/download${query ? `?${query}` : ''}`;
  }

  /**
   * Get report data as JSON
   */
  async getReportData(
    type: 'coverage' | 'missed' | 'phm-performance' | 'audit',
    params?: {
      startDate?: string;
      endDate?: string;
      gnDivision?: string;
      role?: string;
      action?: string;
    }
  ): Promise<any[]> {
    try {
      const queryParams: Record<string, string> = {};
      if (params?.startDate) queryParams.startDate = params.startDate;
      if (params?.endDate) queryParams.endDate = params.endDate;
      if (params?.gnDivision) queryParams.gnDivision = params.gnDivision;
      if (params?.role) queryParams.role = params.role;
      if (params?.action) queryParams.action = params.action;

      const response = await api.get<any[]>(`/moh/reports/${type}/data`, queryParams);
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error(`Error fetching ${type} report data:`, error);
      return [];
    }
  }

  // ==========================================
  // VACCINATION RECORDS ENDPOINTS
  // ==========================================

  /**
   * Get MOH vaccination records with filters and pagination
   */
  async listMOHVaccinationRecords(params?: VaccinationRecordListParams): Promise<VaccinationRecordListResponse | null> {
    try {
      const queryParams: Record<string, string> = {};
      if (params?.page !== undefined) queryParams.page = params.page.toString();
      if (params?.limit !== undefined) queryParams.limit = params.limit.toString();
      if (params?.areaCode) queryParams.areaCode = params.areaCode;
      if (params?.vaccineId) queryParams.vaccineId = params.vaccineId;
      if (params?.status) queryParams.status = params.status;
      if (params?.startDate) queryParams.startDate = params.startDate;
      if (params?.endDate) queryParams.endDate = params.endDate;

      const response = await api.get<VaccinationRecordListResponse>('/moh/vaccination-records', queryParams);
      return response ?? null;
    } catch (error) {
      console.error('Error fetching MOH vaccination records:', error);
      return null;
    }
  }

  /**
   * Delete a vaccination record as MOH
   */
  async deleteMOHVaccinationRecord(recordId: string): Promise<boolean> {
    try {
      await api.delete<VaccinationRecordDeleteResponse>(`/moh/vaccination-records/${recordId}`);
      return true;
    } catch (error) {
      console.error('Error deleting MOH vaccination record:', error);
      return false;
    }
  }

  /**
   * Call the backend MOH vaccination records endpoint directly (absolute URL).
   * This bypasses building query params from the client and hits the provided URL exactly.
   */
  async listMOHVaccinationRecordsRaw(): Promise<VaccinationRecordListResponse | null> {
    try {
      // Use relative path so browser requests go through the app origin (/api/v1 -> proxy) and avoid CORS issues
      const raw = await api.get<any>('/moh/vaccination-records');
      // Backend returns { data: [...], page, limit, total }
      if (!raw) return null;
      const items = Array.isArray(raw.data) ? raw.data : [];
      const page = raw.page ?? 1;
      const limit = raw.limit ?? items.length;
      const total = raw.total ?? items.length;
      return {
        items,
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / (limit || total || 1))),
      } as VaccinationRecordListResponse;
    } catch (error) {
      console.error('Error fetching MOH vaccination records (raw):', error);
      return null;
    }
  }
}

// Export singleton instance
export const mohService = new MohService();

