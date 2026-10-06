import React, { useState, useEffect } from 'react';
import { TranslationType } from '@/lib/translations/en';
import { Locale } from '@/lib/translations';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Beer, Menu, X } from 'lucide-react';

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
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
      
      const sections = ['how', 'features', 'safety', 'faq'];
      const scrollPos = window.scrollY + 100;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
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

  const navLinks = [
    { id: 'how', href: '#how', label: t.nav.howItWorks },
    { id: 'features', href: '#features', label: t.nav.features },
    { id: 'safety', href: '#safety', label: t.nav.safety },
    { id: 'faq', href: '#faq', label: t.nav.faq },
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t.nav.skipToContent}
      </a>

      {/* 5.1 Header: 72px sticky, 80% opacity, backdrop-filter blur(12px), border only on scroll */}
      <header
        className={`sticky top-0 z-40 w-full h-[72px] transition-colors duration-200 backdrop-blur-[12px] bg-[var(--bg)]/80 ${
          isScrolled ? 'border-b border-[var(--border)]' : 'border-b border-transparent'
        }`}
      >
        <div className="container-main h-full flex items-center justify-between">
          {/* Left: Brand Logo (Sculpted, iconic brand wordmark) */}
          <a
            href="#"
            aria-label={t.a11y.home}
            className="flex items-center gap-2.5 group select-none transition-transform active:scale-95"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center shadow-[0_2px_10px_rgba(232,163,61,0.35)] group-hover:scale-105 transition-transform">
              <Beer className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex items-baseline">
              <span className="font-display font-black text-[18px] tracking-[-0.02em] uppercase text-[var(--ink)]">
                BEER<span className="text-[var(--accent)] ms-1">TOGETHER</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] ms-1 inline-block" />
            </div>
          </a>

          {/* Center (≥1024px): How it works · Features · Safety · FAQ */}
          <nav
            className="hidden lg:flex items-center gap-1.5 font-display text-[14px] font-semibold text-[var(--ink-2)]"
            aria-label={t.a11y.mainNav}
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`px-4 py-2 rounded-full transition-all duration-[var(--dur-fast)] tracking-[-0.015em] ${
                  activeSection === link.id
                    ? 'text-[var(--ink)] font-bold bg-[var(--surface-2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]'
                    : 'hover:text-[var(--ink)] hover:bg-[var(--surface-2)]/70'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Language switcher + Theme toggle + Primary "Get the app" CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher
              currentLocale={locale}
              onSelectLocale={onLocaleChange}
              ariaLabel={t.a11y.language}
            />
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <a
              href="#download"
              className="h-[42px] px-5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-display font-bold text-[13.5px] tracking-[-0.01em] inline-flex items-center justify-center shadow-[0_2px_12px_rgba(232,163,61,0.35)] hover:bg-[var(--accent-hover)] transition-all duration-[var(--dur-fast)] active:translate-y-0 hover:-translate-y-0.5"
            >
              {t.nav.getApp}
            </a>
          </div>

          {/* Mobile Right Controls (<1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher
              currentLocale={locale}
              onSelectLocale={onLocaleChange}
              ariaLabel={t.a11y.language}
            />
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label={t.nav.menu}
              className="w-10 h-10 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--ink)] hover:bg-[var(--surface-2)] active:scale-95 transition-all focus:outline-none"
            >
              <Menu className="w-5 h-5 stroke-[1.75]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu: Full-screen sheet with focus trap, backdrop blur, Esc support */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          className="fixed inset-0 z-50 bg-[var(--ink)]/40 backdrop-blur-md flex flex-col p-4 sm:p-6"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg mx-auto my-auto rounded-[var(--radius-xl)] bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] shadow-[var(--shadow-lg)] p-6 space-y-6"
          >
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <div className="flex items-center gap-2.5 font-bold text-base text-[var(--ink)]">
                <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center">
                  <Beer className="w-4 h-4 stroke-[2]" />
                </div>
                <span>Beer Together</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label={t.nav.close}
                className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--surface-2)] active:scale-90 transition-all focus:outline-none"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* Sheet Navigation */}
            <nav className="flex flex-col gap-1.5" aria-label={t.a11y.mainNav}>
              {navLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-[var(--radius-md)] text-[16px] font-semibold text-[var(--ink)] hover:bg-[var(--surface-2)] transition-colors text-start"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Sheet Primary CTA */}
            <div className="pt-2">
              <a
                href="#download"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-[48px] rounded-[var(--radius-md)] bg-[var(--accent)] text-[var(--accent-ink)] font-bold text-[15px] flex items-center justify-center shadow-sm hover:bg-[var(--accent-hover)] active:scale-[0.98] transition-all"
              >
                {t.nav.getApp}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
