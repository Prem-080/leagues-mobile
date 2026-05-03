// src/shared/constants/theme.ts

export type Theme = {
  background: string;
  textPrimary: string;
  textSecondary: string;
  cardBackground: string;
  inputBackground: string;
  inputBorder: string;
  divider: string;
  accent: string;
  textMuted: string;
  white: string;
  cardBorder: string;
  cardTransparent: string;
};

export const lightTheme: Theme = {
  background: '#ffffff',
  textPrimary: '#111827',
  textSecondary: '#6b7280',
  cardBackground: '#f9fafb',
  inputBackground: '#ffffff',
  inputBorder: '#e5e7eb',
  divider: '#e5e7eb',
  accent: '#F97316',
  white: '#ffffff',
  textMuted: '#9ca3af',
  cardBorder: 'rgba(0, 0, 0, 0.05)',
  cardTransparent: 'rgba(255, 255, 255, 0.95)',
};

export const darkTheme: Theme = {
  background: '#0A0F1D',
  textPrimary: '#ffffff',
  textSecondary: '#9ca3af',
  cardBackground: '#161B2E',
  inputBackground: '#111827',
  inputBorder: '#374151',
  divider: '#374151',
  accent: '#F97316',
  white: '#ffffff',
  textMuted: '#6B7280',
  cardBorder: 'rgba(255, 255, 255, 0.1)',
  cardTransparent: 'rgba(26, 32, 50, 0.85)',
};