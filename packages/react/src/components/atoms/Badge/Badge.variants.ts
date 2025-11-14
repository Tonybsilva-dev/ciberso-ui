/**
 * Badge Variants - Configuração de variantes usando Class Variance Authority (cva)
 * 
 * Define todas as variantes visuais do componente Badge
 * usando cva para gerenciar classes condicionais de forma type-safe.
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Variantes do badge usando cva
 * 
 * Define as classes base e variantes de cor (info, success, warning, error)
 * baseadas nos tokens de design do Ciberso-UI.
 */
export const badgeVariants = cva(
  // Classes base aplicadas a todos os badges
  'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        info: 'bg-[#E6F2FF] text-[#007BFF] border border-[#007BFF]/20',
        success: 'bg-[#E6FFE6] text-[#00C853] border border-[#00C853]/20',
        warning: 'bg-[#FFF4E6] text-[#FF9500] border border-[#FF9500]/20',
        error: 'bg-[#FFE6E6] text-[#FF4444] border border-[#FF4444]/20',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

/**
 * Tipos derivados das variantes do badge
 */
export type BadgeVariantProps = VariantProps<typeof badgeVariants>;

