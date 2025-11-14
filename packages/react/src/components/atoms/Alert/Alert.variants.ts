/**
 * Alert Variants - Configuração de variantes usando Class Variance Authority (cva)
 * 
 * Define todas as variantes visuais do componente Alert
 * usando cva para gerenciar classes condicionais de forma type-safe.
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Variantes do alert usando cva
 * 
 * Define as classes base e variantes de status (info, success, warning, error)
 * baseadas nos tokens de design do Ciberso-UI.
 * 
 * Segue a mesma identidade visual do Badge, mas com estilo de alerta:
 * - Fundo colorido claro
 * - Texto na cor do status
 * - Borda sutil na cor do status
 * - Padding maior para melhor legibilidade
 */
export const alertVariants = cva(
  // Classes base aplicadas a todos os alerts
  'flex items-start gap-3 rounded-lg px-4 py-3 border transition-colors',
  {
    variants: {
      variant: {
        info: 'bg-[#E6F2FF] text-[#007BFF] border-[#007BFF]/20',
        success: 'bg-[#E6FFE6] text-[#00C853] border-[#00C853]/20',
        warning: 'bg-[#FFF4E6] text-[#FF9500] border-[#FF9500]/20',
        error: 'bg-[#FFE6E6] text-[#FF4444] border-[#FF4444]/20',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

/**
 * Variantes para o ícone do alert
 */
export const alertIconVariants = cva('flex-shrink-0', {
  variants: {
    variant: {
      info: 'text-[#007BFF]',
      success: 'text-[#00C853]',
      warning: 'text-[#FF9500]',
      error: 'text-[#FF4444]',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

/**
 * Variantes para o botão de fechar
 */
export const alertCloseButtonVariants = cva(
  'flex-shrink-0 rounded-md p-1 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
  {
    variants: {
      variant: {
        info: 'text-[#007BFF] hover:text-[#0066CC] focus-visible:ring-[#007BFF]',
        success: 'text-[#00C853] hover:text-[#00A842] focus-visible:ring-[#00C853]',
        warning: 'text-[#FF9500] hover:text-[#E68500] focus-visible:ring-[#FF9500]',
        error: 'text-[#FF4444] hover:text-[#E63939] focus-visible:ring-[#FF4444]',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

/**
 * Tipos derivados das variantes do alert
 */
export type AlertVariantProps = VariantProps<typeof alertVariants>;
export type AlertIconVariantProps = VariantProps<typeof alertIconVariants>;
export type AlertCloseButtonVariantProps = VariantProps<typeof alertCloseButtonVariants>;

