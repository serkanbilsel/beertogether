import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  surface2?: boolean;
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
    'rounded-[var(--radius-lg)] border border-[var(--border)] p-[var(--space-6)] md:p-[var(--space-8)] shadow-[var(--shadow-md)] transition-shadow duration-[var(--dur-base)] ease-[var(--ease-out)]';
  const bg = surface2 ? 'bg-[var(--surface-2)]' : 'bg-[var(--surface)]';
  const hover = hoverable ? 'hover:shadow-[var(--shadow-lg)]' : '';

  return (
    <div className={`${base} ${bg} ${hover} ${className}`} {...props}>
      {children}
    </div>
  );
};
