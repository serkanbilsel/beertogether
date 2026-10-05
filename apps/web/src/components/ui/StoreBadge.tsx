import React from 'react';
import { TranslationType } from '@/lib/translations/en';

interface StoreBadgeProps {
  platform: 'apple' | 'google';
  t?: TranslationType;
  className?: string;
}

export const StoreBadge: React.FC<StoreBadgeProps> = ({ platform, t, className = '' }) => {
  if (platform === 'apple') {
    const topLabel = t?.store?.appleTop || 'Download on the';
    const ariaLabel = t?.hero?.appStore || 'Download on the App Store';

    return (
      <a
        href="#download"
        aria-label={ariaLabel}
        className={`inline-flex items-center h-[48px] px-4 rounded-[var(--radius-md)] bg-[var(--dark-bg)] text-[var(--dark-ink)] border border-[var(--border)] hover:opacity-90 transition-opacity duration-[var(--dur-fast)] ${className}`}
      >
        <svg className="w-6 h-6 me-3 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.59.69-1.11 1.83-.97 2.94 1.07.08 2.16-.54 2.78-1.28z" />
        </svg>
        <div className="text-start leading-tight">
          <div className="text-[10px] uppercase font-medium tracking-wider opacity-80">{topLabel}</div>
          <div className="text-[14px] font-bold tracking-tight">App Store</div>
        </div>
      </a>
    );
  }

  const topLabel = t?.store?.googleTop || 'Get it on';
  const ariaLabel = t?.hero?.googlePlay || 'Get it on Google Play';

  return (
    <a
      href="#download"
      aria-label={ariaLabel}
      className={`inline-flex items-center h-[48px] px-4 rounded-[var(--radius-md)] bg-[var(--dark-bg)] text-[var(--dark-ink)] border border-[var(--border)] hover:opacity-90 transition-opacity duration-[var(--dur-fast)] ${className}`}
    >
      <svg className="w-5 h-5 me-3 fill-current shrink-0" viewBox="0 0 24 24">
        <path d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 0 1-.61-1.42V3.234c0-.555.225-1.058.609-1.42zm11.605 11.609l2.457 2.457-11.88 6.786 9.423-9.243zm0-2.846L5.79 1.334l11.88 6.786-2.456 2.457zm1.422 1.423l3.708 2.119a1.5 1.5 0 0 0 0-2.612l-3.708-2.12-.907.906.907.907z" />
      </svg>
      <div className="text-start leading-tight">
        <div className="text-[10px] uppercase font-medium tracking-wider opacity-80">{topLabel}</div>
        <div className="text-[14px] font-bold tracking-tight">Google Play</div>
      </div>
    </a>
  );
};
