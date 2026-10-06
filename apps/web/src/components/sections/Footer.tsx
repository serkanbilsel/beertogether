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
    <footer className="bg-[var(--dark-bg)] text-[var(--dark-ink)] pt-16 pb-12 border-t border-[var(--dark-surface)]">
      <div className="container-main">
        {/* 4 Columns per Section 5.10 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-[var(--dark-surface)] text-start">
          {/* Col 1: Product */}
          <div className="space-y-3">
            <div className="font-semibold text-xs tracking-wider uppercase text-[var(--dark-ink-2)]">
              {t.footer.colProduct}
            </div>
            <ul className="space-y-2 text-sm text-[var(--dark-ink-2)] font-medium">
              <li>
                <a href="#how" className="hover:text-[var(--dark-ink)] transition-colors">
                  {t.nav.howItWorks}
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[var(--dark-ink)] transition-colors">
                  {t.nav.features}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[var(--dark-ink)] transition-colors">
                  {t.nav.faq}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div className="space-y-3">
            <div className="font-semibold text-xs tracking-wider uppercase text-[var(--dark-ink-2)]">
              {t.footer.colCompany}
            </div>
            <ul className="space-y-2 text-sm text-[var(--dark-ink-2)] font-medium">
              <li>
                <a href="#" className="hover:text-[var(--dark-ink)] transition-colors">
                  {t.footer.about}
                </a>
              </li>
              <li>
                <a href="mailto:support@beertogether.app" className="hover:text-[var(--dark-ink)] transition-colors">
                  {t.footer.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div className="space-y-3">
            <div className="font-semibold text-xs tracking-wider uppercase text-[var(--dark-ink-2)]">
              {t.footer.colLegal}
            </div>
            <ul className="space-y-2 text-sm text-[var(--dark-ink-2)] font-medium">
              <li>
                <a href="#" className="hover:text-[var(--dark-ink)] transition-colors">
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--dark-ink)] transition-colors">
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--dark-ink)] transition-colors">
                  {t.footer.cookies}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--dark-ink)] transition-colors">
                  {t.footer.deleteAccount}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Language */}
          <div className="space-y-3">
            <div className="font-semibold text-xs tracking-wider uppercase text-[var(--dark-ink-2)]">
              {t.footer.colLang}
            </div>
            <div>
              <LanguageSwitcher currentLocale={locale} onSelectLocale={onLocaleChange} ariaLabel={t.a11y.language} />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, 18+ and Responsible Drinking Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--dark-ink-2)]">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>© {currentYear} Beer Together</span>
            <span>·</span>
            <span>18+ only</span>
            <span>·</span>
            <span>{t.trust.drinkResponsibly}</span>
          </div>
          <div className="text-[11px] text-[var(--dark-ink-2)]/80">
            {t.footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};
