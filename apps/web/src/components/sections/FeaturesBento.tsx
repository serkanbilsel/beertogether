import React from 'react';
import { TranslationType } from '@/lib/translations/en';
import { Card } from '../ui/Card';
import { Share2, Bell, Camera, MapPin, Lock, Layers, ShieldCheck, Globe } from 'lucide-react';

interface FeaturesBentoProps {
  t: TranslationType;
}

export const FeaturesBento: React.FC<FeaturesBentoProps> = ({ t }) => {
  return (
    <section id="features" className="section-padding bg-[var(--bg)]" aria-labelledby="features-heading">
      <div className="container-main">
        <div className="text-start max-w-2xl mb-12">
          <h2 id="features-heading" className="display-h2">
            {t.features.h2}
          </h2>
        </div>

        {/* Bento Grid: 6 cards total */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-start">
          {/* 1. Large Card: 2 columns on desktop */}
          <Card hoverable className="md:col-span-2 lg:col-span-2 flex flex-col justify-between">
            <div className="max-w-md">
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--accent-soft)] text-[var(--accent-text)] flex items-center justify-center mb-4">
                <Share2 className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="display-h3 mb-2">{t.features.f1Title}</h3>
              <p className="text-body text-sm">{t.features.f1Desc}</p>
            </div>

            {/* Realistic WhatsApp Chat Bubble Snippet */}
            <div className="mt-6 p-4 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border)] space-y-2">
              <div className="flex items-center justify-between text-xs text-[var(--ink-2)]">
                <span className="font-semibold text-[var(--ink)]">{t.snippets.linkReady}</span>
                <span className="text-[10px] text-[var(--success)] font-bold bg-[#16A34A]/10 px-2 py-0.5 rounded-full">Universal Link</span>
              </div>
              <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--ink)] font-medium leading-relaxed">
                <span>{t.snippets.waMessage}</span>
                <div className="mt-1 text-[var(--accent-text)] font-semibold">beertogether.app/i/meet-98f</div>
              </div>
            </div>
          </Card>

          {/* 2. Smart reminders */}
          <Card hoverable className="flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--accent-soft)] text-[var(--accent-text)] flex items-center justify-center mb-4">
                <Bell className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="display-h3 mb-2">{t.features.f2Title}</h3>
              <p className="text-body text-sm">{t.features.f2Desc}</p>
            </div>

            {/* Push Notification Card */}
            <div className="mt-6 p-3 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border)] space-y-1 text-xs">
              <div className="flex items-center justify-between text-[var(--ink)] font-bold">
                <span>{t.snippets.pushTitle}</span>
                <span className="text-[10px] text-[var(--ink-3)] font-normal">{t.snippets.pushTime}</span>
              </div>
              <div className="text-[11px] text-[var(--ink-2)]">
                {t.snippets.pushBody}
              </div>
            </div>
          </Card>

          {/* 3. Photo check-in */}
          <Card hoverable className="flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--accent-soft)] text-[var(--accent-text)] flex items-center justify-center mb-4">
                <Camera className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="display-h3 mb-2">{t.features.f3Title}</h3>
              <p className="text-body text-sm">{t.features.f3Desc}</p>
            </div>

            {/* Proof snippet */}
            <div className="mt-6 p-3 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--success)]" />
                <span className="font-semibold text-[var(--ink)]">{t.snippets.checkedIn}</span>
              </div>
              <span className="text-[10px] font-bold text-[var(--accent-text)] bg-[var(--accent-soft)] px-2 py-0.5 rounded">
                150 m
              </span>
            </div>
          </Card>

          {/* 4. Venues near you */}
          <Card hoverable className="flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--accent-soft)] text-[var(--accent-text)] flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="display-h3 mb-2">{t.features.f4Title}</h3>
              <p className="text-body text-sm">{t.features.f4Desc}</p>
            </div>

            {/* Venue chip */}
            <div className="mt-6 p-3 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border)] text-xs flex items-center justify-between font-semibold text-[var(--ink)]">
              <span>{t.snippets.nearby}</span>
              <span className="text-[10px] text-[var(--accent-text)] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--border)] font-bold">
                FSQ Places
              </span>
            </div>
          </Card>

          {/* 5. You decide who sees it */}
          <Card hoverable className="flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--accent-soft)] text-[var(--accent-text)] flex items-center justify-center mb-4">
                <Lock className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="display-h3 mb-2">{t.features.f5Title}</h3>
              <p className="text-body text-sm">{t.features.f5Desc}</p>
            </div>

            {/* Privacy toggle chip */}
            <div className="mt-6 p-3 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border)] text-xs flex items-center justify-between font-semibold">
              <div className="flex items-center gap-1.5 text-[var(--ink)]">
                <Globe className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                <span>{t.snippets.private} / {t.snippets.public}</span>
              </div>
              <span className="text-[10px] text-[var(--success)] font-bold bg-[#16A34A]/10 px-2 py-0.5 rounded-full">RLS</span>
            </div>
          </Card>

          {/* 6. Friends' timeline */}
          <Card hoverable className="md:col-span-2 lg:col-span-3 flex flex-col justify-between">
            <div className="max-w-md">
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--accent-soft)] text-[var(--accent-text)] flex items-center justify-center mb-4">
                <Layers className="w-5 h-5 stroke-[2]" />
              </div>
              <h3 className="display-h3 mb-2">{t.features.f6Title}</h3>
              <p className="text-body text-sm">{t.features.f6Desc}</p>
            </div>

            <div className="mt-6 p-3 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-between text-xs text-[var(--ink-2)]">
              <span className="font-medium">{t.snippets.timelineItem}</span>
              <span className="text-[10px] font-bold text-[var(--accent-text)] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--border)]">
                Timeline
              </span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
