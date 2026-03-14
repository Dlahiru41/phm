// Type definitions matching the UML class diagram for SuwaCare LK

// Enums
export enum UserRole {
  PARENT = 'parent',
  PHM = 'phm',
  MOH_OFFICER = 'moh'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export enum NotificationType {
  REMINDER = 'reminder',
  MISSED = 'missed',
  UPCOMING = 'upcoming',
  INFO = 'info',
  VACCINATION_DUE = 'vaccination_due',
  GROWTH_RECORD = 'growth_record'
}

export enum ScheduleStatus {
  PENDING = 'pending',
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  MISSED = 'missed',
  CANCELLED = 'cancelled'
}

export enum VaccinationStatus {
  PENDING = 'pending',
  ADMINISTERED = 'administered',
  MISSED = 'missed',
  CANCELLED = 'cancelled'
}

export enum ReportType {
  VACCINATION_COVERAGE = 'vaccination_coverage',
  AREA_PERFORMANCE = 'area_performance',
  AUDIT_REPORT = 'audit_report',
  GROWTH_ANALYSIS = 'growth_analysis',
  MONTHLY_SUMMARY = 'monthly_summary'
}

// Base User class
export interface User {
  userId: string;
  email: string;
  nic: string;
  passwordHash: string;
  role: UserRole;
  languagePreference: string;
  createdAt: Date;
}

// User methods interface
export interface UserMethods {
  login(credentials: any): boolean;
  logout(): void;
}

// Parent class (extends User)
export interface Parent extends User {
  phoneNumber: string;
  address: string;
  name: string;
}

// Parent methods
export interface ParentMethods {
  addChild(registrationNum: string): void;
  viewChildrenRecords(): Child[];
  viewGrowthChart(childId: string): Chart;
  receiveNotification(notif: Notification): void;
}

// PHM (Public Health Midwife) class (extends User)
export interface PHM extends User {
  phmId: string;
  areaCode: string;
  assignedRegion: string;
}

// PHM methods
export interface PHMMethods {
  registerChild(details: ChildRegistrationDetails): string;
  recordVaccination(childId: string, data: VaccinationRecordData): void;
  updateVaccination(recordId: string, data: VaccinationRecordData): void;
  recordGrowthData(childId: string, data: GrowthRecordData): void;
  viewAreaChildren(): Child[];
  viewVaccinationStatus(childId: string): VaccinationStatus;
}

// MOHOfficer (Medical Officer of Health) class (extends User)
export interface MOHOfficer extends User {
  officerId: string;
  officeLocation: string;
  jurisdiction: string;
}

// MOHOfficer methods
export interface MOHOfficerMethods {
  viewAllVaccinationData(): VaccinationRecord[];
  generateReport(criteria: ReportCriteria): Report;
  viewDashboardStats(): Statistics;
  viewAuditLogs(filter: AuditLogFilter): AuditLog[];
  deleteRecord(recordId: string): boolean;
  viewVaccinationCoverage(): Coverage;
}

// Child class
export interface Child {
  childId: string;
  registrationNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
  bloodGroup: string;
  birthWeight: number;
  parentId: string;
  registeredBy: string;
  // Area information (PHM zone / MOH area)
  areaCode: string;
  areaName: string;
  birthHeight: number;
  headCircumference?: number;
  /** Set when child is linked via WhatsApp OTP; matches backend parent_whatsapp_number */
  parentWhatsappNumber?: string;
}

// Child methods
export interface ChildMethods {
  generateSchedule(): void;
  getVaccinationStatus(): VaccinationStatus;
  generateRegistrationNumber(): string;
}

// Vaccine class
export interface Vaccine {
  vaccineId: string;
  name: string;
  manufacturer: string;
  dosageInfo: string;
  recommendedAge: number;
  intervalDays: number;
  description: string;
  isActive: boolean;
}

// Vaccine methods
export interface VaccineMethods {
  getScheduleInfo(): string;
}

// ScheduleItem class
export interface ScheduleItem {
  scheduleId: string;
  childId: string;
  vaccineId: string;
  vaccineName?: string;
  scheduledDate: Date;
  dueDate: Date;
  status: ScheduleStatus;
  reminderSent: boolean;
}

// ScheduleItem methods
export interface ScheduleItemMethods {
  updateStatus(status: ScheduleStatus): void;
  sendReminder(): void;
}

// VaccinationRecord class
export interface VaccinationRecord {
  recordId: string;
  childId: string;
  vaccineId: string;
  vaccineName?: string;
  administeredDate: Date;
  batchNumber: string;
  administeredBy: string;
  location: string;
  site?: string;
  doseNumber?: number;
  nextDueDate?: Date;
  status: VaccinationStatus;
  notes: string;
  createdAt: Date;
}

// VaccinationRecord methods
export interface VaccinationRecordMethods {
  update(details: VaccinationRecordData): void;
  markAsCompleted(): void;
}

// GrowthRecord class
export interface GrowthRecord {
  recordId: string;
  childId: string;
  recordedDate: Date;
  height: number;
  weight: number;
  headCircumference?: number;
  recordedBy: string;
  notes: string;
  createdAt?: Date;
}

// GrowthRecord methods
export interface GrowthRecordMethods {
  calculatePercentile(): number;
  compareWithStandard(): string;
}

// Notification class
export interface Notification {
  notificationId: string;
  recipientId: string;
  type: NotificationType;
  message: string;
  relatedChildId: string | null;
  sentDate: Date;
  isRead: boolean;
}

// Notification methods
export interface NotificationMethods {
  send(): boolean;
  markAsRead(): void;
}

// Report class
export interface Report {
  reportId: string;
  reportType: ReportType;
  generatedBy: string;
  generatedDate: Date;
  startDate: Date;
  endDate: Date;
  content: string;
}

// Report methods
export interface ReportMethods {
  generate(criteria: ReportCriteria): void;
}

// AuditLog class
export interface AuditLog {
  logId: string;
  userId: string;
  userName?: string;
  userRole?: string;
  action: string;
  entityType: string;
  entityId: string;
  details?: string;
  timestamp: Date;
  ipAddress: string;
}

// AuditLog methods
export interface AuditLogMethods {
  log(details: AuditLogDetails): void;
}

// Supporting types
export interface ChildRegistrationDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
  birthWeight: number;
  birthHeight: number;
  headCircumference: number;
  bloodGroup: string;
  parentId: string;
  address: string;
}

export interface VaccinationRecordData {
  childId: string;
  vaccineId: string;
  administeredDate: Date;
  batchNumber: string;
  administeredBy: string;
  location: string;
  status: VaccinationStatus;
  notes: string;
}

export interface GrowthRecordData {
  childId: string;
  recordedDate: Date;
  height: number;
  weight: number;
  recordedBy: string;
  notes: string;
}

export interface ReportCriteria {
  reportType: ReportType;
  startDate: Date;
  endDate: Date;
  areaCode?: string;
  vaccineId?: string;
  filters?: Record<string, any>;
}

export interface AuditLogFilter {
  userId?: string;
  entityType?: string;
  startDate?: Date;
  endDate?: Date;
  action?: string;
}

export interface AuditLogDetails {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  ipAddress: string;
}

export interface Chart {
  data: any;
  type: string;
}

export interface Statistics {
  totalChildren: number;
  vaccinatedCount: number;
  coveragePercentage: number;
  missedVaccinations: number;
  upcomingVaccinations: number;
}

export interface Coverage {
  areaCode: string;
  totalPopulation: number;
  vaccinatedCount: number;
  coveragePercentage: number;
  vaccineBreakdown: Record<string, number>;
}
