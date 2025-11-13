/**
 * Tokens de animação do Ciberso-UI
 */

export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  delays: {
    none: '0ms',
    short: '100ms',
    medium: '200ms',
    long: '300ms',
  },
} as const;

export type Animations = typeof animations;

