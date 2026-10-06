import React from 'react';
import { TranslationType } from '@/lib/translations/en';
import { Eyebrow } from '../ui/Eyebrow';
import { Card } from '../ui/Card';
import { Send, Clock, Camera, Check } from 'lucide-react';

interface HowItWorksProps {
  t: TranslationType;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ t }) => {
  const steps = [
    {
      num: '01',
      title: t.how.step1Title,
      desc: t.how.step1Desc,
      snippet: (
        <div className="p-3 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border)] text-xs space-y-2">
          <div className="flex items-center justify-between text-[var(--ink)] font-semibold">
            <span>{t.snippets.when}</span>
            <span className="text-[var(--accent-text)] text-[10px] font-bold">{t.snippets.inviteSent}</span>
          </div>
          <div className="text-[11px] text-[var(--ink-2)] flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-[var(--accent)] rtl:scale-x-[-1]" />
            <span>{t.snippets.linkReady}</span>
          </div>
        </div>
      ),
    },
    {
      num: '02',
      title: t.how.step2Title,
      desc: t.how.step2Desc,
      snippet: (
        <div className="p-3 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border)] text-xs space-y-2">
          <div className="flex items-center gap-1.5 text-[var(--ink)] font-semibold">
            <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>{t.snippets.reminder}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[var(--ink-2)]">
            <span>150 m</span>
            <span className="text-[var(--success)] font-bold">{t.snippets.checkinOpen}</span>
          </div>
        </div>
      ),
    },
    {
      num: '03',
      title: t.how.step3Title,
      desc: t.how.step3Desc,
      snippet: (
        <div className="p-3 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border)] text-xs space-y-2">
          <div className="flex items-center gap-1.5 text-[var(--ink)] font-semibold">
            <Camera className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>{t.snippets.photoAdded}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[var(--ink-2)]">
            <span>{t.snippets.savedToTimeline}</span>
            <Check className="w-3.5 h-3.5 text-[var(--success)]" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how" className="section-padding bg-[var(--surface-2)]" aria-labelledby="how-heading">
      <div className="container-main">
        <div className="text-start max-w-2xl mb-12">
          <Eyebrow>{t.how.eyebrow}</Eyebrow>
          <h2 id="how-heading" className="display-h2 text-[var(--ink)]">
            {t.how.h2}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <Card key={step.num} hoverable className="flex flex-col justify-between text-start">
              <div>
                <div className="font-sans font-extrabold text-3xl md:text-4xl text-[var(--accent-text)] mb-3 tabular tracking-tight">
                  {step.num}
                </div>
                <h3 className="display-h3 mb-2">{step.title}</h3>
                <p className="text-body text-sm mb-6">{step.desc}</p>
              </div>
              <div className="mt-auto">{step.snippet}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
