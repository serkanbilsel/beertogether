'use client';

import React from 'react';
import { TranslationType } from '@/lib/translations/en';
import { Locale } from '@/lib/translations';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

interface FooterProps {
  t: TranslationType;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export const Footer: React.FC<FooterProps> = ({ t, locale, onLocaleChange }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030407] text-[#F8FAFC] pt-20 pb-12 border-t border-[#1F2438] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[var(--accent)]/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="container-main relative z-10">
        {/* 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-16 border-b border-[#1F2438] text-start">
          {/* Col 1: Product */}
          <div className="space-y-4">
            <div className="font-display font-bold text-xs tracking-wider uppercase text-[var(--accent)]">
              {t.footer.colProduct}
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li>
                <a href="#how" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t.nav.howItWorks}
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t.nav.features}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t.nav.faq}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div className="space-y-4">
            <div className="font-display font-bold text-xs tracking-wider uppercase text-[var(--accent)]">
              {t.footer.colCompany}
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t.footer.about}
                </a>
              </li>
              <li>
                <a href="mailto:support@beertogether.app" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t.footer.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div className="space-y-4">
            <div className="font-display font-bold text-xs tracking-wider uppercase text-[var(--accent)]">
              {t.footer.colLegal}
            </div>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t.footer.cookies}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  {t.footer.deleteAccount}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Language */}
          <div className="space-y-4">
            <div className="font-display font-bold text-xs tracking-wider uppercase text-[var(--accent)]">
              {t.footer.colLang}
            </div>
            <div>
              <LanguageSwitcher currentLocale={locale} onSelectLocale={onLocaleChange} ariaLabel={t.a11y.language} />
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div>© {currentYear} {t.footer.copyright}</div>
          <div className="font-display font-semibold text-slate-300">
            Plans, not promises.
          </div>
        </div>
      </div>
    </footer>
  );
};
