/**
 * ButtonGroup Variants - Configuração de variantes usando Class Variance Authority (cva)
 * 
 * Define todas as variantes visuais e tamanhos do componente ButtonGroup
 * usando cva para gerenciar classes condicionais de forma type-safe.
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Variantes do ButtonGroup usando cva
 * 
 * Define as classes base e tamanhos (xs, sm, md, lg, xl)
 * baseadas nos tokens de design do Ciberso-UI.
 */
export const buttonGroupVariants = cva(
  // Classes base aplicadas ao container do grupo
  'inline-flex',
  {
    variants: {
      size: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

/**
 * Tipos derivados das variantes do ButtonGroup
 */
export type ButtonGroupVariantProps = VariantProps<typeof buttonGroupVariants>;

