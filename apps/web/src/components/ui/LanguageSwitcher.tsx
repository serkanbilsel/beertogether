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
        <Globe className="w-4 h-4 text-[var(--accent)] absolute start-3 pointer-events-none" />
        <select
          id="language-select"
          value={currentLocale}
          onChange={(e) => onSelectLocale(e.target.value as Locale)}
          className="appearance-none h-[44px] ps-9 pe-8 rounded-[var(--radius-md)] bg-[#0C0E17] text-white text-xs font-display font-semibold border border-[#1F2438] hover:border-[var(--accent)]/40 hover:bg-[#131624] transition-all duration-[var(--dur-fast)] cursor-pointer focus:outline-none"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-[#0C0E17] text-white">
              {lang.name}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute end-2.5 pointer-events-none" />
      </div>
    </div>
  );
};
