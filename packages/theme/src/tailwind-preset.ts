/**
 * Tailwind CSS Preset para Ciberso-UI
 */

import type { Config } from 'tailwindcss';
import { colors, spacing, typography, animations } from '@ciberso/tokens';

export const cibersoThemePreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        ciberso: colors.ciberso,
        semantic: colors.semantic,
      },
      spacing,
      fontFamily: {
        sans: [...typography.fonts.sans],
        mono: [...typography.fonts.mono],
      },
      fontSize: typography.sizes,
      fontWeight: {
        normal: typography.weights.normal.toString(),
        medium: typography.weights.medium.toString(),
        semibold: typography.weights.semibold.toString(),
        bold: typography.weights.bold.toString(),
      },
      lineHeight: {
        tight: typography.lineHeights.tight.toString(),
        normal: typography.lineHeights.normal.toString(),
        relaxed: typography.lineHeights.relaxed.toString(),
      },
      transitionDuration: {
        fast: animations.duration.fast,
        normal: animations.duration.normal,
        slow: animations.duration.slow,
        slower: animations.duration.slower,
      },
      transitionTimingFunction: animations.easing,
    },
  },
};

