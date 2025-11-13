/**
 * Tokens de tipografia do Ciberso-UI
 */

// Tokens de tamanho de fonte (fontSizes) - Escala modular conforme especificação
export const fontSizes = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
} as const;

// Tokens de peso de fonte (fontWeights) - Pesos padrão conforme especificação
export const fontWeights = {
  regular: 400,
  medium: 500,
  bold: 700,
} as const;

// Tokens de família de fonte (fontFamilies) - Pilhas de fontes
export const fontFamilies = {
  default: 'Inter, system-ui, -apple-system, sans-serif',
  code: 'JetBrains Mono, Menlo, Monaco, monospace',
} as const;

// Objeto completo de tipografia (mantido para compatibilidade)
export const typography = {
  fonts: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
  },
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  // Exports diretos para compatibilidade com especificação da tarefa
  fontSizes,
  fontWeights,
  fontFamilies,
} as const;

export type Typography = typeof typography;
export type FontSizes = typeof fontSizes;
export type FontWeights = typeof fontWeights;
export type FontFamilies = typeof fontFamilies;

