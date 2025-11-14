/**
 * Text Variants - Configuração de variantes usando Class Variance Authority (cva)
 *
 * Define todas as variantes visuais do componente Text
 * usando cva para gerenciar classes condicionais de forma type-safe.
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Variantes do texto usando cva
 *
 * Define as classes base, tamanhos (xs, sm, md, lg, xl, 2xl), pesos (regular, medium, bold)
 * e cores baseadas nos tokens de design do Ciberso-UI.
 */
export const textVariants = cva(
  // Classes base aplicadas a todos os textos
  'font-sans',
  {
    variants: {
      size: {
        xs: 'text-xs',      // 12px
        sm: 'text-sm',      // 14px
        md: 'text-base',    // 16px
        lg: 'text-lg',      // 18px
        xl: 'text-xl',      // 20px
        '2xl': 'text-2xl',  // 24px
      },
      weight: {
        regular: 'font-normal',  // 400
        medium: 'font-medium',   // 500
        bold: 'font-bold',       // 700
      },
      color: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        primary: 'text-primary',
        success: 'text-primary', // Usando primary como success (pode ser ajustado depois)
        error: 'text-destructive',
        warning: 'text-primary', // Usando primary como warning (pode ser ajustado depois)
      },
    },
    defaultVariants: {
      size: 'md',
      weight: 'regular',
      color: 'default',
    },
  },
);

/**
 * Tipos derivados das variantes do texto
 */
export type TextVariantProps = VariantProps<typeof textVariants>;

