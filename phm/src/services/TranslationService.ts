// Translation Service for Trilingual Support (English, Sinhala, Tamil)

export type Language = 'en' | 'si' | 'ta';

export interface TranslationKeys {
  // App
  'app.title': string;
  'app.subtitle': string;

  // Login Page
  'login.title': string;
  'login.subtitle': string;
  'login.welcome': string;
  'login.credentials': string;
  'login.nicOrEmail': string;
  'login.password': string;
  'login.enterPassword': string;
  'login.signIn': string;
  'login.invalidCredentials': string;
  'login.forgotPassword': string;
  'login.newToMohPortal': string;
  'login.dontHaveAccount': string;
  'login.createAccount': string;
  'login.selectLanguage': string;
  'login.languageHint': string;
  'login.hero.title': string;
  'login.hero.description': string;
  'login.hero.footer': string;
  'login.language.english': string;
  'login.language.sinhala': string;
  'login.language.tamil': string;

  // Forgot Password
  'forgotPassword.title': string;
  'forgotPassword.resetPassword': string;
  'forgotPassword.enterEmail': string;
  'forgotPassword.emailHint': string;
  'forgotPassword.sendOTP': string;
  'forgotPassword.otpSent': string;
  'forgotPassword.otpSentToMobile': string;
  'forgotPassword.enterOTP': string;
  'forgotPassword.otpHint': string;
  'forgotPassword.verifyOTP': string;
  'forgotPassword.enterNewPassword': string;
  'forgotPassword.confirmPassword': string;
  'forgotPassword.passwordHint': string;
  'forgotPassword.passwordResetSuccess': string;
  'forgotPassword.redirectingToLogin': string;
  'forgotPassword.failed': string;
  'forgotPassword.step1': string;
  'forgotPassword.step2': string;
  'forgotPassword.step3': string;
  'forgotPassword.back': string;
  'forgotPassword.invalidEmail': string;
  'forgotPassword.invalidOTP': string;
  'forgotPassword.passwordMismatch': string;
  'forgotPassword.passwordTooShort': string;

  // Navigation
  'nav.dashboard': string;
  'nav.healthRecords': string;
  'nav.notifications': string;
  'nav.growthChart': string;
  'nav.profile': string;
  'nav.settings': string;
  'nav.logout': string;
  'nav.help': string;

  // Profile
  'profile.title': string;
  'profile.viewProfile': string;
  'profile.editProfile': string;
  'profile.fullName': string;
  'profile.nic': string;
  'profile.email': string;
  'profile.mobileNumber': string;
  'profile.address': string;
  'profile.linkedChildren': string;
  'profile.accountActivity': string;
  'profile.changePassword': string;
  'profile.changeMobileNumber': string;
  'profile.save': string;
  'profile.cancel': string;
  'profile.noLinkedChildren': string;

  // Mobile Number Change with 2FA
  'profile.changeMobile.title': string;
  'profile.changeMobile.enterNew': string;
  'profile.changeMobile.step1': string;
  'profile.changeMobile.step2': string;
  'profile.changeMobile.step3': string;
  'profile.changeMobile.otpSent': string;
  'profile.changeMobile.enterOtp': string;
  'profile.changeMobile.verify': string;
  'profile.changeMobile.verified': string;
  'profile.changeMobile.failed': string;
  'profile.changeMobile.resendOtp': string;

  // Vaccines
  'vaccine.title': string;
  'vaccine.guide': string;
  'vaccine.name': string;
  'vaccine.manufacturer': string;
  'vaccine.dosage': string;
  'vaccine.recommendedAge': string;
  'vaccine.interval': string;
  'vaccine.description': string;
  'vaccine.noData': string;
  'vaccine.scheduleDescription': string;

  // Vaccines - Sri Lanka Schedule
  'vaccine.bcg': string;
  'vaccine.opv': string;
  'vaccine.pentavalent': string;
  'vaccine.mmr': string;
  'vaccine.je': string;
  'vaccine.dpt': string;

  // Notifications
  'notification.title': string;
  'notification.upcoming': string;
  'notification.missed': string;
  'notification.completed': string;
  'notification.childLinked': string;
  'notification.growthUpdate': string;
  'notification.noNotifications': string;
  'notification.markAsRead': string;
  'notification.markAllAsRead': string;

  // Growth Chart
  'growth.title': string;
  'growth.weight': string;
  'growth.height': string;
  'growth.headCircumference': string;
  'growth.lastVisit': string;
  'growth.export': string;
  'growth.print': string;

  // Common
  'common.save': string;
  'common.cancel': string;
  'common.delete': string;
  'common.edit': string;
  'common.back': string;
  'common.loading': string;
  'common.error': string;
  'common.success': string;
  'common.close': string;
  'common.submit': string;
  'common.searchPlaceholder': string;
  'common.overview': string;

  // Status
  'status.pending': string;
  'status.completed': string;
  'status.missed': string;
  'status.cancelled': string;
  'status.scheduled': string;
  'status.active': string;

    // Audit Logs
    'audit.title': string;
    'audit.searchPlaceholder': string;
    'audit.filterAllRoles': string;
    'audit.filterPhm': string;
    'audit.filterParent': string;
    'audit.filterMoh': string;
    'audit.colTimestamp': string;
    'audit.colUser': string;
    'audit.colAction': string;
    'audit.colDetails': string;
    'audit.noLogs': string;
    'audit.showingLogs': string;
    'audit.export': string;
    'audit.subtitle': string;

    // Common Additional
    'common.backToDashboard': string;
    'common.creating': string;
    'common.logout': string;

    // Admin Dashboard
    'adminDashboard.title': string;
    'adminDashboard.subtitle': string;
    'adminDashboard.dashboard.title': string;
    'adminDashboard.dashboard.subtitle': string;
    'adminDashboard.dashboard.quickActions': string;
    'adminDashboard.dashboard.createMohAccount': string;
    'adminDashboard.dashboard.createMohAccountSubtitle': string;
    'adminDashboard.dashboard.viewMohUsers': string;
    'adminDashboard.dashboard.viewMohUsersSubtitle': string;
    'adminDashboard.createMoh.title': string;
    'adminDashboard.createMoh.subtitle': string;
    'adminDashboard.createMoh.employeeIdLabel': string;
    'adminDashboard.createMoh.employeeIdPlaceholder': string;
    'adminDashboard.createMoh.fullNameLabel': string;
    'adminDashboard.createMoh.fullNamePlaceholder': string;
    'adminDashboard.createMoh.nicLabel': string;
    'adminDashboard.createMoh.nicPlaceholder': string;
    'adminDashboard.createMoh.emailLabel': string;
    'adminDashboard.createMoh.emailPlaceholder': string;
    'adminDashboard.createMoh.phoneLabel': string;
    'adminDashboard.createMoh.phonePlaceholder': string;
    'adminDashboard.createMoh.assignedAreaLabel': string;
    'adminDashboard.createMoh.assignedAreaPlaceholder': string;
    'adminDashboard.createMoh.createButton': string;
    'adminDashboard.createMoh.successTitle': string;
    'adminDashboard.createMoh.successUserId': string;
    'adminDashboard.createMoh.successEmail': string;
    'adminDashboard.createMoh.successTempPassword': string;
    'adminDashboard.createMoh.successSentTo': string;
    'adminDashboard.createMoh.successNote1': string;
    'adminDashboard.createMoh.successNote2': string;
    'adminDashboard.createMoh.successNote3': string;
    'adminDashboard.mohUsers.title': string;
    'adminDashboard.mohUsers.subtitle': string;
    'adminDashboard.mohUsers.loading': string;
    'adminDashboard.mohUsers.noUsers': string;
    'adminDashboard.mohUsers.table.employeeId': string;
    'adminDashboard.mohUsers.table.name': string;
    'adminDashboard.mohUsers.table.email': string;
    'adminDashboard.mohUsers.table.assignedArea': string;
    'adminDashboard.mohUsers.table.status': string;
    'adminDashboard.mohUsers.table.created': string;
    'adminDashboard.mohUsers.status.pending': string;
    'adminDashboard.mohUsers.status.active': string;

    // MOH System Overview Report
    'report.title': string;
    'report.filters': string;
  'report.startDate': string;
  'report.endDate': string;
  'report.refresh': string;
  'report.loading': string;
  'report.downloadPdf': string;
  'report.period': string;
  'report.generated': string;
  'report.summary': string;
  'report.totalChildren': string;
  'report.linkedChildren': string;
  'report.vaccinationRecords': string;
  'report.coverage': string;
  'report.administered': string;
  'report.pending': string;
  'report.overdue': string;
  'report.phmUsers': string;
  'report.insights': string;
  'report.coverageByRegion': string;
  'report.vaccinationTrends': string;
  'report.month': string;
  'report.administeredTitle': string;
  'report.overdueTitle': string;
  'report.registered': string;
  'report.vaccinated': string;
  'report.vaccine': string;
  'report.totalDoses': string;
  'report.missed': string;
  'report.completion': string;
  'report.gnDivision': string;
  'report.vaccinePerformance': string;
  'report.trendMonths': string;
  'report.coverageByGnDivision': string;
  'report.totalDosesTitle': string;
  'report.missedTitle': string;
  'report.completionTitle': string;
  'report.dataQuality': string;
  'report.databaseFootprint': string;
  'report.monthlyTrend': string;
  'report.newChildren': string;
  'report.notifications': string;
  'report.auditEvents': string;
  'report.footerText': string;
  'report.description': string;
  'report.generateError': string;
  'report.invalidType': string;
  'report.downloadFailed': string;
  'report.generateSuccess': string;
  'report.type': string;
  'report.dateRange': string;
  'report.userRole': string;
  'report.allRoles': string;
  'report.allDivisions': string;
  'report.selectType': string;
  'report.generating': string;
  'report.generate': string;
  'report.downloadCsv': string;

  // PHM Vaccination Clinic
  'clinic.title': string;
  'clinic.createTitle': string;
  'clinic.date': string;
  'clinic.gnDivision': string;
  'clinic.location': string;
  'clinic.description': string;
  'clinic.createSuccess': string;
  'clinic.createError': string;
  'clinic.loadError': string;
  'clinic.detailsTitle': string;
  'clinic.dueChildren': string;
  'clinic.attendance': string;
  'clinic.markAttended': string;
  'clinic.markNotAttended': string;
  'clinic.attendanceSuccess': string;
  'clinic.status': string;
  'clinic.actions': string;
  'clinic.viewDetails': string;
  'clinic.noClinics': string;
    'clinic.listTitle': string;
    'clinic.assignedArea': string;
    'clinic.optional': string;
    'clinic.marking': string;
    'clinic.regNum': string;
    'clinic.subtitle': string;
    'clinic.scheduleFirst': string;
    'clinic.createClinic': string;

    // Notifications Additional
    'notification.unread': string;
    'notification.allCaughtUp': string;
  'notification.markAllAsRead': string;
  'notification.filterAll': string;

  // Profile Additional
  'profile.subtitle': string;
  'profile.details': string;
  'profile.changeMobile': string;
  'profile.linkedChildrenTab': string;
  'profile.updateSuccess': string;
  'profile.updateError': string;
  'profile.mobileUpdateSuccess': string;
  'profile.mobileVerifyError': string;
  'profile.passwordSuccess': string;
  'profile.passwordError': string;
  'profile.passwordMismatch': string;
  'profile.fillAllFields': string;
  'profile.saving': string;
  'profile.verifying': string;
  'profile.mobileChangeHint': string;
  'profile.oldPassword': string;
  'profile.newPassword': string;
  'profile.confirmPassword': string;
  'profile.passwordChangeHint': string;
  'profile.enterCurrentPassword': string;
  'profile.enterNewPassword': string;
  'profile.reEnterNewPassword': string;
  'profile.updating': string;
  'profile.updatePassword': string;

  // Add Child Additional
  'addChild.title': string;
  'addChild.subtitle': string;
  'addChild.regNumLabel': string;
  'addChild.regNumPlaceholder': string;
  'addChild.searchBtn': string;
  'addChild.searching': string;
  'addChild.confirmTitle': string;
  'addChild.confirmText': string;
  'addChild.sendOtp': string;
  'addChild.otpTitle': string;
  'addChild.otpText': string;
  'addChild.otpPlaceholder': string;
  'addChild.verifyBtn': string;
  'addChild.successTitle': string;
  'addChild.successText': string;
  'addChild.errorNoChild': string;
  'addChild.errorSearch': string;
  'addChild.errorOtpInvalid': string;
  'addChild.errorOtpExpired': string;
  'addChild.errorOtpMaxAttempts': string;
  'addChild.errorAlreadyConsumed': string;
  'addChild.errorNotFound': string;
  'addChild.foundTitle': string;
  'addChild.foundText': string;
  'addChild.resendCode': string;
  'addChild.attempts': string;
  'addChild.codeExpires': string;
  'addChild.redirecting': string;
  'addChild.whereToFind': string;
  'addChild.whereToFindText': string;
  'addChild.formatHint': string;
  'addChild.selectChild': string;
  'addChild.addAnotherChild': string;

  // Baby Registration Additional
  'babyReg.title': string;
  'babyReg.subtitle': string;
  'babyReg.firstName': string;
  'babyReg.lastName': string;
  'babyReg.dob': string;
  'babyReg.gender': string;
  'babyReg.genderMale': string;
  'babyReg.genderFemale': string;
  'babyReg.genderOther': string;
  'babyReg.birthWeight': string;
  'babyReg.birthHeight': string;
  'babyReg.motherName': string;
  'babyReg.motherNic': string;
  'babyReg.fatherName': string;
  'babyReg.fatherNic': string;
  'babyReg.address': string;
  'babyReg.whatsapp': string;
  'babyReg.whatsappHint': string;
  'babyReg.submitBtn': string;
  'babyReg.successTitle': string;
  'babyReg.successText': string;
  'babyReg.regNumLabel': string;
  'babyReg.copyBtn': string;
  'babyReg.copied': string;
  'babyReg.printBtn': string;
  'babyReg.registerAnother': string;
  'babyReg.errorArea': string;
  'babyReg.errorWeight': string;
  'babyReg.errorServer': string;
  'babyReg.parentInfo': string;
  'babyReg.locationInfo': string;
  'babyReg.selectGender': string;
  'babyReg.district': string;
  'babyReg.dsDivision': string;
  'babyReg.gnDivision': string;
  'babyReg.loadingArea': string;
  'babyReg.areaError': string;
  'babyReg.gnHint': string;
  'babyReg.addressInfo': string;
  'babyReg.mohDivision': string;
  'babyReg.selectMoh': string;
  'babyReg.fullAddress': string;

  // General Clinic Additional
  'clinic.normalTitle': string;
  'clinic.normalSubtitle': string;
  'clinic.normalCreateTitle': string;
  'clinic.normalCreateSuccess': string;
  'clinic.normalNoClinics': string;

  // Record Vaccination Additional
  'recordVac.title': string;
  'recordVac.subtitle': string;
  'recordVac.selectChild': string;
  'recordVac.selectVaccine': string;
  'recordVac.doseNumber': string;
  'recordVac.dateGiven': string;
  'recordVac.batchNumber': string;
  'recordVac.administeredBy': string;
  'recordVac.location': string;
  'recordVac.site': string;
  'recordVac.site.leftArm': string;
  'recordVac.site.rightArm': string;
  'recordVac.site.leftThigh': string;
  'recordVac.site.rightThigh': string;
  'recordVac.site.oral': string;
  'recordVac.nextDueDate': string;
  'recordVac.notes': string;
  'recordVac.submitBtn': string;
  'recordVac.successMsg': string;
  'recordVac.errorMsg': string;
  'recordVac.dueTitle': string;
  'recordVac.noDue': string;
  'recordVac.reviewDueLabel': string;
  'recordVac.table.childName': string;
  'recordVac.table.regNo': string;
  'recordVac.table.vaccine': string;
  'recordVac.table.dueDate': string;
  'recordVac.table.status': string;
  'recordVac.table.actions': string;
  'recordVac.reminderSent': string;
  'recordVac.missedNotified': string;
  'recordVac.markCompleted': string;
  'recordVac.markNotAttended': string;
  'recordVac.updateSuccess': string;
  'recordVac.updateDescription': string;
  'recordVac.selectSite': string;
  'recordVac.notesPlaceholder': string;

  // Growth Additional
  'growth.loading': string;
  'growth.noData': string;
  'growth.error': string;

  // Vaccination Card Additional
  'vacCard.title': string;
  'vacCard.subtitle': string;
  'vacCard.idLabel': string;
  'vacCard.ageLabel': string;
  'vacCard.parentLabel': string;
  'vacCard.addressLabel': string;
  'vacCard.historyTitle': string;
  'vacCard.colVaccine': string;
  'vacCard.colDose': string;
  'vacCard.colDate': string;
  'vacCard.colStatus': string;
  'vacCard.certifiedMsg': string;
  'vacCard.generatedLabel': string;
  'vacCard.downloadBtn': string;
  'vacCard.loading': string;

  // Parent Dashboard
  'parentDashboard.title': string;
  'parentDashboard.subtitle': string;
  'parentDashboard.parentAccount': string;
  'parentDashboard.parentPortal': string;
  'parentDashboard.vaccinationManagement': string;
  'parentDashboard.linkedChildren': string;
  'parentDashboard.registered': string;
  'parentDashboard.recentRecords': string;
  'parentDashboard.addAnotherChild': string;
  'parentDashboard.usingRegistration': string;
  'parentDashboard.appointmentPending': string;
  'parentDashboard.nextDose': string;
  'parentDashboard.upcoming': string;
  'parentDashboard.missed': string;
  'parentDashboard.viewFullHistory': string;
  'parentDashboard.noRecords': string;
  'parentDashboard.childName': string;
  'parentDashboard.vaccine': string;
  'parentDashboard.dateAdministered': string;
  'parentDashboard.officerPhm': string;
  'parentDashboard.action': string;
  'parentDashboard.view': string;
  'parentDashboard.overdue': string;
  'parentDashboard.dueIn': string;
  'parentDashboard.days': string;
  'parentDashboard.children': string;
  'parentDashboard.welcomeBack': string;
  'parentDashboard.quickActions': string;
  'parentDashboard.bookAppointment': string;
  'parentDashboard.growthCharts': string;
  'parentDashboard.milestones': string;
  'parentDashboard.home': string;
  'parentDashboard.records': string;
  'parentDashboard.appointments': string;
  'parentDashboard.vaccineGuide': string;
  'parentDashboard.loading': string;

  // MOH Dashboard
  'moh.subtitle': string;
  'moh.searchPlaceholder': string;
  'moh.officerTitle': string;
  'moh.regionalAnalytics': string;
  'moh.phmReports': string;
  'moh.phmManagement': string;
  'moh.systemHealth': string;
  'moh.dataLive': string;
  'moh.analyticsDashboard': string;
  'moh.dashboardDescription': string;
  'moh.systemOverview': string;
  'moh.auditLogs': string;
  'moh.viewProfile': string;

  // MOH PHM Management
  'mohPhm.title': string;
  'mohPhm.subtitle': string;
  'mohPhm.createAccount': string;
  'mohPhm.createDescription': string;
  'mohPhm.mohOnly': string;
  'mohPhm.employeeId': string;
  'mohPhm.employeeIdPlaceholder': string;
  'mohPhm.fullName': string;
  'mohPhm.fullNamePlaceholder': string;
  'mohPhm.nic': string;
  'mohPhm.nicPlaceholder': string;
  'mohPhm.email': string;
  'mohPhm.emailPlaceholder': string;
  'mohPhm.phoneNumber': string;
  'mohPhm.phonePlaceholder': string;
  'mohPhm.assignedDivision': string;
  'mohPhm.selectDivision': string;
  'mohPhm.allAssigned': string;
  'mohPhm.showingAreas': string;
  'mohPhm.createSuccess': string;
  'mohPhm.createError': string;
  'mohPhm.employeeIdLabel': string;
  'mohPhm.userIdLabel': string;
  'mohPhm.tempPasswordLabel': string;
  'mohPhm.sharePassword': string;
  'mohPhm.creating': string;
  'mohPhm.assignmentsTitle': string;
  'mohPhm.assignmentsDescription': string;
  'mohPhm.totalPhms': string;
  'mohPhm.loading': string;
  'mohPhm.noAssignments': string;
  'mohPhm.colEmployeeId': string;
  'mohPhm.colName': string;
  'mohPhm.colAssignedArea': string;
  'mohPhm.colUserId': string;
}

const translations: Record<Language, Partial<TranslationKeys>> = {
  en: {
    // App
    'app.title': 'SuwaCare LK',
    'app.subtitle': 'National Child Vaccination Management System',

    // Login Page
    'login.title': 'Login to Your Account',
    'login.subtitle': 'Welcome back. Please enter your credentials to access the portal.',
    'login.welcome': 'Welcome back',
    'login.credentials': 'Please enter your credentials',
    'login.nicOrEmail': 'NIC or Email Address',
    'login.password': 'Password',
    'login.enterPassword': 'Enter your password',
    'login.signIn': 'Sign In',
    'login.invalidCredentials': 'Invalid username or password. Please try again.',
    'login.forgotPassword': 'Forgot Password?',
    'login.newToMohPortal': 'New to the platform?',
    'login.dontHaveAccount': 'Don\'t have an account? Create one now.',
    'login.createAccount': 'Create Account',
    'login.selectLanguage': 'Select Language',
    'login.languageHint': 'Choose your preferred language for the entire application',
    'login.hero.title': 'Protecting the Next Generation',
    'login.hero.description': 'The National Child Vaccination Management System (SuwaCare LK) provides a secure platform for tracking, scheduling, and certifying vaccinations across the country.',
    'login.hero.footer': 'Ministry of Health Official Portal',
    'login.language.english': 'English',
    'login.language.sinhala': 'සිංහල',
    'login.language.tamil': 'தமிழ்',

    // Forgot Password
    'forgotPassword.title': 'Reset Password',
    'forgotPassword.resetPassword': 'Reset Password',
    'forgotPassword.enterEmail': 'Email Address',
    'forgotPassword.emailHint': 'Enter your email address and we\'ll send an OTP to your registered mobile number.',
    'forgotPassword.sendOTP': 'Send OTP',
    'forgotPassword.otpSent': 'OTP has been sent',
    'forgotPassword.otpSentToMobile': 'OTP has been sent to your registered mobile number. Please enter it below.',
    'forgotPassword.enterOTP': 'OTP Code',
    'forgotPassword.otpHint': 'Enter 6-digit OTP',
    'forgotPassword.verifyOTP': 'Verify OTP',
    'forgotPassword.enterNewPassword': 'New Password',
    'forgotPassword.confirmPassword': 'Confirm Password',
    'forgotPassword.passwordHint': 'Password must be at least 6 characters',
    'forgotPassword.passwordResetSuccess': 'Password reset successfully!',
    'forgotPassword.redirectingToLogin': 'Redirecting to login...',
    'forgotPassword.failed': 'Failed to reset password. Please try again.',
    'forgotPassword.step1': 'Step 1: Email',
    'forgotPassword.step2': 'Step 2: OTP',
    'forgotPassword.step3': 'Step 3: Password',
    'forgotPassword.back': 'Back',
    'forgotPassword.invalidEmail': 'Please enter a valid email address',
    'forgotPassword.invalidOTP': 'Please enter the OTP',
    'forgotPassword.passwordMismatch': 'Passwords do not match',
    'forgotPassword.passwordTooShort': 'Password must be at least 6 characters',

    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.healthRecords': 'Health Records',
    'nav.notifications': 'Notifications',
    'nav.growthChart': 'Growth Chart',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    'nav.help': 'Help Center',

    // Profile
    'profile.title': 'Profile Management',
    'profile.viewProfile': 'View Profile',
    'profile.editProfile': 'Edit Profile',
    'profile.fullName': 'Full Name',
    'profile.nic': 'NIC',
    'profile.email': 'Email',
    'profile.mobileNumber': 'Mobile Number',
    'profile.address': 'Address',
    'profile.linkedChildren': 'Linked Children',
    'profile.accountActivity': 'Account Activity',
    'profile.changePassword': 'Change Password',
    'profile.changeMobileNumber': 'Change Mobile Number',
    'profile.save': 'Save Changes',
    'profile.cancel': 'Cancel',
    'profile.noLinkedChildren': 'No linked children yet',

    // Mobile Number Change with 2FA
    'profile.changeMobile.title': 'Change Mobile Number',
    'profile.changeMobile.enterNew': 'Enter New Mobile Number',
    'profile.changeMobile.step1': 'Step 1: Request Change',
    'profile.changeMobile.step2': 'Step 2: Verify OTP',
    'profile.changeMobile.step3': 'Step 3: Confirm Update',
    'profile.changeMobile.otpSent': 'OTP sent to your new mobile number',
    'profile.changeMobile.enterOtp': 'Enter OTP Code',
    'profile.changeMobile.verify': 'Verify OTP',
    'profile.changeMobile.verified': 'Mobile number verified successfully',
    'profile.changeMobile.failed': 'OTP verification failed',
    'profile.changeMobile.resendOtp': 'Resend OTP',

    // Vaccines
    'vaccine.title': 'Vaccine Guide',
    'vaccine.guide': 'Sri Lanka National Immunization Schedule',
    'vaccine.name': 'Vaccine Name',
    'vaccine.manufacturer': 'Manufacturer',
    'vaccine.dosage': 'Dosage',
    'vaccine.recommendedAge': 'Recommended Age',
    'vaccine.interval': 'Interval Days',
    'vaccine.description': 'Description',
    'vaccine.noData': 'No vaccine information available at the moment.',
    'vaccine.scheduleDescription': 'This schedule follows Sri Lanka\'s official vaccination guidelines.',

    // Vaccines - Sri Lanka Schedule
    'vaccine.bcg': 'BCG (Bacillus Calmette-Guérin)',
    'vaccine.opv': 'OPV (Oral Polio Vaccine)',
    'vaccine.pentavalent': 'Pentavalent (DPT + HepB + Hib)',
    'vaccine.mmr': 'MMR (Measles, Mumps, Rubella)',
    'vaccine.je': 'JE (Japanese Encephalitis)',
    'vaccine.dpt': 'DPT (Diphtheria, Pertussis, Tetanus)',

    // Notifications
    'notification.title': 'Notifications',
    'notification.upcoming': 'Upcoming Vaccination',
    'notification.missed': 'Missed Vaccination',
    'notification.completed': 'Vaccination Completed',
    'notification.childLinked': 'Child Linked',
    'notification.growthUpdate': 'Growth Update',
    'notification.noNotifications': 'No notifications',
    'notification.markAsRead': 'Mark as Read',
    'notification.markAllAsRead': 'Mark All as Read',

    // Growth Chart
    'growth.title': 'Growth Chart',
    'growth.weight': 'Weight',
    'growth.height': 'Height',
    'growth.headCircumference': 'Head Circumference',
    'growth.lastVisit': 'Last Visit',
    'growth.export': 'Export CSV',
    'growth.print': 'Print Record',

    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.back': 'Back',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.submit': 'Submit',
    'common.searchPlaceholder': 'Search data points...',
    'common.overview': 'Overview',

    // Status
    'status.pending': 'Pending',
    'status.completed': 'Completed',
    'status.missed': 'Missed',
    'status.cancelled': 'Cancelled',
    'status.scheduled': 'Scheduled',
    'status.active': 'Active',

    // Audit Logs
    'audit.title': 'Audit Logs',
    'audit.searchPlaceholder': 'Search by user, action, or details...',
    'audit.filterAllRoles': 'All Roles',
    'audit.filterPhm': 'PHM',
    'audit.filterParent': 'Parent',
    'audit.filterMoh': 'MOH Officer',
    'audit.colTimestamp': 'Timestamp',
    'audit.colUser': 'User',
    'audit.colAction': 'Action',
    'audit.colDetails': 'Details',
    'audit.noLogs': 'No audit logs found matching your search criteria.',
    'audit.showingLogs': 'Showing {count} of {total} audit logs',
    'audit.export': 'Export Logs',
    'audit.subtitle': 'View SuwaCare LK system activity and user actions for security and compliance.',

    // Common Additional
    'common.backToDashboard': 'Back to Dashboard',
    'common.creating': 'Creating...',
    'common.logout': 'Logout',

    // Admin Dashboard
    'adminDashboard.title': 'System Administrator',
    'adminDashboard.subtitle': 'NCVMS Admin Portal',
    'adminDashboard.dashboard.title': 'Dashboard',
    'adminDashboard.dashboard.subtitle': 'System overview and statistics',
    'adminDashboard.dashboard.quickActions': 'Quick Actions',
    'adminDashboard.dashboard.createMohAccount': 'Create MOH Account',
    'adminDashboard.dashboard.createMohAccountSubtitle': 'Add new MOH officer instantly',
    'adminDashboard.dashboard.viewMohUsers': 'View MOH Users',
    'adminDashboard.dashboard.viewMohUsersSubtitle': 'Manage existing MOH accounts',
    'adminDashboard.createMoh.title': 'Create MOH Account',
    'adminDashboard.createMoh.subtitle': 'Fill in MOH officer details to create account instantly. A secure temporary password will be generated and sent via WhatsApp.',
    'adminDashboard.createMoh.employeeIdLabel': 'Employee ID',
    'adminDashboard.createMoh.employeeIdPlaceholder': 'e.g., MOH-2024-001',
    'adminDashboard.createMoh.fullNameLabel': 'Full Name',
    'adminDashboard.createMoh.fullNamePlaceholder': 'e.g., Dr. Ruwan Silva',
    'adminDashboard.createMoh.nicLabel': 'National ID (NIC)',
    'adminDashboard.createMoh.nicPlaceholder': 'e.g., 987654321V',
    'adminDashboard.createMoh.emailLabel': 'Email',
    'adminDashboard.createMoh.emailPlaceholder': 'e.g., rsilva@moh.lk',
    'adminDashboard.createMoh.phoneLabel': 'Phone Number',
    'adminDashboard.createMoh.phonePlaceholder': 'e.g., +94711234567',
    'adminDashboard.createMoh.assignedAreaLabel': 'Assigned Area',
    'adminDashboard.createMoh.assignedAreaPlaceholder': 'e.g., Colombo District',
    'adminDashboard.createMoh.createButton': 'Create MOH Account',
    'adminDashboard.createMoh.successTitle': 'MOH Account Created Successfully!',
    'adminDashboard.createMoh.successUserId': 'User ID',
    'adminDashboard.createMoh.successEmail': 'Email',
    'adminDashboard.createMoh.successTempPassword': 'Temporary Password',
    'adminDashboard.createMoh.successSentTo': 'Sent to',
    'adminDashboard.createMoh.successNote1': 'Temporary password sent via WhatsApp',
    'adminDashboard.createMoh.successNote2': 'MOH user must change password on first login',
    'adminDashboard.createMoh.successNote3': 'Password valid for 24 hours',
    'adminDashboard.mohUsers.title': 'MOH Users',
    'adminDashboard.mohUsers.subtitle': 'All MOH officers in the system',
    'adminDashboard.mohUsers.loading': 'Loading MOH users...',
    'adminDashboard.mohUsers.noUsers': 'No MOH users found',
    'adminDashboard.mohUsers.table.employeeId': 'Employee ID',
    'adminDashboard.mohUsers.table.name': 'Name',
    'adminDashboard.mohUsers.table.email': 'Email',
    'adminDashboard.mohUsers.table.assignedArea': 'Assigned Area',
    'adminDashboard.mohUsers.table.status': 'Status',
    'adminDashboard.mohUsers.table.created': 'Created',
    'adminDashboard.mohUsers.status.pending': 'First Login Pending',
    'adminDashboard.mohUsers.status.active': 'Active',

    // MOH System Overview Report
    'report.title': 'System Overview Report',
    'report.filters': 'Report Filters',
    'report.startDate': 'Start Date',
    'report.endDate': 'End Date',
    'report.refresh': 'Refresh Report',
    'report.loading': 'Loading report...',
    'report.downloadPdf': 'Download PDF',
    'report.period': 'Period',
    'report.generated': 'Generated',
    'report.summary': 'Executive Summary',
    'report.totalChildren': 'Total Children',
    'report.linkedChildren': 'Linked Children',
    'report.vaccinationRecords': 'Vaccination Records',
    'report.coverage': 'Coverage',
    'report.administered': 'Administered',
    'report.pending': 'Pending',
    'report.overdue': 'Overdue',
    'report.phmUsers': 'PHM Users',
    'report.insights': 'Key Insights',
    'report.coverageByRegion': 'Coverage By Region',
    'report.vaccinationTrends': 'Vaccination Trends (Last 12 Months)',
    'report.month': 'Month',
    'report.administeredTitle': 'Administered',
    'report.overdueTitle': 'Overdue',
    'report.registered': 'Registered',
    'report.vaccinated': 'Vaccinated',
    'report.vaccine': 'Vaccine',
    'report.totalDoses': 'Total Doses',
    'report.missed': 'Missed',
    'report.completion': 'Completion %',
    'report.gnDivision': 'GN Division',
    'report.vaccinePerformance': 'Vaccine Performance',
    'report.trendMonths': 'Trend Months',
    'report.coverageByGnDivision': 'Coverage by GN Division',
    'report.totalDosesTitle': 'Total Doses',
    'report.missedTitle': 'Missed',
    'report.completionTitle': 'Completion %',
    'report.dataQuality': 'Data Quality Scorecard',
    'report.databaseFootprint': 'Database Footprint',
    'report.monthlyTrend': 'Monthly Trend',
    'report.newChildren': 'New Children',
    'report.notifications': 'Notifications',
    'report.auditEvents': 'Audit Events',
    'report.footerText': 'This report was automatically generated by the National Child Vaccination Management System',
    'report.description': 'Generate comprehensive SuwaCare LK vaccination reports for analysis and record-keeping.',
    'report.generateError': 'Failed to generate report. Please try again.',
    'report.invalidType': 'Invalid report type',
    'report.downloadFailed': 'Download as {format.toUpperCase()} failed.',
    'report.generateSuccess': 'Your report has been successfully generated.',
    'report.type': 'Report Type:',
    'report.dateRange': 'Date Range:',
    'report.userRole': 'User Role:',
    'report.allRoles': 'All Roles',
    'report.allDivisions': 'All Divisions',
    'report.selectType': 'Select Report Type *',
    'report.generating': 'Generating...',
    'report.generate': 'Generate Report',
    'report.downloadCsv': 'Download CSV',

    // PHM Vaccination Clinic
    'clinic.title': 'Vaccination Clinics',
    'clinic.createTitle': 'Create New Vaccination Clinic',
    'clinic.date': 'Clinic Date',
    'clinic.gnDivision': 'GN Division',
    'clinic.location': 'Location',
    'clinic.description': 'Description',
    'clinic.createSuccess': 'Vaccination clinic created successfully!',
    'clinic.createError': 'Failed to create vaccination clinic',
    'clinic.loadError': 'Failed to load clinics',
    'clinic.detailsTitle': 'Clinic Details',
    'clinic.dueChildren': 'Children Due for Vaccination',
    'clinic.attendance': 'Attendance Tracking',
    'clinic.markAttended': 'Mark Attended',
    'clinic.markNotAttended': 'Mark Not Attended',
    'clinic.attendanceSuccess': 'Attendance marked successfully!',
    'clinic.status': 'Status',
    'clinic.actions': 'Actions',
    'clinic.viewDetails': 'View Details',
    'clinic.noClinics': 'No clinics scheduled',
    'clinic.listTitle': 'Scheduled Clinics',
    'clinic.subtitle': 'Manage vaccination-focused clinics in your area',
    'clinic.scheduleFirst': 'Schedule Your First Vaccination Clinic',
    'clinic.createClinic': 'Create Vaccination Clinic',
    'clinic.assignedArea': 'Your assigned area',
    'clinic.optional': 'Optional',
    'clinic.marking': 'Saving...',
    'clinic.regNum': 'Reg #',

    // Notifications Additional
    'notification.unread': '{count} unread notification(s)',
    'notification.allCaughtUp': 'All caught up!',
    'notification.markAllAsRead': 'Mark all as read',
    'notification.filterAll': 'All',

    // Profile Additional
    'profile.subtitle': 'Manage your profile, security, and account preferences',
    'profile.details': 'Profile Details',
    'profile.changeMobile': 'Change Mobile',
    'profile.linkedChildrenTab': 'Linked Children',
    'profile.updateSuccess': 'Profile updated successfully',
    'profile.updateError': 'Failed to update profile',
    'profile.mobileUpdateSuccess': 'Mobile number updated successfully',
    'profile.mobileVerifyError': 'Failed to verify OTP',
    'profile.passwordSuccess': 'Password changed successfully',
    'profile.passwordError': 'Failed to change password',
    'profile.passwordMismatch': 'New passwords do not match',
    'profile.fillAllFields': 'Please fill all fields',
    'profile.saving': 'Saving...',
    'profile.verifying': 'Verifying...',
    'profile.mobileChangeHint': 'Use the "Change Mobile" tab to update this',
    'profile.oldPassword': 'Old Password',
    'profile.newPassword': 'New Password',
    'profile.confirmPassword': 'Confirm Password',
    'profile.passwordChangeHint': 'Enter your current password and choose a new secure password.',
    'profile.enterCurrentPassword': 'Enter your current (temporary) password',
    'profile.enterNewPassword': 'Enter a new secure password',
    'profile.reEnterNewPassword': 'Re-enter your new password',
    'profile.updating': 'Updating password…',
    'profile.updatePassword': 'Update Password',

    // Add Child Additional
    'addChild.title': 'Link Your Child',
    'addChild.subtitle': 'Enter your child\'s vaccination book registration number to link them to your account.',
    'addChild.regNumLabel': 'Registration Number',
    'addChild.regNumPlaceholder': 'e.g., CMB/123/2026',
    'addChild.searchBtn': 'Search for Child',
    'addChild.searching': 'Searching...',
    'addChild.confirmTitle': 'Confirm Child Details',
    'addChild.confirmText': 'Is this your child? We will send a verification code to the registered WhatsApp number.',
    'addChild.sendOtp': 'Send Verification Code',
    'addChild.otpTitle': 'Verify Identity',
    'addChild.otpText': 'A 6-digit verification code has been sent to the registered WhatsApp number.',
    'addChild.otpPlaceholder': 'Enter 6-digit code',
    'addChild.verifyBtn': 'Verify and Link Child',
    'addChild.successTitle': 'Successfully Linked!',
    'addChild.successText': 'Your child has been linked to your account.',
    'addChild.errorNoChild': 'No child found with this registration number. Please check and try again.',
    'addChild.errorSearch': 'Unable to search. Please try again.',
    'addChild.errorOtpInvalid': 'The code you entered is incorrect. Please check and try again.',
    'addChild.errorOtpExpired': 'This verification code has expired. Please request a new code.',
    'addChild.errorOtpMaxAttempts': 'Maximum verification attempts reached. Please request a new code.',
    'addChild.errorAlreadyConsumed': 'This code has already been used. The child may already be linked to your account.',
    'addChild.errorNotFound': 'Child or OTP session not found. Please start again.',
    'addChild.foundTitle': 'Child Found!',
    'addChild.foundText': 'Request a verification code to be sent to the parent WhatsApp number on file.',
    'addChild.resendCode': 'Resend code',
    'addChild.attempts': 'Attempts: {count} of {total}',
    'addChild.codeExpires': 'Code expires: {time}',
    'addChild.redirecting': 'Redirecting to dashboard...',
    'addChild.whereToFind': 'Where to find your registration number?',
    'addChild.whereToFindText': 'The registration number is provided by the Public Health Midwife (PHM) when your child is registered in the system. It should be in the format shown above. Linking is verified by a code sent to your mobile number.',
    'addChild.formatHint': 'Format: NCVMS-YYYY-MMDD-XXXX (e.g., NCVMS-2024-0815-1234)',
    'addChild.selectChild': 'Select a child',
    'addChild.addAnotherChild': 'Add another child',

    // Baby Registration Additional
    'babyReg.title': 'New Baby Registration',
    'babyReg.subtitle': 'Register a new child into the SuwaCare LK system to begin tracking their vaccination schedule.',
    'babyReg.firstName': 'First Name',
    'babyReg.lastName': 'Last Name',
    'babyReg.dob': 'Date of Birth',
    'babyReg.gender': 'Gender',
    'babyReg.genderMale': 'Male',
    'babyReg.genderFemale': 'Female',
    'babyReg.genderOther': 'Other',
    'babyReg.birthWeight': 'Birth Weight (kg)',
    'babyReg.birthHeight': 'Birth Height (cm)',
    'babyReg.motherName': 'Mother\'s Name',
    'babyReg.motherNic': 'Mother\'s NIC',
    'babyReg.fatherName': 'Father\'s Name',
    'babyReg.fatherNic': 'Father\'s NIC',
    'babyReg.address': 'Home Address',
    'babyReg.whatsapp': 'Parent WhatsApp Number',
    'babyReg.whatsappHint': 'Used for automated reminders and OTP verification',
    'babyReg.submitBtn': 'Register Child',
    'babyReg.successTitle': 'Child Registered Successfully!',
    'babyReg.successText': 'The child has been added to the system. Please share the registration number with the parent.',
    'babyReg.regNumLabel': 'Registration Number',
    'babyReg.copyBtn': 'Copy',
    'babyReg.copied': 'Copied!',
    'babyReg.printBtn': 'Print Details',
    'babyReg.registerAnother': 'Register Another Child',
    'babyReg.errorArea': 'Unable to determine your assigned GN Division. Please contact administrator.',
    'babyReg.errorWeight': 'Please enter valid birth weight and height.',
    'babyReg.errorServer': 'Registration failed. Server did not return a registration number.',
    'babyReg.parentInfo': 'Parent Information',
    'babyReg.locationInfo': 'Location Information',
    'babyReg.selectGender': 'Select Gender',
    'babyReg.district': 'District',
    'babyReg.dsDivision': 'DS Division',
    'babyReg.gnDivision': 'GN Division',
    'babyReg.loadingArea': 'Loading your assigned area...',
    'babyReg.areaError': 'Unable to load assigned area',
    'babyReg.gnHint': 'Your GN Division is automatically assigned based on your PHM account setup and cannot be changed manually.',
    'babyReg.addressInfo': 'Address Information',
    'babyReg.mohDivision': 'MOH Division',
    'babyReg.selectMoh': 'Select MOH Division',
    'babyReg.fullAddress': 'Full Address',

    // General Clinic Additional
    'clinic.normalTitle': 'Child Welfare Clinics',
    'clinic.normalSubtitle': 'Manage regular child welfare and growth monitoring clinics',
    'clinic.normalCreateTitle': 'Create New Welfare Clinic',
    'clinic.normalCreateSuccess': 'Child welfare clinic created successfully!',
    'clinic.normalNoClinics': 'No welfare clinics scheduled',

    // Record Vaccination Additional
    'recordVac.title': 'Record Vaccination',
    'recordVac.subtitle': 'Log a completed vaccination for a child in your area',
    'recordVac.selectChild': 'Select Child',
    'recordVac.selectVaccine': 'Select Vaccine',
    'recordVac.doseNumber': 'Dose Number',
    'recordVac.dateGiven': 'Date Administered',
    'recordVac.batchNumber': 'Batch Number',
    'recordVac.administeredBy': 'Administered By',
    'recordVac.location': 'Clinic Location',
    'recordVac.site': 'Injection Site',
    'recordVac.nextDueDate': 'Next Due Date (Optional)',
    'recordVac.notes': 'Notes',
    'recordVac.submitBtn': 'Save Record',
    'recordVac.successMsg': 'Vaccination record saved successfully!',
    'recordVac.errorMsg': 'Failed to save vaccination record. Please try again.',
    'recordVac.dueTitle': 'Children Due for Vaccination',
    'recordVac.noDue': 'No children currently due in your area',
    'recordVac.updateSuccess': 'The vaccination record has been successfully updated.',
    'recordVac.updateDescription': 'Update vaccination details for a registered child.',
    'recordVac.selectSite': 'Select site',
    'recordVac.notesPlaceholder': 'Additional notes or observations...',

    // Growth Additional
    'growth.loading': 'Loading WHO growth chart...',
    'growth.noData': 'No growth data available for this child.',
    'growth.error': 'Failed to load WHO growth chart data.',

    // Vaccination Card
    'vacCard.title': 'Vaccination Card',
    'vacCard.subtitle': 'Official vaccination record',
    'vacCard.idLabel': 'ID',
    'vacCard.ageLabel': 'Age',
    'vacCard.parentLabel': 'Parent',
    'vacCard.addressLabel': 'Address',
    'vacCard.historyTitle': 'Vaccination History',
    'vacCard.colVaccine': 'Vaccine',
    'vacCard.colDose': 'Dose',
    'vacCard.colDate': 'Date',
    'vacCard.colStatus': 'Status',
    'vacCard.certifiedMsg': 'Officially Certified',
    'vacCard.generatedLabel': 'Generated',
    'vacCard.downloadBtn': 'Download Card',
    'vacCard.loading': 'Loading vaccination card...',

    // Parent Dashboard
    'parentDashboard.title': 'Parent Dashboard',
    'parentDashboard.subtitle': 'Monitor your children\'s vaccination status and upcoming health milestones.',
    'parentDashboard.parentAccount': 'Parent Account',
    'parentDashboard.parentPortal': 'Parent Portal',
    'parentDashboard.vaccinationManagement': 'Vaccination Management',
    'parentDashboard.linkedChildren': 'Linked Children',
    'parentDashboard.registered': 'Registered',
    'parentDashboard.recentRecords': 'Recent Records',
    'parentDashboard.addAnotherChild': 'Add another child',
    'parentDashboard.usingRegistration': 'Using Registration Number',
    'parentDashboard.appointmentPending': 'Appointment Pending',
    'parentDashboard.nextDose': 'Next Dose',
    'parentDashboard.upcoming': 'Upcoming',
    'parentDashboard.missed': 'Missed',
    'parentDashboard.viewFullHistory': 'View Full History',
    'parentDashboard.noRecords': 'No vaccination records yet.',
    'parentDashboard.childName': 'Child Name',
    'parentDashboard.vaccine': 'Vaccine',
    'parentDashboard.dateAdministered': 'Date Administered',
    'parentDashboard.officerPhm': 'Officer/PHM',
    'parentDashboard.action': 'Action',
    'parentDashboard.view': 'View',
    'parentDashboard.overdue': 'Overdue',
    'parentDashboard.dueIn': 'Due in',
    'parentDashboard.days': 'days',
    'parentDashboard.children': 'Children',
    'parentDashboard.welcomeBack': 'Welcome back to your dashboard',
    'parentDashboard.quickActions': 'Quick Actions',
    'parentDashboard.bookAppointment': 'Book Appointment',
    'parentDashboard.growthCharts': 'Growth Charts & Milestones',
    'parentDashboard.milestones': 'Milestones',
    'parentDashboard.home': 'Home',
    'parentDashboard.records': 'Records',
    'parentDashboard.appointments': 'Appointments',
    'parentDashboard.vaccineGuide': 'Vaccine Guide',
    'parentDashboard.loading': 'Loading dashboard…',

    // MOH Dashboard
    'moh.subtitle': 'National Child Vaccination Analytics',
    'moh.searchPlaceholder': 'Search data points...',
    'moh.officerTitle': 'Regional Medical Officer',
    'moh.regionalAnalytics': 'Regional Analytics',
    'moh.phmReports': 'PHM Reports',
    'moh.phmManagement': 'PHM Management',
    'moh.systemHealth': 'System Health',
    'moh.dataLive': 'Data live: Colombo District',
    'moh.analyticsDashboard': 'Officer Analytics Dashboard',
    'moh.dashboardDescription': 'Real-time vaccination coverage and PHM performance across the Western Province.',
    'moh.systemOverview': 'System Overview',
    'moh.auditLogs': 'Audit Logs',
    'moh.viewProfile': 'View Profile',

    // MOH PHM Management
    'mohPhm.title': 'PHM Management',
    'mohPhm.subtitle': 'Manage PHM areas, officers, and assignments under your region.',
    'mohPhm.createAccount': 'Create PHM Account',
    'mohPhm.createDescription': 'MOH officers can create PHM accounts for their areas. A temporary password will be generated for first login.',
    'mohPhm.mohOnly': 'MOH-only • PHM cannot self-register',
    'mohPhm.employeeId': 'Employee ID',
    'mohPhm.employeeIdPlaceholder': 'e.g. PHM001',
    'mohPhm.fullName': 'Full Name',
    'mohPhm.fullNamePlaceholder': 'PHM full name',
    'mohPhm.nic': 'NIC',
    'mohPhm.nicPlaceholder': 'National ID number',
    'mohPhm.email': 'Email',
    'mohPhm.emailPlaceholder': 'PHM email address',
    'mohPhm.phoneNumber': 'Phone Number',
    'mohPhm.phonePlaceholder': 'Contact number',
    'mohPhm.assignedDivision': 'Assigned GN Division',
    'mohPhm.selectDivision': 'Select GN Division (Unassigned only)',
    'mohPhm.allAssigned': 'All areas are assigned',
    'mohPhm.showingAreas': 'Showing {count} unassigned area{s}',
    'mohPhm.createSuccess': 'PHM account created successfully.',
    'mohPhm.createError': 'Failed to create PHM account. Please check details and try again.',
    'mohPhm.employeeIdLabel': 'Employee ID:',
    'mohPhm.userIdLabel': 'User ID:',
    'mohPhm.tempPasswordLabel': 'Temporary password:',
    'mohPhm.sharePassword': 'Please share this temporary password with the PHM through a secure channel. They will be required to change it on first login.',
    'mohPhm.creating': 'Creating PHM Account…',
    'mohPhm.assignmentsTitle': 'PHM Area Assignments',
    'mohPhm.assignmentsDescription': 'View all PHMs and their assigned GN divisions. Each area can only be assigned to one PHM.',
    'mohPhm.totalPhms': 'Total: {count} PHM{s}',
    'mohPhm.loading': 'Loading PHM assignments...',
    'mohPhm.noAssignments': 'No PHM assignments yet',
    'mohPhm.colEmployeeId': 'Employee ID',
    'mohPhm.colName': 'Name',
    'mohPhm.colAssignedArea': 'Assigned Area',
    'mohPhm.colUserId': 'User ID',
  },

  si: {
    // App
    'app.title': 'සුවා ගිග LK',
    'app.subtitle': 'ජාතික ළමා එනම්නීකරණ ස්ථාපනය කළමනාකරණ පද්ධතිය',

    // Login Page
    'login.title': 'ඔබගේ ගිණුමට ප්‍රවේශ වන්න',
    'login.subtitle': 'ස්වාගතයි. ද්වාරය වෙත ප්‍රවේශ වීමට ඔබගේ ස証අංග ඇතුළු කරන්න.',
    'login.welcome': 'පිછුවෙන් ස්වාගතයි',
    'login.credentials': 'කරුණාකාරයෙන් ඔබගේ ස證අංග ඇතුළු කරන්න',
    'login.nicOrEmail': 'ජාතික හැඳුනුම් අංකය හෝ ඊ-තැපෙල',
    'login.password': 'මුරපදය',
    'login.enterPassword': 'ඔබගේ මුරපදය ඇතුළු කරන්න',
    'login.signIn': 'ඉහල ගිය',
    'login.invalidCredentials': 'අවලංගු භාවිතා නම හෝ මුරපදය. කරුණාකාරයෙන් නැවත උත්සාහ කරන්න.',
    'login.forgotPassword': 'මුරපදය අමතක කර ඇත්තේ ද?',
    'login.newToMohPortal': 'වේදිකා වෙත නව ද?',
    'login.dontHaveAccount': 'ගිණුම් නැත්තේ ද? දැන් එකක් සාදා ගන්න.',
    'login.createAccount': 'ගිණුම සැදුවන්න',
    'login.selectLanguage': 'භාෂාව තෝරන්න',
    'login.languageHint': 'සම්පූර්ණ යෙදුම සඳහා ඔබගේ අවශ්‍ය භාෂාව තෝරන්න',
    'login.hero.title': 'ඉදිරි පරම්පරාව ගැන ගවේෂණ කිරීම',
    'login.hero.description': 'ජාතික ළමා එනම්නීකරණ ස්ථාපනය කළමනාකරණ පද්ධතිය (සුවා ගිග LK) රටු ඉදිරියේ එනම්නීකරණ ලුහුබඩු කිරීම, සම්මතයි කිරීම හා සම්මතයි කිරීම සඳහා ආරක්‍ෂිත වේදිකාවක් සපයා ඇත.',
    'login.hero.footer': 'සෞඛ්‍ය අමාත්‍යාංශ නිල දරුවන් දරුවන්',
    'login.language.english': 'English',
    'login.language.sinhala': 'සිංහල',
    'login.language.tamil': 'தமிழ்',

    // Forgot Password
    'forgotPassword.title': 'මුරපදය නැවත සැකසුම්',
    'forgotPassword.resetPassword': 'මුරපදය නැවත සැකසුම්',
    'forgotPassword.enterEmail': 'ඊ-තැපෙල',
    'forgotPassword.emailHint': 'ඔබගේ ඊ-තැපෙල ලිපිනය ඇතුළු කරන්න සහ අපි OTP එක ඔබගේ ලේඛිත ජංගම දුරකතනයට එවන්නෙමු.',
    'forgotPassword.sendOTP': 'OTP එක යැවි',
    'forgotPassword.otpSent': 'OTP එක එවිණි',
    'forgotPassword.otpSentToMobile': 'OTP එක ඔබගේ ලේඛිත ජංගම දුරකතනයට එවිණි. කරුණාකාරයෙන් එය පහළින් ඇතුළු කරන්න.',
    'forgotPassword.enterOTP': 'OTP කේතය',
    'forgotPassword.otpHint': '6-ඉලක් OTP ඇතුළු කරන්න',
    'forgotPassword.verifyOTP': 'OTP සත්‍යතා කරන්න',
    'forgotPassword.enterNewPassword': 'නව මුරපදය',
    'forgotPassword.confirmPassword': 'මුරපදය තහවුරු කරන්න',
    'forgotPassword.passwordHint': 'මුරපදය අවම වශයෙන් අක්ෂර 6ක් විය යුතුය',
    'forgotPassword.passwordResetSuccess': 'මුරපදය සාර්ථකව නැවත සැකසූ ලදි!',
    'forgotPassword.redirectingToLogin': 'ඉහල ගිය වෙත නැවත යවයි...',
    'forgotPassword.failed': 'මුරපදය නැවත සැකසීම අසාර්ථක විය. කරුණාකාරයෙන් නැවත උත්සාහ කරන්න.',
    'forgotPassword.step1': 'ඉතා කර 1: ඊ-තැපෙල',
    'forgotPassword.step2': 'ඉතා කර 2: OTP',
    'forgotPassword.step3': 'ඉතා කර 3: මුරපදය',
    'forgotPassword.back': 'ආපසු',
    'forgotPassword.invalidEmail': 'කරුණාකාරයෙන් වලංගු ඊ-තැපෙල ලිපිනය ඇතුළු කරන්න',
    'forgotPassword.invalidOTP': 'කරුණාකාරයෙන් OTP එක ඇතුළු කරන්න',
    'forgotPassword.passwordMismatch': 'මුරපද සමපාතනය නොවේ',
    'forgotPassword.passwordTooShort': 'මුරපදය අවම වශයෙන් අක්ෂර 6ක් විය යුතුය',

    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.healthRecords': 'සෞඛ්‍ය වාර්තා',
    'nav.notifications': 'දැනුම්දීම්',
    'nav.growthChart': 'වර්ධනයේ ප්‍රස්තාරය',
    'nav.profile': 'පැතිකඩ',
    'nav.settings': 'සැකසුම්',
    'nav.logout': 'ඉවතට පිටවීම',
    'nav.help': 'උදව් මධ්‍යස්තානය',

    // ...existing code...
    'profile.title': 'පැතිකඩ කළමනාකරණය',
    'profile.viewProfile': 'පැතිකඩ බලන්න',
    'profile.editProfile': 'පැතිකඩ සංස්කරණය කරන්න',
    'profile.fullName': 'සම්පූර්ණ නම',
    'profile.nic': 'ජාතික හැඳුනුම් අංකය',
    'profile.email': 'ඊ-තැපෙල',
    'profile.mobileNumber': 'ජංගම දුරකතනය',
    'profile.address': 'ලිපිනය',
    'profile.linkedChildren': 'සංයුක්ත ළමයින්',
    'profile.accountActivity': 'ගිණුම් ක්‍රියාකාරකම',
    'profile.changePassword': 'මුරපදය වෙනස් කරන්න',
    'profile.changeMobileNumber': 'ජංගම දුරකතනය වෙනස් කරන්න',
    'profile.save': 'වෙනස්කම් සුරකින්න',
    'profile.cancel': 'අවලංගු කරන්න',
    'profile.noLinkedChildren': 'තවම සංයුක්ත ළමයින් නොමැත',

    'profile.changeMobile.title': 'ජංගම දුරකතනය වෙනස් කරන්න',
    'profile.changeMobile.enterNew': 'නව ජංගම දුරකතනය ඇතුළු කරන්න',
    'profile.changeMobile.step1': 'ඉතා කර 1: වෙනස්කම බලන්න',
    'profile.changeMobile.step2': 'ඉතා කර 2: OTP සත්‍යතා කරන්න',
    'profile.changeMobile.step3': 'ඉතා කර 3: යාවත්කාල කිරීම තහවුරු කරන්න',
    'profile.changeMobile.otpSent': 'OTP ඔබගේ නව ජංගම දුරකතනයට යැවිණි',
    'profile.changeMobile.enterOtp': 'OTP කේතය ඇතුළු කරන්න',
    'profile.changeMobile.verify': 'OTP සත්‍යතා කරන්න',
    'profile.changeMobile.verified': 'ජංගම දුරකතනය සාර්ථකව සත්‍යතා කරා ඇත',
    'profile.changeMobile.failed': 'OTP සත්‍යතා කිරීම අසාර්ථක විය',
    'profile.changeMobile.resendOtp': 'OTP නැවත යැවි',

    'vaccine.title': 'එනම්නීකරණ මාර්ගෝපදේශ',
    'vaccine.guide': 'ශ්‍රී ලංකා ජාතික ප්‍රතිශක්තිකරණ වැඩසටහන',
    'vaccine.name': 'එනම්නීකරණ නම',
    'vaccine.manufacturer': 'නිෂ්පාදක',
    'vaccine.dosage': 'පරිමාණය',
    'vaccine.recommendedAge': 'නිර්දේශිත වයස්',
    'vaccine.interval': 'අන්තරාල දින',
    'vaccine.description': 'විස්තරය',

    'vaccine.bcg': 'BCG',
    'vaccine.opv': 'OPV',
    'vaccine.pentavalent': 'පෙන්ටවලන්ට්',
    'vaccine.mmr': 'MMR',
    'vaccine.je': 'JE',
    'vaccine.dpt': 'DPT',
    'vaccine.noData': 'දැනට එන්නත් තොරතුරු නොමැත.',
    'vaccine.scheduleDescription': 'මෙම කාලසටහන ශ්‍රී ලංකාවේ නිල එන්නත් මාර්ගෝපදේශ අනුගමනය කරයි.',

    'notification.title': 'දැනුම්දීම්',
    'notification.upcoming': 'ඉතා අසල එනම්නීකරණ',
    'notification.missed': 'අඩු වූ එනම්නීකරණ',
    'notification.completed': 'එනම්නීකරණ සම්පූර්ණ කිරීම',
    'notification.childLinked': 'ළමා සංයුක්ත',
    'notification.growthUpdate': 'වර්ධනයේ යාවත්කාලීනතා',
    'notification.noNotifications': 'දැනුම්දීම් නොමැත',
    'notification.markAsRead': 'පිටවීමට සටහන් කරන්න',
    'notification.markAllAsRead': 'සියල්ල පිටවීමට සටහන් කරන්න',

    'growth.title': 'වර්ධනයේ ප්‍රස්තාරය',
    'growth.weight': 'බර',
    'growth.height': 'උසස්',
    'growth.headCircumference': 'හිස සිරුමාවිය',
    'growth.lastVisit': 'අවසාන පිටිසටහනිය',
    'growth.export': 'CSV පිටවතින්න',
    'growth.print': 'වාර්තා මුද්‍රණය කරන්න',

    'common.save': 'සුරකින්න',
    'common.cancel': 'අවලංගු කරන්න',
    'common.delete': 'මකා දමන්න',
    'common.edit': 'සංස්කරණය කරන්න',
    'common.back': 'ආපසු',
    'common.loading': 'පූරණය වෙමින්...',
    'common.error': 'දෝෂය',
    'common.success': 'සාර්ථකතාවය',
    'common.close': 'වසන්න',
    'common.submit': 'යොමු කරන්න',
    'common.searchPlaceholder': 'දත්ත ලක්ෂ්‍ය සොයන්න...',
    'common.overview': 'සමීක්ෂණය',

    'status.pending': 'අපේක්‍ෂණීයතාව',
    'status.completed': 'සම්පූර්ණ කිරීම',
    'status.missed': 'අඩු වූ',
    'status.cancelled': 'අවලංගු කරණි',
    'status.scheduled': 'පිළිවෙළින් සටහන් කිරීම',
    'status.active': 'සක්‍රිය',

    // Audit Logs
    'audit.title': 'විගණන සටහන්',
    'audit.searchPlaceholder': 'පරිශීලක, ක්‍රියාව හෝ විස්තර මගින් සොයන්න...',
    'audit.filterAllRoles': 'සියලුම භූමිකාවන්',
    'audit.filterPhm': 'PHM',
    'audit.filterParent': 'මව්පියන්',
    'audit.filterMoh': 'MOH නිලධාරී',
    'audit.colTimestamp': 'කාලමුද්‍රාව',
    'audit.colUser': 'පරිශීලක',
    'audit.colAction': 'ක්‍රියාව',
    'audit.colDetails': 'විස්තර',
    'audit.noLogs': 'ඔබේ සෙවුම් නිර්ණායකවලට ගැලපෙන විගණන සටහන් හමු නොවීය.',
    'audit.showingLogs': 'විගණන සටහන් {total} කින් {count} ක් පෙන්වයි',
    'audit.export': 'සටහන් අපනයනය කරන්න',
    'audit.subtitle': 'ආරක්ෂාව සහ අනුකූලතාවය සඳහා SuwaCare LK පද්ධති ක්‍රියාකාරකම් සහ පරිශීලක ක්‍රියා බලන්න.',

    // Common Additional
    'common.backToDashboard': 'ප්‍රධාන පුවරුවට ආපසු යන්න',

    // MOH System Overview Report
    'report.title': 'පද්ධති දළ විශ්ලේෂණ වාර්තාව',
    'report.filters': 'වාර්තා පෙරහන්',
    'report.startDate': 'ආරම්භක දිනය',
    'report.endDate': 'අවසාන දිනය',
    'report.refresh': 'වාර්තාව යාවත්කාලීන කරන්න',
    'report.loading': 'වාර්තාව පූරණය වෙමින්...',
    'report.downloadPdf': 'PDF බාගත කරන්න',
    'report.period': 'කාලසීමාව',
    'report.generated': 'ජනනය කරන ලද්දේ',
    'report.summary': 'විධායක සාරාංශය',
    'report.totalChildren': 'මුළු දරුවන් සංඛ්‍යාව',
    'report.linkedChildren': 'සම්බන්ධිත දරුවන්',
    'report.vaccinationRecords': 'එන්නත් වාර්තා',
    'report.coverage': 'ආවරණය',
    'report.administered': 'ලබා දී ඇති',
    'report.pending': 'අපේක්ෂිත',
    'report.overdue': 'ප්‍රමාද වූ',
    'report.phmUsers': 'PHM පරිශීලකයින්',
    'report.insights': 'ප්‍රධාන නිරීක්ෂණ',
    'report.coverageByRegion': 'කලාපය අනුව ආවරණය',
    'report.vaccinationTrends': 'එන්නත් කිරීමේ ප්‍රවණතා (පසුගිය මාස 12)',
    'report.month': 'මාසය',
    'report.administeredTitle': 'ලබා දී ඇති',
    'report.overdueTitle': 'ප්‍රමාද වූ',
    'report.registered': 'ලියාපදිංචි වී ඇති',
    'report.vaccinated': 'එන්නත් ලබා දී ඇති',
    'report.vaccine': 'එන්නත',
    'report.totalDoses': 'මුළු මාත්‍රාවන්',
    'report.missed': 'අතපසු වූ',
    'report.completion': 'සම්පූර්ණ කිරීමේ %',
    'report.gnDivision': 'ග්‍රාම නිලධාරී වසම',
    'report.vaccinePerformance': 'එන්නත් වල ක්‍රියාකාරිත්වය',
    'report.trendMonths': 'ප්‍රවණතා මාස',
    'report.coverageByGnDivision': 'ග්‍රාම නිලධාරී වසම අනුව ආවරණය',
    'report.totalDosesTitle': 'මුළු මාත්‍රාවන්',
    'report.missedTitle': 'අතපසු වූ',
    'report.completionTitle': 'සම්පූර්ණ කිරීමේ %',
    'report.dataQuality': 'දත්ත ගුණාත්මක ලකුණු පුවරුව',
    'report.databaseFootprint': 'දත්ත සමුදායේ පියසටහන',
    'report.monthlyTrend': 'මාසික ප්‍රවණතාවය',
    'report.newChildren': 'නව දරුවන්',
    'report.notifications': 'දැනුම්දීම්',
    'report.auditEvents': 'විගණන සිදුවීම්',
    'report.footerText': 'මෙම වාර්තාව ජාතික ළමා එන්නත් කළමනාකරණ පද්ධතිය මගින් ස්වයංක්‍රීයව ජනනය කරන ලදී',
    'report.description': 'විශ්ලේෂණය සහ වාර්තා තැබීම සඳහා සුවා ගිග LK එන්නත් වාර්තා ජනනය කරන්න.',
    'report.generateError': 'වාර්තාව ජනනය කිරීමට අපොහොසත් විය. කරුණාකර නැවත උත්සාහ කරන්න.',
    'report.invalidType': 'වැරදි වාර්තා වර්ගය',
    'report.downloadFailed': '{format.toUpperCase()} ලෙස බාගත කිරීම අසාර්ථක විය.',
    'report.generateSuccess': 'ඔබගේ වාර්තාව සාර්ථකව ජනනය කරන ලදී.',
    'report.type': 'වාර්තා වර්ගය:',
    'report.dateRange': 'දින පරාසය:',
    'report.userRole': 'පරිශීලක භූමිකාව:',
    'report.allRoles': 'සියලුම භූමිකාවන්',
    'report.allDivisions': 'සියලුම කොට්ඨාස',
    'report.selectType': 'වාර්තා වර්ගය තෝරන්න *',
    'report.generating': 'ජනනය කරමින්...',
    'report.generate': 'වාර්තාව ජනනය කරන්න',
    'report.downloadCsv': 'CSV බාගත කරන්න',

    // PHM Vaccination Clinic
    'clinic.title': 'එන්නත් සායන',
    'clinic.createTitle': 'නව එන්නත් සායනයක් සාදන්න',
    'clinic.date': 'සායන දිනය',
    'clinic.gnDivision': 'ග්‍රාම නිලධාරී වසම',
    'clinic.location': 'ස්ථානය',
    'clinic.description': 'විස්තරය',
    'clinic.createSuccess': 'එන්නත් සායනය සාර්ථකව සාදන ලදී!',
    'clinic.createError': 'එන්නත් සායනය සෑදීමට අපොහොසත් විය',
    'clinic.loadError': 'සායන පූරණය කිරීමට අපොහොසත් විය',
    'clinic.detailsTitle': 'සායන විස්තර',
    'clinic.dueChildren': 'එන්නත් ලබා දිය යුතු දරුවන්',
    'clinic.attendance': 'පැමිණීම ලුහුබැඳීම',
    'clinic.markAttended': 'පැමිණි බව සලකුණු කරන්න',
    'clinic.markNotAttended': 'නොපැමිණි බව සලකුණු කරන්න',
    'clinic.attendanceSuccess': 'පැමිණීම සාර්ථකව සලකුණු කරන ලදී!',
    'clinic.status': 'තත්ත්වය',
    'clinic.actions': 'ක්‍රියා',
    'clinic.viewDetails': 'විස්තර බලන්න',
    'clinic.noClinics': 'සායන කිසිවක් සැලසුම් කර නොමැත',
    'clinic.listTitle': 'සැලසුම් කළ සායන',
    'clinic.subtitle': 'ඔබේ ප්‍රදේශයේ එන්නත් ලබා දෙන සායන කළමනාකරණය කරන්න',
    'clinic.scheduleFirst': 'ඔබේ පළමු එන්නත් සායනය සැලසුම් කරන්න',
    'clinic.createClinic': 'එන්නත් සායනය සාදන්න',
    'clinic.assignedArea': 'ඔබට පවරා ඇති ප්‍රදේශය',
    'clinic.optional': 'අත්‍යවශ්‍ය නොවේ',
    'clinic.marking': 'සුරකිමින්...',
    'clinic.regNum': 'ලියාපදිංචි අංකය',

    // Notifications Additional
    'notification.unread': 'නොකියවූ දැනුම්දීම් {count} ක් ඇත',
    'notification.allCaughtUp': 'ඔබ සියල්ල කියවා ඇත!',
    'notification.markAllAsRead': 'සියල්ල කියවූ බව සලකුණු කරන්න',
    'notification.filterAll': 'සියල්ල',

    // Profile Additional
    'profile.subtitle': 'ඔබේ පැතිකඩ, ආරක්ෂාව සහ ගිණුම් මනාපයන් කළමනාකරණය කරන්න',
    'profile.details': 'පැතිකඩ විස්තර',
    'profile.changeMobile': 'ජංගම දුරකතනය වෙනස් කරන්න',
    'profile.linkedChildrenTab': 'සම්බන්ධිත දරුවන්',
    'profile.updateSuccess': 'පැතිකඩ සාර්ථකව යාවත්කාලීන කරන ලදී',
    'profile.updateError': 'පැතිකඩ යාවත්කාලීන කිරීමට අපොහොසත් විය',
    'profile.mobileUpdateSuccess': 'ජංගම දුරකතන අංකය සාර්ථකව යාවත්කාලීන කරන ලදී',
    'profile.mobileVerifyError': 'OTP සත්‍යාපනය කිරීමට අපොහොසත් විය',
    'profile.passwordSuccess': 'මුරපදය සාර්ථකව වෙනස් කරන ලදී',
    'profile.passwordError': 'මුරපදය වෙනස් කිරීමට අපොහොසත් විය',
    'profile.passwordMismatch': 'නව මුරපද නොගැලපේ',
    'profile.fillAllFields': 'කරුණාකර සියලුම ක්ෂේත්‍ර පුරවන්න',
    'profile.saving': 'සුරකිමින්...',
    'profile.verifying': 'සත්‍යාපනය කරමින්...',
    'profile.mobileChangeHint': 'මෙය යාවත්කාලීන කිරීමට "ජංගම දුරකතනය වෙනස් කරන්න" ටැබය භාවිතා කරන්න',
    'profile.oldPassword': 'පැරණි මුරපදය',
    'profile.newPassword': 'නව මුරපදය',
    'profile.confirmPassword': 'මුරපදය තහවුරු කරන්න',
    'profile.passwordChangeHint': 'ඔබගේ වර්තමාන මුරපදය ඇතුළත් කර නව ආරක්ෂිත මුරපදයක් තෝරන්න.',
    'profile.enterCurrentPassword': 'ඔබගේ වර්තමාන (තාවකාලික) මුරපදය ඇතුළත් කරන්න',
    'profile.enterNewPassword': 'නව ආරක්ෂිත මුරපදයක් ඇතුළත් කරන්න',
    'profile.reEnterNewPassword': 'ඔබගේ නව මුරපදය නැවත ඇතුළත් කරන්න',
    'profile.updating': 'මුරපදය යාවත්කාලීන කරමින්...',
    'profile.updatePassword': 'මුරපදය යාවත්කාලීන කරන්න',

    // Add Child Additional
    'addChild.title': 'ඔබේ දරුවා සම්බන්ධ කරන්න',
    'addChild.subtitle': 'ඔබේ දරුවාව ඔබේ ගිණුමට සම්බන්ධ කිරීම සඳහා එන්නත් පොතේ ලියාපදිංචි අංකය ඇතුළත් කරන්න.',
    'addChild.regNumLabel': 'ලියාපදිංචි අංකය',
    'addChild.regNumPlaceholder': 'උදා: CMB/123/2026',
    'addChild.searchBtn': 'දරුවා සොයන්න',
    'addChild.searching': 'සොයමින්...',
    'addChild.confirmTitle': 'දරුවාගේ විස්තර තහවුරු කරන්න',
    'addChild.confirmText': 'මෙය ඔබේ දරුවාද? ලියාපදිංචි කර ඇති WhatsApp අංකයට අපි සත්‍යාපන කේතයක් එවන්නෙමු.',
    'addChild.sendOtp': 'සත්‍යාපන කේතය එවන්න',
    'addChild.otpTitle': 'අනන්‍යතාවය සත්‍යාපනය කරන්න',
    'addChild.otpText': 'ලියාපදිංචි WhatsApp අංකයට ඉලක්කම් 6ක සත්‍යාපන කේතයක් එවා ඇත.',
    'addChild.otpPlaceholder': 'ඉලක්කම් 6ක කේතය ඇතුළත් කරන්න',
    'addChild.verifyBtn': 'සත්‍යාපනය කර දරුවා සම්බන්ධ කරන්න',
    'addChild.successTitle': 'සාර්ථකව සම්බන්ධ කරන ලදී!',
    'addChild.successText': 'ඔබේ දරුවා ඔබේ ගිණුමට සම්බන්ධ කර ඇත.',
    'addChild.errorNoChild': 'මෙම ලියාපදිංචි අංකය සහිත දරුවෙකු හමු නොවීය. කරුණාකර පරීක්ෂා කර නැවත උත්සාහ කරන්න.',
    'addChild.errorSearch': 'සෙවීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.',
    'addChild.errorOtpInvalid': 'ඔබ ඇතුළත් කළ කේතය වැරදියි. කරුණාකර පරීක්ෂා කර නැවත උත්සාහ කරන්න.',
    'addChild.errorOtpExpired': 'මෙම සත්‍යාපන කේතය කල් ඉකුත් වී ඇත. කරුණාකර නව කේතයක් ඉල්ලන්න.',
    'addChild.errorOtpMaxAttempts': 'උපරිම සත්‍යාපන උත්සාහයන් ප්‍රමාණය ඉක්මවා ඇත. කරුණාකර නව කේතයක් ඉල්ලන්න.',
    'addChild.errorAlreadyConsumed': 'මෙම කේතය දැනටමත් භාවිතා කර ඇත. දරුවා දැනටමත් ඔබේ ගිණුමට සම්බන්ධ වී තිබිය හැක.',
    'addChild.errorNotFound': 'දරුවා හෝ OTP සැසිය හමු නොවීය. කරුණාකර නැවත ආරම්භ කරන්න.',
    'addChild.foundTitle': 'දරුවා හමුවිය!',
    'addChild.foundText': 'ලියාපදිංචි කර ඇති WhatsApp අංකයට සත්‍යාපන කේතයක් එවීමට ඉල්ලන්න.',
    'addChild.resendCode': 'කේතය නැවත එවන්න',
    'addChild.attempts': 'උත්සාහයන්: {total} කින් {count}',
    'addChild.codeExpires': 'කේතය කල් ඉකුත් වන්නේ: {time}',
    'addChild.redirecting': 'ප්‍රධාන පුවරුවට යොමු කරමින්...',
    'addChild.whereToFind': 'ඔබේ ලියාපදිංචි අංකය සොයා ගන්නේ කොහෙන්ද?',
    'addChild.whereToFindText': 'ඔබේ දරුවා පද්ධතියේ ලියාපදිංචි කරන විට මහජන සෞඛ්‍ය පවුල් සෞඛ්‍ය සේවිකාව (PHM) විසින් ලියාපදිංචි අංකය ලබා දෙනු ලැබේ. එය ඉහත පෙන්වා ඇති ආකෘතියෙන් විය යුතුය. සම්බන්ධ කිරීම ඔබේ ජංගම දුරකතනයට එවන ලද කේතයක් මගින් සත්‍යාපනය වේ.',
    'addChild.formatHint': 'ආකෘතිය: NCVMS-YYYY-MMDD-XXXX (උදා: NCVMS-2024-0815-1234)',
    'addChild.selectChild': 'දරුවෙකු තෝරන්න',
    'addChild.addAnotherChild': 'තවත් දරුවෙකු එකතු කරන්න',

    // Baby Registration Additional
    'babyReg.title': 'නව බිළිඳු ලියාපදිංචිය',
    'babyReg.subtitle': 'දරුවාගේ එන්නත් කාලසටහන ලුහුබැඳීම ආරම්භ කිරීම සඳහා SuwaCare LK පද්ධතියට නව දරුවෙකු ලියාපදිංචි කරන්න.',
    'babyReg.firstName': 'මුල් නම',
    'babyReg.lastName': 'වාසගම',
    'babyReg.dob': 'උපන් දිනය',
    'babyReg.gender': 'ස්ත්‍රී/පුරුෂ භාවය',
    'babyReg.genderMale': 'පුරුෂ',
    'babyReg.genderFemale': 'ස්ත්‍රී',
    'babyReg.genderOther': 'වෙනත්',
    'babyReg.birthWeight': 'උපන් බර (කිලෝග්‍රෑම්)',
    'babyReg.birthHeight': 'උපන් උස (සෙන්ටිමීටර)',
    'babyReg.motherName': 'මවගේ නම',
    'babyReg.motherNic': 'මවගේ ජාතික හැඳුනුම්පත් අංකය',
    'babyReg.fatherName': 'පියාගේ නම',
    'babyReg.fatherNic': 'පියාගේ ජාතික හැඳුනුම්පත් අංකය',
    'babyReg.address': 'නිවසේ ලිපිනය',
    'babyReg.whatsapp': 'මව්පියන්ගේ WhatsApp අංකය',
    'babyReg.whatsappHint': 'ස්වයංක්‍රීය මතක් කිරීම් සහ OTP සත්‍යාපනය සඳහා භාවිතා වේ',
    'babyReg.submitBtn': 'දරුවා ලියාපදිංචි කරන්න',
    'babyReg.successTitle': 'දරුවා සාර්ථකව ලියාපදිංචි කරන ලදී!',
    'babyReg.successText': 'දරුවා පද්ධතියට ඇතුළත් කර ඇත. කරුණාකර ලියාපදිංචි අංකය මව්පියන් සමඟ බෙදා ගන්න.',
    'babyReg.regNumLabel': 'ලියාපදිංචි අංකය',
    'babyReg.copyBtn': 'පිටපත් කරන්න',
    'babyReg.copied': 'පිටපත් කරන ලදී!',
    'babyReg.printBtn': 'විස්තර මුද්‍රණය කරන්න',
    'babyReg.registerAnother': 'තවත් දරුවෙකු ලියාපදිංචි කරන්න',
    'babyReg.errorArea': 'ඔබට පවරා ඇති ග්‍රාම නිලධාරී වසම තීරණය කිරීමට නොහැකි විය. කරුණාකර පරිපාලක අමතන්න.',
    'babyReg.errorWeight': 'කරුණාකර නිවැරදි උපන් බර සහ උස ඇතුළත් කරන්න.',
    'babyReg.errorServer': 'ලියාපදිංචිය අසාර්ථක විය. පද්ධතිය විසින් ලියාපදිංචි අංකයක් ලබා නොදෙන ලදී.',
    'babyReg.parentInfo': 'මව්පියන්ගේ විස්තර',
    'babyReg.locationInfo': 'ස්ථාන විස්තර',
    'babyReg.selectGender': 'ස්ත්‍රී/පුරුෂ භාවය තෝරන්න',
    'babyReg.district': 'දිස්ත්‍රික්කය',
    'babyReg.dsDivision': 'ප්‍රාදේශීය ලේකම් කොට්ඨාසය',
    'babyReg.gnDivision': 'ග්‍රාම නිලධාරී වසම',
    'babyReg.loadingArea': 'ඔබට පවරා ඇති ප්‍රදේශය පූරණය වෙමින්...',
    'babyReg.areaError': 'පවරා ඇති ප්‍රදේශය පූරණය කිරීමට නොහැකි විය',
    'babyReg.gnHint': 'ඔබේ ග්‍රාම නිලධාරී වසම ඔබේ PHM ගිණුම් සැකසුම මත පදනම්ව ස්වයංක්‍රීයව පවරනු ලබන අතර එය අතින් වෙනස් කළ නොහැක.',
    'babyReg.addressInfo': 'ලිපිනය පිළිබඳ විස්තර',
    'babyReg.mohDivision': 'MOH කොට්ඨාසය',
    'babyReg.selectMoh': 'MOH කොට්ඨාසය තෝරන්න',
    'babyReg.fullAddress': 'සම්පූර්ණ ලිපිනය',

    // General Clinic Additional
    'clinic.normalTitle': 'ළමා සුබසාධන සායන',
    'clinic.normalSubtitle': 'නිතිපතා ළමා සුබසාධනය සහ වර්ධනය අධීක්ෂණය කිරීමේ සායන කළමනාකරණය කරන්න',
    'clinic.normalCreateTitle': 'නව සුබසාධන සායනයක් සාදන්න',
    'clinic.normalCreateSuccess': 'ළමා සුබසාධන සායනය සාර්ථකව සාදන ලදී!',
    'clinic.normalNoClinics': 'සුබසාධන සායන කිසිවක් සැලසුම් කර නොමැත',

    // Record Vaccination Additional
    'recordVac.title': 'එන්නත් ලබා දීම වාර්තා කරන්න',
    'recordVac.subtitle': 'ඔබේ ප්‍රදේශයේ දරුවෙකුට ලබා දුන් එන්නතක් වාර්තා කරන්න',
    'recordVac.selectChild': 'දරුවා තෝරන්න',
    'recordVac.selectVaccine': 'එන්නත තෝරන්න',
    'recordVac.doseNumber': 'මාත්‍රා අංකය',
    'recordVac.dateGiven': 'එන්නත ලබා දුන් දිනය',
    'recordVac.batchNumber': 'කාණ්ඩ අංකය',
    'recordVac.administeredBy': 'එන්නත ලබා දුන් පුද්ගලයා',
    'recordVac.location': 'සායන ස්ථානය',
    'recordVac.site': 'එන්නත් ස්ථානය',
    'recordVac.nextDueDate': 'මීළඟ දිනය (අත්‍යවශ්‍ය නොවේ)',
    'recordVac.notes': 'සටහන්',
    'recordVac.submitBtn': 'වාර්තාව සුරකින්න',
    'recordVac.successMsg': 'එන්නත් වාර්තාව සාර්ථකව සුරකින ලදී!',
    'recordVac.errorMsg': 'එන්නත් වාර්තාව සුරැකීමට අපොහොසත් විය. කරුණාකර නැවත උත්සාහ කරන්න.',
    'recordVac.dueTitle': 'එන්නත් ලබා දිය යුතු දරුවන්',
    'recordVac.noDue': 'ඔබේ ප්‍රදේශයේ දැනට එන්නත් ලබා දිය යුතු දරුවන් නැත',
    'recordVac.updateSuccess': 'එන්නත් වාර්තාව සාර්ථකව යාවත්කාලීන කරන ලදී.',
    'recordVac.updateDescription': 'ලියාපදිංචි කර ඇති දරුවෙකුගේ එන්නත් විස්තර යාවත්කාලීන කරන්න.',
    'recordVac.selectSite': 'ස්ථානය තෝරන්න',
    'recordVac.notesPlaceholder': 'අමතර සටහන් හෝ නිරීක්ෂණ...',

    // Growth Additional
    'growth.loading': 'ලෝක සෞඛ්‍ය සංවිධානයේ වර්ධන ප්‍රස්තාරය පූරණය වෙමින්...',
    'growth.noData': 'මෙම දරුවා සඳහා වර්ධන දත්ත නොමැත.',
    'growth.error': 'ලෝක සෞඛ්‍ය සංවිධානයේ වර්ධන ප්‍රස්තාර දත්ත පූරණය කිරීමට අපොහොසත් විය.',

    // Vaccination Card
    'vacCard.title': 'එන්නත් කාඩ්පත්',
    'vacCard.subtitle': 'නිල එන්නත් වාර්තාව',
    'vacCard.idLabel': 'හැඳුනුම්කරණ අංකය',
    'vacCard.ageLabel': 'වයස්',
    'vacCard.parentLabel': 'මව්පියා',
    'vacCard.addressLabel': 'ලිපිනය',
    'vacCard.historyTitle': 'එන්නත් ලිපිනය',
    'vacCard.colVaccine': 'එන්නත',
    'vacCard.colDose': 'මාත්‍රාව',
    'vacCard.colDate': 'දිනය',
    'vacCard.colStatus': 'තත්ත්වය',
    'vacCard.certifiedMsg': 'නිල වශයෙන් සම්මතයි කර ඇත',
    'vacCard.generatedLabel': 'ජනනය කරන ලදී',
    'vacCard.downloadBtn': 'කාඩ්පත් බාගත කරන්න',
    'vacCard.loading': 'එන්නත් කාඩ්පත් පූරණය වෙමින්...',

    // Parent Dashboard
    'parentDashboard.title': 'දරුවා කළමනාකරණකරු Dashboard',
    'parentDashboard.subtitle': 'ඔබේ දරුවाගේ එන්නත් තත්ත්වය සහ ඉතා අසල සෞඛ්‍ය සිටුවීම් අධීක්ෂණ කරන්න.',
    'parentDashboard.parentAccount': 'දරුවා කළමනාකරණකරු ගිණුම',
    'parentDashboard.parentPortal': 'දරුවා කළමනාකරණකරු වහලුම',
    'parentDashboard.vaccinationManagement': 'එන්නත් කළමනාකරණය',
    'parentDashboard.linkedChildren': 'සම්බන්ධිත දරුවන්',
    'parentDashboard.registered': 'ලියාපදිංචි කර ඇත',
    'parentDashboard.recentRecords': 'මෑත්කාලීන වාර්තා',
    'parentDashboard.addAnotherChild': 'තවත් දරුවෙකු එකතු කරන්න',
    'parentDashboard.usingRegistration': 'ලියාපදිංචි අංකය භාවිතා කරමින්',
    'parentDashboard.appointmentPending': 'පත්‍රගත කිරීම අපේක්‍ෂිතයි',
    'parentDashboard.nextDose': 'ඉතා අසල එන්නත',
    'parentDashboard.upcoming': 'ඉතා අසල',
    'parentDashboard.missed': 'අතපසු වූ',
    'parentDashboard.viewFullHistory': 'සම්පූර්ණ ඉතිහාසය බලන්න',
    'parentDashboard.noRecords': 'තවත් එන්නත් වාර්තා නොමැත.',
    'parentDashboard.childName': 'දරුවාගේ නම',
    'parentDashboard.vaccine': 'එන්නත',
    'parentDashboard.dateAdministered': 'එන්නත ලබා දුන් දිනය',
    'parentDashboard.officerPhm': 'නිලධාරී/PHM',
    'parentDashboard.action': 'ක්‍රියාව',
    'parentDashboard.view': 'බලන්න',
    'parentDashboard.overdue': 'ප්‍රමාද වූ',
    'parentDashboard.dueIn': 'වලට ඉතා අසල',
    'parentDashboard.days': 'දින',
    'parentDashboard.children': 'දරුවන්',
    'parentDashboard.welcomeBack': 'ඔබගේ dashboard බලා පිටිසටහනිය',
    'parentDashboard.quickActions': 'ඉක්මන් ක්‍රියා',
    'parentDashboard.bookAppointment': 'පත්‍රගත කිරීම කරන්න',
    'parentDashboard.growthCharts': 'වර්ධන ප්‍රස්තාර සහ සිටුවීම්',
    'parentDashboard.milestones': 'සිටුවීම්',
    'parentDashboard.home': 'නිවස',
    'parentDashboard.records': 'වාර්තා',
    'parentDashboard.appointments': 'පත්‍රගතකිරීම්',
    'parentDashboard.vaccineGuide': 'එන්නත් මාර්ගෝපදේශ',
    'parentDashboard.loading': 'dashboard පූරණය වෙමින්…',

    // MOH Dashboard
    'moh.subtitle': 'ජාතික ළමා එන්නත් විශ්ලේෂණ',
    'moh.searchPlaceholder': 'දත්ත ලක්ෂ්‍ය සොයන්න...',
    'moh.officerTitle': 'ප්‍රාදේශීය වෛද්‍ය නිලධාරී',
    'moh.regionalAnalytics': 'ප්‍රාදේශීය විශ්ලේෂණ',
    'moh.phmReports': 'PHM වාර්තා',
    'moh.phmManagement': 'PHM කළමනාකරණය',
    'moh.systemHealth': 'පද්ධති සෞඛ්‍යය',
    'moh.dataLive': 'දත්ත පවතී: කොළඹ දිස්ත්‍රික්කය',
    'moh.analyticsDashboard': 'නිලධාරී විශ්ලේෂණ Dashboard',
    'moh.dashboardDescription': 'බස්නාහිර පළාත් පුර තුළ එන්නත් ආවරණය සහ PHM කාර්ය සාධනය තත්කාලික වශයෙන්.',
    'moh.systemOverview': 'පද්ධති දළුඬ',
    'moh.auditLogs': 'තක්සා ලොග්',
    'moh.viewProfile': 'පැතිකඩ බලන්න',

    // MOH PHM Management
    'mohPhm.title': 'PHM කළමනාකරණය',
    'mohPhm.subtitle': 'ඔබගේ කලාපය යටතේ PHM කලාප, නිලධාරීන් සහ පැවරුම් කළමනාකරණය කරන්න.',
    'mohPhm.createAccount': 'PHM ගිණුමක් සාදන්න',
    'mohPhm.createDescription': 'MOH නිලධාරීන්ට ඔවුන්ගේ කලාප සඳහා PHM ගිණුන් සෑදිය හැක. පළමු ප්‍රවේශ වීම සඳහා තාවකාලික මුරපදයක් ජනනය කරනු ලැබේ.',
    'mohPhm.mohOnly': 'MOH-පමණක් • PHM ස්වයියාව ලියාපදිංචි කළ නොහැක',
    'mohPhm.employeeId': 'සේවක අනුක්‍රම අංකය',
    'mohPhm.employeeIdPlaceholder': 'උදාහර. PHM001',
    'mohPhm.fullName': 'සම්පූර්ණ නම',
    'mohPhm.fullNamePlaceholder': 'PHM සම්පූර්ණ නම',
    'mohPhm.nic': 'NIC',
    'mohPhm.nicPlaceholder': 'ජාතික හැඳුනුම් අංකය',
    'mohPhm.email': 'විද්‍යුතර ලිපිනය',
    'mohPhm.emailPlaceholder': 'PHM විද්‍යුතර ලිපිනය',
    'mohPhm.phoneNumber': 'දුරකථන අංකය',
    'mohPhm.phonePlaceholder': 'සබඳපැති අංකය',
    'mohPhm.assignedDivision': 'පැවරුණු GN කොට්ඨාසය',
    'mohPhm.selectDivision': 'GN කොට්ඨාසයක් තෝරන්න (පැවරුම් නොකළ පමණක්)',
    'mohPhm.allAssigned': 'සියලුම කලාප පැවරුණි',
    'mohPhm.showingAreas': 'පැවරුම් නොකළ {count} ප්‍රදේශ{s} පෙන්වයි',
    'mohPhm.createSuccess': 'PHM ගිණුම සාර්ථකව සාදන ලදී.',
    'mohPhm.createError': 'PHM ගිණුක් සෑදීමට අසාර්ථක විය. විස්තර පරීක්ෂා කර නැවත උත්සාහ කරන්න.',
    'mohPhm.employeeIdLabel': 'සේවක අනුක්‍රම අංකය:',
    'mohPhm.userIdLabel': 'පරිශීලක අනුක්‍රම අංකය:',
    'mohPhm.tempPasswordLabel': 'තාවකාලික මුරපදය:',
    'mohPhm.sharePassword': 'කරුණාකර මෙම තාවකාලික මුරපදය ආරක්ෂිත මාධ්‍යයක් හරහා PHM සමඟ බෙදා සඳහා. ඔවුන් පළමු ප්‍රවේශ වීමේදී එය වෙනස් කළ යුතුය.',
    'mohPhm.creating': 'PHM ගිණුක් සෑදමින්...',
    'mohPhm.assignmentsTitle': 'PHM ප්‍රදේශ පැවරුම්',
    'mohPhm.assignmentsDescription': 'සියලුම PHM සහ ඔවුන්ගේ පැවරුණු GN කොට්ඨාස බලන්න. සෑම ප්‍රදේශයක් එක් PHM එකට පමණක් පැවරුම් කළ හැක.',
    'mohPhm.totalPhms': 'එකතු: {count} PHM{s}',
    'mohPhm.loading': 'PHM පැවරුම් පූරණය වෙමින්...',
    'mohPhm.noAssignments': 'තවම PHM පැවරුම් නැත',
    'mohPhm.colEmployeeId': 'සේවක අනුක්‍රම අංකය',
    'mohPhm.colName': 'නම',
    'mohPhm.colAssignedArea': 'පැවරුණු ප්‍රදේශය',
    'mohPhm.colUserId': 'පරිශීලක අනුක්‍රම අංකය',
  },

  ta: {
    // App
    'app.title': 'சுவா கிக் LK',
    'app.subtitle': 'தேசிய குழந்தை வைரஸ் நிர்வாக முறை',

    // Login Page
    'login.title': 'உங்கள் கணக்கில் உள் நுழையவும்',
    'login.subtitle': 'வரவேற்கிறோம். போர்டலுக்கு அணுக உங்கள் நம்பிக்கைகளை உள் நுழையவும்.',
    'login.welcome': 'வரவேற்கிறோம்',
    'login.credentials': 'உங்கள் நம்பிக்கைகளை உள் நுழையவும்',
    'login.nicOrEmail': 'தேசிய அடையாள அல்லது மின்னஞ்சல் முகவரி',
    'login.password': 'கடவுச்சொல்',
    'login.enterPassword': 'உங்கள் கடவுச்சொல்லை உள் நுழையவும்',
    'login.signIn': 'உள் நுழைகிறது',
    'login.invalidCredentials': 'தவறான பயனர் பெயர் அல்லது கடவுச்சொல். மீண்டும் முயற்சி செய்யவும்.',
    'login.forgotPassword': 'கடவுச்சொல் மறந்துவிட்டீர்களா?',
    'login.newToMohPortal': 'தளத்தில் புதியவரா?',
    'login.dontHaveAccount': 'கணக்கு இல்லையா? இப்போது ஒன்றை உருவாக்கவும்.',
    'login.createAccount': 'கணக்கை உருவாக்கவும்',
    'login.selectLanguage': 'மொழியைத் தேர்ந்தெடுக்கவும்',
    'login.languageHint': 'முழு பயன்பாட்டிற்கு உங்கள் விரும்பிய மொழியைத் தேர்ந்தெடுக்கவும்',
    'login.hero.title': 'அடுத்த தலைமுறையைப் பாதுகாத்தல்',
    'login.hero.description': 'தேசிய குழந்தை வைரஸ் நிர்வாக முறை (சுவா கிக் LK) நாடு முழுவதும் வைரஸ் ஐக்கியம், அட்டவணைப்படுத்தல் மற்றும் சான்றிப்படுத்தலுக்கான பாதுகாப்பான தளத்தை வழங்குகிறது.',
    'login.hero.footer': 'சுகாதார அமைச்சர் அதிகாரப்பூர்வ போர்டல்',
    'login.language.english': 'English',
    'login.language.sinhala': 'සිංහල',
    'login.language.tamil': 'தமிழ்',

    // Forgot Password
    'forgotPassword.title': 'கடவுச்சொல்லை மீட்டமைக்கவும்',
    'forgotPassword.resetPassword': 'கடவுச்சொல்லை மீட்டமைக்கவும்',
    'forgotPassword.enterEmail': 'மின்னஞ்சல் முகவரி',
    'forgotPassword.emailHint': 'உங்கள் மின்னஞ்சல் முகவரியை உள் நுழையவும் மற்றும் உங்கள் பதிவுசெய்த கைபேசி எண்ணுக்கு OTP ஐ அனுப்புவோம்.',
    'forgotPassword.sendOTP': 'OTP அனுப்பவும்',
    'forgotPassword.otpSent': 'OTP அனுப்பப்பட்டுவிட்டது',
    'forgotPassword.otpSentToMobile': 'OTP உங்கள் பதிவுசெய்த கைபேசி எண்ணுக்கு அனுப்பப்பட்டுவிட்டது. கீழே உள் நுழையவும்.',
    'forgotPassword.enterOTP': 'OTP குறியீடு',
    'forgotPassword.otpHint': '6-இலக்க OTP உள் நுழையவும்',
    'forgotPassword.verifyOTP': 'OTP சரிபார்க்கவும்',
    'forgotPassword.enterNewPassword': 'புதிய கடவுச்சொல்',
    'forgotPassword.confirmPassword': 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    'forgotPassword.passwordHint': 'கடவுச்சொல் குறைந்தபட்சம் 6 வர்ணங்களாக இருக்க வேண்டும்',
    'forgotPassword.passwordResetSuccess': 'கடவுச்சொல் வெற்றிகரமாக மீட்டமைக்கப்பட்டுவிட்டது!',
    'forgotPassword.redirectingToLogin': 'உள் நுழைதலுக்கு திரும்பினால்...',
    'forgotPassword.failed': 'கடவுச்சொல்லை மீட்டமைக்க முடியவில்லை. மீண்டும் முயற்சி செய்யவும்.',
    'forgotPassword.step1': 'படி 1: மின்னஞ்சல்',
    'forgotPassword.step2': 'படி 2: OTP',
    'forgotPassword.step3': 'படி 3: கடவுச்சொல்',
    'forgotPassword.back': 'பின்னுக்கு',
    'forgotPassword.invalidEmail': 'செல்லுபடியாகும் மின்னஞ்சல் முகவரியை உள் நுழையவும்',
    'forgotPassword.invalidOTP': 'OTP உல் நுழையவும்',
    'forgotPassword.passwordMismatch': 'கடவுச்சொல்கள் பொருந்தவில்லை',
    'forgotPassword.passwordTooShort': 'கடவுச்சொல் குறைந்தபட்சம் 6 வர்ணங்களாக இருக்க வேண்டும்',

    // Navigation
    'nav.dashboard': 'பணிமனை',
    'nav.healthRecords': 'சுகாதார பதிவுகள்',
    'nav.notifications': 'அறிவிப்புகள்',
    'nav.growthChart': 'வளர்ச்சி வரைபடம்',
    'nav.profile': 'சுயவிவரம்',
    'nav.settings': 'அமைப்புகள்',
    'nav.logout': 'வெளியேறவும்',
    'nav.help': 'உதவி மையம்',

    // ...existing code...
    'profile.title': 'சுயவிவர நிர்வாகம்',
    'profile.viewProfile': 'சுயவிவரத்தைக் காண்க',
    'profile.editProfile': 'சுயவிவரத்தைத் திருத்தவும்',
    'profile.fullName': 'முழு பெயர்',
    'profile.nic': 'தேசிய அடையாள அல்லது',
    'profile.email': 'மின்னஞ்சல்',
    'profile.mobileNumber': 'கைபேசி எண்',
    'profile.address': 'முகவரி',
    'profile.linkedChildren': 'இணைக்கப்பட்ட குழந்தைகள்',
    'profile.accountActivity': 'கணக்கு செயல்பாடு',
    'profile.changePassword': 'கடவுச்சொல்லை மாற்றவும்',
    'profile.changeMobileNumber': 'கைபேசி எண்ணை மாற்றவும்',
    'profile.save': 'மாற்றங்களைச் சேமிக்கவும்',
    'profile.cancel': 'ரத்துசெய்க',
    'profile.noLinkedChildren': 'இணைக்கப்பட்ட குழந்தைகள் இல்லை',

    'profile.changeMobile.title': 'கைபேசி எண்ணை மாற்றவும்',
    'profile.changeMobile.enterNew': 'புதிய கைபேசி எண்ணை உள் நுழையவும்',
    'profile.changeMobile.step1': 'படி 1: மாற்றத்தை கோரவும்',
    'profile.changeMobile.step2': 'படி 2: OTP சரிபார்க்கவும்',
    'profile.changeMobile.step3': 'படி 3: புதுப்பிப்பை உறுதிப்படுத்தவும்',
    'profile.changeMobile.otpSent': 'OTP உங்கள் புதிய கைபேசி எண்ணுக்கு அனுப்பப்பட்டுவிட்டது',
    'profile.changeMobile.enterOtp': 'OTP குறியீடை உள் நுழையவும்',
    'profile.changeMobile.verify': 'OTP சரிபார்க்கவும்',
    'profile.changeMobile.verified': 'கைபேசி எண் வெற்றிகரமாக சரிபார்க்கப்பட்டுவிட்டது',
    'profile.changeMobile.failed': 'OTP சரிபார்ப்பு தல்',
    'profile.changeMobile.resendOtp': 'OTP மீண்டும் அனுப்பவும்',

    'vaccine.title': 'தடுப்பூசி வழிகாட்டி',
    'vaccine.guide': 'இலங்கை தேசிய நோயெதிர்ப்பு திட்டம்',
    'vaccine.name': 'தடுப்பூசி பெயர்',
    'vaccine.manufacturer': 'உற்பத்தியாளர்',
    'vaccine.dosage': 'டோஸ்',
    'vaccine.recommendedAge': 'பரிந்துரைக்கப்பட்ட வயது',
    'vaccine.interval': 'இடைவெளி நாட்கள்',
    'vaccine.description': 'விளக்கம்',
    'vaccine.noData': 'தற்போது தடுப்பூசி தகவல் இல்லை.',
    'vaccine.scheduleDescription': 'இந்த அட்டவணை இலங்கையின் அதிகாரப்பூர்வ தடுப்பூசி வழிகாட்டுதல்களைப் பின்பற்றுகிறது.',

    'vaccine.bcg': 'BCG',
    'vaccine.opv': 'OPV',
    'vaccine.pentavalent': 'Pentavalent',
    'vaccine.mmr': 'MMR',
    'vaccine.je': 'JE',
    'vaccine.dpt': 'DPT',

    'notification.title': 'அறிவிப்புகள்',
    'notification.upcoming': 'வரவிருக்கும் தடுப்பூசி',
    'notification.missed': 'தவறிய தடுப்பூசி',
    'notification.completed': 'தடுப்பூசி முடிந்துவிட்டது',
    'notification.childLinked': 'குழந்தை இணைக்கப்பட்டுவிட்டது',
    'notification.growthUpdate': 'வளர்ச்சி புதுப்பிப்பு',
    'notification.noNotifications': 'அறிவிப்புகள் இல்லை',
    'notification.markAsRead': 'வாசித்ததாக குறிக்க',
    'notification.markAllAsRead': 'அனைத்தையும் வாசித்ததாக குறிக்க',

    'growth.title': 'வளர்ச்சி வரைபடம்',
    'growth.weight': 'எடை',
    'growth.height': 'உயரம்',
    'growth.headCircumference': 'தலை சுற்றளவு',
    'growth.lastVisit': 'கடைசி பார்வை',
    'growth.export': 'CSV ஐ ஏற்றுமதி செய்க',
    'growth.print': 'பதிவை அச்சிடவும்',

    'common.save': 'சேமிக்கவும்',
    'common.cancel': 'ரத்துசெய்க',
    'common.delete': 'நீக்கவும்',
    'common.edit': 'திருத்தவும்',
    'common.back': 'பின்னுக்கு',
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
    'common.close': 'மூடவும்',
    'common.submit': 'சமர்ப்பிக்கவும்',
    'common.searchPlaceholder': 'தரவுப் புள்ளிகளைத் தேடவும்...',
    'common.overview': 'கண்ணோட்டம்',

    'status.pending': 'காத்திருக்கிறது',
    'status.completed': 'முடிந்துவிட்டது',
    'status.missed': 'தவறிய',
    'status.cancelled': 'ரத்துசெய்யப்பட்டது',
    'status.scheduled': 'திட்டமிடப்பட்டது',
    'status.active': 'செயலில்',

    // Audit Logs
    'audit.title': 'தணிக்கை பதிவுகள்',
    'audit.searchPlaceholder': 'பயனர், செயல் அல்லது விவரங்கள் மூலம் தேடுங்கள்...',
    'audit.filterAllRoles': 'அனைத்து பாத்திரங்களும்',
    'audit.filterPhm': 'PHM',
    'audit.filterParent': 'பெற்றோர்',
    'audit.filterMoh': 'MOH அதிகாரி',
    'audit.colTimestamp': 'நேரமுத்திரை',
    'audit.colUser': 'பயனர்',
    'audit.colAction': 'செயல்',
    'audit.colDetails': 'விவரங்கள்',
    'audit.noLogs': 'உங்கள் தேடல் அளவுகோல்களுடன் பொருந்தக்கூடிய தணிக்கை பதிவுகள் எதுவும் இல்லை.',
    'audit.showingLogs': '{total} தணிக்கை பதிவுகளில் {count} ஐக் காட்டுகிறது',
    'audit.export': 'பதிவுகளை ஏற்றுமதி செய்',
    'audit.subtitle': 'பாதுகாப்பு மற்றும் இணக்கத்திற்காக SuwaCare LK அமைப்பு செயல்பாடு மற்றும் பயனர் செயல்களைப் பார்க்கவும்.',

    // Common Additional
    'common.backToDashboard': 'பணிமனைக்குத் திரும்பு',
    'common.creating': 'உருவாக்குகிறது...',
    'common.logout': 'வெளியேறு',

    // Admin Dashboard
    'adminDashboard.title': 'கணினி நிர்வாகி',
    'adminDashboard.subtitle': 'NCVMS நிர்வாகி போர்டல்',
    'adminDashboard.dashboard.title': 'பணிமனை',
    'adminDashboard.dashboard.subtitle': 'கணினி மேலோட்டம் மற்றும் புள்ளிவிவரங்கள்',
    'adminDashboard.dashboard.quickActions': 'விரைவு நடவடிக்கைகள்',
    'adminDashboard.dashboard.createMohAccount': 'MOH கணக்கை உருவாக்கவும்',
    'adminDashboard.dashboard.createMohAccountSubtitle': 'புதிய MOH அதிகாரியை உடனடியாகச் சேர்க்கவும்',
    'adminDashboard.dashboard.viewMohUsers': 'MOH பயனர்களைக் காண்க',
    'adminDashboard.dashboard.viewMohUsersSubtitle': 'இருக்கும் MOH கணக்குகளை நிர்வகிக்கவும்',
    'adminDashboard.createMoh.title': 'MOH கணக்கை உருவாக்கவும்',
    'adminDashboard.createMoh.subtitle': 'கணக்கை உடனடியாக உருவாக்க MOH அதிகாரியின் விவரங்களை நிரப்பவும். ஒரு பாதுகாப்பான தற்காலிக கடவுச்சொல் உருவாக்கப்பட்டு WhatsApp வழியாக அனுப்பப்படும்.',
    'adminDashboard.createMoh.employeeIdLabel': 'ஊழியர் ஐடி',
    'adminDashboard.createMoh.employeeIdPlaceholder': 'எ.கா., MOH-2024-001',
    'adminDashboard.createMoh.fullNameLabel': 'முழு பெயர்',
    'adminDashboard.createMoh.fullNamePlaceholder': 'எ.கா., டாக்டர். ருவன் சில்வா',
    'adminDashboard.createMoh.nicLabel': 'தேசிய அடையாள அட்டை (NIC)',
    'adminDashboard.createMoh.nicPlaceholder': 'எ.கா., 987654321V',
    'adminDashboard.createMoh.emailLabel': 'மின்னஞ்சல்',
    'adminDashboard.createMoh.emailPlaceholder': 'எ.கா., rsilva@moh.lk',
    'adminDashboard.createMoh.phoneLabel': 'தொலைபேசி எண்',
    'adminDashboard.createMoh.phonePlaceholder': 'எ.கா., +94711234567',
    'adminDashboard.createMoh.assignedAreaLabel': 'ஒதுக்கப்பட்ட பகுதி',
    'adminDashboard.createMoh.assignedAreaPlaceholder': 'எ.கா., கொழும்பு மாவட்டம்',
    'adminDashboard.createMoh.createButton': 'MOH கணக்கை உருவாக்கவும்',
    'adminDashboard.createMoh.successTitle': 'MOH கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!',
    'adminDashboard.createMoh.successUserId': 'பயனர் ஐடி',
    'adminDashboard.createMoh.successEmail': 'மின்னஞ்சல்',
    'adminDashboard.createMoh.successTempPassword': 'தற்காலிக கடவுச்சொல்',
    'adminDashboard.createMoh.successSentTo': 'அனுப்பப்பட்டது',
    'adminDashboard.createMoh.successNote1': 'தற்காலிக கடவுச்சொல் WhatsApp வழியாக அனுப்பப்பட்டது',
    'adminDashboard.createMoh.successNote2': 'MOH பயனர் முதல் உள்நுழைவில் கடவுச்சொல்லை மாற்ற வேண்டும்',
    'adminDashboard.createMoh.successNote3': 'கடவுச்சொல் 24 மணி நேரம் செல்லுபடியாகும்',
    'adminDashboard.mohUsers.title': 'MOH பயனர்கள்',
    'adminDashboard.mohUsers.subtitle': 'கணினியில் உள்ள அனைத்து MOH அதிகாரிகளும்',
    'adminDashboard.mohUsers.loading': 'MOH பயனர்களை ஏற்றுகிறது...',
    'adminDashboard.mohUsers.noUsers': 'MOH பயனர்கள் இல்லை',
    'adminDashboard.mohUsers.table.employeeId': 'ஊழியர் ஐடி',
    'adminDashboard.mohUsers.table.name': 'பெயர்',
    'adminDashboard.mohUsers.table.email': 'மின்னஞ்சல்',
    'adminDashboard.mohUsers.table.assignedArea': 'ஒதுக்கப்பட்ட பகுதி',
    'adminDashboard.mohUsers.table.status': 'நிலை',
    'adminDashboard.mohUsers.table.created': 'உருவாக்கப்பட்டது',
    'adminDashboard.mohUsers.status.pending': 'முதல் உள்நுழைவு நிலுவையில் உள்ளது',
    'adminDashboard.mohUsers.status.active': 'செயலில்',

    // MOH System Overview Report
    'report.title': 'அமைப்பு மேலோட்ட அறிக்கை',
    'report.filters': 'அறிக்கை வடிப்பான்கள்',
    'report.startDate': 'தொடக்கத் தேதி',
    'report.endDate': 'முடிவுத் தேதி',
    'report.refresh': 'அறிக்கையைப் புதுப்பிக்கவும்',
    'report.loading': 'அறிக்கை ஏற்றப்படுகிறது...',
    'report.downloadPdf': 'PDF ஐப் பதிவிறக்கவும்',
    'report.period': 'காலம்',
    'report.generated': 'உருவாக்கப்பட்டது',
    'report.summary': 'நிர்வாகச் சுருக்கம்',
    'report.totalChildren': 'மொத்த குழந்தைகள்',
    'report.linkedChildren': 'இணைக்கப்பட்ட குழந்தைகள்',
    'report.vaccinationRecords': 'தடுப்பூசி பதிவுகள்',
    'report.coverage': 'பாதுகாப்பு',
    'report.administered': 'வழங்கப்பட்டது',
    'report.pending': 'நிலுவையில் உள்ளது',
    'report.overdue': 'காலாவதியானது',
    'report.phmUsers': 'PHM பயனர்கள்',
    'report.insights': 'முக்கிய நுண்ணறிவு',
    'report.coverageByRegion': 'பிராந்திய வாரியாக பாதுகாப்பு',
    'report.vaccinationTrends': 'தடுப்பூசி போக்குகள் (கடந்த 12 மாதங்கள்)',
    'report.month': 'மாதம்',
    'report.administeredTitle': 'வழங்கப்பட்டது',
    'report.overdueTitle': 'காலாவதியானது',
    'report.registered': 'பதிவு செய்யப்பட்டது',
    'report.vaccinated': 'தடுப்பூசி போடப்பட்டது',
    'report.vaccine': 'தடுப்பூசி',
    'report.totalDoses': 'மொத்த அளவுகள்',
    'report.missed': 'தவறவிடப்பட்டது',
    'report.completion': 'முடிவு %',
    'report.gnDivision': 'கிராம அதிகாரி பிரிவு',
    'report.vaccinePerformance': 'தடுப்பூசி செயல்திறன்',
    'report.trendMonths': 'போக்கு மாதங்கள்',
    'report.coverageByGnDivision': 'கிராம அதிகாரி பிரிவு வாரியாக பாதுகாப்பு',
    'report.totalDosesTitle': 'மொத்த அளவுகள்',
    'report.missedTitle': 'தவறவிடப்பட்டது',
    'report.completionTitle': 'முடிவு %',
    'report.dataQuality': 'தரவு தர மதிப்பெண் அட்டை',
    'report.databaseFootprint': 'தரவுத்தள தடம்',
    'report.monthlyTrend': 'மாதாந்திர போக்கு',
    'report.newChildren': 'புதிய குழந்தைகள்',
    'report.notifications': 'அறிவிப்புகள்',
    'report.auditEvents': 'தணிக்கை நிகழ்வுகள்',
    'report.footerText': 'இந்த அறிக்கை தேசிய குழந்தை தடுப்பூசி மேலாண்மை அமைப்பால் தானாகவே உருவாக்கப்பட்டது',
    'report.description': 'பகுப்பாய்வு மற்றும் பதிவுக்காக SuwaCare LK தடுப்பூசி அறிக்கைகளை உருவாக்குங்கள்.',
    'report.generateError': 'அறிக்கையை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
    'report.invalidType': 'தவறான அறிக்கை வகை',
    'report.downloadFailed': '{format.toUpperCase()} ஆகப் பதிவிறக்கும் தோல்வியடைந்தது.',
    'report.generateSuccess': 'உங்கள் அறிக்கை வெற்றிகரமாக உருவாக்கப்பட்டது.',
    'report.type': 'அறிக்கை வகை:',
    'report.dateRange': 'தேதி வரம்பு:',
    'report.userRole': 'பயனர் பாத்திரம்:',
    'report.allRoles': 'அனைத்து பாத்திரங்களும்',
    'report.allDivisions': 'அனைத்து பிரிவுகளும்',
    'report.selectType': 'அறிக்கை வகையைத் தேர்ந்தெடுக்கவும் *',
    'report.generating': 'உருவாக்குகிறது...',
    'report.generate': 'அறிக்கையை உருவாக்கு',
    'report.downloadCsv': 'CSV ஐப் பதிவிறக்கவும்',

    // PHM Vaccination Clinic
    'clinic.title': 'தடுப்பூசி கிளினிக்குகள்',
    'clinic.createTitle': 'புதிய தடுப்பூசி கிளினிக்கை உருவாக்கவும்',
    'clinic.date': 'கிளினிக் தேதி',
    'clinic.gnDivision': 'கிராம அதிகாரி பிரிவு',
    'clinic.location': 'இடம்',
    'clinic.description': 'விளக்கம்',
    'clinic.createSuccess': 'தடுப்பூசி கிளினிக் வெற்றிகரமாக உருவாக்கப்பட்டது!',
    'clinic.createError': 'தடுப்பூசி கிளினிக்கை உருவாக்க முடியவில்லை',
    'clinic.loadError': 'கிளினிக்குகளை ஏற்ற முடியவில்லை',
    'clinic.detailsTitle': 'கிளினிக் விவரங்கள்',
    'clinic.dueChildren': 'தடுப்பூசி போட வேண்டிய குழந்தைகள்',
    'clinic.attendance': 'வருகை கண்காணிப்பு',
    'clinic.markAttended': 'வருகையைக் குறிக்கவும்',
    'clinic.markNotAttended': 'வராததைக் குறிக்கவும்',
    'clinic.attendanceSuccess': 'வருகை வெற்றிகரமாக குறிக்கப்பட்டது!',
    'clinic.status': 'நிலை',
    'clinic.actions': 'செயல்கள்',
    'clinic.viewDetails': 'விவரங்களைப் பார்க்கவும்',
    'clinic.noClinics': 'கிளினிக்குகள் எதுவும் திட்டமிடப்படவில்லை',
    'clinic.listTitle': 'திட்டமிடப்பட்ட கிளினிக்குகள்',
    'clinic.subtitle': 'உங்கள் பகுதியில் தடுப்பூசி போடும் கிளினிக்குகளை நிர்வகிக்கவும்',
    'clinic.scheduleFirst': 'உங்கள் முதல் தடுப்பூசி கிளினிக்கைத் திட்டமிடுங்கள்',
    'clinic.createClinic': 'தடுப்பூசி கிளினிக்கை உருவாக்கவும்',
    'clinic.assignedArea': 'உங்களுக்கு ஒதுக்கப்பட்ட பகுதி',
    'clinic.optional': 'விருப்பத்திற்குரியது',
    'clinic.marking': 'சேமிக்கிறது...',
    'clinic.regNum': 'பதிவு எண்',

    // Notifications Additional
    'notification.unread': '{count} படிக்காத அறிவிப்பு(கள்)',
    'notification.allCaughtUp': 'எல்லாம் முடிந்தது!',
    'notification.markAllAsRead': 'அனைத்தையும் படித்ததாகக் குறிக்கவும்',
    'notification.filterAll': 'அனைத்தும்',

    // Profile Additional
    'profile.subtitle': 'உங்கள் சுயவிவரம், பாதுகாப்பு மற்றும் கணக்கு விருப்பங்களை நிர்வகிக்கவும்',
    'profile.details': 'சுயவிவர விவரங்கள்',
    'profile.changeMobile': 'மொபைல் எண்ணை மாற்றவும்',
    'profile.linkedChildrenTab': 'இணைக்கப்பட்ட குழந்தைகள்',
    'profile.updateSuccess': 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது',
    'profile.updateError': 'சுயவிவரத்தைப் புதுப்பிக்க முடியவில்லை',
    'profile.mobileUpdateSuccess': 'மொபைல் எண் வெற்றிகரமாக புதுப்பிக்கப்பட்டது',
    'profile.mobileVerifyError': 'OTP ஐச் சரிபார்க்க முடியவில்லை',
    'profile.passwordSuccess': 'கடவுச்சொல் வெற்றிகரமாக மாற்றப்பட்டது',
    'profile.passwordError': 'கடவுச்சொல்லை மாற்ற முடியவில்லை',
    'profile.passwordMismatch': 'புதிய கடவுச்சொற்கள் பொருந்தவில்லை',
    'profile.fillAllFields': 'அனைத்து புலங்களையும் நிரப்பவும்',
    'profile.saving': 'சேமிக்கிறது...',
    'profile.verifying': 'சரிபார்க்கிறது...',
    'profile.mobileChangeHint': 'இதைப் புதுப்பிக்க "மொபைலை மாற்று" தாவலைப் பயன்படுத்தவும்',
    'profile.oldPassword': 'பழைய கடவுச்சொல்',
    'profile.newPassword': 'புதிய கடவுச்சொல்',
    'profile.confirmPassword': 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    'profile.passwordChangeHint': 'உங்கள் தற்போதைய கடவுச்சொல்லை உள்ளிடவும் மற்றும் ஒரு புதிய பாதுகாப்பான கடவுச்சொல்லைத் தேர்ந்தெடுக்கவும்.',
    'profile.enterCurrentPassword': 'உங்கள் தற்போதைய (தற்காலிக) கடவுச்சொல்லை உள்ளிடவும்',
    'profile.enterNewPassword': 'ஒரு புதிய பாதுகாப்பான கடவுச்சொல்லை உள்ளிடவும்',
    'profile.reEnterNewPassword': 'உங்கள் புதிய கடவுச்சொல்லை மீண்டும் உள்ளிடவும்',
    'profile.updating': 'கடவுச்சொல்லைப் புதுப்பிக்கிறது...',
    'profile.updatePassword': 'கடவுச்சொல்லைப் புதுப்பிக்கவும்',

    // Add Child Additional
    'addChild.title': 'உங்கள் குழந்தையை இணைக்கவும்',
    'addChild.subtitle': 'உங்கள் குழந்தையை உங்கள் கணக்குடன் இணைக்க அவர்களின் தடுப்பூசி புத்தக பதிவு எண்ணை உள்ளிடவும்.',
    'addChild.regNumLabel': 'பதிவு எண்',
    'addChild.regNumPlaceholder': 'உதாரணம்: CMB/123/2026',
    'addChild.searchBtn': 'குழந்தையைத் தேடுங்கள்',
    'addChild.searching': 'தேடுகிறது...',
    'addChild.confirmTitle': 'குழந்தை விவரங்களை உறுதிப்படுத்தவும்',
    'addChild.confirmText': 'இது உங்கள் குழந்தையா? பதிவுசெய்யப்பட்ட வாட்ஸ்அப் எண்ணுக்கு சரிபார்ப்புக் குறியீட்டை அனுப்புவோம்.',
    'addChild.sendOtp': 'சரிபார்ப்புக் குறியீட்டை அனுப்பு',
    'addChild.otpTitle': 'அடையாளத்தைச் சரிபார்க்கவும்',
    'addChild.otpText': 'பதிவுசெய்யப்பட்ட வாட்ஸ்அப் எண்ணுக்கு 6 இலக்க சரிபார்ப்புக் குறியீடு அனுப்பப்பட்டுள்ளது.',
    'addChild.otpPlaceholder': '6 இலக்கக் குறியீட்டை உள்ளிடவும்',
    'addChild.verifyBtn': 'சரிபார்த்து குழந்தையை இணைக்கவும்',
    'addChild.successTitle': 'வெற்றிகரமாக இணைக்கப்பட்டது!',
    'addChild.successText': 'உங்கள் குழந்தை உங்கள் கணக்குடன் இணைக்கப்பட்டுள்ளார்.',
    'addChild.errorNoChild': 'இந்த பதிவு எண்ணுடன் எந்த குழந்தையும் காணப்படவில்லை. சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',
    'addChild.errorSearch': 'தேட முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
    'addChild.errorOtpInvalid': 'நீங்கள் உள்ளிட்ட குறியீடு தவறானது. சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',
    'addChild.errorOtpExpired': 'இந்த சரிபார்ப்புக் குறியீடு காலாவதியாகிவிட்டது. புதிய குறியீட்டைக் கோரவும்.',
    'addChild.errorOtpMaxAttempts': 'அதிகபட்ச சரிபார்ப்பு முயற்சிகள் எட்டப்பட்டன. புதிய குறியீட்டைக் கோரவும்.',
    'addChild.errorAlreadyConsumed': 'இந்தக் குறியீடு ஏற்கனவே பயன்படுத்தப்பட்டுள்ளது. குழந்தை ஏற்கனவே உங்கள் கணக்குடன் இணைக்கப்பட்டிருக்கலாம்.',
    'addChild.errorNotFound': 'குழந்தை அல்லது OTP அமர்வு காணப்படவில்லை. மீண்டும் தொடங்கவும்.',
    'addChild.foundTitle': 'குழந்தை கண்டறியப்பட்டது!',
    'addChild.foundText': 'பதிவுசெய்யப்பட்ட வாட்ஸ்அப் எண்ணுக்கு சரிபார்ப்புக் குறியீட்டை அனுப்பக் கோரவும்.',
    'addChild.resendCode': 'குறியீட்டை மீண்டும் அனுப்பு',
    'addChild.attempts': 'முயற்சிகள்: {total} இல் {count}',
    'addChild.codeExpires': 'குறியீடு காலாவதியாகிறது: {time}',
    'addChild.redirecting': 'பணிமனைக்குத் திருப்பி விடப்படுகிறது...',
    'addChild.whereToFind': 'உங்கள் பதிவு எண்ணை எங்கே கண்டுபிடிப்பது?',
    'addChild.whereToFindText': 'உங்கள் குழந்தை அமைப்பில் பதிவு செய்யப்படும்போது பொது சுகாதார செவிலியரால் (PHM) பதிவு எண் வழங்கப்படுகிறது. இது மேலே காட்டப்பட்டுள்ள வடிவத்தில் இருக்க வேண்டும். உங்கள் மொபைல் எண்ணுக்கு அனுப்பப்பட்ட குறியீட்டின் மூலம் இணைப்பு சரிபார்க்கப்படுகிறது.',
    'addChild.formatHint': 'வடிவம்: NCVMS-YYYY-MMDD-XXXX (உதாரணம்: NCVMS-2024-0815-1234)',
    'addChild.selectChild': 'குழந்தையைத் தேர்ந்தெடு',
    'addChild.addAnotherChild': 'மற்றொரு குழந்தையைச் சேர்க்கவும்',

    // Baby Registration Additional
    'babyReg.title': 'புதிய குழந்தை பதிவு',
    'babyReg.subtitle': 'தடுப்பூசி அட்டவணையைத் கண்காணிக்கத் தொடங்க SuwaCare LK அமைப்பில் புதிய குழந்தையைப் பதிவு செய்யவும்.',
    'babyReg.firstName': 'முதல் பெயர்',
    'babyReg.lastName': 'குடும்பப் பெயர்',
    'babyReg.dob': 'பிறந்த தேதி',
    'babyReg.gender': 'பாலினம்',
    'babyReg.genderMale': 'ஆண்',
    'babyReg.genderFemale': 'பெண்',
    'babyReg.genderOther': 'மற்றவை',
    'babyReg.birthWeight': 'பிறப்பு எடை (கிலோ)',
    'babyReg.birthHeight': 'பிறப்பு உயரம் (செ.மீ)',
    'babyReg.motherName': 'தாயின் பெயர்',
    'babyReg.motherNic': 'தாயின் NIC',
    'babyReg.fatherName': 'தந்தையின் பெயர்',
    'babyReg.fatherNic': 'தந்தையின் NIC',
    'babyReg.address': 'வீட்டு முகவரி',
    'babyReg.whatsapp': 'பெற்றோர் வாட்ஸ்அப் எண்',
    'babyReg.whatsappHint': 'தானியங்கி நினைவூட்டல்கள் மற்றும் OTP சரிபார்ப்புக்கு பயன்படுத்தப்படுகிறது',
    'babyReg.submitBtn': 'குழந்தையைப் பதிவு செய்',
    'babyReg.successTitle': 'குழந்தை வெற்றிகரமாக பதிவு செய்யப்பட்டது!',
    'babyReg.successText': 'குழந்தை அமைப்பில் சேர்க்கப்பட்டுள்ளார். பதிவு எண்ணைப் பெற்றோருடன் பகிர்ந்து கொள்ளவும்.',
    'babyReg.regNumLabel': 'பதிவு எண்',
    'babyReg.copyBtn': 'நகலெடு',
    'babyReg.copied': 'நகலெடுக்கப்பட்டது!',
    'babyReg.printBtn': 'விவரங்களை அச்சிடுக',
    'babyReg.registerAnother': 'மற்றொரு குழந்தையைப் பதிவு செய்',
    'babyReg.errorArea': 'உங்களுக்கு ஒதுக்கப்பட்ட கிராம அதிகாரி பிரிவைத் தீர்மானிக்க முடியவில்லை. நிர்வாகியைத் தொடர்பு கொள்ளவும்.',
    'babyReg.errorWeight': 'சரியான பிறப்பு எடை மற்றும் உயரத்தை உள்ளிடவும்.',
    'babyReg.errorServer': 'பதிவு தோல்வியடைந்தது. சேவையகம் பதிவு எண்ணைத் திருப்பவில்லை.',
    'babyReg.parentInfo': 'பெற்றோர் தகவல்',
    'babyReg.locationInfo': 'இடம் தகவல்',
    'babyReg.selectGender': 'பாலினத்தைத் தேர்ந்தெடுக்கவும்',
    'babyReg.district': 'மாவட்டம்',
    'babyReg.dsDivision': 'பிரதேச செயலகப் பிரிவு',
    'babyReg.gnDivision': 'கிராம அதிகாரி பிரிவு',
    'babyReg.loadingArea': 'உங்களுக்கு ஒதுக்கப்பட்ட பகுதியை ஏற்றுகிறது...',
    'babyReg.areaError': 'ஒதுக்கப்பட்ட பகுதியை ஏற்ற முடியவில்லை',
    'babyReg.gnHint': 'உங்கள் கிராம அதிகாரி பிரிவு உங்கள் PHM கணக்கு அமைப்பின் அடிப்படையில் தானாகவே ஒதுக்கப்படுகிறது மற்றும் கைமுறையாக மாற்ற முடியாது.',
    'babyReg.addressInfo': 'முகவரி தகவல்',
    'babyReg.mohDivision': 'MOH பிரிவு',
    'babyReg.selectMoh': 'MOH பிரிவைத் தேர்ந்தெடுக்கவும்',
    'babyReg.fullAddress': 'முழு முகவரி',

    // General Clinic Additional
    'clinic.normalTitle': 'குழந்தை நல கிளினிக்குகள்',
    'clinic.normalSubtitle': 'வழக்கமான குழந்தை நலன் மற்றும் வளர்ச்சி கண்காணிப்பு கிளினிக்குகளை நிர்வகிக்கவும்',
    'clinic.normalCreateTitle': 'புதிய நல கிளினிக்கை உருவாக்கவும்',
    'clinic.normalCreateSuccess': 'குழந்தை நல கிளினிக் வெற்றிகரமாக உருவாக்கப்பட்டது!',
    'clinic.normalNoClinics': 'நல கிளினிக்குகள் எதுவும் திட்டமிடப்படவில்லை',

    // Record Vaccination Additional
    'recordVac.title': 'தடுப்பூசியைப் பதிவு செய்',
    'recordVac.subtitle': 'உங்கள் பகுதியில் உள்ள ஒரு குழந்தைக்கு வழங்கப்பட்ட தடுப்பூசியைப் பதிவு செய்யுங்கள்',
    'recordVac.selectChild': 'குழந்தையைத் தேர்ந்தெடு',
    'recordVac.selectVaccine': 'தடுப்பூசியைத் தேர்ந்தெடு',
    'recordVac.doseNumber': 'டோஸ் எண்',
    'recordVac.dateGiven': 'வழங்கப்பட்ட தேதி',
    'recordVac.batchNumber': 'தொகுதி எண்',
    'recordVac.administeredBy': 'வழங்கியவர்',
    'recordVac.location': 'கிளினிக் இடம்',
    'recordVac.site': 'ஊசி போட்ட இடம்',
    'recordVac.nextDueDate': 'அடுத்த தேதி (விருப்பத்திற்குரியது)',
    'recordVac.notes': 'குறிப்புகள்',
    'recordVac.submitBtn': 'பதிவைச் சேமி',
    'recordVac.successMsg': 'தடுப்பூசி பதிவு வெற்றிகரமாக சேமிக்கப்பட்டது!',
    'recordVac.errorMsg': 'தடுப்பூசி பதிவைச் சேமிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
    'recordVac.dueTitle': 'தடுப்பூசி போட வேண்டிய குழந்தைகள்',
    'recordVac.noDue': 'உங்கள் பகுதியில் தற்போது தடுப்பூசி போட வேண்டிய குழந்தைகள் யாரும் இல்லை',
    'recordVac.updateSuccess': 'தடுப்பூசி பதிவு வெற்றிகரமாக புதுப்பிக்கப்பட்டது.',
    'recordVac.updateDescription': 'பதிவுசெய்யப்பட்ட குழந்தையின் தடுப்பூசி விவரங்களைப் புதுப்பிக்கவும்.',
    'recordVac.selectSite': 'இடத்தைத் தேர்ந்தெடு',
    'recordVac.notesPlaceholder': 'கூடுதல் குறிப்புகள் அல்லது கவனிப்புகள்...',

    // Growth Additional
    'growth.loading': 'WHO வளர்ச்சி விளக்கப்படத்தை ஏற்றுகிறது...',
    'growth.noData': 'இந்தக் குழந்தைக்கு வளர்ச்சித் தரவு எதுவும் இல்லை.',
    'growth.error': 'WHO வளர்ச்சி விளக்கப்படத் தரவை ஏற்ற முடியவில்லை.',

    // Vaccination Card
    'vacCard.title': 'தடுப்பூசி அட்டை',
    'vacCard.subtitle': 'உத்தியோகபூர்வ தடுப்பூசி பதிவு',
    'vacCard.idLabel': 'ID',
    'vacCard.ageLabel': 'வயது',
    'vacCard.parentLabel': 'பெற்றோர்',
    'vacCard.addressLabel': 'முகவரி',
    'vacCard.historyTitle': 'தடுப்பூசி வரலாறு',
    'vacCard.colVaccine': 'தடுப்பூசி',
    'vacCard.colDose': 'அளவு',
    'vacCard.colDate': 'தேதி',
    'vacCard.colStatus': 'நிலை',
    'vacCard.certifiedMsg': 'உத்தியோகபூர்வமாக சான்றிதழ்',
    'vacCard.generatedLabel': 'உருவாக்கப்பட்ட',
    'vacCard.downloadBtn': 'அட்டையைப் பதிவிறக்கவும்',
    'vacCard.loading': 'தடுப்பூசி அட்டையை ஏற்றுகிறது...',

    // Parent Dashboard
    'parentDashboard.title': 'பெற்றோர் டாஷ்போர்ட்',
    'parentDashboard.subtitle': 'உங்கள் குழந்தைகளின் தடுப்பூசி நிலை மற்றும் வரவிருக்கும் சுகாதார மைல் கற்கள் பর்யவேக்ষணம் செய்யவும்.',
    'parentDashboard.parentAccount': 'பெற்றோர் கணக்கு',
    'parentDashboard.parentPortal': 'பெற்றோர் வாயிலை',
    'parentDashboard.vaccinationManagement': 'தடுப்பூசி நிர்வாகம்',
    'parentDashboard.linkedChildren': 'இணைந்த குழந்தைகள்',
    'parentDashboard.registered': 'பதிவுசெய்யப்பட்ட',
    'parentDashboard.recentRecords': 'சமீபத்திய பதிவுகள்',
    'parentDashboard.addAnotherChild': 'மற்றொரு குழந்தையைச் சேர்க்கவும்',
    'parentDashboard.usingRegistration': 'பதிவு எண்ணைப் பயன்படுத்தி',
    'parentDashboard.appointmentPending': 'நியமனம் நிலுவையில் உள்ளது',
    'parentDashboard.nextDose': 'அடுத்த அளவு',
    'parentDashboard.upcoming': 'வரவிருக்கும்',
    'parentDashboard.missed': 'தவறவிடப்பட்ட',
    'parentDashboard.viewFullHistory': 'முழு வரலாற்றைப் பார்க்கவும்',
    'parentDashboard.noRecords': 'இன்னும் தடுப்பூசி பதிவுகள் இல்லை.',
    'parentDashboard.childName': 'குழந்தையின் பெயர்',
    'parentDashboard.vaccine': 'தடுப்பூசி',
    'parentDashboard.dateAdministered': 'வழங்கப்பட்ட தேதி',
    'parentDashboard.officerPhm': 'அதிகாரி/PHM',
    'parentDashboard.action': 'செயல்',
    'parentDashboard.view': 'பார்க்கவும்',
    'parentDashboard.overdue': 'காலத்துக்கு பிறகு',
    'parentDashboard.dueIn': 'இதில் செல்ல வேண்டும்',
    'parentDashboard.days': 'நாட்கள்',
    'parentDashboard.children': 'குழந்தைகள்',
    'parentDashboard.welcomeBack': 'உங்கள் டாஷ்போர்டுக்குத் திரும்பி வரும்படி வரவேற்கிறோம்',
    'parentDashboard.quickActions': 'விரைவு செயல்கள்',
    'parentDashboard.bookAppointment': 'நியமனம் புக் செய்யுங்கள்',
    'parentDashboard.growthCharts': 'வளர்ச்சி விளக்கப்படங்கள் & மைல்கற்கள்',
    'parentDashboard.milestones': 'மைல்கற்கள்',
    'parentDashboard.home': 'வீடு',
    'parentDashboard.records': 'பதிவுகள்',
    'parentDashboard.appointments': 'நியமனங்கள்',
    'parentDashboard.vaccineGuide': 'தடுப்பூசி வழிகாட்டி',
    'parentDashboard.loading': 'டாஷ்போர்டை ஏற்றுகிறது…',

    // MOH Dashboard
    'moh.subtitle': 'தேசிய குழந்தை தடுப்பூசி பகுப்பாய்வு',
    'moh.searchPlaceholder': 'தரவுப் புள்ளிகளைத் தேடவும்...',
    'moh.officerTitle': 'பிராந்திய மருத்துவ அதிகாரி',
    'moh.regionalAnalytics': 'பிராந்திய பகுப்பாய்வு',
    'moh.phmReports': 'PHM அறிக்கைகள்',
    'moh.phmManagement': 'PHM நிர்வாகம்',
    'moh.systemHealth': 'அமைப்பு ஆரோக்கியம்',
    'moh.dataLive': 'தரவு நேரடி: கொழும்பு மாவட்டம்',
    'moh.analyticsDashboard': 'அதிகாரி பகுப்பாய்வு டாஷ்போர்டு',
    'moh.dashboardDescription': 'மேற்கு மாகாணம் முழுவதும் தடுப்பூசி கவரேஜ் மற்றும் PHM செயல்திறன் நேரடி.',
    'moh.systemOverview': 'கணினி கண்ணோட்டம்',
    'moh.auditLogs': 'தணிக்கை பதிவுகள்',
    'moh.viewProfile': 'சுயவிவரத்தைக் காண்க',

    // MOH PHM Management
    'mohPhm.title': 'PHM நிர்வாகம்',
    'mohPhm.subtitle': 'உங்கள் பிராந்தியத்தின் கீழ் PHM பகுதிகள், அதிகாரிகள் மற்றும் ஒதுக்கீடுகளை நிர்வகிக்கவும்.',
    'mohPhm.createAccount': 'PHM கணக்கை உருவாக்கவும்',
    'mohPhm.createDescription': 'MOH அதிகாரிகள் தங்கள் பகுதிகளுக்கான PHM கணக்குகளை உருவாக்கலாம். முதல் உள்நுழைவுக்கு ஒரு தற்காலிக கடவுச்சொல் உருவாக்கப்படும்.',
    'mohPhm.mohOnly': 'MOH-மட்டும் • PHM சுயமாக பதிவு செய்ய முடியாது',
    'mohPhm.employeeId': 'ஊழியர் ஐடி',
    'mohPhm.employeeIdPlaceholder': 'எ.கா. PHM001',
    'mohPhm.fullName': 'முழு பெயர்',
    'mohPhm.fullNamePlaceholder': 'PHM முழு பெயர்',
    'mohPhm.nic': 'NIC',
    'mohPhm.nicPlaceholder': 'தேசிய அடையாள எண்',
    'mohPhm.email': 'மின்னஞ்சல்',
    'mohPhm.emailPlaceholder': 'PHM மின்னஞ்சல் முகவரி',
    'mohPhm.phoneNumber': 'தொலைபேசி எண்',
    'mohPhm.phonePlaceholder': 'தொடர்பு எண்',
    'mohPhm.assignedDivision': 'ஒதுக்கப்பட்ட GN பிரிவு',
    'mohPhm.selectDivision': 'GN பிரிவைத் தேர்ந்தெடு (ஒதுக்கீடு செய்யப்படாதவை மட்டும்)',
    'mohPhm.allAssigned': 'அனைத்து பகுதிகளும் ஒதுக்கப்பட்டன',
    'mohPhm.showingAreas': 'ஒதுக்கீடு செய்யப்படாத {count} பகுதி{s} காட்டுகிறது',
    'mohPhm.createSuccess': 'PHM கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது.',
    'mohPhm.createError': 'PHM கணக்கை உருவாக்க தோல்வியடைந்தது. விவரங்களைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',
    'mohPhm.employeeIdLabel': 'ஊழியர் ஐடி:',
    'mohPhm.userIdLabel': 'பயனர் ஐடி:',
    'mohPhm.tempPasswordLabel': 'தற்காலிக கடவுச்சொல்:',
    'mohPhm.sharePassword': 'இந்த தற்காலிக கடவுச்சொல்லை PHM உடன் பாதுகாப்பான சேனல் வழியாக பகிர்ந்து கொள்ளவும். அவர்கள் முதல் உள்நுழைவில் அதை மாற்ற வேண்டும்.',
    'mohPhm.creating': 'PHM கணக்கை உருவாக்குகிறது...',
    'mohPhm.assignmentsTitle': 'PHM பகுதி ஒதுக்கீடுகள்',
    'mohPhm.assignmentsDescription': 'அனைத்து PHM மற்றும் அவர்களின் ஒதுக்கப்பட்ட GN பிரிவுகளைக் காண்க. ஒவ்வொரு பகுதியும் ஒரு PHM க்கு மட்டுமே ஒதுக்கப்படலாம்.',
    'mohPhm.totalPhms': 'மொத்தம்: {count} PHM{s}',
    'mohPhm.loading': 'PHM ஒதுக்கீடுகளை ஏற்றுகிறது...',
    'mohPhm.noAssignments': 'இன்னும் PHM ஒதுக்கீடுகள் இல்லை',
    'mohPhm.colEmployeeId': 'ஊழியர் ஐடி',
    'mohPhm.colName': 'பெயர்',
    'mohPhm.colAssignedArea': 'ஒதுக்கப்பட்ட பகுதி',
    'mohPhm.colUserId': 'பயனர் ஐடி',
  },
};

export class TranslationService {
  private static currentLanguage: Language = 'en';

  static setLanguage(lang: Language): void {
    if (translations[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
    }
  }

  static getLanguage(): Language {
    const stored = localStorage.getItem('language') as Language;
    if (stored && translations[stored]) {
      this.currentLanguage = stored;
    }
    return this.currentLanguage;
  }

  static t(key: keyof TranslationKeys): string {
    const lang = this.getLanguage();
    return (translations[lang] as any)[key] || (translations['en'] as any)[key] || key;
  }

  static getAllLanguages(): Array<{ code: Language; name: string; flag: string }> {
    return [
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
      { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' },
    ];
  }
}

