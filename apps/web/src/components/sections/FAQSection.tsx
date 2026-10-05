import React from 'react';
import { TranslationType } from '@/lib/translations/en';
import { Accordion } from '../ui/Accordion';

interface FAQSectionProps {
  t: TranslationType;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ t }) => {
  const faqItems = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="section-padding bg-[var(--bg)]" aria-labelledby="faq-heading">
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-narrow">
        <div className="text-start mb-10">
          <h2 id="faq-heading" className="display-h2 text-[var(--ink)]">
            {t.faq.h2}
          </h2>
        </div>

        <Accordion items={faqItems} />
      </div>
    </section>
  );
};
