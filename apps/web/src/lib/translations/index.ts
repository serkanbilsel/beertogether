import { en, TranslationType } from './en';
import { tr } from './tr';
import { es } from './es';
import { ja } from './ja';
import { ar } from './ar';
import { it } from './it';

export const translations: Record<string, TranslationType> = {
  en,
  tr,
  es,
  ja,
  ar,
  it,
};

export type Locale = 'en' | 'tr' | 'es' | 'ja' | 'ar' | 'it';

export function getTranslation(locale: string = 'en'): TranslationType {
  const norm = (locale.split('-')[0].toLowerCase()) as Locale;
  return translations[norm] || translations.en;
}

export function isRTL(locale: string): boolean {
  return locale.startsWith('ar');
}
