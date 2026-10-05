'use client';

import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Locale } from '@/lib/translations';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  onSelectLocale: (locale: Locale) => void;
  ariaLabel?: string;
  className?: string;
}

const LANGUAGES: { code: Locale; name: string }[] = [
  { code: 'tr', name: 'Türkçe' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'ja', name: '日本語' },
  { code: 'ar', name: 'العربية' },
  { code: 'it', name: 'Italiano' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLocale,
  onSelectLocale,
  ariaLabel = 'Select language',
  className = '',
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <label htmlFor="language-select" className="sr-only">
        {ariaLabel}
      </label>
      <div className="relative flex items-center">
        <Globe className="w-4 h-4 text-[var(--ink-2)] absolute start-3 pointer-events-none" />
        <select
          id="language-select"
          value={currentLocale}
          onChange={(e) => onSelectLocale(e.target.value as Locale)}
          className="appearance-none h-[44px] ps-9 pe-8 rounded-[var(--radius-md)] bg-[var(--surface)] text-[var(--ink)] text-sm font-medium border border-[var(--border)] hover:bg-[var(--surface-2)] transition-colors duration-[var(--dur-fast)] cursor-pointer focus:outline-none"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-[var(--ink-2)] absolute end-2.5 pointer-events-none" />
      </div>
    </div>
  );
};
