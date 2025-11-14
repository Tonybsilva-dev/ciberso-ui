/**
 * Alert - Componente de alerta do Ciberso-UI
 * Utiliza tokens de cor para garantir consistência visual
 * 
 * Estilização gerenciada via Class Variance Authority (cva) para type-safe variants
 * Suporta ícones dinâmicos e botão de fechar opcional
 */

import { forwardRef, useRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { useButton, type AriaButtonProps } from 'react-aria';
import { alertVariants, alertIconVariants, alertCloseButtonVariants } from './Alert.variants';
import { cn } from '../../../utils/cn';
import { Info, CheckCircle, Warning, Error as ErrorIcon, Close } from '@ciberso/icons';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Conteúdo do alerta
   */
  children: ReactNode;
  /**
   * Variante visual do alerta (status)
   * @default 'info'
   */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /**
   * Título do alerta (opcional)
   */
  title?: ReactNode;
  /**
   * Se true, exibe um botão de fechar
   * @default false
   */
  isDismissible?: boolean;
  /**
   * Callback chamado quando o botão de fechar é clicado
   */
  onDismiss?: () => void;
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

/**
 * Mapeamento de variantes para ícones
 */
const variantIcons = {
  info: Info,
  success: CheckCircle,
  warning: Warning,
  error: ErrorIcon,
} as const;

/**
 * Alert
 * 
 * Componente de alerta para exibir mensagens importantes com variantes de status.
 * Suporta ícones dinâmicos baseados na variante e botão de fechar opcional.
 * 
 * Segue a mesma identidade visual do Badge, mas com estilo de alerta:
 * - Fundo colorido claro
 * - Texto na cor do status
 * - Borda sutil na cor do status
 * - Padding maior para melhor legibilidade
 * 
 * @example
 * ```tsx
 * <Alert variant="success" title="Sucesso!">
 *   Operação realizada com sucesso.
 * </Alert>
 * ```
 * 
 * @example
 * ```tsx
 * <Alert 
 *   variant="error" 
 *   isDismissible 
 *   onDismiss={() => console.log('Dismissed')}
 * >
 *   Ocorreu um erro ao processar sua solicitação.
 * </Alert>
 * ```
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      variant = 'info',
      title,
      isDismissible = false,
      onDismiss,
      className,
      ...props
    },
    ref,
  ) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    
    // React Aria para o botão de fechar
    const { buttonProps } = useButton(
      {
        onPress: onDismiss,
        'aria-label': 'Fechar alerta',
      },
      closeButtonRef,
    );

    const IconComponent = variantIcons[variant];
    const alertClasses = alertVariants({ variant });
    const iconClasses = alertIconVariants({ variant });
    const closeButtonClasses = alertCloseButtonVariants({ variant });

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertClasses, className)}
        data-variant={variant}
        {...props}
      >
        {/* Ícone do status */}
        <IconComponent className={cn(iconClasses, 'w-5 h-5 mt-0.5')} aria-hidden="true" />

        {/* Conteúdo do alerta */}
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-semibold mb-1" data-alert-title>
              {title}
            </div>
          )}
          <div className="text-sm" data-alert-content>
            {children}
          </div>
        </div>

        {/* Botão de fechar (opcional) */}
        {isDismissible && onDismiss && (
          <button
            {...buttonProps}
            ref={closeButtonRef}
            type="button"
            className={closeButtonClasses}
            aria-label="Fechar alerta"
          >
            <Close className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';

