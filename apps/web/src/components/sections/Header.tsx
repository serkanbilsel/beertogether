import React, { useState, useEffect } from 'react';
import { TranslationType } from '@/lib/translations/en';
import { Locale } from '@/lib/translations';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  t: TranslationType;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  t,
  locale,
  onLocaleChange,
  theme,
  onThemeToggle,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t.nav.skipToContent}
      </a>

      <header
        className={`sticky top-0 z-40 w-full h-[68px] transition-all duration-[var(--dur-fast)] ${
          isScrolled
            ? 'bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container-main h-full flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            aria-label={t.a11y.home}
            className="flex items-center gap-2.5 font-sans font-bold text-lg text-[var(--ink)]"
          >
            <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center font-bold text-sm shadow-sm">
              BT
            </div>
            <span className="tracking-tight">
              Beer Together
            </span>
          </a>

          {/* Desktop Nav Links (≥ 1024px) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[var(--ink-2)]" aria-label={t.a11y.mainNav}>
            <a href="#how" className="hover:text-[var(--ink)] transition-colors">
              {t.nav.howItWorks}
            </a>
            <a href="#features" className="hover:text-[var(--ink)] transition-colors">
              {t.nav.features}
            </a>
            <a href="#safety" className="hover:text-[var(--ink)] transition-colors">
              {t.nav.safety}
            </a>
            <a href="#faq" className="hover:text-[var(--ink)] transition-colors">
              {t.nav.faq}
            </a>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher currentLocale={locale} onSelectLocale={onLocaleChange} ariaLabel={t.a11y.language} />
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <Button size="sm" asLink href="#download">
              {t.nav.getApp}
            </Button>
          </div>

          {/* Mobile Actions (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher currentLocale={locale} onSelectLocale={onLocaleChange} ariaLabel={t.a11y.language} />
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label={t.nav.menu}
              className="p-2 rounded-[var(--radius-sm)] text-[var(--ink)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-2)] focus:outline-none"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Sheet Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          className="fixed inset-0 z-50 bg-[#FAFAF9] p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
              <div className="flex items-center gap-2.5 font-bold text-lg text-[var(--ink)]">
                <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center font-bold">
                  BT
                </div>
                <span>Beer Together</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label={t.nav.close}
                className="p-2 rounded-[var(--radius-sm)] border border-[var(--border)] text-[var(--ink)] bg-[var(--surface)] hover:bg-[var(--surface-2)] focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-5 pt-8 text-lg font-semibold text-[var(--ink)] text-start" aria-label={t.a11y.mainNav}>
              <a
                href="#how"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[var(--accent-text)]"
              >
                {t.nav.howItWorks}
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[var(--accent-text)]"
              >
                {t.nav.features}
              </a>
              <a
                href="#safety"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[var(--accent-text)]"
              >
                {t.nav.safety}
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[var(--accent-text)]"
              >
                {t.nav.faq}
              </a>
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-[var(--border)]">
            <Button size="lg" asLink href="#download" onClick={() => setMobileMenuOpen(false)} className="w-full">
              {t.nav.getApp}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
