import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  ariaLabel = 'App mockup preview',
  className = '',
}) => {
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={`relative w-full max-w-[320px] sm:max-w-[360px] mx-auto rounded-[38px] bg-[var(--dark-bg)] p-[10px] shadow-[var(--shadow-lg)] border border-[var(--border)] ${className}`}
      style={{ aspectRatio: '9/18.5' }}
    >
      {/* Side buttons */}
      <div className="absolute -inset-inline-start-[12px] top-[90px] w-[3px] h-[26px] bg-[var(--border)] rounded-s-sm" />
      <div className="absolute -inset-inline-start-[12px] top-[125px] w-[3px] h-[40px] bg-[var(--border)] rounded-s-sm" />
      <div className="absolute -inset-inline-start-[12px] top-[175px] w-[3px] h-[40px] bg-[var(--border)] rounded-s-sm" />
      <div className="absolute -inset-inline-end-[12px] top-[110px] w-[3px] h-[55px] bg-[var(--border)] rounded-e-sm" />

      {/* Inner Screen */}
      <div className="relative w-full h-full rounded-[30px] bg-[var(--bg)] overflow-hidden flex flex-col text-[var(--ink)] shadow-inner">
        {/* Dynamic Island Notch */}
        <div className="w-full pt-3 pb-2 px-6 flex items-center justify-between z-20 select-none border-b border-[var(--border)] bg-[var(--bg)]">
          <span className="text-[12px] font-bold text-[var(--ink)] tabular">20:42</span>
          <div className="w-20 h-4 rounded-full bg-[var(--dark-bg)] flex items-center justify-end px-2">
            <div className="w-2 h-2 rounded-full bg-[var(--dark-surface)]" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-2.5 rounded-[3px] border border-[var(--ink)] p-[1px] flex items-center">
              <div className="w-2 h-full bg-[var(--ink)] rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
