/**
 * Heading - Componente de título do Ciberso-UI
 * Renderiza tags de cabeçalho HTML (h1-h6) com estilos consistentes
 *
 * Estilização gerenciada via Class Variance Authority (cva) para type-safe variants
 */

import { forwardRef } from 'react';
import type { ReactNode, HTMLAttributes, ElementType } from 'react';
import { textVariants } from '../Text/Text.variants';
import { cn } from '../../../utils/cn';

export interface HeadingProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'> {
  /**
   * Conteúdo do título
   */
  children: ReactNode;
  /**
   * Nível do cabeçalho (1-6)
   * Determina qual tag HTML será renderizada (h1, h2, etc.)
   * @default 1
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Tamanho da fonte
   * Se não especificado, usa tamanhos padrão baseados no level
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /**
   * Peso da fonte
   * @default 'bold'
   */
  weight?: 'regular' | 'medium' | 'bold';
  /**
   * Cor do texto
   * @default 'default'
   */
  color?: 'default' | 'muted' | 'primary' | 'success' | 'error' | 'warning';
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

/**
 * Mapeamento de level para tamanhos padrão de heading
 */
const defaultHeadingSizes: Record<1 | 2 | 3 | 4 | 5 | 6, 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'> = {
  1: '2xl',  // h1 - maior
  2: 'xl',   // h2
  3: 'lg',   // h3
  4: 'md',   // h4
  5: 'sm',   // h5
  6: 'xs',   // h6 - menor
};

/**
 * Heading
 *
 * Componente de título que renderiza tags de cabeçalho HTML (h1-h6)
 * com estilos consistentes baseados nos tokens de tipografia.
 *
 * @example
 * ```tsx
 * <Heading level={1}>Título Principal</Heading>
 * ```
 *
 * @example
 * ```tsx
 * <Heading level={2} size="lg" color="primary">
 *   Subtítulo
 * </Heading>
 * ```
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      children,
      level = 1,
      size,
      weight = 'bold',
      color = 'default',
      className,
      ...props
    },
    ref,
  ) => {
    // Usar size fornecido ou tamanho padrão baseado no level
    const headingSize = size || defaultHeadingSizes[level];

    // Determinar qual tag HTML renderizar baseado no level
    const HeadingTag = `h${level}` as ElementType;

    const headingClasses = textVariants({
      size: headingSize,
      weight,
      color,
    });

    return (
      <HeadingTag
        ref={ref}
        className={cn(headingClasses, className)}
        data-level={level}
        data-size={headingSize}
        data-weight={weight}
        data-color={color}
        {...props}
      >
        {children}
      </HeadingTag>
    );
  },
);

Heading.displayName = 'Heading';

