/**
 * Badge - Componente de badge do Ciberso-UI
 * Utiliza tokens de cor para garantir consistência visual
 *
 * Estilização gerenciada via Class Variance Authority (cva) para type-safe variants
 */

import { forwardRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { badgeVariants } from './Badge.variants';
import { cn } from '../../../utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Conteúdo do badge
   */
  children: ReactNode;
  /**
   * Variante visual do badge
   * @default 'info'
   */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

/**
 * Badge
 *
 * Componente de badge reutilizável para exibir status ou informações curtas.
 * Suporta variantes de cor baseadas nos tokens semânticos do Ciberso-UI.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Ativo</Badge>
 * ```
 *
 * @example
 * ```tsx
 * <Badge variant="error">Erro</Badge>
 * ```
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      children,
      variant = 'info',
      className,
      ...props
    },
    ref,
  ) => {
    const badgeClasses = badgeVariants({ variant });

    return (
      <div
        ref={ref}
        className={cn(badgeClasses, className)}
        data-variant={variant}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Badge.displayName = 'Badge';

