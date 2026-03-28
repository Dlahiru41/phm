import { api } from './apiClient';
import {
  Child,
  Vaccine,
  ScheduleItem,
  VaccinationRecord,
  GrowthRecord,
  Notification,
  AuditLog,
  ScheduleStatus,
  VaccinationStatus,
  NotificationType,
  Gender,
} from '../types/models';

function parseDate(v: string | Date | undefined): Date {
  if (!v) return new Date(0);
  if (v instanceof Date) return v;
  const d = new Date(v);
  return isNaN(d.getTime()) ? new Date(0) : d;
}

function childFromApi(a: any): Child {
  return {
    childId: a.childId,
    registrationNumber: a.registrationNumber || '',
    firstName: a.firstName,
    lastName: a.lastName,
    dateOfBirth: parseDate(a.dateOfBirth),
    gender: (a.gender === 'female' ? Gender.FEMALE : Gender.MALE) as Gender,
    bloodGroup: a.bloodGroup || '',
    birthWeight: a.birthWeight,
    birthHeight: a.birthHeight,
    headCircumference: a.headCircumference,
    parentId: a.parentId || '',
    registeredBy: a.registeredBy || '',
    areaCode: a.areaCode || '',
    areaName: a.areaName || '',
    parentWhatsappNumber: a.parentWhatsappNumber ?? a.parent_whatsapp_number ?? undefined,
  };
}

function scheduleFromApi(a: any): ScheduleItem {
  return {
    scheduleId: a.scheduleId,
    childId: a.childId,
    vaccineId: a.vaccineId,
    vaccineName: (a as any).vaccineName,
    scheduledDate: parseDate(a.scheduledDate),
    dueDate: parseDate(a.dueDate),
    status: (a.status as ScheduleStatus) || ScheduleStatus.PENDING,
    reminderSent: !!a.reminderSent,
  };
}

function vaccinationRecordFromApi(a: any): VaccinationRecord {
  return {
    recordId: a.recordId,
    childId: a.childId,
    vaccineId: a.vaccineId,
    vaccineName: (a as any).vaccineName,
    administeredDate: parseDate(a.administeredDate),
    batchNumber: a.batchNumber || '',
    administeredBy: a.administeredBy || '',
    location: a.location || '',
    site: (a as any).site,
    doseNumber: (a as any).doseNumber,
    nextDueDate: (a as any).nextDueDate ? parseDate((a as any).nextDueDate) : undefined,
    status: (a.status as VaccinationStatus) || VaccinationStatus.PENDING,
    notes: a.notes || '',
    createdAt: parseDate(a.createdAt),
  };
}

function growthRecordFromApi(a: any): GrowthRecord {
  return {
    recordId: a.recordId,
    childId: a.childId,
    recordedDate: parseDate(a.recordedDate),
    height: a.height,
    weight: a.weight,
    headCircumference: a.headCircumference,
    recordedBy: a.recordedBy || '',
    notes: a.notes || '',
    createdAt: parseDate(a.createdAt),
  };
}

function notificationFromApi(a: any): Notification {
  return {
    notificationId: a.notificationId,
    recipientId: a.recipientId,
    type: (a.type as NotificationType) || NotificationType.INFO,
    message: a.message || '',
    relatedChildId: a.relatedChildId || null,
    sentDate: parseDate(a.sentDate),
    isRead: !!a.isRead,
  };
}

function auditLogFromApi(a: any): AuditLog {
  return {
    logId: a.logId,
    userId: a.userId,
    userRole: a.userRole,
    userName: a.userName,
    action: a.action,
    entityType: a.entityType,
    entityId: a.entityId,
    details: a.details,
    timestamp: parseDate(a.timestamp),
    ipAddress: a.ipAddress || '',
  };
}

class DataService {
  async getChild(childId: string): Promise<Child | null> {
    try {
      const a = await api.get<any>(`/children/${encodeURIComponent(childId)}`);
      return a ? childFromApi(a) : null;
    } catch {
      return null;
    }
  }

  async getChildrenByParent(parentId: string): Promise<Child[]> {
    try {
      const list = await api.get<any[]>('/children', { parentId });
      return Array.isArray(list) ? list.map(childFromApi) : [];
    } catch {
      return [];
    }
  }

  /**
   * Get children registered by this PHM. Uses GET /children?registeredBy=<userId> with Bearer token.
   */
  async getChildrenByPHM(registeredBy: string): Promise<Child[]> {
    try {
      const list = await api.get<any[]>('/children', { registeredBy });
      return Array.isArray(list) ? list.map(childFromApi) : [];
    } catch {
      return [];
    }
  }

  /**
   * Paginated children list registered by this PHM. Uses GET /children?registeredBy=&page=&limit= with Bearer token.
   */
  async getChildrenByPHMPaginated(
    registeredBy: string,
    page: number,
    limit: number
  ): Promise<{ total: number; page: number; limit: number; data: Child[] }> {
    try {
      const params: Record<string, string> = {
        registeredBy,
        page: String(page),
        limit: String(limit),
      };
      const res = await api.get<any>('/children', params);
      if (res && typeof res === 'object' && Array.isArray(res.data) && typeof res.total === 'number') {
        return {
          total: res.total,
          page: res.page ?? page,
          limit: res.limit ?? limit,
          data: res.data.map((a: any) => childFromApi(a)),
        };
      }
      const list = Array.isArray(res) ? res : [];
      const total = list.length;
      const start = (page - 1) * limit;
      const data = list.slice(start, start + limit).map((a: any) => childFromApi(a));
      return { total, page, limit, data };
    } catch {
      return { total: 0, page, limit, data: [] };
    }
  }

  async getAllChildren(params?: {
    areaCode?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ total: number; page: number; limit: number; data: Child[] }> {
    try {
      const p: Record<string, string> = {};
      if (params?.areaCode) p.areaCode = params.areaCode;
      if (params?.status) p.status = params.status;
      if (params?.search) p.search = params.search;
      if (params?.page != null) p.page = String(params.page);
      if (params?.limit != null) p.limit = String(params.limit);
      const res = await api.get<{ total: number; page: number; limit: number; data: any[] }>('/children', p);
      const data = Array.isArray(res?.data) ? res.data.map(childFromApi) : [];
      return {
        total: res?.total ?? 0,
        page: res?.page ?? 1,
        limit: res?.limit ?? 20,
        data,
      };
    } catch {
      return { total: 0, page: 1, limit: 20, data: [] };
    }
  }

  async searchChildByRegistration(registrationNumber: string): Promise<Child | null> {
    try {
      const a = await api.get<any>('/children/search', {
        registrationNumber: registrationNumber.trim(),
      });
      return a ? childFromApi(a) : null;
    } catch {
      return null;
    }
  }

  async registerChild(body: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    birthWeight: number;
    birthHeight: number;
    headCircumference?: number;
    bloodGroup?: string;
    motherName: string;
    motherNIC: string;
    fatherName: string;
    fatherNIC: string;
    district: string;
    dsDivision: string;
    gnDivision: string;
    address: string;
    phmId?: string;
    areaCode?: string;
    parent_whatsapp_number?: string;
  }): Promise<{ childId: string; registrationNumber: string } | null> {
    const payload: Record<string, unknown> = {
      firstName: body.firstName,
      lastName: body.lastName,
      dateOfBirth: body.dateOfBirth,
      gender: body.gender,
      birthWeight: body.birthWeight,
      birthHeight: body.birthHeight,
      motherName: body.motherName,
      motherNIC: body.motherNIC,
      fatherName: body.fatherName,
      fatherNIC: body.fatherNIC,
      district: body.district,
      dsDivision: body.dsDivision,
      gnDivision: body.gnDivision,
      address: body.address,
    };
    if (body.headCircumference != null) payload.headCircumference = body.headCircumference;
    if (body.bloodGroup != null) payload.bloodGroup = body.bloodGroup;
    if (body.phmId != null) payload.phmId = body.phmId;
    if (body.areaCode != null) payload.areaCode = body.areaCode;
    payload.ParentWhatsAppNumber = body.parent_whatsapp_number?.trim() ?? '';
    const res = await api.post<any>('/children', payload);
    const raw = res ?? (typeof res === 'object' ? res : {});
    const childId = raw.childId ?? raw.child_id ?? '';
    const registrationNumber = raw.registrationNumber ?? raw.registration_number ?? '';
    if (!registrationNumber) {
      return null;
    }
    return { childId, registrationNumber };
  }

  async updateChild(childId: string, body: Partial<Child>): Promise<boolean> {
    try {
      const payload: any = {};
      if (body.firstName !== undefined) payload.firstName = body.firstName;
      if (body.lastName !== undefined) payload.lastName = body.lastName;
      if (body.bloodGroup !== undefined) payload.bloodGroup = body.bloodGroup;
      if (body.address !== undefined) payload.address = body.address;
      await api.put(`/children/${encodeURIComponent(childId)}`, payload);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Request OTP for parent-child linking. POST /children/:childId/link-parent/otp/request
   * Request: { registrationNumber }. OTP is sent to the number on file for the child.
   */
  async requestLinkOtp(
    childId: string,
    payload: { registrationNumber: string }
  ): Promise<unknown> {
    return api.post(`/children/${encodeURIComponent(childId)}/link-parent/otp/request`, payload);
  }

  /**
   * Verify OTP and complete link. POST /children/:childId/link-parent/otp/verify
   * Request: { registrationNumber, otpCode }. Throws ApiError on failure.
   */
  async verifyLinkOtp(
    childId: string,
    payload: { registrationNumber: string; otpCode: string }
  ): Promise<unknown> {
    return api.post(`/children/${encodeURIComponent(childId)}/link-parent/otp/verify`, payload);
  }

  async getVaccine(vaccineId: string): Promise<Vaccine | null> {
    try {
      const a = await api.get<any>(`/vaccines/${encodeURIComponent(vaccineId)}`);
      return a ?? null;
    } catch {
      return null;
    }
  }

  async getAllVaccines(): Promise<Vaccine[]> {
    try {
      const list = await api.get<any[]>('/vaccines');
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  }

  async getScheduleItemsByChild(childId: string): Promise<ScheduleItem[]> {
    try {
      const list = await api.get<any[]>('/schedules', { childId });
      return Array.isArray(list) ? list.map(scheduleFromApi) : [];
    } catch {
      return [];
    }
  }

  async createScheduleItem(body: {
    childId: string;
    vaccineId: string;
    scheduledDate: string;
    dueDate: string;
  }): Promise<{ scheduleId: string } | null> {
    try {
      const res = await api.post<{ scheduleId: string }>('/schedules', body);
      return res ?? null;
    } catch {
      return null;
    }
  }

  async updateScheduleStatus(scheduleId: string, status: ScheduleStatus): Promise<boolean> {
    try {
      await api.put(`/schedules/${encodeURIComponent(scheduleId)}/status`, { status });
      return true;
    } catch {
      return false;
    }
  }

  async sendScheduleReminder(scheduleId: string): Promise<boolean> {
    try {
      await api.post(`/schedules/${encodeURIComponent(scheduleId)}/send-reminder`);
      return true;
    } catch {
      return false;
    }
  }

  async getVaccinationRecordsByChild(childId: string): Promise<VaccinationRecord[]> {
    try {
      const list = await api.get<any[]>('/vaccination-records', { childId });
      return Array.isArray(list) ? list.map(vaccinationRecordFromApi) : [];
    } catch {
      return [];
    }
  }

  async getAllVaccinationRecords(params?: {
    areaCode?: string;
    vaccineId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<{ total: number; page: number; limit: number; data: VaccinationRecord[] }> {
    try {
      const p: Record<string, string> = {};
      if (params?.areaCode) p.areaCode = params.areaCode;
      if (params?.vaccineId) p.vaccineId = params.vaccineId;
      if (params?.status) p.status = params.status;
      if (params?.startDate) p.startDate = params.startDate;
      if (params?.endDate) p.endDate = params.endDate;
      if (params?.page != null) p.page = String(params.page);
      if (params?.limit != null) p.limit = String(params.limit);
      const res = await api.get<{ total: number; page: number; limit: number; data: any[] }>('/vaccination-records', p);
      const data = Array.isArray(res?.data) ? res.data.map(vaccinationRecordFromApi) : [];
      return { total: res?.total ?? 0, page: res?.page ?? 1, limit: res?.limit ?? 20, data };
    } catch {
      return { total: 0, page: 1, limit: 20, data: [] };
    }
  }

  async getVaccinationRecord(recordId: string): Promise<VaccinationRecord | null> {
    try {
      const a = await api.get<any>(`/vaccination-records/${encodeURIComponent(recordId)}`);
      return a ? vaccinationRecordFromApi(a) : null;
    } catch {
      return null;
    }
  }

  async createVaccinationRecord(body: {
    childId: string;
    vaccineId: string;
    administeredDate: string;
    batchNumber?: string;
    administeredBy?: string;
    location?: string;
    site?: string;
    doseNumber?: number;
    nextDueDate?: string;
    status?: string;
    notes?: string;
  }): Promise<{ recordId: string } | null> {
    try {
      const res = await api.post<{ recordId: string }>('/vaccination-records', body);
      return res ?? null;
    } catch {
      return null;
    }
  }

  async updateVaccinationRecord(
    recordId: string,
    body: Partial<{
      vaccineId: string;
      administeredDate: string;
      batchNumber: string;
      administeredBy: string;
      location: string;
      site: string;
      doseNumber: number;
      nextDueDate: string;
      status: string;
      notes: string;
    }>
  ): Promise<boolean> {
    try {
      await api.put(`/vaccination-records/${encodeURIComponent(recordId)}`, body);
      return true;
    } catch {
      return false;
    }
  }

  async deleteVaccinationRecord(recordId: string): Promise<boolean> {
    try {
      await api.delete(`/vaccination-records/${encodeURIComponent(recordId)}`);
      return true;
    } catch {
      return false;
    }
  }

  async getGrowthRecordsByChild(
    childId: string,
    startDate?: string,
    endDate?: string
  ): Promise<GrowthRecord[]> {
    try {
      const p: Record<string, string> = { childId };
      if (startDate) p.startDate = startDate;
      if (endDate) p.endDate = endDate;
      const list = await api.get<any[]>('/growth-records', p);
      return Array.isArray(list) ? list.map(growthRecordFromApi) : [];
    } catch {
      return [];
    }
  }

  async createGrowthRecord(body: {
    childId: string;
    recordedDate: string;
    height: number;
    weight: number;
    headCircumference?: number;
    recordedBy?: string;
    notes?: string;
  }): Promise<{ recordId: string } | null> {
    try {
      const res = await api.post<{ recordId: string }>('/growth-records', body);
      return res ?? null;
    } catch {
      return null;
    }
  }

  async getNotifications(params?: {
    unread?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ total: number; unreadCount: number; data: Notification[] }> {
    try {
      const p: Record<string, string> = {};
      if (params?.unread !== undefined) p.unread = String(params.unread);
      if (params?.page != null) p.page = String(params.page);
      if (params?.limit != null) p.limit = String(params.limit);
      const res = await api.get<{ total: number; unreadCount: number; data: any[] }>('/notifications', p);
      const data = Array.isArray(res?.data) ? res.data.map(notificationFromApi) : [];
      return {
        total: res?.total ?? 0,
        unreadCount: res?.unreadCount ?? 0,
        data,
      };
    } catch {
      return { total: 0, unreadCount: 0, data: [] };
    }
  }

  async markNotificationAsRead(notificationId: string): Promise<boolean> {
    try {
      await api.put(`/notifications/${encodeURIComponent(notificationId)}/read`);
      return true;
    } catch {
      return false;
    }
  }

  async markAllNotificationsAsRead(): Promise<boolean> {
    try {
      await api.put('/notifications/read-all');
      return true;
    } catch {
      return false;
    }
  }

  async createNotification(body: {
    recipientId: string;
    type: string;
    message: string;
    relatedChildId?: string;
  }): Promise<{ notificationId: string } | null> {
    try {
      const res = await api.post<{ notificationId: string }>('/notifications', body);
      return res ?? null;
    } catch {
      return null;
    }
  }

  async generateReport(body: {
    reportType: string;
    startDate: string;
    endDate: string;
    district?: string;
    dsDivision?: string;
    vaccineId?: string;
    format: string;
  }): Promise<{
    reportId: string;
    reportType: string;
    generatedBy: string;
    generatedDate: string;
    startDate: string;
    endDate: string;
    downloadUrl: string;
  } | null> {
    try {
      const res = await api.post<any>('/reports/generate', body);
      return res ?? null;
    } catch {
      return null;
    }
  }

  async getReports(params?: { reportType?: string; page?: number; limit?: number }): Promise<
    Array<{
      reportId: string;
      reportType: string;
      generatedDate: string;
      startDate: string;
      endDate: string;
      downloadUrl: string;
    }>
  > {
    try {
      const p: Record<string, string> = {};
      if (params?.reportType) p.reportType = params.reportType;
      if (params?.page != null) p.page = String(params.page);
      if (params?.limit != null) p.limit = String(params.limit);
      const list = await api.get<any[]>('/reports', p);
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  }

  getReportDownloadUrl(reportId: string, format?: string): string {
    const q = format ? `?format=${encodeURIComponent(format)}` : '';
    return `/api/v1/reports/${encodeURIComponent(reportId)}/download${q}`;
  }

  async getAuditLogs(params?: {
    userId?: string;
    userRole?: string;
    entityType?: string;
    action?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ total: number; page: number; limit: number; data: AuditLog[] }> {
    try {
      const p: Record<string, string> = {};
      if (params?.userId) p.userId = params.userId;
      if (params?.userRole) p.userRole = params.userRole;
      if (params?.entityType) p.entityType = params.entityType;
      if (params?.action) p.action = params.action;
      if (params?.startDate) p.startDate = params.startDate;
      if (params?.endDate) p.endDate = params.endDate;
      if (params?.search) p.search = params.search;
      if (params?.page != null) p.page = String(params.page);
      if (params?.limit != null) p.limit = String(params.limit);
      const res = await api.get<{ total: number; page: number; limit: number; data: any[] }>('/audit-logs', p);
      const data = Array.isArray(res?.data) ? res.data.map(auditLogFromApi) : [];
      return {
        total: res?.total ?? 0,
        page: res?.page ?? 1,
        limit: res?.limit ?? 50,
        data,
      };
    } catch {
      return { total: 0, page: 1, limit: 50, data: [] };
    }
  }

  getAuditLogExportUrl(params?: Record<string, string>): string {
    const search = params ? new URLSearchParams(params).toString() : '';
    return `/api/v1/audit-logs/export${search ? `?${search}` : ''}`;
  }

  async getMOHDashboard(params?: { areaCode?: string; period?: string }): Promise<{
    totalChildren: number;
    vaccinatedCount: number;
    coveragePercentage: number;
    missedVaccinations: number;
    upcomingVaccinations: number;
    newRegistrationsThisMonth: number;
    growthRecordsThisMonth: number;
  } | null> {
    try {
      const p: Record<string, string> = {};
      if (params?.areaCode) p.areaCode = params.areaCode;
      if (params?.period) p.period = params.period;
      const res = await api.get<any>('/analytics/dashboard', p);
      return res ?? null;
    } catch {
      return null;
    }
  }

  async getPHMDashboard(): Promise<{
    totalChildrenInArea: number;
    vaccinatedCount: number;
    missedVaccinations: number;
    upcomingVaccinations: number;
    growthRecordsThisMonth: number;
    recentRegistrations: number;
  } | null> {
    try {
      const res = await api.get<any>('/analytics/phm-dashboard');
      return res ?? null;
    } catch {
      return null;
    }
  }

  async getParentDashboard(): Promise<{
    children: Array<{
      childId: string;
      name: string;
      age: string;
      nextVaccinationDate: string | null;
      nextVaccineName: string | null;
      vaccinationStatus: string;
      upcomingCount: number;
      missedCount: number;
    }>;
    unreadNotifications: number;
  } | null> {
    try {
      const res = await api.get<any>('/analytics/parent-dashboard');
      return res ?? null;
    } catch {
      return null;
    }
  }

  async getVaccinationCoverage(params?: {
    areaCode?: string;
    vaccineId?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<any> {
    try {
      return await api.get<any>('/analytics/vaccination-coverage', params as Record<string, string>);
    } catch {
      return null;
    }
  }

  async getAreaPerformance(params?: { startDate?: string; endDate?: string }): Promise<any[]> {
    try {
      const list = await api.get<any[]>('/analytics/area-performance', params as Record<string, string>);
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  }

  // Mobile Number Change with OTP
  async requestMobileNumberChange(newPhoneNumber: string): Promise<{ message: string; maskedDestination: string; expiresInSeconds: number }> {
    try {
      const response = await api.post<{ message: string; maskedDestination: string; expiresInSeconds: number }>('/users/request-mobile-change', {
        newPhoneNumber,
      });
      return response || { message: '', maskedDestination: '', expiresInSeconds: 0 };
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to request mobile number change';
      throw new Error(errorMessage);
    }
  }

  async verifyMobileNumberChange(newPhoneNumber: string, otpCode: string): Promise<{ message: string; phoneNumber: string }> {
    try {
      const response = await api.post<{ message: string; phoneNumber: string }>('/users/verify-mobile-change', {
        newPhoneNumber,
        otpCode,
      });
      return response || { message: '', phoneNumber: '' };
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to verify OTP';
      throw new Error(errorMessage);
    }
  }

  async getChildrenByParent(parentId: string): Promise<{ data: Child[]; count: number }> {
    try {
      const list = await api.get<Child[]>(`/children?parentId=${parentId}`);
      return {
        data: Array.isArray(list) ? list.map(childFromApi) : [],
        count: Array.isArray(list) ? list.length : 0,
      };
    } catch {
      return { data: [], count: 0 };
    }
  }
}

export const dataService = new DataService();
