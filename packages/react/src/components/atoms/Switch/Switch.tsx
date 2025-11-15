/**
 * Switch - Componente de switch/toggle acessível do Ciberso-UI
 * Utiliza React Aria para garantir acessibilidade completa
 * 
 * Estilização gerenciada via Class Variance Authority (cva) para type-safe variants
 * Animações com Framer Motion usando tokens de animação do @ciberso/tokens
 */

import { useSwitch, useFocusRing, type AriaSwitchProps } from 'react-aria';
import { useToggleState } from 'react-stately';
import { forwardRef, useRef } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { switchVariants, switchTrackVariants, switchThumbVariants } from './Switch.variants';
import { animations } from '@ciberso/tokens';
import { cn } from '../../../utils/cn';

export interface SwitchProps extends Omit<AriaSwitchProps, 'children'> {
  /**
   * Label do switch (opcional, pode ser passado como children)
   */
  children?: ReactNode;
  /**
   * Tamanho do switch
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

/**
 * Switch
 * 
 * Componente de switch/toggle acessível que utiliza React Aria para garantir
 * suporte completo a acessibilidade, incluindo navegação por teclado,
 * estados de foco e atributos ARIA apropriados.
 * 
 * @example
 * ```tsx
 * <Switch isSelected={isEnabled} onChange={setIsEnabled}>
 *   Habilitar notificações
 * </Switch>
 * ```
 * 
 * @example
 * ```tsx
 * <Switch isSelected={isEnabled} onChange={setIsEnabled} size="sm" />
 * ```
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ children, size = 'md', className, ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const ref = forwardedRef || internalRef;

    const state = useToggleState(props);
    const { inputProps, isSelected, isDisabled, isPressed } = useSwitch(
      { ...props, children },
      state,
      ref as React.RefObject<HTMLInputElement>
    );

    const { isFocusVisible, focusProps } = useFocusRing();

    // Converter duração de string (ex: '150ms') para número (ex: 0.15)
    const parseDuration = (duration: string): number => {
      const match = duration.match(/(\d+)ms/);
      return match && match[1] ? parseInt(match[1], 10) / 1000 : 0.3;
    };

    const fastDurationValue: string = animations.duration.fast ?? '150ms';
    const fastDuration = parseDuration(fastDurationValue);

    const containerClasses = cn(
      switchVariants({ size }),
      isFocusVisible && 'focus-visible:ring-primary',
      className
    );

    const trackClasses = switchTrackVariants({
      checked: isSelected,
      size,
    });

    const thumbClasses = switchThumbVariants({
      checked: isSelected,
      size,
    });

    return (
      <label className={cn('inline-flex items-center gap-2 cursor-pointer', isDisabled && 'cursor-not-allowed')}>
        <span
          className={containerClasses}
          data-size={size}
          data-selected={isSelected ? '' : undefined}
          data-pressed={isPressed ? '' : undefined}
          data-focus-visible={isFocusVisible ? '' : undefined}
        >
          <input
            {...inputProps}
            {...focusProps}
            ref={ref}
            type="checkbox"
            className="sr-only"
            aria-checked={isSelected}
            aria-pressed={isPressed}
          />
          <motion.span
            className={trackClasses}
            animate={{
              backgroundColor: isSelected
                ? 'oklch(var(--primary))'
                : 'oklch(var(--input))',
              opacity: isPressed ? 0.8 : 1,
            }}
            transition={{
              duration: fastDuration,
              ease: [0.4, 0, 0.2, 1], // easeOut
            }}
          >
            <motion.span
              className={thumbClasses}
              animate={{
                x: isSelected
                  ? size === 'sm'
                    ? 16 // 4 * 4px (translate-x-4)
                    : size === 'md'
                    ? 20 // 5 * 4px (translate-x-5)
                    : 28 // 7 * 4px (translate-x-7)
                  : 2, // left-0.5 = 2px
                scale: isPressed ? 0.95 : 1,
              }}
              transition={{
                duration: fastDuration,
                ease: [0.4, 0, 0.2, 1], // easeOut
              }}
            />
          </motion.span>
        </span>
        {children && (
          <span className={cn('text-sm text-foreground', isDisabled && 'opacity-50')}>
            {children}
          </span>
        )}
      </label>
    );
  },
);

Switch.displayName = 'Switch';

