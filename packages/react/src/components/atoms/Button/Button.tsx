/**
 * Button - Componente de botão acessível do Ciberso-UI
 * Utiliza React Aria para garantir acessibilidade completa
 * Baseado na referência: Primary (azul), Secondary (cinza), com suporte a ícones
 */

import { useButton, type AriaButtonProps } from 'react-aria';
import { forwardRef, useRef } from 'react';
import type { ReactNode } from 'react';

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

    // Classes baseadas na referência
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md';
    
    const variantClasses = {
      primary: 'bg-[#007BFF] text-white hover:bg-[#0066CC] active:bg-[#005299] focus-visible:ring-[#007BFF]',
      secondary: 'bg-[#6B7280] text-white hover:bg-[#4B5563] active:bg-[#374151] focus-visible:ring-[#6B7280]',
      ghost: 'bg-transparent text-[#111827] hover:bg-[#F3F4F6] active:bg-[#E5E7EB] focus-visible:ring-[#007BFF]',
    };

    const sizeClasses = {
      sm: iconOnly ? 'h-9 w-9' : 'h-9 px-3 text-sm',
      md: iconOnly ? 'h-10 w-10' : 'h-10 px-4 text-sm',
      lg: iconOnly ? 'h-11 w-11' : 'h-11 px-6 text-base',
    };

    const iconSizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const gapClasses = {
      sm: 'gap-1.5',
      md: 'gap-2',
      lg: 'gap-2.5',
    };

    return (
      <button
        {...buttonProps}
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
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
              <span className={`${iconSizeClasses[size]} ${children ? 'mr-1.5' : ''}`}>
                {leftIcon}
              </span>
            )}
            {children && <span>{children}</span>}
            {rightIcon && (
              <span className={`${iconSizeClasses[size]} ${children ? 'ml-1.5' : ''}`}>
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
