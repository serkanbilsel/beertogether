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
      className={`relative inline-flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[var(--surface-2)] hover:bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] transition-all duration-[var(--dur-fast)] active:scale-95 focus:outline-none cursor-pointer ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[var(--accent)] transition-transform duration-300 stroke-[2]" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--ink)] transition-transform duration-300 stroke-[2]" />
      )}
    </button>
  );
};
