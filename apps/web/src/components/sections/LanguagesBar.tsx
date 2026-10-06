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
    <section className="py-6 border-y border-[var(--border)] bg-[var(--surface-2)]" aria-label={t.a11y.languages}>
      <div className="container-main flex flex-wrap items-center justify-center gap-3 text-xs">
        <span className="font-semibold text-[var(--ink-2)]">{t.langs.availableIn}:</span>
        <div className="flex flex-wrap items-center gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelectLocale(lang.code)}
              className={`px-3 py-1 rounded-[var(--radius-pill)] font-semibold text-xs transition-all duration-[var(--dur-fast)] cursor-pointer ${
                currentLocale === lang.code
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-sm'
                  : 'bg-[var(--surface)] text-[var(--ink-2)] border border-[var(--border)] hover:bg-[var(--surface-2)]'
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
