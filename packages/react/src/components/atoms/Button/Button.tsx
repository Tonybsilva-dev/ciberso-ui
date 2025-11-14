/**
 * Button - Componente de botão acessível do Ciberso-UI
 * Utiliza React Aria para garantir acessibilidade completa
 * Baseado na referência: Primary (azul), Secondary (cinza), com suporte a ícones
 * 
 * Estilização gerenciada via Class Variance Authority (cva) para type-safe variants
 */

import { useButton, type AriaButtonProps } from 'react-aria';
import { forwardRef, useRef } from 'react';
import type { ReactNode } from 'react';
import { buttonVariants, buttonIconOnlyVariants, iconSizeClasses } from './Button.variants';
import { cn } from '../../../utils/cn';

export interface ButtonProps extends AriaButtonProps {
  /**
   * Conteúdo do botão
   */
  children?: ReactNode;
  /**
   * Variante visual do botão
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost';
  /**
   * Tamanho do botão
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Ícone à esquerda do texto
   */
  leftIcon?: ReactNode;
  /**
   * Ícone à direita do texto
   */
  rightIcon?: ReactNode;
  /**
   * Se true, renderiza apenas o ícone (botão icon-only)
   * Requer que leftIcon ou rightIcon seja fornecido
   */
  iconOnly?: boolean;
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

/**
 * Button
 * 
 * Componente de botão acessível que utiliza React Aria para garantir
 * suporte completo a acessibilidade, incluindo navegação por teclado,
 * estados de foco e atributos ARIA apropriados.
 * 
 * Baseado na referência:
 * - Primary: Fundo azul (#007BFF), texto branco
 * - Secondary: Fundo cinza (#6B7280), texto branco
 * - Suporte a ícones à esquerda, direita ou icon-only
 * 
 * @example
 * ```tsx
 * <Button onPress={() => console.log('Clicked')}>
 *   Clique aqui
 * </Button>
 * ```
 * 
 * @example
 * ```tsx
 * <Button leftIcon={<PlusIcon />}>
 *   Adicionar
 * </Button>
 * ```
 * 
 * @example
 * ```tsx
 * <Button iconOnly rightIcon={<PlusIcon />} aria-label="Adicionar" />
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    leftIcon,
    rightIcon,
    iconOnly = false,
    ...props 
  }, forwardedRef) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const ref = forwardedRef || internalRef;

    const { buttonProps, isPressed } = useButton(props, ref as React.RefObject<HTMLButtonElement>);

    // Determinar qual ícone usar para icon-only
    const icon = iconOnly ? (leftIcon || rightIcon) : null;

    // Usar cva para gerar classes baseadas nas variantes
    const baseButtonClasses = buttonVariants({
      variant,
      size,
    });

    // Aplicar classes específicas para icon-only se necessário
    const iconOnlyClasses = iconOnly ? buttonIconOnlyVariants({ size }) : '';

    const buttonClasses = cn(baseButtonClasses, iconOnlyClasses);

    return (
      <button
        {...buttonProps}
        ref={ref}
        className={cn(buttonClasses, props.className)}
        data-variant={variant}
        data-size={size}
        data-pressed={isPressed ? '' : undefined}
        aria-label={iconOnly && !children ? props['aria-label'] : undefined}
      >
        {iconOnly ? (
          <span className={iconSizeClasses[size]}>{icon}</span>
        ) : (
          <>
            {leftIcon && (
              <span className={cn(iconSizeClasses[size], children && 'mr-1.5')}>
                {leftIcon}
              </span>
            )}
            {children && <span>{children}</span>}
            {rightIcon && (
              <span className={cn(iconSizeClasses[size], children && 'ml-1.5')}>
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
