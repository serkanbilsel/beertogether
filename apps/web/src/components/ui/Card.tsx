import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  surface2?: boolean;
  glass?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  hoverable = false,
  surface2 = false,
  glass = true,
  className = '',
  children,
  ...props
}) => {
  const base =
    'rounded-[var(--radius-lg)] border border-[var(--border)] p-[var(--space-6)] md:p-[var(--space-8)] shadow-[var(--shadow-md)] transition-all duration-[var(--dur-base)] ease-[var(--ease-out)] relative overflow-hidden';
  
  const bg = glass
    ? 'bg-[#0C0E17]/80 backdrop-blur-xl border-[#1F2438]'
    : surface2
    ? 'bg-[var(--surface-2)]'
    : 'bg-[var(--surface)]';

  const hover = hoverable
    ? 'hover:border-[var(--accent)]/40 hover:shadow-[0_12px_40px_-8px_rgba(255,179,0,0.15)] hover:-translate-y-0.5'
    : '';

  return (
    <div className={`${base} ${bg} ${hover} ${className}`} {...props}>
      {children}
    </div>
  );
};
