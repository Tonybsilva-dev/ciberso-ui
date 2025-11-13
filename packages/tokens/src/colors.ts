/**
 * Tokens de cor do Ciberso-UI
 * Inspirado no arquétipo Ciberso de Yu-Gi-Oh
 */

export const colors = {
  ciberso: {
    cyan: {
      50: '#E0FFFF',
      100: '#B0FFFF',
      200: '#80FFFF',
      300: '#50FFFF',
      400: '#20FFFF',
      500: '#00FFFF', // Base
      600: '#00CCCC',
      700: '#009999',
      800: '#006666',
      900: '#003333',
    },
    royalBlue: {
      50: '#E6EFFF',
      100: '#CCDFFF',
      200: '#99BFFF',
      300: '#669FFF',
      400: '#337FFF',
      500: '#1E3A8A', // Base
      600: '#182E6E',
      700: '#122252',
      800: '#0C1636',
      900: '#060A1A',
    },
    darkBlue: {
      50: '#1E293B',
      100: '#1E293B',
      200: '#1E293B',
      300: '#1E293B',
      400: '#1E293B',
      500: '#0F172A', // Base
      600: '#0C1221',
      700: '#090E18',
      800: '#060A0F',
      900: '#030506',
    },
    gold: {
      50: '#FFF9E6',
      100: '#FFF3CC',
      200: '#FFE799',
      300: '#FFDB66',
      400: '#FFCF33',
      500: '#FFD700', // Base
      600: '#CCAC00',
      700: '#998100',
      800: '#665600',
      900: '#332B00',
    },
    black: {
      50: '#E5E5E5',
      100: '#CCCCCC',
      200: '#999999',
      300: '#666666',
      400: '#333333',
      500: '#000000', // Base
      600: '#000000',
      700: '#000000',
      800: '#000000',
      900: '#000000',
    },
  },
  semantic: {
    success: '#00FFFF', // ciberso.cyan[500]
    error: '#FF4444',
    warning: '#FFD700', // ciberso.gold[500]
    info: '#1E3A8A', // ciberso.royalBlue[500]
  },
} as const;

export type Colors = typeof colors;

