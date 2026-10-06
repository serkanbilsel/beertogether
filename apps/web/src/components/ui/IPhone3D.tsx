'use client';

import React, { useState, useRef } from 'react';
import { TranslationType } from '@/lib/translations/en';
import { MapPin, Calendar, Users, Send, Check, Beer, Sparkles, Navigation, Clock } from 'lucide-react';

interface IPhone3DProps {
  t: TranslationType;
}

export const IPhone3D: React.FC<IPhone3DProps> = ({ t }) => {
  const [rotate, setRotate] = useState({ x: 8, y: -12 });
  const [glare, setGlare] = useState({ x: 40, y: 30, opacity: 0.15 });
  const [isJoined, setIsJoined] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Rotate within subtle realistic range (-18 to 18 deg)
    const rotateY = ((x - centerX) / centerX) * 16;
    const rotateX = -((y - centerY) / centerY) * 16;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    // Reset to pleasant default 3D isometric angle
    setRotate({ x: 8, y: -12 });
    setGlare({ x: 40, y: 30, opacity: 0.15 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[360px] sm:max-w-[400px] h-[640px] sm:h-[680px] mx-auto flex items-center justify-center select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Background Radial Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 via-orange-400/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating 3D Badge 1 - Top Left */}
      <div
        className="absolute -top-4 -left-6 sm:-left-10 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.12)] border border-amber-500/20 flex items-center gap-3 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${rotate.y * -1.2}px, ${rotate.x * -1.2}px, 40px)`,
        }}
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-md">
          <Beer className="w-5 h-5" />
        </div>
        <div className="text-start">
          <p className="text-[11px] font-semibold text-zinc-400">Craft Brew Night</p>
          <p className="text-xs font-bold text-zinc-900 dark:text-white">Kadıköy • 20:30</p>
        </div>
      </div>

      {/* Floating 3D Badge 2 - Bottom Right */}
      <div
        className="absolute -bottom-2 -right-4 sm:-right-8 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.12)] border border-emerald-500/20 flex items-center gap-2.5 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${rotate.y * 1.4}px, ${rotate.x * 1.4}px, 50px)`,
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-xs font-bold text-zinc-900 dark:text-white">
          +4 Arkadaş Katılıyor 🍻
        </span>
      </div>

      {/* 3D Phone Body */}
      <div
        className="relative w-[300px] sm:w-[325px] h-[610px] sm:h-[650px] transition-transform duration-200 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Outer Titanium Chassis / Shadow Layer */}
        <div className="absolute inset-0 rounded-[50px] bg-[#222226] shadow-[0_35px_70px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-black/40">
          
          {/* Side Buttons - Left (Action Button + Volume) */}
          <div className="absolute -left-[3px] top-[100px] w-[3.5px] h-[26px] bg-zinc-600 rounded-l-sm" />
          <div className="absolute -left-[3px] top-[140px] w-[3.5px] h-[48px] bg-zinc-600 rounded-l-sm" />
          <div className="absolute -left-[3px] top-[200px] w-[3.5px] h-[48px] bg-zinc-600 rounded-l-sm" />

          {/* Side Button - Right (Power Button) */}
          <div className="absolute -right-[3px] top-[145px] w-[3.5px] h-[65px] bg-zinc-600 rounded-r-sm" />

          {/* Bezel */}
          <div className="absolute inset-[4px] rounded-[46px] bg-black p-[9px] overflow-hidden flex flex-col justify-between">
            
            {/* Screen Glass Surface */}
            <div className="relative w-full h-full rounded-[38px] bg-zinc-950 text-white overflow-hidden flex flex-col font-sans">
              
              {/* Dynamic Reflection / Glare Overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
                }}
              />

              {/* Status Bar + Dynamic Island */}
              <div className="relative z-20 pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-semibold tracking-tight text-zinc-300">
                <span>20:30</span>
                
                {/* Dynamic Island */}
                <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2 shadow-inner border border-zinc-800">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0f] border border-zinc-700/60 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-950/80" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-2.5 border border-zinc-300 rounded-[2px] p-[0.5px]">
                    <div className="h-full w-2.5 bg-zinc-300 rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* In-App Content Screen */}
              <div className="relative z-10 flex-1 px-4 py-2 space-y-3 overflow-y-auto">
                {/* Top App Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-zinc-950 font-black text-sm">
                      🍻
                    </div>
                    <div>
                      <h4 className="text-xs font-bold leading-tight">Beer Together</h4>
                      <p className="text-[10px] text-zinc-400">Canlı Masa Daveti</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Canlı
                  </span>
                </div>

                {/* Event Hero Card */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-900/90 border border-zinc-800 shadow-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-400 tracking-wide uppercase">
                      Buluşma Planı
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" /> Bu Akşam
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">
                    Kadıköy Craft & IPA Buluşması
                  </h3>

                  {/* Venue item */}
                  <div className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2 text-zinc-200">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-medium truncate">The Populist • Kadıköy</span>
                    </div>
                    <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-0.5">
                      <Navigation className="w-2.5 h-2.5" /> Yol Tarifi
                    </span>
                  </div>

                  {/* Date & Time item */}
                  <div className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex items-center gap-2 text-[11px] text-zinc-200">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-medium">Cuma, 20:30 (Masa Ayrıldı)</span>
                  </div>
                </div>

                {/* Attendees Section */}
                <div className="p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>Masadaki Ekip (3/6)</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Yer Var
                    </span>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between p-1.5 rounded-lg bg-zinc-950/50">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center font-bold text-[9px]">
                          SB
                        </div>
                        <span className="font-medium text-zinc-200">Serkan (Ev Sahibi)</span>
                      </div>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>

                    <div className="flex items-center justify-between p-1.5 rounded-lg bg-zinc-950/50">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-orange-500 text-zinc-950 flex items-center justify-center font-bold text-[9px]">
                          MK
                        </div>
                        <span className="font-medium text-zinc-200">Mert Kaya</span>
                      </div>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>

                    {isJoined && (
                      <div className="flex items-center justify-between p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 animate-fade-in">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold text-[9px]">
                            SEN
                          </div>
                          <span className="font-bold text-amber-300">Sen Katıldın! 🎉</span>
                        </div>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Interactive Action Button */}
                <button
                  onClick={() => setIsJoined(!isJoined)}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                    isJoined
                      ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 hover:brightness-110'
                  }`}
                >
                  <Send className="w-3.5 h-3.5 rtl:scale-x-[-1]" />
                  <span>{isJoined ? 'Masadasın! (İptal Et)' : 'Masaya Katıl / WhatsApp İle Paylaş'}</span>
                </button>
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-full pb-2 flex justify-center">
                <div className="w-32 h-1 bg-zinc-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
