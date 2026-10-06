import React from 'react';

export const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-[var(--radius-pill)] bg-[var(--accent-soft)] border border-[var(--accent)]/30 text-[var(--accent-text)] text-[12px] font-display font-bold tracking-wide leading-normal shadow-[0_0_12px_rgba(255,179,0,0.15)] ${className}`}
    >
      {children}
    </span>
  );
};
