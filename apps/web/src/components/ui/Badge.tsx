import React from 'react';

export const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-[4px] rounded-[var(--radius-pill)] bg-[var(--accent-soft)] text-[var(--accent-text)] text-[13px] font-semibold leading-normal ${className}`}
    >
      {children}
    </span>
  );
};
