// Data service for managing entities according to UML class diagram
import {
  Child,
  Vaccine,
  ScheduleItem,
  VaccinationRecord,
  GrowthRecord,
  Notification,
  Report,
  AuditLog,
  ScheduleStatus,
  VaccinationStatus,
  NotificationType,
  ReportType,
  Gender
} from '../types/models';

// Mock data storage (in a real app, this would be API calls)
class DataService {
  private children: Child[] = [];
  private vaccines: Vaccine[] = [];
  private scheduleItems: ScheduleItem[] = [];
  private vaccinationRecords: VaccinationRecord[] = [];
  private growthRecords: GrowthRecord[] = [];
  private notifications: Notification[] = [];
  private reports: Report[] = [];
  private auditLogs: AuditLog[] = [];

  // Child operations
  getChild(childId: string): Child | null {
    return this.children.find(c => c.childId === childId) || null;
  }

  getChildrenByParent(parentId: string): Child[] {
    return this.children.filter(c => c.parentId === parentId);
  }

  getChildrenByPHM(phmId: string): Child[] {
    return this.children.filter(c => c.registeredBy === phmId);
  }

  getAllChildren(): Child[] {
    return this.children;
  }

  registerChild(child: Child): string {
    child.registrationNumber = this.generateRegistrationNumber();
    this.children.push(child);
    this.logAudit('CREATE', 'Child', child.childId, 'Child registered');
    return child.registrationNumber;
  }

  private generateRegistrationNumber(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    return `NCVMS-${year}-${month}${day}-${random}`;
  }

  // Vaccine operations
  getVaccine(vaccineId: string): Vaccine | null {
    return this.vaccines.find(v => v.vaccineId === vaccineId) || null;
  }

  getAllVaccines(): Vaccine[] {
    return this.vaccines.filter(v => v.isActive);
  }

  // ScheduleItem operations
  getScheduleItemsByChild(childId: string): ScheduleItem[] {
    return this.scheduleItems.filter(s => s.childId === childId);
  }

  createScheduleItem(item: ScheduleItem): void {
    this.scheduleItems.push(item);
    this.logAudit('CREATE', 'ScheduleItem', item.scheduleId, 'Schedule item created');
  }

  updateScheduleStatus(scheduleId: string, status: ScheduleStatus): void {
    const item = this.scheduleItems.find(s => s.scheduleId === scheduleId);
    if (item) {
      item.status = status;
      this.logAudit('UPDATE', 'ScheduleItem', scheduleId, `Status updated to ${status}`);
    }
  }

  // VaccinationRecord operations
  getVaccinationRecordsByChild(childId: string): VaccinationRecord[] {
    return this.vaccinationRecords.filter(r => r.childId === childId);
  }

  getAllVaccinationRecords(): VaccinationRecord[] {
    return this.vaccinationRecords;
  }

  createVaccinationRecord(record: VaccinationRecord): void {
    this.vaccinationRecords.push(record);
    // Update corresponding schedule item
    const scheduleItem = this.scheduleItems.find(
      s => s.childId === record.childId && s.vaccineId === record.vaccineId
    );
    if (scheduleItem) {
      scheduleItem.status = ScheduleStatus.COMPLETED;
    }
    this.logAudit('CREATE', 'VaccinationRecord', record.recordId, 'Vaccination recorded');
  }

  updateVaccinationRecord(recordId: string, updates: Partial<VaccinationRecord>): void {
    const record = this.vaccinationRecords.find(r => r.recordId === recordId);
    if (record) {
      Object.assign(record, updates);
      this.logAudit('UPDATE', 'VaccinationRecord', recordId, 'Vaccination record updated');
    }
  }

  // GrowthRecord operations
  getGrowthRecordsByChild(childId: string): GrowthRecord[] {
    return this.growthRecords.filter(r => r.childId === childId);
  }

  createGrowthRecord(record: GrowthRecord): void {
    this.growthRecords.push(record);
    this.logAudit('CREATE', 'GrowthRecord', record.recordId, 'Growth data recorded');
  }

  // Notification operations
  getNotificationsByRecipient(recipientId: string): Notification[] {
    return this.notifications.filter(n => n.recipientId === recipientId);
  }

  getUnreadNotifications(recipientId: string): Notification[] {
    return this.notifications.filter(n => n.recipientId === recipientId && !n.isRead);
  }

  createNotification(notification: Notification): boolean {
    this.notifications.push(notification);
    return true;
  }

  markNotificationAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.notificationId === notificationId);
    if (notification) {
      notification.isRead = true;
    }
  }

  markAllNotificationsAsRead(recipientId: string): void {
    this.notifications
      .filter(n => n.recipientId === recipientId && !n.isRead)
      .forEach(n => n.isRead = true);
  }

  // Report operations
  generateReport(report: Report): Report {
    this.reports.push(report);
    this.logAudit('CREATE', 'Report', report.reportId, `Report generated: ${report.reportType}`);
    return report;
  }

  getReportsByUser(userId: string): Report[] {
    return this.reports.filter(r => r.generatedBy === userId);
  }

  // AuditLog operations
  getAuditLogs(filter?: {
    userId?: string;
    entityType?: string;
    startDate?: Date;
    endDate?: Date;
    action?: string;
  }): AuditLog[] {
    let logs = [...this.auditLogs];
    
    if (filter) {
      if (filter.userId) {
        logs = logs.filter(l => l.userId === filter.userId);
      }
      if (filter.entityType) {
        logs = logs.filter(l => l.entityType === filter.entityType);
      }
      if (filter.action) {
        logs = logs.filter(l => l.action === filter.action);
      }
      if (filter.startDate) {
        logs = logs.filter(l => l.timestamp >= filter.startDate!);
      }
      if (filter.endDate) {
        logs = logs.filter(l => l.timestamp <= filter.endDate!);
      }
    }
    
    return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  private logAudit(action: string, entityType: string, entityId: string, description: string): void {
    const log: AuditLog = {
      logId: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: this.getCurrentUserId(),
      action,
      entityType,
      entityId,
      timestamp: new Date(),
      ipAddress: '127.0.0.1' // In real app, get from request
    };
    this.auditLogs.push(log);
  }

  private getCurrentUserId(): string {
    const userStr = sessionStorage.getItem('currentUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.userId || 'unknown';
      } catch (e) {
        return 'unknown';
      }
    }
    return 'unknown';
  }

  // Initialize with sample data
  initializeSampleData(): void {
    // Sample vaccines
    this.vaccines = [
      {
        vaccineId: 'vaccine-001',
        name: 'BCG',
        manufacturer: 'Serum Institute',
        dosageInfo: '0.05ml',
        recommendedAge: 0,
        intervalDays: 0,
        description: 'Bacillus Calmette-Guérin vaccine',
        isActive: true
      },
      {
        vaccineId: 'vaccine-002',
        name: 'OPV',
        manufacturer: 'WHO',
        dosageInfo: '2 drops',
        recommendedAge: 60,
        intervalDays: 60,
        description: 'Oral Polio Vaccine',
        isActive: true
      },
      {
        vaccineId: 'vaccine-003',
        name: 'Pentavalent',
        manufacturer: 'Serum Institute',
        dosageInfo: '0.5ml',
        recommendedAge: 60,
        intervalDays: 60,
        description: 'DPT-HepB-Hib combined vaccine',
        isActive: true
      }
    ];

    // Sample children distributed across PHM/MOH areas
    // PHM user in AuthService has phmId = 'phm-001' and areaCode 'COL-01' (Colombo West)
    this.children = [
      {
        childId: 'child-001',
        registrationNumber: this.generateRegistrationNumber(),
        firstName: 'Kavindu',
        lastName: 'Perera',
        dateOfBirth: new Date('2020-04-15'),
        gender: Gender.MALE,
        bloodGroup: 'B+',
        birthWeight: 3.2,
        birthHeight: 50,
        headCircumference: 34,
        parentId: 'user-parent-001',
        registeredBy: 'phm-001',
        areaCode: 'COL-01',
        areaName: 'Colombo 01'
      },
      {
        childId: 'child-002',
        registrationNumber: this.generateRegistrationNumber(),
        firstName: 'Nimasha',
        lastName: 'Perera',
        dateOfBirth: new Date('2023-01-10'),
        gender: Gender.FEMALE,
        bloodGroup: 'O+',
        birthWeight: 3.0,
        birthHeight: 49,
        headCircumference: 33,
        parentId: 'user-parent-001',
        registeredBy: 'phm-001',
        areaCode: 'COL-01',
        areaName: 'Colombo 01'
      },
      // Children in other PHM areas – visible only to MOH via area filter
      {
        childId: 'child-003',
        registrationNumber: this.generateRegistrationNumber(),
        firstName: 'Arjun',
        lastName: 'Silva',
        dateOfBirth: new Date('2021-06-05'),
        gender: Gender.MALE,
        bloodGroup: 'A+',
        birthWeight: 3.4,
        birthHeight: 51,
        headCircumference: 35,
        parentId: 'parent-dehiwala-001',
        registeredBy: 'phm-002',
        areaCode: 'DEH-01',
        areaName: 'Dehiwala'
      },
      {
        childId: 'child-004',
        registrationNumber: this.generateRegistrationNumber(),
        firstName: 'Lihini',
        lastName: 'Fernando',
        dateOfBirth: new Date('2019-11-20'),
        gender: Gender.FEMALE,
        bloodGroup: 'AB+',
        birthWeight: 3.1,
        birthHeight: 50,
        headCircumference: 34,
        parentId: 'parent-ratmalana-001',
        registeredBy: 'phm-003',
        areaCode: 'RAT-01',
        areaName: 'Ratmalana'
      }
    ];
  }
}

export const dataService = new DataService();
// Initialize sample data on module load
dataService.initializeSampleData();
