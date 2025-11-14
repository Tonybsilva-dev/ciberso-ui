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
    // Gray scale para secondary buttons e inputs (baseado na referência)
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  semantic: {
    success: '#00F6FF', // ciberso.cyan[500]
    error: '#FF4444',
    warning: '#FF9500', // Laranja para warning (baseado na referência)
    info: '#007BFF', // ciberso.royalBlue[500]
  },
  // Cores para componentes baseadas na referência
  ui: {
    // Primary button: azul (#007BFF)
    primary: {
      bg: '#007BFF', // royalBlue[500]
      text: '#FFFFFF',
      hover: '#0066CC', // royalBlue[600]
      active: '#005299', // royalBlue[700]
    },
    // Secondary button: cinza
    secondary: {
      bg: '#6B7280', // Gray-500
      text: '#FFFFFF',
      hover: '#4B5563', // Gray-600
      active: '#374151', // Gray-700
    },
    // Input states
    input: {
      border: '#9CA3AF', // Gray-400
      borderFocused: '#007BFF', // royalBlue[500]
      borderError: '#FF4444',
      bg: '#FFFFFF',
      bgDisabled: '#F3F4F6', // Gray-100
      text: '#111827', // Gray-900
      placeholder: '#9CA3AF', // Gray-400
    },
    // Tag colors
    tag: {
      orange: {
        bg: '#FFF4E6',
        text: '#FF9500',
        dot: '#FF9500',
      },
      blue: {
        bg: '#E6F2FF',
        text: '#007BFF',
        dot: '#007BFF',
      },
      green: {
        bg: '#E6FFE6',
        text: '#00C853',
        dot: '#00C853',
      },
      red: {
        bg: '#FFE6E6',
        text: '#FF4444',
        dot: '#FF4444',
      },
    },
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

