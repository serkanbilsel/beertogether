// theme/tokens.ts per mobiledesing.md Section 4
export const tokens = {
  light: {
    bg: '#FAF8F5',
    surface: '#FFFFFF',
    surface2: '#F3EFE9',
    label: '#1A1612',
    label2: '#5C544B',
    label3: '#8A8176',
    separator: 'rgba(26,22,18,0.12)',
    accent: '#E8A33D',
    accentInk: '#1A1612',
    accentText: '#8F5A0F',
    accentSoft: '#FBEBD0',
    danger: '#D6453D',
    success: '#2E7D4F',
    glassFallback: 'rgba(250,248,245,0.94)',
    scrim: 'rgba(0,0,0,0.28)',
  },
  dark: {
    bg: '#0F0D0B',
    surface: '#1A1713',
    surface2: '#221E19',
    label: '#F5F1EA',
    label2: '#B8AFA2',
    label3: '#8A8176',
    separator: 'rgba(245,241,234,0.14)',
    accent: '#F0B65A',
    accentInk: '#1A1612',
    accentText: '#F0B65A',
    accentSoft: '#3A2B12',
    danger: '#FF6B61',
    success: '#4CC38A',
    glassFallback: 'rgba(26,23,19,0.94)',
    scrim: 'rgba(0,0,0,0.45)',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  huge: 40,
  massive: 56,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  full: 999,
} as const;

export type ThemeMode = 'light' | 'dark';
