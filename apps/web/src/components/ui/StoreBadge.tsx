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
        className={`group relative inline-flex items-center h-[48px] px-4 rounded-[var(--radius-md)] bg-black/90 hover:bg-black text-white border border-white/15 hover:border-[var(--accent)] shadow-sm hover:shadow hover:-translate-y-[1px] transition-all duration-[var(--dur-fast)] select-none cursor-pointer ${className}`}
      >
        <svg className="w-5 h-5 me-3 fill-current shrink-0 text-white group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.59.69-1.11 1.83-.97 2.94 1.07.08 2.16-.54 2.78-1.28z" />
        </svg>

        <div className="text-start leading-tight">
          <div className="text-[9px] uppercase font-semibold tracking-wider text-zinc-400 group-hover:text-[var(--accent)] transition-colors">
            {topLabel}
          </div>
          <div className="text-[14px] font-bold tracking-tight text-white">
            App Store
          </div>
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
      className={`group relative inline-flex items-center h-[48px] px-4 rounded-[var(--radius-md)] bg-black/90 hover:bg-black text-white border border-white/15 hover:border-[var(--accent)] shadow-sm hover:shadow hover:-translate-y-[1px] transition-all duration-[var(--dur-fast)] select-none cursor-pointer ${className}`}
    >
      {/* Top subtle highlight reflection */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Colorful Official Google Play Glyph */}
      <svg className="w-5 h-5 me-3.5 shrink-0 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 0 1-.61-1.42V3.234c0-.555.225-1.058.609-1.42z" />
        <path fill="#EA4335" d="M15.214 10.577L3.609 1.814l10.183 10.186 1.422-1.423z" />
        <path fill="#FBBC05" d="M18.922 12.696l-3.708-2.119-1.422 1.423 1.422 1.423 3.708-2.12c.382-.218.609-.623.609-1.065 0-.441-.227-.847-.609-1.065v3.523z" />
        <path fill="#34A853" d="M13.792 12L3.61 22.186l11.604-8.763-1.422-1.423z" />
      </svg>

      <div className="text-start leading-tight">
        <div className="text-[9px] uppercase font-semibold tracking-wider text-zinc-400 group-hover:text-[var(--accent)] transition-colors">
          {topLabel}
        </div>
        <div className="text-[14px] font-bold tracking-tight text-white">
          Google Play
        </div>
      </div>
    </a>
  );
};
