import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'lg';
  asLink?: boolean;
  href?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  asLink = false,
  href,
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-[var(--radius-md)] transition-all duration-[var(--dur-fast)] ease-[var(--ease-out)] active:translate-y-0 disabled:opacity-45 disabled:pointer-events-none cursor-pointer';

  const sizeStyles =
    size === 'sm'
      ? 'h-[44px] px-[20px] text-[15px]'
      : 'h-[52px] px-[28px] text-[16px]';

  const variantStyles = {
    primary:
      'bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] hover:-translate-y-[1px]',
    secondary:
      'bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] hover:bg-[var(--surface-2)] hover:-translate-y-[1px]',
    ghost:
      'bg-transparent text-[var(--ink)] hover:bg-[var(--surface-2)]',
  }[variant];

  const combined = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (asLink && href) {
    return (
      <a href={href} className={combined}>
        {children}
      </a>
    );
  }

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
};
