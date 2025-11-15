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
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground focus-visible:ring-primary',
        secondary: 'bg-secondary text-secondary-foreground focus-visible:ring-secondary',
        ghost: 'bg-transparent text-foreground hover:bg-muted hover:text-foreground active:bg-muted/80 focus-visible:ring-ring',
        outline: 'bg-transparent border border-input text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/80 focus-visible:ring-ring',
        danger: 'bg-destructive text-destructive-foreground focus-visible:ring-destructive',
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

