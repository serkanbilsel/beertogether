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
    <div className={`space-y-3 ${className}`}>
      {items.map((item, idx) => (
        <details
          key={idx}
          className="group rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors duration-[var(--dur-base)] open:border-[var(--accent)] open:shadow-[var(--shadow-sm)]"
        >
          <summary className="flex items-center justify-between font-semibold text-[var(--ink)] text-base cursor-pointer list-none select-none">
            <span className="text-start">{item.question}</span>
            <ChevronDown className="w-5 h-5 text-[var(--ink-2)] transition-transform duration-[var(--dur-base)] group-open:rotate-180 group-open:text-[var(--accent-text)] shrink-0 ms-4" />
          </summary>
          <div className="mt-3 text-body text-sm sm:text-base border-t border-[var(--border)] pt-3 leading-relaxed text-start">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
};
