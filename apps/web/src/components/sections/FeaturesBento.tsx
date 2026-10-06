import React from 'react';
import { TranslationType } from '@/lib/translations/en';
import { Card } from '../ui/Card';
import { Share2, Bell, Camera, MapPin, Lock, Layers, ShieldCheck, Globe, Sparkles } from 'lucide-react';

interface FeaturesBentoProps {
  t: TranslationType;
}

export const FeaturesBento: React.FC<FeaturesBentoProps> = ({ t }) => {
  return (
    <section id="features" className="section-padding relative" aria-labelledby="features-heading">
      <div className="container-main">
        <div className="text-start max-w-2xl mb-14">
          <h2 id="features-heading" className="display-h2 text-[var(--ink)]">
            {t.features.h2}
          </h2>
        </div>

        {/* Bento Grid: 6 cards total */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-start">
          {/* 1. Large Card: 2 columns on desktop */}
          <Card hoverable className="md:col-span-2 lg:col-span-2 flex flex-col justify-between group">
            <div className="max-w-md">
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--accent-soft)] border border-[var(--accent)]/20 text-[var(--accent-text)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Share2 className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="display-h3 text-[var(--ink)] mb-2.5">{t.features.f1Title}</h3>
              <p className="text-body text-sm text-slate-400">{t.features.f1Desc}</p>
            </div>

            {/* Realistic WhatsApp Chat Bubble Snippet */}
            <div className="mt-8 p-4 rounded-[var(--radius-md)] bg-[#10131F] border border-[#1F2438] space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-white">{t.snippets.linkReady}</span>
                <span className="text-[10px] text-[var(--success)] font-bold bg-[#10B981]/10 px-2 py-0.5 rounded-full">Universal Link</span>
              </div>
              <div className="p-3.5 rounded-[var(--radius-sm)] bg-[#0A0C14] border border-[#1F2438] text-xs text-slate-200 font-medium leading-relaxed">
                <span>{t.snippets.waMessage}</span>
                <div className="mt-1.5 text-[var(--accent)] font-semibold tracking-wide">beertogether.app/i/meet-98f</div>
              </div>
            </div>
          </Card>

          {/* 2. Smart reminders */}
          <Card hoverable className="flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--accent-soft)] border border-[var(--accent)]/20 text-[var(--accent-text)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Bell className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="display-h3 text-[var(--ink)] mb-2.5">{t.features.f2Title}</h3>
              <p className="text-body text-sm text-slate-400">{t.features.f2Desc}</p>
            </div>

            {/* Push Notification Card */}
            <div className="mt-8 p-3.5 rounded-[var(--radius-md)] bg-[#10131F] border border-[#1F2438] space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-white font-bold">
                <span>{t.snippets.pushTitle}</span>
                <span className="text-[10px] text-slate-400 font-normal">{t.snippets.pushTime}</span>
              </div>
              <div className="text-[11px] text-slate-300">
                {t.snippets.pushBody}
              </div>
            </div>
          </Card>

          {/* 3. Photo check-in */}
          <Card hoverable className="flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--accent-soft)] border border-[var(--accent)]/20 text-[var(--accent-text)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="display-h3 text-[var(--ink)] mb-2.5">{t.features.f3Title}</h3>
              <p className="text-body text-sm text-slate-400">{t.features.f3Desc}</p>
            </div>

            {/* Proof snippet */}
            <div className="mt-8 p-3.5 rounded-[var(--radius-md)] bg-[#10131F] border border-[#1F2438] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--success)]" />
                <span className="font-semibold text-white">{t.snippets.checkedIn}</span>
              </div>
              <span className="text-[10px] font-bold text-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-0.5 rounded border border-[var(--accent)]/20">
                150 m
              </span>
            </div>
          </Card>

          {/* 4. Venues near you */}
          <Card hoverable className="flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--accent-soft)] border border-[var(--accent)]/20 text-[var(--accent-text)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="display-h3 text-[var(--ink)] mb-2.5">{t.features.f4Title}</h3>
              <p className="text-body text-sm text-slate-400">{t.features.f4Desc}</p>
            </div>

            {/* Venue chip */}
            <div className="mt-8 p-3.5 rounded-[var(--radius-md)] bg-[#10131F] border border-[#1F2438] text-xs flex items-center justify-between font-semibold text-white">
              <span>{t.snippets.nearby}</span>
              <span className="text-[10px] text-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-0.5 rounded border border-[var(--accent)]/20 font-bold">
                FSQ Places
              </span>
            </div>
          </Card>

          {/* 5. You decide who sees it */}
          <Card hoverable className="flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--accent-soft)] border border-[var(--accent)]/20 text-[var(--accent-text)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="display-h3 text-[var(--ink)] mb-2.5">{t.features.f5Title}</h3>
              <p className="text-body text-sm text-slate-400">{t.features.f5Desc}</p>
            </div>

            {/* Privacy toggle chip */}
            <div className="mt-8 p-3.5 rounded-[var(--radius-md)] bg-[#10131F] border border-[#1F2438] text-xs flex items-center justify-between font-semibold">
              <div className="flex items-center gap-1.5 text-white">
                <Globe className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>{t.snippets.private} / {t.snippets.public}</span>
              </div>
              <span className="text-[10px] text-[var(--success)] font-bold bg-[#10B981]/10 px-2 py-0.5 rounded-full">RLS Protected</span>
            </div>
          </Card>

          {/* 6. Friends' timeline */}
          <Card hoverable className="md:col-span-2 lg:col-span-3 flex flex-col justify-between group">
            <div className="max-w-md">
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--accent-soft)] border border-[var(--accent)]/20 text-[var(--accent-text)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="display-h3 text-[var(--ink)] mb-2.5">{t.features.f6Title}</h3>
              <p className="text-body text-sm text-slate-400">{t.features.f6Desc}</p>
            </div>

            <div className="mt-8 p-3.5 rounded-[var(--radius-md)] bg-[#10131F] border border-[#1F2438] flex items-center justify-between text-xs text-slate-300">
              <span className="font-medium">{t.snippets.timelineItem}</span>
              <span className="text-[10px] font-bold text-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-0.5 rounded border border-[var(--accent)]/20">
                Timeline
              </span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
