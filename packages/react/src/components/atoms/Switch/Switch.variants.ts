/**
 * Switch Variants - Configuração de variantes usando Class Variance Authority (cva)
 * 
 * Define todas as variantes visuais e tamanhos do componente Switch
 * usando cva para gerenciar classes condicionais de forma type-safe.
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Variantes do switch usando cva
 * 
 * Define as classes base, estados (checked, unchecked) e tamanhos (sm, md, lg)
 * baseadas nos tokens de design do Ciberso-UI.
 */
export const switchVariants = cva(
  // Classes base aplicadas ao container do switch
  'relative inline-flex items-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

/**
 * Variantes para o track (trilha) do switch
 */
export const switchTrackVariants = cva(
  // Classes base para o track
  'relative w-full h-full rounded-full transition-colors border',
  {
    variants: {
      checked: {
        true: 'bg-primary border-primary',
        false: 'bg-input border-input',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      checked: false,
      size: 'md',
    },
  },
);

/**
 * Variantes para o thumb (botão deslizante) do switch
 */
export const switchThumbVariants = cva(
  // Classes base para o thumb
  'absolute top-0.5 rounded-full bg-white shadow-sm transition-transform',
  {
    variants: {
      checked: {
        true: '',
        false: '',
      },
      size: {
        sm: 'h-4 w-4 left-0.5',
        md: 'h-5 w-5 left-0.5',
        lg: 'h-6 w-6 left-0.5',
      },
    },
    compoundVariants: [
      {
        checked: true,
        size: 'sm',
        class: 'translate-x-4',
      },
      {
        checked: true,
        size: 'md',
        class: 'translate-x-5',
      },
      {
        checked: true,
        size: 'lg',
        class: 'translate-x-7',
      },
    ],
    defaultVariants: {
      checked: false,
      size: 'md',
    },
  },
);

/**
 * Tipos derivados das variantes do switch
 */
export type SwitchVariantProps = VariantProps<typeof switchVariants>;
export type SwitchTrackVariantProps = VariantProps<typeof switchTrackVariants>;
export type SwitchThumbVariantProps = VariantProps<typeof switchThumbVariants>;

