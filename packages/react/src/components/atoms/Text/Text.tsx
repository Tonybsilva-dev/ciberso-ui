/**
 * Text - Componente de texto do Ciberso-UI
 * Utiliza tokens de tipografia para garantir consistência visual
 *
 * Estilização gerenciada via Class Variance Authority (cva) para type-safe variants
 */

import { forwardRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { textVariants } from './Text.variants';
import { cn } from '../../../utils/cn';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Conteúdo do texto
   */
  children: ReactNode;
  /**
   * Tamanho da fonte
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /**
   * Peso da fonte
   * @default 'regular'
   */
  weight?: 'regular' | 'medium' | 'bold';
  /**
   * Cor do texto
   * @default 'default'
   */
  color?: 'default' | 'muted' | 'primary' | 'success' | 'error' | 'warning';
  /**
   * Elemento HTML usado para renderizar o texto
   * @default 'p'
   */
  as?: 'p' | 'span' | 'div';
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

/**
 * Text
 *
 * Componente de texto reutilizável que aplica tokens de tipografia
 * de forma consistente em toda a aplicação.
 *
 * @example
 * ```tsx
 * <Text size="lg" weight="bold" color="primary">
 *   Texto destacado
 * </Text>
 * ```
 *
 * @example
 * ```tsx
 * <Text as="span" size="sm" color="muted">
 *   Texto secundário
 * </Text>
 * ```
 */
export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      children,
      size = 'md',
      weight = 'regular',
      color = 'default',
      as: Element = 'p',
      className,
      ...props
    },
    ref,
  ) => {
    const textClasses = textVariants({ size, weight, color });

    return (
      <Element
        ref={ref}
        className={cn(textClasses, className)}
        data-size={size}
        data-weight={weight}
        data-color={color}
        {...props}
      >
        {children}
      </Element>
    );
  },
);

Text.displayName = 'Text';

