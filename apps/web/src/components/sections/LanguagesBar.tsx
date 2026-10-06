import React from 'react';
import { TranslationType } from '@/lib/translations/en';
import { Locale } from '@/lib/translations';

interface LanguagesBarProps {
  t: TranslationType;
  currentLocale: Locale;
  onSelectLocale: (locale: Locale) => void;
}

const LANGUAGES: { code: Locale; name: string }[] = [
  { code: 'tr', name: 'Türkçe' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'ja', name: '日本語' },
  { code: 'ar', name: 'العربية' },
  { code: 'it', name: 'Italiano' },
];

export const LanguagesBar: React.FC<LanguagesBarProps> = ({ t, currentLocale, onSelectLocale }) => {
  return (
    <section className="py-6 border-y border-[#1F2438] bg-[#080A10]/60 backdrop-blur-md" aria-label={t.a11y.languages}>
      <div className="container-main flex flex-wrap items-center justify-center gap-3 text-xs">
        <span className="font-semibold text-slate-400">{t.langs.availableIn}:</span>
        <div className="flex flex-wrap items-center gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelectLocale(lang.code)}
              className={`px-3.5 py-1.5 rounded-[var(--radius-pill)] font-display font-semibold text-xs transition-all duration-[var(--dur-fast)] cursor-pointer ${
                currentLocale === lang.code
                  ? 'bg-[var(--accent)] text-[#05060A] shadow-[0_0_16px_rgba(255,179,0,0.35)] scale-105'
                  : 'bg-[#121420] text-slate-300 border border-[#1F2438] hover:border-[var(--accent)]/40 hover:text-white'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
