/**
 * @ciberso/theme
 * Theme provider e configurações do Ciberso-UI Design System
 * Tailwind v3 - Padrão shadcn/ui com cores Ciberso
 * 
 * Para usar o preset do Tailwind:
 * ```js
 * import cibersoThemePreset from '@ciberso/theme/tailwind';
 * export default {
 *   presets: [cibersoThemePreset],
 * };
 * ```
 * 
 * Para importar o CSS:
 * ```css
 * @import "@ciberso/theme/globals.css";
 * ```
 * ou
 * ```tsx
 * import "@ciberso/theme/globals.css";
 * ```
 */

export * from './css-variables';
export { ThemeProvider } from './ThemeProvider';
export type { ThemeProviderProps } from './ThemeProvider';

