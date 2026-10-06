'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle, className = '' }) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Açık Moda Geç' : 'Koyu Moda Geç'}
      title={isDark ? 'Açık Moda Geç' : 'Koyu Moda Geç'}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--ink)] border border-[var(--border)] shadow-sm transition-all duration-200 active:scale-95 ${className}`}
    >
      {isDark ? (
        <Sun className="w-4.5 h-4.5 text-amber-400 animate-spin-slow" />
      ) : (
        <Moon className="w-4.5 h-4.5 text-zinc-700" />
      )}
    </button>
  );
};
