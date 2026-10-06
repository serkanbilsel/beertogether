'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className = '' }) => {
  return (
    <div className={`space-y-3.5 ${className}`}>
      {items.map((item, idx) => (
        <details
          key={idx}
          name="faq-group"
          className="group rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 md:p-6 transition-all duration-200 open:border-[var(--accent)] open:shadow-[var(--shadow-sm)]"
        >
          <summary className="flex items-center justify-between font-sans font-bold text-[var(--ink)] text-base sm:text-lg cursor-pointer list-none select-none">
            <span className="text-start pe-4">{item.question}</span>
            <ChevronDown className="w-5 h-5 text-[var(--ink-3)] transition-transform duration-200 group-open:rotate-180 group-open:text-[var(--accent-text)] shrink-0" />
          </summary>
          <div className="mt-3.5 text-body text-sm sm:text-base border-t border-[var(--border)] pt-3.5 leading-relaxed text-[var(--ink-2)] text-start">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
};
