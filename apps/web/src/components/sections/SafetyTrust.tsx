import React from 'react';
import { TranslationType } from '@/lib/translations/en';
import { Card } from '../ui/Card';
import { ShieldCheck, MapPinOff, Trash2 } from 'lucide-react';

interface SafetyTrustProps {
  t: TranslationType;
}

export const SafetyTrust: React.FC<SafetyTrustProps> = ({ t }) => {
  return (
    <section id="safety" className="section-padding bg-[var(--surface-2)]" aria-labelledby="safety-heading">
      <div className="container-main">
        <div className="text-start max-w-2xl mb-12">
          <h2 id="safety-heading" className="display-h2 text-[var(--ink)]">
            {t.trust.h2}
          </h2>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start mb-8">
          <Card hoverable>
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--accent-soft)] text-[var(--accent-text)] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="display-h3 mb-2">{t.trust.t1Title}</h3>
            <p className="text-body text-sm">{t.trust.t1Desc}</p>
          </Card>

          <Card hoverable>
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--accent-soft)] text-[var(--accent-text)] flex items-center justify-center mb-4">
              <MapPinOff className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="display-h3 mb-2">{t.trust.t2Title}</h3>
            <p className="text-body text-sm">{t.trust.t2Desc}</p>
          </Card>

          <Card hoverable>
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--accent-soft)] text-[var(--accent-text)] flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="display-h3 mb-2">{t.trust.t3Title}</h3>
            <p className="text-body text-sm">{t.trust.t3Desc}</p>
          </Card>
        </div>

        {/* Responsible drinking note */}
        <div className="text-caption text-xs text-[var(--ink-3)] font-medium text-center">
          {t.trust.drinkResponsibly}
        </div>
      </div>
    </section>
  );
};
