/**
 * Tokens de raio de borda (border radius) do Ciberso-UI
 */

export const radii = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;

export type Radii = typeof radii;

