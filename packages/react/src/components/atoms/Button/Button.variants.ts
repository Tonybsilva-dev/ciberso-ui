/**
 * Button Variants - Configuração de variantes usando Class Variance Authority (cva)
 * 
 * Define todas as variantes visuais e tamanhos do componente Button
 * usando cva para gerenciar classes condicionais de forma type-safe.
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Variantes do botão usando cva
 * 
 * Define as classes base, variantes (primary, secondary, ghost) e tamanhos (sm, md, lg)
 * baseadas nos tokens de design do Ciberso-UI.
 */
export const buttonVariants = cva(
  // Classes base aplicadas a todos os botões
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md',
  {
    variants: {
      variant: {
        primary: 'bg-[#007BFF] text-white hover:bg-[#0066CC] active:bg-[#005299] focus-visible:ring-[#007BFF]',
        secondary: 'bg-[#6B7280] text-white hover:bg-[#4B5563] active:bg-[#374151] focus-visible:ring-[#6B7280]',
        ghost: 'bg-transparent text-[#111827] hover:bg-[#F3F4F6] active:bg-[#E5E7EB] focus-visible:ring-[#007BFF]',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

/**
 * Variantes para botões icon-only
 * Usa compound variants para ajustar tamanho quando iconOnly é true
 */
export const buttonIconOnlyVariants = cva('', {
  variants: {
    size: {
      sm: 'h-9 w-9 px-0',
      md: 'h-10 w-10 px-0',
      lg: 'h-11 w-11 px-0',
    },
  },
});

/**
 * Tipos derivados das variantes do botão
 */
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

/**
 * Classes para tamanhos de ícones baseados no tamanho do botão
 */
export const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
} as const;

