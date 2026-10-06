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
      className={`relative w-full max-w-[310px] sm:max-w-[340px] mx-auto rounded-[40px] bg-[#18181B] p-[9px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.08)] ${className}`}
      style={{ aspectRatio: '9/18.5' }}
    >
      {/* Side buttons */}
      <div className="absolute -inset-inline-start-[11px] top-[80px] w-[3px] h-[24px] bg-[#27272A] rounded-s-sm" />
      <div className="absolute -inset-inline-start-[11px] top-[115px] w-[3px] h-[36px] bg-[#27272A] rounded-s-sm" />
      <div className="absolute -inset-inline-start-[11px] top-[160px] w-[3px] h-[36px] bg-[#27272A] rounded-s-sm" />
      <div className="absolute -inset-inline-end-[11px] top-[100px] w-[3px] h-[48px] bg-[#27272A] rounded-e-sm" />

      {/* Inner Screen */}
      <div className="relative w-full h-full rounded-[32px] bg-[#FAFAF9] overflow-hidden flex flex-col text-[var(--ink)]">
        {/* Dynamic Island Notch */}
        <div className="w-full pt-3 pb-2 px-5 flex items-center justify-between z-20 select-none bg-[#FAFAF9] border-b border-[var(--border)]">
          <span className="text-[11px] font-semibold text-[var(--ink)] tabular">20:42</span>
          <div className="w-18 h-3.5 rounded-full bg-[#18181B] flex items-center justify-end px-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#27272A]" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-2 rounded-[2px] border border-[var(--ink)] p-[0.5px] flex items-center">
              <div className="w-1.5 h-full bg-[var(--ink)] rounded-[0.5px]" />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
};
