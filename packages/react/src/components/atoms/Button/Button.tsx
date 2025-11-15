/**
 * Button - Componente de botão acessível do Ciberso-UI
 * Utiliza React Aria para garantir acessibilidade completa
 * 
 * Estilização gerenciada via Class Variance Authority (cva) para type-safe variants
 * Animações com Framer Motion usando tokens de animação do @ciberso/tokens
 * Utiliza tokens do tema Ciberso-UI para cores e espaçamentos
 */

import { useButton, useFocusRing, type AriaButtonProps } from 'react-aria';
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
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  /**
   * Tamanho do botão
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
 * Utiliza tokens do tema Ciberso-UI:
 * - Primary: bg-primary, text-primary-foreground
 * - Secondary: bg-secondary, text-secondary-foreground
 * - Ghost: bg-transparent, text-foreground
 * - Outline: border-input, text-foreground
 * - Danger: bg-destructive, text-destructive-foreground
 * 
 * Suporte a ícones à esquerda, direita ou icon-only.
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
    const { isFocusVisible, focusProps } = useFocusRing();

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
    
    // Mesclar focusProps com buttonProps para garantir focus ring correto
    const mergedFocusProps = {
      onFocus: (e: React.FocusEvent<HTMLButtonElement>) => {
        focusProps.onFocus?.(e);
        onFocus?.(e);
      },
      onBlur: (e: React.FocusEvent<HTMLButtonElement>) => {
        focusProps.onBlur?.(e);
        onBlur?.(e);
      },
    };

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
        {...mergedFocusProps}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
        data-variant={variant}
        data-size={size}
        data-pressed={isPressed ? '' : undefined}
        data-focus-visible={isFocusVisible ? '' : undefined}
        whileTap={{
          scale: 0.90,
          transition: {
            duration: fastDuration,
            ease: [0.4, 0, 1, 1], // easeIn como array de números
          },
        }}
      >
        {iconOnly ? (
          <span className={cn(iconSizeClasses[size], 'text-current', 'flex items-center justify-center')}>
            {icon}
          </span>
        ) : (
          <>
            {leftIcon && (
              <span className={cn(iconSizeClasses[size], 'text-current', 'flex items-center justify-center', 'shrink-0', children && 'mr-1.5')}>
                {leftIcon}
              </span>
            )}
            {children && <span className="flex items-center">{children}</span>}
            {rightIcon && (
              <span className={cn(iconSizeClasses[size], 'text-current', 'flex items-center justify-center', 'shrink-0', children && 'ml-1.5')}>
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
