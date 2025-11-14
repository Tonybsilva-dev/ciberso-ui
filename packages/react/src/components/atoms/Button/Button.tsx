/**
 * Button - Componente de botão acessível do Ciberso-UI
 * Utiliza React Aria para garantir acessibilidade completa
 * Baseado na referência: Primary (azul), Secondary (cinza), com suporte a ícones
 * 
 * Estilização gerenciada via Class Variance Authority (cva) para type-safe variants
 * Animações com Framer Motion usando tokens de animação do @ciberso/tokens
 */

import { useButton, type AriaButtonProps } from 'react-aria';
import { forwardRef, useRef } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { buttonVariants, buttonIconOnlyVariants, iconSizeClasses } from './Button.variants';
import { animations } from '@ciberso/tokens';
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

    // Animações usando tokens de animação do @ciberso/tokens
    // Converter durações de string (ex: '150ms') para número (ex: 0.15)
    const parseDuration = (duration: string): number => {
      const match = duration.match(/(\d+)ms/);
      return match && match[1] ? parseInt(match[1], 10) / 1000 : 0.3;
    };

    // Animações para hover, tap e focus usando tokens
    // Framer Motion aceita cubic-bezier como string diretamente
    // Garantir que fastDuration seja sempre uma string válida
    const fastDurationValue: string = animations.duration.fast ?? '150ms';
    const fastDuration = parseDuration(fastDurationValue);

    // Extrair apenas as props necessárias do buttonProps para evitar conflitos de tipo
    const {
      id,
      className: buttonPropsClassName,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-pressed': ariaPressed,
      'aria-disabled': ariaDisabled,
      tabIndex,
      disabled,
      onClick,
      onKeyDown,
      onKeyUp,
      onFocus,
      onBlur,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
      onMouseLeave,
    } = buttonProps as React.ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <motion.button
        id={id}
        className={cn(buttonClasses, buttonPropsClassName, props.className)}
        aria-label={iconOnly && !children ? props['aria-label'] || ariaLabel : ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-pressed={ariaPressed}
        aria-disabled={ariaDisabled}
        tabIndex={tabIndex}
        disabled={disabled}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
        data-variant={variant}
        data-size={size}
        data-pressed={isPressed ? '' : undefined}
        whileHover={{
          scale: 1.02,
          transition: {
            duration: fastDuration,
            ease: [0, 0, 0.2, 1], // easeOut como array de números
          },
        }}
        whileTap={{
          scale: 0.85,
          transition: {
            duration: fastDuration,
            ease: [0.4, 0, 1, 1], // easeIn como array de números
          },
        }}
        whileFocus={{
          scale: 1.01,
          transition: {
            duration: fastDuration,
            ease: [0, 0, 0.2, 1], // easeOut como array de números
          },
        }}
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
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
