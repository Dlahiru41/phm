import en from './locales/en.json';

export const SUPPORTED_LANGUAGES = ['en', 'si', 'ta'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = 'en';

export const LANGUAGE_STORAGE_KEY = 'language';

export const LANGUAGE_LABEL_KEYS: Record<Language, TranslationKey> = {
  en: 'languages.english',
  si: 'languages.sinhala',
  ta: 'languages.tamil',
};

type TranslationTree = typeof en;

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;
export type TranslationKey = {
  [K in keyof TranslationTree & string]: TranslationTree[K] extends string
    ? K
    : `${K}${DotPrefix<NestedKeys<TranslationTree[K]>>}`;
}[keyof TranslationTree & string];

type NestedKeys<T> = {
  [K in keyof T & string]: T[K] extends string ? K : `${K}${DotPrefix<NestedKeys<T[K]>>}`;
}[keyof T & string];

export type InterpolationValues = Record<string, string | number>;

const localeLoaders: Record<Language, () => Promise<TranslationTree>> = {
  en: async () => en,
  si: async () => (await import('./locales/si.json')).default as TranslationTree,
  ta: async () => (await import('./locales/ta.json')).default as TranslationTree,
};

const localeCache: Partial<Record<Language, TranslationTree>> = {
  en,
};

let currentLanguage: Language = DEFAULT_LANGUAGE;
const languageListeners = new Set<(lang: Language) => void>();

function isLanguage(value: string | null): value is Language {
  return !!value && SUPPORTED_LANGUAGES.includes(value as Language);
}

function getByPath(obj: unknown, path: string): string | undefined {
  return path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj) as string | undefined;
}

function interpolate(text: string, values?: InterpolationValues): string {
  if (!values) return text;
  return text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

function flattenKeys(obj: unknown, prefix = ''): string[] {
  if (!obj || typeof obj !== 'object') return [];
  const entries = Object.entries(obj as Record<string, unknown>);
  return entries.flatMap(([key, value]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    return typeof value === 'string' ? [next] : flattenKeys(value, next);
  });
}

function validateLocaleShape(locale: TranslationTree): boolean {
  const baseKeys = flattenKeys(en);
  const localeKeys = flattenKeys(locale);
  return baseKeys.length === localeKeys.length && baseKeys.every((key) => localeKeys.includes(key));
}

export function getLanguage(): Language {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  currentLanguage = isLanguage(stored) ? stored : DEFAULT_LANGUAGE;
  return currentLanguage;
}

export function setLanguage(language: Language): void {
  currentLanguage = language;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  document.documentElement.lang = language;
  languageListeners.forEach((listener) => listener(language));
}

export async function loadLocale(language: Language): Promise<TranslationTree> {
  const cached = localeCache[language];
  if (cached) return cached;

  const locale = await localeLoaders[language]();
  if (!validateLocaleShape(locale)) {
    return en;
  }

  localeCache[language] = locale;
  return locale;
}

export function getCachedLocale(language: Language): TranslationTree {
  return localeCache[language] ?? en;
}

export function t(key: TranslationKey, values?: InterpolationValues, language: Language = getLanguage()): string {
  const locale = localeCache[language] ?? en;
  const translated = getByPath(locale, key) ?? getByPath(en, key) ?? key;
  return interpolate(translated, values);
}

export function onLanguageChange(listener: (lang: Language) => void): () => void {
  languageListeners.add(listener);
  return () => languageListeners.delete(listener);
}

export interface LanguageOption {
  code: Language;
  flag: string;
}

export function getLanguageOptions(): LanguageOption[] {
  return [
    { code: 'en', flag: '🇬🇧' },
    { code: 'si', flag: '🇱🇰' },
    { code: 'ta', flag: '🇱🇰' },
  ];
}
