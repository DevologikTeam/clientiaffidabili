export const designTokens = {
  color: {
    trustNavy950: '#082E48',
    trustNavy900: '#0B3C5D',
    trustNavy800: '#135582',
    trustBlue600: '#328CC1',
    trustBlue100: '#E5F4FB',
    trustGold500: '#E6AF2E',
    slate950: '#1D2731',
    slate700: '#334155',
    slate600: '#475569',
    slate300: '#CBD5E1',
    slate200: '#E2E8F0',
    slate100: '#F1F5F9',
    slate50: '#F8FAFC',
    white: '#FFFFFF',
    success600: '#059669',
    warning600: '#D97706',
    danger600: '#DC2626',
    info600: '#2563EB'
  },
  radius: {
    sm: '10px',
    md: '16px',
    lg: '22px',
    xl: '30px',
    pill: '999px'
  },
  space: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px'
  },
  shadow: {
    card: '0 12px 32px rgba(15, 23, 42, .08)',
    soft: '0 18px 50px rgba(11, 60, 93, .10)',
    focus: '0 0 0 4px rgba(50, 140, 193, .18)'
  },
  typography: {
    fontSans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    body: '16px',
    small: '14px',
    display: 'clamp(42px, 6vw, 68px)',
    h1: 'clamp(38px, 5vw, 56px)',
    h2: 'clamp(30px, 4vw, 46px)',
    h3: '24px'
  }
} as const;

export type DesignTokens = typeof designTokens;
