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
      className={`relative w-full max-w-[320px] sm:max-w-[360px] mx-auto rounded-[42px] bg-[#000000] p-[10px] shadow-[0_30px_100px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,179,0,0.25),0_0_40px_-10px_rgba(255,179,0,0.2)] ${className}`}
      style={{ aspectRatio: '9/18.5' }}
    >
      {/* Glossy edge highlight */}
      <div className="absolute inset-0 rounded-[42px] pointer-events-none border border-white/10" />

      {/* Side buttons */}
      <div className="absolute -inset-inline-start-[12px] top-[90px] w-[3px] h-[26px] bg-[#232736] rounded-s-sm" />
      <div className="absolute -inset-inline-start-[12px] top-[125px] w-[3px] h-[40px] bg-[#232736] rounded-s-sm" />
      <div className="absolute -inset-inline-start-[12px] top-[175px] w-[3px] h-[40px] bg-[#232736] rounded-s-sm" />
      <div className="absolute -inset-inline-end-[12px] top-[110px] w-[3px] h-[55px] bg-[#232736] rounded-e-sm" />

      {/* Inner Screen */}
      <div className="relative w-full h-full rounded-[34px] bg-[#08090D] overflow-hidden flex flex-col text-[var(--ink)] shadow-inner">
        {/* Dynamic Island Notch */}
        <div className="w-full pt-3 pb-2 px-6 flex items-center justify-between z-20 select-none border-b border-[#1F2438]/50 bg-[#08090D]">
          <span className="text-[12px] font-bold text-white tabular">20:42</span>
          <div className="w-20 h-4 rounded-full bg-[#000000] flex items-center justify-end px-2 border border-white/5">
            <div className="w-2 h-2 rounded-full bg-[#111420]" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-2.5 rounded-[3px] border border-white/60 p-[1px] flex items-center">
              <div className="w-2 h-full bg-white rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
};
