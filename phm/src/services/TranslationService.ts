import {
  getLanguage,
  getLanguageOptions,
  setLanguage,
  t,
  type InterpolationValues,
  type Language,
  type TranslationKey,
} from '../i18n';

export type { Language };

export class TranslationService {
  static setLanguage(lang: Language): void {
    setLanguage(lang);
  }

  static getLanguage(): Language {
    return getLanguage();
  }

  static t(key: TranslationKey, values?: InterpolationValues): string {
    return t(key, values);
  }

  static getAllLanguages(): Array<{ code: Language; name: string; flag: string }> {
    return getLanguageOptions().map((option) => ({
      ...option,
      name: t(option.code === 'en' ? 'languages.english' : option.code === 'si' ? 'languages.sinhala' : 'languages.tamil'),
    }));
  }
}
