'use client';

import React, { useState, useRef } from 'react';
import { TranslationType } from '@/lib/translations/en';
import {
  MapPin,
  Calendar,
  Users,
  Send,
  Check,
  Beer,
  Sparkles,
  Navigation,
  RotateCw,
  Heart,
  Share2,
} from 'lucide-react';

interface IPhone3DProps {
  t: TranslationType;
}

export const IPhone3D: React.FC<IPhone3DProps> = ({ t }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 3, y: -4 });
  const [isJoined, setIsJoined] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'beers'>('details');
  const containerRef = useRef<HTMLDivElement>(null);

  // Very subtle, refined micro-tilt (max 4 degrees)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 4;
    const rotateX = -((y - centerY) / centerY) * 4;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 3, y: -4 });
  };

  return (
    <div className="flex flex-col items-center">
      {/* 3D Container with Perspective */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[340px] sm:max-w-[360px] h-[640px] sm:h-[660px] mx-auto flex items-center justify-center select-none"
        style={{ perspective: '1400px' }}
      >
        {/* Amber / Orange Atmospheric Ambient Glow */}
        <div className="absolute -inset-6 bg-gradient-to-tr from-orange-500/25 via-amber-500/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Floating 3D Badge 1 - Top Left */}
        <div
          className="absolute -top-3 -left-4 sm:-left-8 z-30 bg-zinc-900/90 text-white backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-[0_16px_35px_rgba(0,0,0,0.35)] border border-orange-500/30 flex items-center gap-3 transition-transform duration-300 pointer-events-none hidden sm:flex"
          style={{
            transform: `translate3d(${rotate.y * -1.5}px, ${rotate.x * -1.5}px, 30px)`,
          }}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-zinc-950 font-black shadow-md">
            <Beer className="w-5 h-5 text-white" />
          </div>
          <div className="text-start">
            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Masa Açıldı</p>
            <p className="text-xs font-bold text-white">The Populist • Kadıköy</p>
          </div>
        </div>

        {/* Floating 3D Badge 2 - Bottom Right */}
        <div
          className="absolute -bottom-2 -right-3 sm:-right-7 z-30 bg-zinc-900/90 text-white backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-[0_16px_35px_rgba(0,0,0,0.35)] border border-emerald-500/30 flex items-center gap-2.5 transition-transform duration-300 pointer-events-none hidden sm:flex"
          style={{
            transform: `translate3d(${rotate.y * 1.5}px, ${rotate.x * 1.5}px, 35px)`,
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold text-zinc-100">
            Serkan & 3 Arkadaş Masada 🍻
          </span>
        </div>

        {/* Flip Wrapper */}
        <div
          className="relative w-[300px] sm:w-[320px] h-[610px] sm:h-[635px] transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y + (isFlipped ? 180 : 0)}deg)`,
          }}
        >
          {/* ========================================================================= */}
          {/* FRONT FACE: SUNSET ORANGE TITANIUM IPHONE WITH SCREEN */}
          {/* ========================================================================= */}
          <div
            className="absolute inset-0 rounded-[50px] p-[3px] bg-gradient-to-b from-[#EA580C] via-[#C2410C] to-[#9A3412] shadow-[0_25px_60px_-15px_rgba(234,88,12,0.3),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-black/40"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
            }}
          >
            {/* Anodized Orange Side Buttons */}
            <div className="absolute -left-[4px] top-[100px] w-[4px] h-[26px] bg-[#EA580C] rounded-l-sm shadow-inner" />
            <div className="absolute -left-[4px] top-[140px] w-[4px] h-[48px] bg-[#EA580C] rounded-l-sm shadow-inner" />
            <div className="absolute -left-[4px] top-[200px] w-[4px] h-[48px] bg-[#EA580C] rounded-l-sm shadow-inner" />
            <div className="absolute -right-[4px] top-[145px] w-[4px] h-[65px] bg-[#EA580C] rounded-r-sm shadow-inner" />

            {/* Inner Black OLED Bezel */}
            <div className="w-full h-full rounded-[47px] bg-black p-[7px] overflow-hidden flex flex-col justify-between">
              
              {/* High-Resolution Screen Container */}
              <div className="relative w-full h-full rounded-[40px] bg-zinc-950 text-white overflow-hidden flex flex-col font-sans">
                
                {/* Dynamic Island + Status Bar */}
                <div className="relative z-20 pt-2.5 px-6 pb-2 flex items-center justify-between text-[11px] font-semibold text-zinc-300">
                  <span>20:45</span>
                  
                  {/* Dynamic Island */}
                  <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner border border-zinc-800">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0f] border border-zinc-700/60 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-blue-950" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-2.5 border border-zinc-300 rounded-[2px] p-[0.5px]">
                      <div className="h-full w-2.5 bg-zinc-300 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* App Screen Content (Rich Craft Beer UI) */}
                <div className="relative z-10 flex-1 px-3.5 py-1 space-y-3 overflow-y-auto custom-scrollbar text-start">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-md">
                        <Beer className="w-4.5 h-4.5 text-zinc-950" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black tracking-tight leading-none text-white">Beer Together</h4>
                        <p className="text-[10px] text-zinc-400 font-medium mt-0.5">Kadıköy Masası</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-500/15 px-2.5 py-0.5 rounded-full border border-orange-500/30 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Canlı
                    </span>
                  </div>

                  {/* Visual Event Cover Card with Authentic Brewery Image */}
                  <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-xl group">
                    {/* Background Brewery Photo with Dark Gradient Overlay */}
                    <div className="relative h-28 w-full bg-zinc-900">
                      <img
                        src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop"
                        alt="Craft Pub"
                        className="w-full h-full object-cover object-center brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                      
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                        <button className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-orange-400">
                          <Heart className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-orange-400">
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                        <div>
                          <span className="text-[9px] font-extrabold uppercase tracking-wider text-orange-400 bg-orange-950/80 px-2 py-0.5 rounded-md border border-orange-500/30">
                            Haftalık Craft Buluşması
                          </span>
                          <h3 className="text-sm font-black text-white leading-tight mt-1">
                            The Populist • Kadıköy
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Quick Meta Row */}
                    <div className="p-2.5 bg-zinc-900/90 flex items-center justify-between text-[11px] text-zinc-300 border-t border-zinc-800">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-orange-400" />
                        <span className="font-semibold text-white">Bu Akşam 20:30</span>
                      </div>
                      <div className="flex items-center gap-1 text-orange-400 font-bold">
                        <Navigation className="w-3 h-3" />
                        <span>350m Yakında</span>
                      </div>
                    </div>
                  </div>

                  {/* Tabs: Detaylar vs Bira Menüsü */}
                  <div className="flex rounded-xl bg-zinc-900 p-1 border border-zinc-800 text-xs">
                    <button
                      onClick={() => setActiveTab('details')}
                      className={`flex-1 py-1 rounded-lg font-bold transition-all ${
                        activeTab === 'details'
                          ? 'bg-orange-500 text-zinc-950 shadow'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Masadaki Ekip (4/6)
                    </button>
                    <button
                      onClick={() => setActiveTab('beers')}
                      className={`flex-1 py-1 rounded-lg font-bold transition-all ${
                        activeTab === 'beers'
                          ? 'bg-orange-500 text-zinc-950 shadow'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      🍺 Seçilen Biralar
                    </button>
                  </div>

                  {/* Tab 1: Attendees List */}
                  {activeTab === 'details' && (
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                        <div className="flex items-center gap-2">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                            alt="Avatar"
                            className="w-6 h-6 rounded-full object-cover border border-orange-500"
                          />
                          <div>
                            <p className="font-bold text-white leading-tight">Serkan Bilsel</p>
                            <p className="text-[9px] text-orange-400">Masa Kurucusu</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          Masada ✓
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                        <div className="flex items-center gap-2">
                          <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                            alt="Avatar"
                            className="w-6 h-6 rounded-full object-cover border border-zinc-700"
                          />
                          <div>
                            <p className="font-bold text-zinc-200 leading-tight">Can & Mert</p>
                            <p className="text-[9px] text-zinc-400">Yolda • 5 dk</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/20">
                          Yolda
                        </span>
                      </div>

                      {isJoined && (
                        <div className="flex items-center justify-between p-2 rounded-xl bg-orange-500/15 border border-orange-500/40 animate-fade-in">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-zinc-950 flex items-center justify-center font-black text-[10px]">
                              SEN
                            </div>
                            <div>
                              <p className="font-black text-orange-300 leading-tight">Masanın Parçasısın! 🎉</p>
                              <p className="text-[9px] text-zinc-300">Yerin ayrıldı</p>
                            </div>
                          </div>
                          <Check className="w-4 h-4 text-emerald-400" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab 2: Craft Beers */}
                  {activeTab === 'beers' && (
                    <div className="space-y-1.5 text-[11px]">
                      <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-white">Citra Hazy IPA</p>
                          <p className="text-[9px] text-zinc-400">Tropikal aromalar • %6.8 ABV</p>
                        </div>
                        <span className="text-[10px] font-black text-orange-400">★ 4.8</span>
                      </div>
                      <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-white">Belgian Dubbel</p>
                          <p className="text-[9px] text-zinc-400">Karamel & İncir • %7.2 ABV</p>
                        </div>
                        <span className="text-[10px] font-black text-orange-400">★ 4.7</span>
                      </div>
                    </div>
                  )}

                  {/* Primary Interactive CTA inside Phone */}
                  <button
                    onClick={() => setIsJoined(!isJoined)}
                    className={`w-full py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95 ${
                      isJoined
                        ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-emerald-500/20'
                        : 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-zinc-950 hover:brightness-110 shadow-orange-500/25'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5 rtl:scale-x-[-1]" />
                    <span>{isJoined ? 'Masadasın! (İptal Et)' : 'Masaya Katıl / WhatsApp İle Davet Et'}</span>
                  </button>
                </div>

                {/* Bottom Home Indicator */}
                <div className="w-full pb-2 flex justify-center">
                  <div className="w-32 h-1 bg-zinc-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BACK FACE: FROSTED SUNSET ORANGE TITANIUM WITH PRO CAMERA SYSTEM */}
          {/* ========================================================================= */}
          <div
            className="absolute inset-0 rounded-[50px] p-[3px] bg-gradient-to-b from-[#EA580C] via-[#C2410C] to-[#9A3412] shadow-[0_25px_60px_-15px_rgba(234,88,12,0.3)] ring-1 ring-black/40"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Matte Orange Glass Back Surface */}
            <div className="relative w-full h-full rounded-[47px] bg-gradient-to-br from-[#EA580C] via-[#D946EF]/10 to-[#C2410C] p-5 flex flex-col justify-between overflow-hidden">
              
              {/* Subtle metallic frosted texture overlay */}
              <div className="absolute inset-0 bg-orange-600/20 backdrop-blur-2xl" />

              {/* 3D Triple Camera Island */}
              <div className="relative z-10 w-36 h-36 rounded-[34px] bg-[#9A3412]/80 backdrop-blur-xl border border-orange-400/40 p-3 shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                
                {/* Lens 1 - Top Left (Main Wide 48MP) */}
                <div className="absolute top-3 left-3 w-13 h-13 rounded-full bg-zinc-950 p-1 border border-orange-500/60 shadow-lg flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-950 border border-zinc-700/80 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-blue-950/80 border border-blue-600/40 shadow-inner flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400/40" />
                    </div>
                  </div>
                </div>

                {/* Lens 2 - Bottom Left (Telephoto 5x) */}
                <div className="absolute bottom-3 left-3 w-13 h-13 rounded-full bg-zinc-950 p-1 border border-orange-500/60 shadow-lg flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-950 border border-zinc-700/80 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-blue-950/80 border border-blue-600/40 shadow-inner flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400/40" />
                    </div>
                  </div>
                </div>

                {/* Lens 3 - Middle Right (Ultra Wide) */}
                <div className="absolute top-1/2 -translate-y-1/2 right-3 w-13 h-13 rounded-full bg-zinc-950 p-1 border border-orange-500/60 shadow-lg flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-950 border border-zinc-700/80 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-blue-950/80 border border-blue-600/40 shadow-inner flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400/40" />
                    </div>
                  </div>
                </div>

                {/* True Tone Flash */}
                <div className="absolute top-4 right-5 w-4 h-4 rounded-full bg-amber-100/90 border border-amber-300 shadow-inner flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-200" />
                </div>

                {/* LiDAR Scanner */}
                <div className="absolute bottom-4 right-5 w-3.5 h-3.5 rounded-full bg-zinc-900 border border-zinc-700 shadow-inner" />
              </div>

              {/* Centered Frosted Apple Logo */}
              <div className="relative z-10 my-auto flex justify-center opacity-85">
                <svg className="w-16 h-16 fill-[#7C2D12] drop-shadow-md" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.59.69-1.11 1.83-.97 2.94 1.07.08 2.16-.54 2.78-1.28z" />
                </svg>
              </div>

              {/* Bottom Subtle Anodized Text */}
              <div className="relative z-10 text-center">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-orange-950/80">
                  Beer Together • Sunset Titanium
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔄 Interactive Flip Toggle Button Below Phone */}
      <div className="mt-4">
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/60 hover:border-orange-500/50 shadow-md backdrop-blur-md text-xs font-bold transition-all active:scale-95"
        >
          <RotateCw className={`w-3.5 h-3.5 text-orange-400 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
          <span>{isFlipped ? 'Ön Ekranı Göster' : '🔄 3D Çevir (Ön / Arka Titanyum)'}</span>
        </button>
      </div>
    </div>
  );
};
