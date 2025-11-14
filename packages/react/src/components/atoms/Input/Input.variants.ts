/**
 * Input Variants - Configuração de variantes usando Class Variance Authority (cva)
 * 
 * Define todas as variantes visuais, estados e tamanhos do componente Input
 * usando cva para gerenciar classes condicionais de forma type-safe.
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Variantes do input usando cva
 * 
 * Define as classes base, estados (default, invalid, disabled) e tamanhos (sm, md, lg)
 * baseadas nos tokens de design do Ciberso-UI.
 */
export const inputVariants = cva(
  // Classes base aplicadas a todos os inputs
  'w-full rounded-md border bg-white text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F3F4F6] placeholder:text-[#9CA3AF]',
  {
    variants: {
      state: {
        default: 'border-[#9CA3AF] focus-visible:border-[#007BFF] focus-visible:ring-[#007BFF]',
        invalid: 'border-[#FF4444] focus-visible:border-[#FF4444] focus-visible:ring-[#FF4444]',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-3 text-base',
        lg: 'h-11 px-4 text-lg',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'md',
    },
  },
);

/**
 * Variantes para o label do input
 */
export const inputLabelVariants = cva('font-medium text-[#111827]', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * Tipos derivados das variantes do input
 */
export type InputVariantProps = VariantProps<typeof inputVariants>;
export type InputLabelVariantProps = VariantProps<typeof inputLabelVariants>;

