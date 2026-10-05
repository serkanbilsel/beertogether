export const APP_CONFIG = {
  appName: 'Beer Together',
  appTagline: 'Gerçek hayatta arkadaşlarınla bira buluşmaları planla',
  webUrl: 'https://beertogether.app',
  supportEmail: 'support@beertogether.app',
  defaultLocale: 'tr',
  supportedLocales: ['tr', 'en', 'es', 'ja', 'ar', 'it'] as const,
  rtlLocales: ['ar'] as const,
  gpsVerificationRadiusMeters: 150, // 150m check-in radius as per spec Section 2
  checkInWindowMinutesBefore: 30, // 30 min window before
  checkInWindowMinutesAfter: 120, // 2h window after
  inviteTtlHours: 48, // 48h expiration for invites
  unconfirmedDraftTtlHours: 24, // 24h unconfirmed cleanup
  inviteLinkTtlDays: 30, // 30 days for invite links
  minAgeYears: 18 // Age gate compliance requirement Section 20
};

export const VENUE_CATEGORIES = [
  { id: 'bar', labelKey: 'categories.bar', icon: 'Beer' },
  { id: 'pub', labelKey: 'categories.pub', icon: 'Wine' },
  { id: 'craft_beer', labelKey: 'categories.craft_beer', icon: 'Sparkles' },
  { id: 'bistro', labelKey: 'categories.bistro', icon: 'Utensils' },
  { id: 'cafe', labelKey: 'categories.cafe', icon: 'Coffee' },
  { id: 'home', labelKey: 'categories.home', icon: 'Home' },
  { id: 'friends_home', labelKey: 'categories.friends_home', icon: 'Users' }
] as const;
