/**
 * ButtonGroup - Componente para agrupar botões e inputs do Ciberso-UI
 * 
 * Agrupa múltiplos botões ou inputs em um grupo visualmente conectado,
 * removendo espaços entre elementos e aplicando bordas arredondadas apenas
 * nas extremidades.
 * 
 * Utiliza React.cloneElement para aplicar estilos aos filhos automaticamente.
 */

import { forwardRef, Children, cloneElement, isValidElement, ReactElement } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { buttonGroupVariants } from './ButtonGroup.variants';
import { cn } from '../../../utils/cn';
import { Input } from '../../atoms/Input';

export interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Elementos filhos (Button, Input, etc.)
   */
  children: ReactNode;
  /**
   * Tamanho do grupo (afeta os elementos filhos)
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

/**
 * ButtonGroup
 * 
 * Componente que agrupa botões e inputs em um grupo visualmente conectado.
 * Remove bordas internas e aplica bordas arredondadas apenas nas extremidades.
 * 
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button>Primeiro</Button>
 *   <Button>Segundo</Button>
 *   <Button>Terceiro</Button>
 * </ButtonGroup>
 * ```
 * 
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Input placeholder="Buscar..." />
 *   <Button rightIcon={<SearchIcon />} aria-label="Buscar" />
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, size = 'md', className, ...props }, ref) => {
    const validChildren = Children.toArray(children).filter(isValidElement);
    const totalChildren = validChildren.length;

    if (totalChildren === 0) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(buttonGroupVariants({ size }), className)}
        role="group"
        {...props}
      >
        {validChildren.map((child, index) => {
          const isFirst = index === 0;
          const isLast = index === totalChildren - 1;
          const isMiddle = !isFirst && !isLast;

          // Detectar se é um Input (verificar displayName ou tipo)
          const isInput = (child as ReactElement).type === Input || 
                         (child as ReactElement).type?.displayName === 'Input';

          // Classes para remover bordas internas e aplicar bordas arredondadas
          const groupClasses = cn(
            // Remover borda direita de todos exceto o último
            !isLast && 'rounded-r-none border-r-0',
            // Remover borda esquerda de todos exceto o primeiro
            !isFirst && 'rounded-l-none',
            // Primeiro elemento: borda arredondada à esquerda
            isFirst && 'rounded-l-md',
            // Último elemento: borda arredondada à direita
            isLast && 'rounded-r-md',
            // Elementos do meio: sem bordas arredondadas nas laterais
            isMiddle && 'rounded-none',
          );

          // Para Input, aplicar classes ao wrapper div e ao input interno
          if (isInput) {
            return cloneElement(child as ReactElement, {
              key: index,
              size: size,
              className: cn(
                (child as ReactElement).props?.className,
                // Aplicar classes ao wrapper do Input
                '[&>input]:rounded-l-none [&>input]:rounded-r-none [&>input]:border-r-0',
                isFirst && '[&>input]:rounded-l-md',
                isLast && '[&>input]:rounded-r-md [&>input]:border-r',
                !isLast && '[&>input]:border-r-0',
              ),
            });
          }

          // Para outros componentes (Button, etc.), aplicar classes diretamente
          return cloneElement(child as ReactElement, {
            key: index,
            size: size, // Passar size para os filhos
            className: cn(
              (child as ReactElement).props?.className,
              groupClasses,
            ),
          });
        })}
      </div>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';

