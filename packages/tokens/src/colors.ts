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
      500: '#00F6FF', // Base - Ciano Neon conforme especificação
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
      500: '#007BFF', // Base - Azul Royal conforme especificação
      600: '#0066CC',
      700: '#005299',
      800: '#003D66',
      900: '#002933',
    },
    darkBlue: {
      50: '#1E293B',
      100: '#1E293B',
      200: '#1E293B',
      300: '#1E293B',
      400: '#1E293B',
      500: '#0A192F', // Base - Azul Escuro conforme especificação
      600: '#081420',
      700: '#060F18',
      800: '#040A0F',
      900: '#020506',
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
    success: '#00F6FF', // ciberso.cyan[500]
    error: '#FF4444',
    warning: '#FFD700', // ciberso.gold[500]
    info: '#007BFF', // ciberso.royalBlue[500]
  },
  // Cores primárias diretas para compatibilidade (conforme especificação da tarefa)
  primary: {
    cianoNeon: '#00F6FF',
    azulRoyal: '#007BFF',
    azulEscuro: '#0A192F',
    dourado: '#FFD700',
    preto: '#000000',
  },
} as const;

export type Colors = typeof colors;

