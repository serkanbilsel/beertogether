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
    'inline-flex items-center justify-center font-sans font-semibold rounded-[var(--radius-md)] transition-all duration-[var(--dur-fast)] ease-[var(--ease-out)] active:translate-y-0 disabled:opacity-45 disabled:pointer-events-none cursor-pointer select-none';

  const sizeStyles =
    size === 'sm'
      ? 'h-[40px] px-[16px] text-[14px]'
      : 'h-[48px] px-[24px] text-[15px]';

  const variantStyles = {
    primary:
      'bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] shadow-sm hover:shadow hover:-translate-y-[1px]',
    secondary:
      'bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] hover:bg-[var(--surface-2)] shadow-sm hover:-translate-y-[1px]',
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
