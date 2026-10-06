'use client';

import React, { useState, useRef } from 'react';
import { TranslationType } from '@/lib/translations/en';
import {
  Calendar,
  Beer,
  MapPin,
  Check,
  Send,
  Heart,
  Share2,
  Clock,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Plus,
} from 'lucide-react';

interface IPhone3DProps {
  t: TranslationType;
  theme?: 'light' | 'dark';
}

export const IPhone3D: React.FC<IPhone3DProps> = ({ t }) => {
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'recent'>('upcoming');
  const [rotate, setRotate] = useState({ x: 2, y: -2 });
  const [isJoined, setIsJoined] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle physical micro-tilt (max 2.5 degrees) for heavy premium feel
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 2.5;
    const rotateX = -((y - centerY) / centerY) * 2.5;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 2, y: -2 });
  };

  const isFlipped = viewMode === 'back';

  return (
    <div className="relative flex flex-col items-center select-none w-full">
      
      {/* Minimalist Floating Perspective Switcher */}
      <div className="mb-4 z-40">
        <div className="inline-flex items-center p-1 rounded-full bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl shadow-xl shadow-black/30">
          <button
            onClick={() => setViewMode('front')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              !isFlipped
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Ön Ekran (Bento UI)
          </button>
          <button
            onClick={() => setViewMode('back')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              isFlipped
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Titanyum Gövde
          </button>
        </div>
      </div>

      {/* 3D Scene Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[380px] sm:max-w-[410px] h-[720px] sm:h-[750px] mx-auto flex items-center justify-center cursor-default"
        style={{ perspective: '1600px' }}
      >
        {/* Physical Studio Contact Floor Shadow */}
        <div className="absolute -bottom-8 w-[320px] h-[36px] bg-black/45 rounded-[100%] blur-2xl pointer-events-none -z-10" />
        <div className="absolute -bottom-5 w-[240px] h-[20px] bg-black/65 rounded-[100%] blur-md pointer-events-none -z-10" />

        {/* 3D Phone Body */}
        <div
          className="relative w-[345px] sm:w-[370px] h-[685px] sm:h-[715px] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y + (isFlipped ? 180 : 0)}deg)`,
          }}
        >
          {/* ========================================================================= */}
          {/* FRONT FACE: METALLIC SUNSET ORANGE TITANIUM WITH DRIBBLE BENTO UI */}
          {/* ========================================================================= */}
          <div
            className="absolute inset-0 rounded-[52px] p-[2.5px] shadow-[0_30px_70px_-10px_rgba(0,0,0,0.65),0_15px_30px_-5px_rgba(0,0,0,0.4)]"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
              background:
                'linear-gradient(135deg, #FF8C42 0%, #EA580C 20%, #9A3412 45%, #F97316 70%, #FFB074 100%)',
            }}
          >
            {/* Metallic Specular Chamfer Highlight Ring */}
            <div className="absolute inset-0 rounded-[52px] ring-1 ring-inset ring-white/35 pointer-events-none" />

            {/* Precision CNC Antenna Slots */}
            <div className="absolute -left-[3px] top-[90px] w-[3px] h-[3px] bg-[#7C2D12]" />
            <div className="absolute -left-[3px] bottom-[90px] w-[3px] h-[3px] bg-[#7C2D12]" />
            <div className="absolute -right-[3px] top-[90px] w-[3px] h-[3px] bg-[#7C2D12]" />
            <div className="absolute -right-[3px] bottom-[90px] w-[3px] h-[3px] bg-[#7C2D12]" />

            {/* Anodized Orange Side Buttons */}
            <div className="absolute -left-[4px] top-[110px] w-[3.5px] h-[28px] bg-gradient-to-r from-[#9A3412] to-[#EA580C] rounded-l-[2px]" />
            <div className="absolute -left-[4px] top-[155px] w-[3.5px] h-[52px] bg-gradient-to-r from-[#9A3412] to-[#EA580C] rounded-l-[2px]" />
            <div className="absolute -left-[4px] top-[220px] w-[3.5px] h-[52px] bg-gradient-to-r from-[#9A3412] to-[#EA580C] rounded-l-[2px]" />
            <div className="absolute -right-[4px] top-[165px] w-[3.5px] h-[70px] bg-gradient-to-l from-[#9A3412] to-[#EA580C] rounded-r-[2px]" />

            {/* Inner Black Bezel (Uniform 2mm) */}
            <div className="w-full h-full rounded-[49.5px] bg-black p-[5.5px] overflow-hidden flex flex-col justify-between">
              
              {/* Dribbble Style Modern App UI Canvas (Warm Light & Playful Modern Cards) */}
              <div className="relative w-full h-full rounded-[44px] bg-[#FDFCFB] text-zinc-900 overflow-hidden flex flex-col font-sans">
                
                {/* Dynamic Island + iOS Status Bar */}
                <div className="relative z-20 pt-2.5 px-6 pb-1 flex items-center justify-between text-xs font-semibold text-zinc-900 select-none">
                  <span className="tracking-tight font-extrabold text-[11px]">20:30</span>
                  
                  {/* Dynamic Island Pill */}
                  <div className="w-26 h-5.5 bg-black rounded-full flex items-center justify-between px-3 shadow-inner">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#050508] border border-zinc-700 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-blue-900" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-zinc-600">5G</span>
                    <div className="w-4.5 h-2.5 border border-zinc-900 rounded-[2px] p-[0.5px]">
                      <div className="h-full w-3 bg-zinc-900 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* App Screen Body */}
                <div className="relative z-10 flex-1 px-4 py-2 space-y-3 overflow-y-auto text-start custom-scrollbar">
                  
                  {/* Top Bar: "Hello, Serkan" + Profile Avatar (Referans Görseldeki Üst Kısım) */}
                  <div className="flex items-center justify-between pt-0.5">
                    <div>
                      <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                        İyi Akşamlar 👋
                      </p>
                      <h2 className="text-xl font-black text-zinc-950 tracking-tight leading-tight">
                        Hello, <span className="text-orange-600">Serkan</span>
                      </h2>
                    </div>

                    <div className="relative">
                      <div className="w-11 h-11 rounded-2xl bg-amber-100 p-0.5 shadow-sm border border-amber-200">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                          alt="Profile"
                          className="w-full h-full rounded-[14px] object-cover"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                    </div>
                  </div>

                  {/* Top Bento Widgets Row (Referans Görseldeki Sol Siyah Kutu + Sağ Haftalık Çubuklar) */}
                  <div className="grid grid-cols-12 gap-2.5">
                    
                    {/* Widget 1: Dark Contrast Pill/Card (Referans Görseldeki Siyah Boxing -21$ Kutusu) */}
                    <div className="col-span-5 rounded-[22px] bg-[#18181B] text-white p-3 flex flex-col justify-between shadow-md">
                      <div>
                        <div className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-400 uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-full">
                          <Beer className="w-2.5 h-2.5" /> Plan
                        </div>
                        <p className="text-xs font-black text-white mt-1.5 leading-tight">
                          Craft Beer
                        </p>
                        <p className="text-[9px] text-zinc-400">Bu Akşam</p>
                      </div>

                      <div className="pt-2 flex items-baseline justify-between border-t border-white/10 mt-1">
                        <span className="text-xs font-black text-amber-400">20:30</span>
                        <span className="text-[9px] font-bold text-zinc-400">Moda</span>
                      </div>
                    </div>

                    {/* Widget 2: Weekly Buluşma Tracker / Gradient Bar (Referans Görseldeki Renkli Çubuklar) */}
                    <div className="col-span-7 rounded-[22px] bg-white border border-zinc-200/80 p-3 flex flex-col justify-between shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-zinc-900">
                          Haftalık Buluşmalar
                        </span>
                        <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-md">
                          3/4
                        </span>
                      </div>

                      {/* Mini Bar Graph (Su, Mo, Tu, We, Th, Fr, Sa) */}
                      <div className="flex items-end justify-between gap-1 pt-2">
                        {[
                          { day: 'Pt', height: 'h-4', active: false },
                          { day: 'Sa', height: 'h-6', active: false },
                          { day: 'Ça', height: 'h-5', active: false },
                          { day: 'Pe', height: 'h-8', active: false },
                          { day: 'Cu', height: 'h-11', active: true },
                          { day: 'Ct', height: 'h-9', active: false },
                          { day: 'Pz', height: 'h-3', active: false },
                        ].map((item, idx) => (
                          <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                            <div
                              className={`w-full rounded-full transition-all ${
                                item.active
                                  ? 'bg-gradient-to-t from-orange-500 to-amber-400 shadow-sm'
                                  : 'bg-zinc-100'
                              } ${item.height}`}
                            />
                            <span
                              className={`text-[8px] font-bold ${
                                item.active ? 'text-orange-600' : 'text-zinc-400'
                              }`}
                            >
                              {item.day}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Filter Pills (Referans Görseldeki "Upcoming" / "Recently" Kapsülü) */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <button
                      onClick={() => setActiveTab('upcoming')}
                      className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold transition-all ${
                        activeTab === 'upcoming'
                          ? 'bg-[#18181B] text-white shadow-sm'
                          : 'bg-zinc-100 text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      Buluşmalar (Yaklaşan)
                    </button>
                    <button
                      onClick={() => setActiveTab('recent')}
                      className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold transition-all ${
                        activeTab === 'recent'
                          ? 'bg-[#18181B] text-white shadow-sm'
                          : 'bg-zinc-100 text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      Geçmiş Anılar
                    </button>
                  </div>

                  {/* Main Event Card (Referans Görseldeki Sarı & Pembe Büyük Kart Tasarımı) */}
                  <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-[#FEF08A] via-[#FDE047] to-[#FACC15] p-3.5 shadow-[0_12px_24px_rgba(234,179,8,0.25)] border border-amber-300">
                    
                    {/* Top Meta Chips */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-[#18181B] text-white text-[9px] font-black uppercase tracking-wider">
                          Kadıköy
                        </span>
                        <span className="px-2 py-1 rounded-full bg-white/90 text-zinc-900 text-[9px] font-black shadow-sm">
                          ★ 4.9
                        </span>
                      </div>

                      {/* Overlapping User Avatars (Referans Görseldeki +6k avatarları) */}
                      <div className="flex items-center -space-x-2">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                          alt="User"
                          className="w-6 h-6 rounded-full border-2 border-white object-cover shadow"
                        />
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                          alt="User"
                          className="w-6 h-6 rounded-full border-2 border-white object-cover shadow"
                        />
                        <div className="w-6 h-6 rounded-full bg-zinc-900 text-amber-300 font-extrabold text-[8px] flex items-center justify-center border-2 border-white shadow">
                          +4
                        </div>
                      </div>
                    </div>

                    {/* Event Heading */}
                    <div className="pt-2">
                      <p className="text-[10px] font-bold text-zinc-700">Today, 20:00 • Cuma</p>
                      <h3 className="text-base font-black text-zinc-950 leading-tight">
                        Craft Beer Night
                      </h3>
                      <p className="text-[11px] font-extrabold text-zinc-800">
                        The Populist • Belfast Pub
                      </p>
                    </div>

                    {/* Authentic Friends Clinking Beer Image (Cutout style in card) */}
                    <div className="relative my-2 h-28 rounded-2xl overflow-hidden shadow-md border border-white/60">
                      <img
                        src="https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?q=80&w=800&auto=format&fit=crop"
                        alt="Friends Drinking Beer"
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-2 left-2.5 text-white">
                        <p className="text-[10px] font-black leading-none">Mert, Can & 2 Arkadaş</p>
                        <p className="text-[8px] text-amber-300 font-semibold">Masa Ayrıldı • 20:00</p>
                      </div>
                    </div>

                    {/* Bottom Floating White Price/Action Pills (Referans Görseldeki $7 / Group workout Kapsülleri) */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="rounded-xl bg-white/95 p-2 shadow-sm border border-white/80 flex flex-col justify-between">
                        <span className="text-[9px] font-bold text-zinc-500">Mekan</span>
                        <span className="text-xs font-black text-zinc-900 truncate">The Populist</span>
                      </div>

                      <button
                        onClick={() => setIsJoined(!isJoined)}
                        className={`rounded-xl p-2 font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 ${
                          isJoined
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#18181B] text-white hover:bg-black'
                        }`}
                      >
                        {isJoined ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Katıldın!</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 text-amber-400" />
                            <span>Davet Et</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Secondary Activity Card (Referans Görseldeki Alttaki Yoga Session Kartı) */}
                  <div className="rounded-2xl bg-white border border-zinc-200/80 p-3 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white shadow-sm font-black text-sm">
                        🍺
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-zinc-900 leading-tight">
                          Gelecek Hafta: IPA Tadımı
                        </p>
                        <p className="text-[10px] font-semibold text-zinc-500">
                          Cumartesi, 19:30 • 3 Arkadaş
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                      19:30
                    </span>
                  </div>
                </div>

                {/* Bottom Home Bar */}
                <div className="w-full pb-2 flex justify-center">
                  <div className="w-32 h-1 bg-zinc-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BACK FACE: METALLIC ORANGE TITANIUM CHASSIS & 3D PRO CAMERA SYSTEM */}
          {/* ========================================================================= */}
          <div
            className="absolute inset-0 rounded-[52px] p-[2.5px] shadow-[0_30px_70px_-10px_rgba(0,0,0,0.65),0_15px_30px_-5px_rgba(0,0,0,0.4)]"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background:
                'linear-gradient(135deg, #FF8C42 0%, #EA580C 20%, #9A3412 45%, #F97316 70%, #FFB074 100%)',
            }}
          >
            {/* Metallic Specular Chamfer Highlight */}
            <div className="absolute inset-0 rounded-[52px] ring-1 ring-inset ring-white/35 pointer-events-none" />

            {/* Matte Titanium Back Glass Surface */}
            <div
              className="relative w-full h-full rounded-[49.5px] p-6 flex flex-col justify-between overflow-hidden"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 20%, #F97316 0%, #C2410C 50%, #9A3412 100%)',
              }}
            >
              {/* Brushed Metallic Micro-Texture */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/15 pointer-events-none" />

              {/* 3D Elevated Camera Plateau */}
              <div className="relative z-10 w-36 h-36 rounded-[34px] bg-gradient-to-br from-[#EA580C]/90 via-[#C2410C]/80 to-[#7C2D12]/90 backdrop-blur-xl border border-orange-300/40 p-3 shadow-[0_14px_32px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)]">
                
                {/* Lens 1 - Top Left (48MP Wide) */}
                <div className="absolute top-3 left-3 w-13 h-13 rounded-full bg-zinc-950 p-[3px] border border-orange-400/50 shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-700/80 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-blue-950 border border-blue-500/50 shadow-inner flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400/50" />
                    </div>
                  </div>
                </div>

                {/* Lens 2 - Bottom Left (5x Telephoto) */}
                <div className="absolute bottom-3 left-3 w-13 h-13 rounded-full bg-zinc-950 p-[3px] border border-orange-400/50 shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-700/80 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-blue-950 border border-blue-500/50 shadow-inner flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400/50" />
                    </div>
                  </div>
                </div>

                {/* Lens 3 - Middle Right (Ultra Wide) */}
                <div className="absolute top-1/2 -translate-y-1/2 right-3 w-13 h-13 rounded-full bg-zinc-950 p-[3px] border border-orange-400/50 shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-700/80 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-blue-950 border border-blue-500/50 shadow-inner flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400/50" />
                    </div>
                  </div>
                </div>

                {/* True Tone Dual Flash */}
                <div className="absolute top-4 right-4.5 w-4 h-4 rounded-full bg-amber-100 border border-amber-300 shadow-inner flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-300" />
                </div>

                {/* LiDAR Scanner */}
                <div className="absolute bottom-4 right-4.5 w-3.5 h-3.5 rounded-full bg-zinc-900 border border-zinc-700 shadow-inner" />
              </div>

              {/* Mirror Frosted Apple Logo */}
              <div className="relative z-10 my-auto flex justify-center opacity-80">
                <svg className="w-16 h-16 fill-[#7C2D12] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.59.69-1.11 1.83-.97 2.94 1.07.08 2.16-.54 2.78-1.28z" />
                </svg>
              </div>

              {/* Bottom Anodized Text */}
              <div className="relative z-10 text-center">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#571F0C]">
                  Beer Together • Sunset Titanium
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
