'use client';

import React, { useState, useRef } from 'react';
import { TranslationType } from '@/lib/translations/en';
import {
  Calendar,
  Beer,
  Sparkles,
  Navigation,
  Heart,
  Share2,
  Users,
  MessageCircle,
  Check,
} from 'lucide-react';

interface IPhone3DProps {
  t: TranslationType;
  theme?: 'light' | 'dark';
}

export const IPhone3D: React.FC<IPhone3DProps> = ({ t, theme = 'dark' }) => {
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');
  const [rotate, setRotate] = useState({ x: 2, y: -3 });
  const [isJoined, setIsJoined] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';

  // Subtle physical micro-tilt (max 3.5 degrees)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 3.5;
    const rotateX = -((y - centerY) / centerY) * 3.5;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 2, y: -3 });
  };

  const isFlipped = viewMode === 'back';

  return (
    <div className="relative flex flex-col items-center select-none">
      
      {/* Sleek Floating View Switcher */}
      <div className="mb-4 z-40">
        <div className={`inline-flex items-center p-1 rounded-full backdrop-blur-xl shadow-lg transition-colors ${
          isDark
            ? 'bg-zinc-900/90 border border-zinc-800 shadow-black/40'
            : 'bg-white/90 border border-zinc-200 shadow-zinc-300/40'
        }`}>
          <button
            onClick={() => setViewMode('front')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              !isFlipped
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 shadow-md'
                : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Ön Ekran ({isDark ? '🌙 Gece' : '☀️ Gündüz'})
          </button>
          <button
            onClick={() => setViewMode('back')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              isFlipped
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 shadow-md'
                : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Titanyum Kasa
          </button>
        </div>
      </div>

      {/* 3D Scene Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[340px] sm:max-w-[360px] h-[640px] sm:h-[665px] mx-auto flex items-center justify-center cursor-default"
        style={{ perspective: '1600px' }}
      >
        {/* Realistic Floor Studio Shadow */}
        <div className={`absolute -bottom-6 w-[290px] h-[35px] rounded-[100%] blur-xl pointer-events-none -z-10 ${
          isDark ? 'bg-black/80' : 'bg-black/30'
        }`} />
        <div className={`absolute -bottom-4 w-[220px] h-[20px] rounded-[100%] blur-md pointer-events-none -z-10 ${
          isDark ? 'bg-black/95' : 'bg-black/40'
        }`} />

        {/* Subtle Ambient Studio Light */}
        <div
          className="absolute -top-12 -right-8 w-[340px] h-[340px] rounded-full pointer-events-none -z-10 blur-3xl opacity-15"
          style={{
            background: 'radial-gradient(circle, #EA580C 0%, rgba(234,88,12,0) 70%)',
          }}
        />

        {/* Floating Live Card Badge (Front Mode only) */}
        {!isFlipped && (
          <div
            className={`absolute -top-3 -left-4 sm:-left-8 z-30 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border flex items-center gap-3 transition-transform duration-300 pointer-events-none hidden sm:flex ${
              isDark
                ? 'bg-zinc-900/95 text-white border-orange-500/30'
                : 'bg-white/95 text-zinc-900 border-orange-400/40 shadow-orange-500/10'
            }`}
            style={{
              transform: `translate3d(${rotate.y * -1.2}px, ${rotate.x * -1.2}px, 25px)`,
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-zinc-950 font-black shadow-md">
              <Beer className="w-5 h-5 text-zinc-950" />
            </div>
            <div className="text-start">
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Masa Açıldı</p>
              <p className="text-xs font-bold leading-tight">Kadıköy • 20:30 (Masa 12)</p>
            </div>
          </div>
        )}

        {/* 3D Phone Body */}
        <div
          className="relative w-[300px] sm:w-[325px] h-[615px] sm:h-[640px] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y + (isFlipped ? 180 : 0)}deg)`,
          }}
        >
          {/* ========================================================================= */}
          {/* FRONT FACE: SUNSET ORANGE TITANIUM IPHONE WITH ADAPTIVE OLED SCREEN */}
          {/* ========================================================================= */}
          <div
            className="absolute inset-0 rounded-[48px] p-[2.5px] shadow-[0_30px_70px_-10px_rgba(0,0,0,0.8),0_15px_30px_-5px_rgba(0,0,0,0.5)]"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
              background:
                'linear-gradient(135deg, #FF8C42 0%, #EA580C 20%, #9A3412 45%, #F97316 70%, #FFB074 100%)',
            }}
          >
            {/* Metallic Specular Chamfer Highlight Ring */}
            <div className="absolute inset-0 rounded-[48px] ring-1 ring-inset ring-white/30 pointer-events-none" />

            {/* Precision Antenna Slots */}
            <div className="absolute -left-[3px] top-[75px] w-[3px] h-[3px] bg-[#7C2D12]" />
            <div className="absolute -left-[3px] bottom-[75px] w-[3px] h-[3px] bg-[#7C2D12]" />
            <div className="absolute -right-[3px] top-[75px] w-[3px] h-[3px] bg-[#7C2D12]" />
            <div className="absolute -right-[3px] bottom-[75px] w-[3px] h-[3px] bg-[#7C2D12]" />

            {/* Anodized Orange Side Buttons */}
            <div className="absolute -left-[4px] top-[95px] w-[3.5px] h-[24px] bg-gradient-to-r from-[#9A3412] to-[#EA580C] rounded-l-[2px]" />
            <div className="absolute -left-[4px] top-[135px] w-[3.5px] h-[46px] bg-gradient-to-r from-[#9A3412] to-[#EA580C] rounded-l-[2px]" />
            <div className="absolute -left-[4px] top-[190px] w-[3.5px] h-[46px] bg-gradient-to-r from-[#9A3412] to-[#EA580C] rounded-l-[2px]" />
            <div className="absolute -right-[4px] top-[140px] w-[3.5px] h-[60px] bg-gradient-to-l from-[#9A3412] to-[#EA580C] rounded-r-[2px]" />

            {/* Inner Black OLED Bezel */}
            <div className="w-full h-full rounded-[45.5px] bg-black p-[5.5px] overflow-hidden flex flex-col justify-between">
              
              {/* Screen Display Container (Theme Adaptive: Light / Dark) */}
              <div
                className={`relative w-full h-full rounded-[40px] overflow-hidden flex flex-col font-sans transition-colors duration-300 ${
                  isDark
                    ? 'bg-[#09090B] text-white'
                    : 'bg-[#F4F4F5] text-zinc-900'
                }`}
              >
                {/* Dynamic Island + Status Bar */}
                <div
                  className={`relative z-20 pt-2 px-5 pb-1 flex items-center justify-between text-[11px] font-semibold transition-colors ${
                    isDark ? 'text-zinc-300' : 'text-zinc-900'
                  }`}
                >
                  <span className="tracking-tight">20:45</span>
                  
                  {/* Dynamic Island Pill */}
                  <div className="w-22 h-5 bg-black rounded-full flex items-center justify-between px-2.5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] border border-zinc-800/80">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#050508] border border-zinc-700/60 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-blue-900" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <div className="flex items-center gap-1">
                    <div
                      className={`w-4 h-2.5 border rounded-[2px] p-[0.5px] ${
                        isDark ? 'border-zinc-300' : 'border-zinc-800'
                      }`}
                    >
                      <div
                        className={`h-full w-2.5 rounded-[1px] ${
                          isDark ? 'bg-zinc-300' : 'bg-zinc-800'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Craft Beer App UI */}
                <div className="relative z-10 flex-1 px-3 py-1 space-y-2.5 overflow-y-auto custom-scrollbar text-start">
                  
                  {/* Top Header */}
                  <div className="flex items-center justify-between pt-0.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md">
                        <Beer className="w-4 h-4 text-zinc-950" />
                      </div>
                      <div>
                        <h4
                          className={`text-[12px] font-black tracking-tight leading-none ${
                            isDark ? 'text-white' : 'text-zinc-900'
                          }`}
                        >
                          Beer Together
                        </h4>
                        <p
                          className={`text-[9px] font-medium mt-0.5 ${
                            isDark ? 'text-zinc-400' : 'text-zinc-500'
                          }`}
                        >
                          Kadıköy Masası
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/30 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Canlı
                    </span>
                  </div>

                  {/* Vertical Beer-Drinking Story Card */}
                  <div
                    className={`relative rounded-2xl overflow-hidden shadow-xl border ${
                      isDark
                        ? 'border-zinc-800/90'
                        : 'border-zinc-200/90 shadow-zinc-300/40'
                    }`}
                  >
                    <div className="relative h-36 w-full bg-zinc-900">
                      <img
                        src="https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?q=80&w=800&auto=format&fit=crop"
                        alt="Friends Cheering with Beer"
                        className="w-full h-full object-cover object-center brightness-[0.85] contrast-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                      
                      {/* Top Action Pills */}
                      <div className="absolute top-2 right-2 flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/90">
                          <Heart className="w-3.5 h-3.5 text-orange-400 fill-orange-400/30" />
                        </div>
                        <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/90">
                          <Share2 className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>

                      {/* Photo Bottom Caption */}
                      <div className="absolute bottom-2 left-2.5 right-2.5 flex items-end justify-between">
                        <div>
                          <span className="text-[8px] font-black uppercase tracking-wider text-orange-400 bg-orange-950/90 px-2 py-0.5 rounded-md border border-orange-500/30">
                            Craft IPA & Pilsner Gecesi
                          </span>
                          <h3 className="text-xs font-black text-white leading-tight mt-1">
                            The Populist • Kadıköy Moda
                          </h3>
                        </div>
                        <span className="text-[9px] font-black text-white bg-black/70 px-2 py-0.5 rounded-md border border-white/20">
                          Masa 12
                        </span>
                      </div>
                    </div>

                    {/* Quick Meta Row */}
                    <div
                      className={`p-2 flex items-center justify-between text-[10px] border-t transition-colors ${
                        isDark
                          ? 'bg-zinc-900/95 text-zinc-300 border-zinc-800'
                          : 'bg-white text-zinc-700 border-zinc-100'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-orange-500" />
                        <span
                          className={`font-semibold ${
                            isDark ? 'text-white' : 'text-zinc-900'
                          }`}
                        >
                          Bu Akşam 20:30
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-orange-500 font-bold">
                        <Navigation className="w-2.5 h-2.5" />
                        <span>350m Yakında</span>
                      </div>
                    </div>
                  </div>

                  {/* Friends / Attendees Section */}
                  <div
                    className={`p-2.5 rounded-2xl border space-y-2 transition-colors ${
                      isDark
                        ? 'bg-zinc-900/90 border-zinc-800/90'
                        : 'bg-white border-zinc-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`font-extrabold flex items-center gap-1.5 ${
                          isDark ? 'text-white' : 'text-zinc-900'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5 text-orange-500" />
                        <span>Masadaki Arkadaşlar (4/6)</span>
                      </span>
                      <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        2 Yer Kaldı
                      </span>
                    </div>

                    {/* User Rows */}
                    <div className="space-y-1.5">
                      {/* User 1 */}
                      <div
                        className={`flex items-center justify-between p-1.5 rounded-xl border transition-colors ${
                          isDark
                            ? 'bg-zinc-950/60 border-zinc-800/60'
                            : 'bg-zinc-50 border-zinc-200/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                            alt="Serkan Bilsel"
                            className="w-8 h-8 rounded-full object-cover border-2 border-orange-500 shadow"
                          />
                          <div>
                            <p
                              className={`text-xs font-extrabold leading-tight ${
                                isDark ? 'text-white' : 'text-zinc-900'
                              }`}
                            >
                              Serkan Bilsel
                            </p>
                            <p className="text-[9px] font-semibold text-orange-500">👑 Masa Kurucusu</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                          Masada ✓
                        </span>
                      </div>

                      {/* User 2 */}
                      <div
                        className={`flex items-center justify-between p-1.5 rounded-xl border transition-colors ${
                          isDark
                            ? 'bg-zinc-950/60 border-zinc-800/60'
                            : 'bg-zinc-50 border-zinc-200/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                            alt="Mert Kaya"
                            className="w-8 h-8 rounded-full object-cover border-2 border-zinc-400 shadow"
                          />
                          <div>
                            <p
                              className={`text-xs font-extrabold leading-tight ${
                                isDark ? 'text-zinc-200' : 'text-zinc-800'
                              }`}
                            >
                              Mert & Can
                            </p>
                            <p
                              className={`text-[9px] font-semibold ${
                                isDark ? 'text-zinc-400' : 'text-zinc-500'
                              }`}
                            >
                              ⚡ Yolda • 5 dk
                            </p>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-full border border-amber-500/20">
                          Yolda
                        </span>
                      </div>

                      {/* User 3 (Interactive Joined State) */}
                      {isJoined && (
                        <div className="flex items-center justify-between p-1.5 rounded-xl bg-orange-500/20 border border-orange-500/50 animate-fade-in">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-zinc-950 flex items-center justify-center font-black text-xs shadow">
                              SEN
                            </div>
                            <div>
                              <p className="text-xs font-black text-orange-500 leading-tight">Masaya Katıldın! 🍻</p>
                              <p className="text-[9px] text-zinc-500">Sandalyen ayrıldı</p>
                            </div>
                          </div>
                          <Check className="w-4 h-4 text-emerald-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Professional In-Screen Action CTAs */}
                  <div className="space-y-1.5 pt-0.5">
                    <button
                      onClick={() => setIsJoined(!isJoined)}
                      className={`w-full py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.98] ${
                        isJoined
                          ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-emerald-500/25'
                          : 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-zinc-950 hover:brightness-110 shadow-orange-500/30'
                      }`}
                    >
                      <Beer className="w-4 h-4" />
                      <span>{isJoined ? 'Masadasın! (İptal Et)' : 'Masaya Katıl (Yerini Ayırt)'}</span>
                    </button>

                    <button
                      className={`w-full py-2 px-3 rounded-xl font-bold text-[11px] flex items-center justify-center gap-2 border shadow-sm transition-all active:scale-[0.98] ${
                        isDark
                          ? 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border-zinc-700/80'
                          : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>WhatsApp’tan Arkadaş Davet Et</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Home Bar */}
                <div className="w-full pb-1.5 flex justify-center">
                  <div
                    className={`w-28 h-1 rounded-full ${
                      isDark ? 'bg-zinc-600' : 'bg-zinc-400'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BACK FACE: METALLIC ORANGE TITANIUM CHASSIS & 3D PRO CAMERA SYSTEM */}
          {/* ========================================================================= */}
          <div
            className="absolute inset-0 rounded-[48px] p-[2.5px] shadow-[0_30px_70px_-10px_rgba(0,0,0,0.8),0_15px_30px_-5px_rgba(0,0,0,0.5)]"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background:
                'linear-gradient(135deg, #FF8C42 0%, #EA580C 20%, #9A3412 45%, #F97316 70%, #FFB074 100%)',
            }}
          >
            {/* Metallic Specular Chamfer Highlight */}
            <div className="absolute inset-0 rounded-[48px] ring-1 ring-inset ring-white/30 pointer-events-none" />

            {/* Matte Titanium Back Glass Surface */}
            <div
              className="relative w-full h-full rounded-[45.5px] p-5 flex flex-col justify-between overflow-hidden"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 20%, #F97316 0%, #C2410C 50%, #9A3412 100%)',
              }}
            >
              {/* Brushed Metallic Micro-Texture */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/15 pointer-events-none" />

              {/* 3D Elevated Camera Plateau */}
              <div className="relative z-10 w-32 h-32 rounded-[30px] bg-gradient-to-br from-[#EA580C]/90 via-[#C2410C]/80 to-[#7C2D12]/90 backdrop-blur-xl border border-orange-300/40 p-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)]">
                
                {/* Lens 1 - Top Left (48MP Wide) */}
                <div className="absolute top-2.5 left-2.5 w-12 h-12 rounded-full bg-zinc-950 p-[3px] border border-orange-400/50 shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-700/80 flex items-center justify-center">
                    <div className="w-4.5 h-4.5 rounded-full bg-blue-950 border border-blue-500/50 shadow-inner flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                    </div>
                  </div>
                </div>

                {/* Lens 2 - Bottom Left (5x Telephoto) */}
                <div className="absolute bottom-2.5 left-2.5 w-12 h-12 rounded-full bg-zinc-950 p-[3px] border border-orange-400/50 shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-700/80 flex items-center justify-center">
                    <div className="w-4.5 h-4.5 rounded-full bg-blue-950 border border-blue-500/50 shadow-inner flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                    </div>
                  </div>
                </div>

                {/* Lens 3 - Middle Right (Ultra Wide) */}
                <div className="absolute top-1/2 -translate-y-1/2 right-2.5 w-12 h-12 rounded-full bg-zinc-950 p-[3px] border border-orange-400/50 shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-700/80 flex items-center justify-center">
                    <div className="w-4.5 h-4.5 rounded-full bg-blue-950 border border-blue-500/50 shadow-inner flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                    </div>
                  </div>
                </div>

                {/* True Tone Dual Flash */}
                <div className="absolute top-3.5 right-4 w-3.5 h-3.5 rounded-full bg-amber-100 border border-amber-300 shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                </div>

                {/* LiDAR Scanner */}
                <div className="absolute bottom-3.5 right-4 w-3 h-3 rounded-full bg-zinc-900 border border-zinc-700 shadow-inner" />
              </div>

              {/* Mirror Frosted Apple Logo */}
              <div className="relative z-10 my-auto flex justify-center opacity-80">
                <svg className="w-14 h-14 fill-[#7C2D12] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.59.69-1.11 1.83-.97 2.94 1.07.08 2.16-.54 2.78-1.28z" />
                </svg>
              </div>

              {/* Bottom Anodized Text */}
              <div className="relative z-10 text-center">
                <p className="text-[9px] font-extrabold uppercase tracking-widest text-[#571F0C]">
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
