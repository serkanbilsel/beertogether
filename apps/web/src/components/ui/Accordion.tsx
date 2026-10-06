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
          className="group rounded-[var(--radius-lg)] border border-[#1F2438] bg-[#0C0E17]/85 backdrop-blur-md p-6 transition-all duration-[var(--dur-base)] open:border-[var(--accent)] open:shadow-[0_8px_30px_rgba(255,179,0,0.12)]"
        >
          <summary className="flex items-center justify-between font-display font-bold text-white text-base sm:text-lg cursor-pointer list-none select-none">
            <span className="text-start">{item.question}</span>
            <ChevronDown className="w-5 h-5 text-slate-400 transition-transform duration-[var(--dur-base)] group-open:rotate-180 group-open:text-[var(--accent)] shrink-0 ms-4" />
          </summary>
          <div className="mt-4 text-body text-sm sm:text-base border-t border-[#1F2438] pt-4 leading-relaxed text-slate-300 text-start">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
};
