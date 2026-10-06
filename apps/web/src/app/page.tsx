'use client';

import React, { useState, useEffect } from 'react';
import { getTranslation, isRTL, Locale } from '@/lib/translations';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { FeaturesBento } from '@/components/sections/FeaturesBento';
import { ShareableMoments } from '@/components/sections/ShareableMoments';
import { SafetyTrust } from '@/components/sections/SafetyTrust';
import { LanguagesBar } from '@/components/sections/LanguagesBar';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';

export default function LandingPage() {
  const [locale, setLocale] = useState<Locale>('tr');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const rtl = isRTL(locale);
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('bt-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('bt-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const t = getTranslation(locale);
  const rtl = isRTL(locale);

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)] transition-colors duration-200">
      {/* 1. Header with Language and Theme Switcher */}
      <Header
        t={t}
        locale={locale}
        onLocaleChange={setLocale}
        theme={theme}
        onThemeToggle={toggleTheme}
      />

      <main id="main-content" className="flex-1">
        {/* 2. Hero with Theme-Synced 3D iPhone */}
        <Hero t={t} theme={theme} />

        {/* 3. How It Works */}
        <HowItWorks t={t} />

        {/* 4. Features Bento */}
        <FeaturesBento t={t} />

        {/* 5. Shareable Moments */}
        <ShareableMoments t={t} />

        {/* 6. Safety & Trust */}
        <SafetyTrust t={t} />

        {/* 7. Languages Bar */}
        <LanguagesBar t={t} currentLocale={locale} onSelectLocale={setLocale} />

        {/* 8. FAQ */}
        <FAQSection t={t} />

        {/* 9. Final CTA */}
        <FinalCTA t={t} />
      </main>

      {/* 10. Footer */}
      <Footer t={t} locale={locale} onLocaleChange={setLocale} />
    </div>
  );
}

