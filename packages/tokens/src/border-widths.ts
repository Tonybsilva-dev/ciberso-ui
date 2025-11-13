/**
 * Tokens de largura de borda (border width) do Ciberso-UI
 */

export const borderWidths = {
  none: '0px',
  thin: '1px',
  medium: '2px',
  thick: '4px',
} as const;

export type BorderWidths = typeof borderWidths;

