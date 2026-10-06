import React from 'react';

export const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-[var(--radius-pill)] bg-[var(--accent-soft)] text-[var(--accent-text)] text-[11px] font-semibold tracking-wide leading-normal ${className}`}
    >
      {children}
    </span>
  );
};
