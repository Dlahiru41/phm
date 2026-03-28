// Translation Service for Trilingual Support (English, Sinhala, Tamil)

export type Language = 'en' | 'si' | 'ta';

export interface TranslationKeys {
  'app.title': string;
  'app.subtitle': string;

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

  // Status
  'status.pending': string;
  'status.completed': string;
  'status.missed': string;
  'status.cancelled': string;
  'status.scheduled': string;
}

const translations: Record<Language, Partial<TranslationKeys>> = {
  en: {
    // App
    'app.title': 'SuwaCare LK',
    'app.subtitle': 'National Child Vaccination Management System',

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

    // Status
    'status.pending': 'Pending',
    'status.completed': 'Completed',
    'status.missed': 'Missed',
    'status.cancelled': 'Cancelled',
    'status.scheduled': 'Scheduled',
  },
  si: {
    // App
    'app.title': 'සුවා ගége LK',
    'app.subtitle': 'ජාතික ළමා එනම්නීකරණ ব්‍යවස්තාපන පද්ධතිය',

    // Navigation
    'nav.dashboard': 'පDashboard',
    'nav.healthRecords': 'සෞඛ්‍ය වාර්තා',
    'nav.notifications': 'දැනුම්දීම්',
    'nav.growthChart': 'වර්ධනයේ ප්‍රස්තාරය',
    'nav.profile': 'පැතිකඩ',
    'nav.settings': 'සැකසුම්',
    'nav.logout': 'ඉවතට පිටවීම',
    'nav.help': 'උදව් මධ්‍යස්තානය',

    // Profile
    'profile.title': 'පැතිකඩ කළමනාකරණය',
    'profile.viewProfile': 'පැතිකඩ බලන්න',
    'profile.editProfile': 'පැතිකඩ සංස්කරණය කරන්න',
    'profile.fullName': 'සම්පූර්ණ නම',
    'profile.nic': 'ජාතික හැඳුනුම් අංකය',
    'profile.email': 'ඊ-තැපෙල',
    'profile.mobileNumber': 'ජංගම දුරකතනය',
    'profile.address': 'ලිපිනය',
    'profile.linkedChildren': 'සংযුක්ත ළමයින්',
    'profile.accountActivity': 'ගිණුම් ක්‍රියාකාරකම',
    'profile.changePassword': 'මුරපදය වෙනස් කරන්න',
    'profile.changeMobileNumber': 'ජංගම දුරකතනය වෙනස් කරන්න',
    'profile.save': 'වෙනස්කම් සුරකින්න',
    'profile.cancel': 'අවලංගු කරන්න',
    'profile.noLinkedChildren': 'තවම සংයුක්ත ළමයින් නොමැත',

    // Mobile Number Change with 2FA
    'profile.changeMobile.title': 'ජංගම දුරකතනය වෙනස් කරන්න',
    'profile.changeMobile.enterNew': 'නව ජංගම දුරකතනය ඇතුළු කරන්න',
    'profile.changeMobile.step1': 'ඉතා කර 1: වෙනස්කම බලන්න',
    'profile.changeMobile.step2': 'ඉතා කර 2: OTP සත්‍යතා කරන්න',
    'profile.changeMobile.step3': 'ඉතා කර 3: යාවත්කාල කිරීම තහවුරු කරන්න',
    'profile.changeMobile.otpSent': 'OTP ඔබගේ නව ජංගම දුරකතනයට යැවිණි',
    'profile.changeMobile.enterOtp': 'OTP කේතය ඇතුළු කරන්න',
    'profile.changeMobile.verify': 'OTP සත්‍යතා කරන්න',
    'profile.changeMobile.verified': 'ජංගම දුරකතනය සফලව සත්‍යතා කරන ලදි',
    'profile.changeMobile.failed': 'OTP සත්‍යතා කිරීම අසාර්థක විය',
    'profile.changeMobile.resendOtp': 'OTP නැවත යැවීම',

    // Vaccines
    'vaccine.title': 'එනම්නීකරණ මාර්ගෝපදේශ',
    'vaccine.guide': 'ශ්‍රී ලංකා ජාතික එනම්නීකරණ කාලසටහන',
    'vaccine.name': 'එනම්නීකරණের නම',
    'vaccine.manufacturer': 'නිෂ්පාදක',
    'vaccine.dosage': 'මාත්‍රා',
    'vaccine.recommendedAge': 'නිර්දේශිත වයස',
    'vaccine.interval': 'පරතරය දිනවල',
    'vaccine.description': 'විස්තරණය',

    // Vaccines - Sri Lanka Schedule
    'vaccine.bcg': 'BCG (බැසිලස් කල්මેට්-ගුয়েරින්)',
    'vaccine.opv': 'OPV (පෞද්ගලික පොලියෝ එනම්නීකරණ)',
    'vaccine.pentavalent': 'පෙන්ටවේලන්ට් (DPT + HepB + Hib)',
    'vaccine.mmr': 'MMR (ම්‍යාසලස්, වcounties, ගිණුම)',
    'vaccine.je': 'JE (ජපනු එන්සෙෆලිටිස්)',
    'vaccine.dpt': 'DPT (ඩිෆතීරියා, පර්ටුසිස්, ටෙටනස්)',

    // Notifications
    'notification.title': 'දැනුම්දීම්',
    'notification.upcoming': 'එනම්නීකරණ අසන්න',
    'notification.missed': 'එනම්නීකරණ අතපසු',
    'notification.completed': 'එනම්නීකරණ සම්පූර්ණ',
    'notification.childLinked': 'ශිශුවා සংයුක්ත',
    'notification.growthUpdate': 'වර්ධනයේ යාවත්කාලනය',
    'notification.noNotifications': 'දැනුම්දීම් නැත',
    'notification.markAsRead': 'කියවන්නට සලකුණු කරන්න',
    'notification.markAllAsRead': 'සියල්ල කියවන්න ලෙස සලකුණු කරන්න',

    // Growth Chart
    'growth.title': 'වර්ධනයේ ප්‍රස්තාරය',
    'growth.weight': 'බර',
    'growth.height': 'උස',
    'growth.headCircumference': 'හිස් පරිධිය',
    'growth.lastVisit': 'අවසාන පැමිණීම',
    'growth.export': 'CSV නිර්යාතනය කරන්න',
    'growth.print': 'වාර්තාව මුද්‍රණය කරන්න',

    // Common
    'common.save': 'සුරකින්න',
    'common.cancel': 'අවලංගු කරන්න',
    'common.delete': 'මකා දැමීම',
    'common.edit': 'සංස්කරණය කරන්න',
    'common.back': 'ආපසු',
    'common.loading': 'පූරණය වෙමින්...',
    'common.error': 'දෝෂය',
    'common.success': 'සාර්ථකතා',
    'common.close': 'වසා දමන්න',
    'common.submit': 'ඉදිරිපත් කරන්න',

    // Status
    'status.pending': 'අපේක්ෂාව',
    'status.completed': 'සම්පූර්ණ',
    'status.missed': 'අතපසු',
    'status.cancelled': 'අවලංගු',
    'status.scheduled': 'සූත්‍ර ගත',
  },
  ta: {
    // App
    'app.title': 'சுவாகேர் LK',
    'app.subtitle': 'தேசிய குழந்தை தடுப்பூசி ব்যवस्थаபन முறைமை',

    // Navigation
    'nav.dashboard': 'கவனக்குறிப்பு',
    'nav.healthRecords': 'சுகாதார பதிவுகள்',
    'nav.notifications': 'அறிவிப்புகள்',
    'nav.growthChart': 'வளர்ச்சி விளக்கப்படம்',
    'nav.profile': 'சுயவிவரம்',
    'nav.settings': 'அமைப்புகள்',
    'nav.logout': 'வெளியேறு',
    'nav.help': 'உதவி மையம்',

    // Profile
    'profile.title': 'சுயவிவர மேலாண்மை',
    'profile.viewProfile': 'சுயவிவரத்தைக் காணுங்கள்',
    'profile.editProfile': 'சுயவிவரத்தைத் திருத்தவும்',
    'profile.fullName': 'முழு பெயர்',
    'profile.nic': 'NIC',
    'profile.email': 'மின்னஞ்சல்',
    'profile.mobileNumber': 'மொபைல் எண்',
    'profile.address': 'முகவரி',
    'profile.linkedChildren': 'இணைக்கப்பட்ட குழந்தைகள்',
    'profile.accountActivity': 'கணக்கு செயல்பாடு',
    'profile.changePassword': 'கடவுச்சொல்லை மாற்றவும்',
    'profile.changeMobileNumber': 'மொபைல் எண்ணை மாற்றவும்',
    'profile.save': 'மாற்றங்களைச் சேமிக்கவும்',
    'profile.cancel': 'ரத்துசெய்யவும்',
    'profile.noLinkedChildren': 'இன்னும் இணைக்கப்பட்ட குழந்தைகள் இல்லை',

    // Mobile Number Change with 2FA
    'profile.changeMobile.title': 'மொபைல் எண்ணை மாற்றவும்',
    'profile.changeMobile.enterNew': 'புதிய மொபைல் எண்ணை உள்ளிடவும்',
    'profile.changeMobile.step1': 'படி 1: மாற்றத்தை கோரவும்',
    'profile.changeMobile.step2': 'படி 2: OTPயை சரிபார்க்கவும்',
    'profile.changeMobile.step3': 'படி 3: புதுப்பிப்பைத் திருப்பிக் கொள்ளவும்',
    'profile.changeMobile.otpSent': 'OTP உங்கள் புதிய மொபைல் எண்ணுக்கு அனுப்பப்பட்டது',
    'profile.changeMobile.enterOtp': 'OTP குறியீட்டை உள்ளிடவும்',
    'profile.changeMobile.verify': 'OTPயை சரிபார்க்கவும்',
    'profile.changeMobile.verified': 'மொபைல் எண் வெற்றிகரமாக சரிபார்க்கப்பட்டது',
    'profile.changeMobile.failed': 'OTP சரிபார்ப்பு தோல்வியடைந்தது',
    'profile.changeMobile.resendOtp': 'OTPஐ மீண்டும் அனுப்பவும்',

    // Vaccines
    'vaccine.title': 'தடுப்பூசி வழிகாட்டி',
    'vaccine.guide': 'இலங்கை தேசிய நோய் தடுப்பூசி அட்டவணை',
    'vaccine.name': 'தடுப்பூசியின் பெயர்',
    'vaccine.manufacturer': 'உற்பादक',
    'vaccine.dosage': 'மருந்தளவு',
    'vaccine.recommendedAge': 'பரிந்துரைக்கப்பட்ட வயது',
    'vaccine.interval': 'இடைவெளி நாட்கள்',
    'vaccine.description': 'விளக்கம்',

    // Vaccines - Sri Lanka Schedule
    'vaccine.bcg': 'BCG (பசिலस் கல்மेட-गुयারिन)',
    'vaccine.opv': 'OPV (வாய்வழி போலியோ தடுப்பூசி)',
    'vaccine.pentavalent': 'Pentavalent (DPT + HepB + Hib)',
    'vaccine.mmr': 'MMR (தட்டம்மை, மம்ப்स், ஜோசை)',
    'vaccine.je': 'JE (ஜப்பான் என்செபலிটிஸ்)',
    'vaccine.dpt': 'DPT (டிப்தீரியா, பার்টுசிஸ், டெட்டனஸ்)',

    // Notifications
    'notification.title': 'அறிவிப்புகள்',
    'notification.upcoming': 'வரவிருக்கும் தடுப்பூசி',
    'notification.missed': 'தவறிய தடுப்பூசி',
    'notification.completed': 'தடுப்பூசி முடிந்துவிட்டது',
    'notification.childLinked': 'குழந்தை இணைக்கப்பட்டது',
    'notification.growthUpdate': 'வளர்ச்சி புதுப்பிப்பு',
    'notification.noNotifications': 'அறிவிப்புகள் இல்லை',
    'notification.markAsRead': 'படிக்கப்பட்டதாக குறிக்கவும்',
    'notification.markAllAsRead': 'அனைத்தையும் படிக்கப்பட்டதாக குறிக்கவும்',

    // Growth Chart
    'growth.title': 'வளர்ச்சி விளக்கப்படம்',
    'growth.weight': 'எடை',
    'growth.height': 'உயரம்',
    'growth.headCircumference': 'தலை சுற்றளவு',
    'growth.lastVisit': 'கடைசி பார்வை',
    'growth.export': 'CSV ஐ ஏற்றுமதி செய்யவும்',
    'growth.print': 'பதிவைப் பிரிண்ட் செய்யவும்',

    // Common
    'common.save': 'சேமிக்கவும்',
    'common.cancel': 'ரத்துசெய்யவும்',
    'common.delete': 'நீக்கவும்',
    'common.edit': 'திருத்தவும்',
    'common.back': 'பின்னுக்குத் திரும்பவும்',
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
    'common.close': 'மூடவும்',
    'common.submit': 'சமர்ப்பிக்கவும்',

    // Status
    'status.pending': 'பேரீட்டு',
    'status.completed': 'முடிந்துவிட்டது',
    'status.missed': 'தவறிய',
    'status.cancelled': 'ரத்துசெய்யப்பட்டது',
    'status.scheduled': 'திட்டமிடப்பட்டது',
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

