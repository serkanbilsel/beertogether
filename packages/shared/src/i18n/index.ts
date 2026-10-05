import tr from './locales/tr.js';
import en from './locales/en.js';
import es from './locales/es.js';
import ja from './locales/ja.js';
import ar from './locales/ar.js';
import it from './locales/it.js';

export const translations = { tr, en, es, ja, ar, it } as const;

export type Locale = keyof typeof translations;
export type TranslationDict = typeof translations['en'];

export function getTranslation(locale: string = 'tr'): TranslationDict {
  const normalized = (locale.split('-')[0].toLowerCase()) as Locale;
  return translations[normalized] || translations.tr;
}

export function isRtlLocale(locale: string): boolean {
  return locale.startsWith('ar');
}
