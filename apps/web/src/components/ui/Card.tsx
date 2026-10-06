import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  surface2?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  hoverable = false,
  surface2 = false,
  className = '',
  children,
  ...props
}) => {
  const base =
    'rounded-[var(--radius-lg)] border border-[var(--border)] p-[var(--space-6)] md:p-[var(--space-8)] shadow-[var(--shadow-sm)] transition-all duration-[var(--dur-base)] ease-[var(--ease-out)] relative overflow-hidden';
  
  const bg = surface2 ? 'bg-[var(--surface-2)]' : 'bg-[var(--surface)]';

  const hover = hoverable
    ? 'hover:border-[#D4D4D8] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5'
    : '';

  return (
    <div className={`${base} ${bg} ${hover} ${className}`} {...props}>
      {children}
    </div>
  );
};
