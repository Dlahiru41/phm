import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  getCachedLocale,
  getLanguage,
  getLanguageOptions,
  LANGUAGE_LABEL_KEYS,
  loadLocale,
  onLanguageChange,
  setLanguage,
  t,
  type InterpolationValues,
  type Language,
  type TranslationKey,
} from './index';

interface I18nContextValue {
  language: Language;
  isLoading: boolean;
  setLanguage: (language: Language) => Promise<void>;
  t: (key: TranslationKey, values?: InterpolationValues) => string;
  languages: Array<{ code: Language; name: string; flag: string }>;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => getLanguage());
  const [isLoading, setIsLoading] = useState(false);

  const applyLanguage = useCallback(async (nextLanguage: Language) => {
    setIsLoading(true);
    await loadLocale(nextLanguage);
    setLanguage(nextLanguage);
    setLanguageState(nextLanguage);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void loadLocale(language);
    document.documentElement.lang = language;

    return onLanguageChange((nextLanguage) => {
      setLanguageState(nextLanguage);
    });
  }, [language]);

  const value = useMemo<I18nContextValue>(() => ({
    language,
    isLoading,
    setLanguage: applyLanguage,
    t: (key, values) => t(key, values, language),
    languages: getLanguageOptions().map((option) => ({
      ...option,
      name: t(LANGUAGE_LABEL_KEYS[option.code], undefined, language),
    })),
  }), [applyLanguage, isLoading, language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useTranslation(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}

export function getCurrentLanguageMessages() {
  return getCachedLocale(getLanguage());
}
