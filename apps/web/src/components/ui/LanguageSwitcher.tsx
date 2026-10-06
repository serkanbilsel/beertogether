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
        <Globe className="w-3.5 h-3.5 text-[var(--ink-2)] absolute start-3 pointer-events-none stroke-[1.75]" />
        <select
          id="language-select"
          value={currentLocale}
          onChange={(e) => onSelectLocale(e.target.value as Locale)}
          className="appearance-none h-[40px] ps-8 pe-7 rounded-full bg-[var(--surface-2)] hover:bg-[var(--surface)] text-[var(--ink)] text-xs font-semibold border border-[var(--border)] transition-all duration-[var(--dur-fast)] cursor-pointer focus:outline-none"
        >
          {LANGUAGES.map((lang) => (
            <option
              key={lang.code}
              value={lang.code}
              className="bg-[var(--surface)] text-[var(--ink)]"
            >
              {lang.name}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3 h-3 text-[var(--ink-3)] absolute end-2.5 pointer-events-none" />
      </div>
    </div>
  );
};
