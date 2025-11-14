import { cibersoThemePreset } from '@ciberso/theme/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './stories/**/*.{js,jsx,ts,tsx,mdx}',
    './.storybook/**/*.{js,jsx,ts,tsx}',
    // Incluir componentes do monorepo
    '../../packages/react/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [cibersoThemePreset],
  theme: {
    extend: {
      // Customizações adicionais se necessário
    },
  },
  plugins: [],
};

