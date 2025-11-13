/**
 * Button - Componente de botão acessível do Ciberso-UI
 * Utiliza React Aria para garantir acessibilidade completa
 */

import { useButton, type AriaButtonProps } from 'react-aria';
import { forwardRef, useRef } from 'react';
import type { ReactNode } from 'react';

export interface ButtonProps extends AriaButtonProps {
  /**
   * Conteúdo do botão
   */
  children: ReactNode;
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
}

/**
 * Button
 * 
 * Componente de botão acessível que utiliza React Aria para garantir
 * suporte completo a acessibilidade, incluindo navegação por teclado,
 * estados de foco e atributos ARIA apropriados.
 * 
 * @example
 * ```tsx
 * <Button onPress={() => console.log('Clicked')}>
 *   Clique aqui
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const ref = forwardedRef || internalRef;

    const { buttonProps, isPressed } = useButton(props, ref as React.RefObject<HTMLButtonElement>);

    return (
      <button
        {...buttonProps}
        ref={ref}
        data-variant={variant}
        data-size={size}
        data-pressed={isPressed}
        className="ciberso-button"
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

