/**
 * Centralized design tokens for all outgoing emails.
 */
export const MAIL_THEME = {
  COLORS: {
    PRIMARY: '#114fc0', // Kinetic Orange
    PRIMARY_DARK: '#163185', // Deep Toned Orange
    SECONDARY: '#1A1A2E', // Deep Navy
    BACKGROUND: '#FCF8FF', // Tonal Lilac/White
    SURFACE: '#FFFFFF', // Pure White
    SURFACE_SUNKEN: '#E8E5FF', // Tactile Well (Light Purple)
    TEXT_MAIN: '#1A1A2E', // Navy text
    TEXT_BODY: '#5A4136', // Editorial Brown/Grey
    TEXT_ON_PRIMARY: '#FFFFFF', // White on Orange
    BORDER: '#F5F2FF', // Subtle border/separator
    ERROR: '#F5222D', // Status Red
    ERROR_LIGHT: '#FFF1F0', // Status Red Background
  },
  TYPOGRAPHY: {
    FONT_FAMILY: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    TRACKING_HEADLINE: '-0.02em',
    TRACKING_BODY: '-0.01em',
    TRACKING_LABEL: '0.05em',
  },
  SPACING: {
    DEFAULT: '40px',
    COMPACT: '24px',
  },
  RADIUS: {
    DEFAULT: '12px',
    PILL: '24px',
  },
} as const;
