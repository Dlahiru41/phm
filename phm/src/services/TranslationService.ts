import {
  getLanguage,
  getLanguageOptions,
  LANGUAGE_LABEL_KEYS,
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

  static t(key: TranslationKey, values?: InterpolationValues, language?: Language): string {
    return t(key, values, language);
  }

  static getAllLanguages(): Array<{ code: Language; name: string; flag: string }> {
    return getLanguageOptions().map((option) => ({
      ...option,
      name: t(LANGUAGE_LABEL_KEYS[option.code]),
    }));
  }
}
