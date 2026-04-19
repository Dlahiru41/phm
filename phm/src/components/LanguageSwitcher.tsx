import React from 'react';
import { useTranslation } from '../i18n/I18nProvider';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { language, languages, setLanguage } = useTranslation();

  return (
    <select
      aria-label="Language"
      value={language}
      onChange={(event) => void setLanguage(event.target.value as typeof language)}
      className={className}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  );
};
