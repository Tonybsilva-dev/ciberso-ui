import cibersoThemePreset from '@ciberso/theme/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/react/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [cibersoThemePreset],
  theme: {
    extend: {},
  },
  plugins: [],
};

