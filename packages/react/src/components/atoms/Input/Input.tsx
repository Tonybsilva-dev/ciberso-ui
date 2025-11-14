/**
 * Input - Componente de campo de texto acessível do Ciberso-UI
 * Utiliza React Aria para garantir acessibilidade completa
 * Baseado na referência: Borda cinza, foco azul, placeholder cinza
 */

import { useTextField, type AriaTextFieldProps } from 'react-aria';
import { forwardRef, useRef } from 'react';
import type { ReactNode } from 'react';

export interface InputProps extends AriaTextFieldProps {
  /**
   * Label do campo de texto
   */
  label?: ReactNode;
  /**
   * Descrição ou hint do campo
   */
  description?: ReactNode;
  /**
   * Mensagem de erro
   */
  errorMessage?: ReactNode | ((validation: { isInvalid: boolean; validationErrors: string[] }) => ReactNode);
  /**
   * Tamanho do input
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Input
 * 
 * Componente de campo de texto acessível que utiliza React Aria para garantir
 * suporte completo a acessibilidade, incluindo navegação por teclado,
 * estados de foco, validação e atributos ARIA apropriados.
 * 
 * Baseado na referência:
 * - Borda padrão: cinza (#9CA3AF)
 * - Borda foco: azul (#007BFF)
 * - Borda erro: vermelho (#FF4444)
 * - Background: branco (#FFFFFF)
 * - Placeholder: cinza (#9CA3AF)
 * - Texto: preto/cinza escuro (#111827)
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="seu@email.com"
 *   type="email"
 *   isRequired
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, description, errorMessage, size = 'md', ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const ref = forwardedRef || internalRef;

    const {
      labelProps,
      inputProps,
      descriptionProps,
      errorMessageProps,
      isInvalid,
      validationErrors,
    } = useTextField(props, ref as React.RefObject<HTMLInputElement>);

    // Classes baseadas na referência
    const baseInputClasses = 'w-full rounded-md border bg-white text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F3F4F6]';
    
    const borderClasses = isInvalid
      ? 'border-[#FF4444] focus-visible:border-[#FF4444] focus-visible:ring-[#FF4444]'
      : 'border-[#9CA3AF] focus-visible:border-[#007BFF] focus-visible:ring-[#007BFF]';

    const sizeClasses = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-3 text-base',
      lg: 'h-11 px-4 text-lg',
    };

    const labelSizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    return (
      <div className="flex flex-col gap-1.5" data-size={size}>
        {label && (
          <label 
            {...labelProps} 
            className={`font-medium text-[#111827] ${labelSizeClasses[size]}`}
          >
            {label}
            {props.isRequired && (
              <span aria-label="obrigatório" className="text-[#FF4444] ml-0.5">*</span>
            )}
          </label>
        )}
        <input
          {...inputProps}
          ref={ref}
          className={`${baseInputClasses} ${borderClasses} ${sizeClasses[size]} placeholder:text-[#9CA3AF]`}
          placeholder={props.placeholder || 'Enter a value'}
          data-invalid={isInvalid ? '' : undefined}
          aria-invalid={isInvalid}
        />
        {description && !isInvalid && (
          <div 
            {...descriptionProps} 
            className="text-sm text-[#6B7280]"
          >
            {description}
          </div>
        )}
        {isInvalid && (
          <div 
            {...errorMessageProps} 
            className="text-sm text-[#FF4444]" 
            role="alert"
          >
            {typeof errorMessage === 'function'
              ? errorMessage({ isInvalid, validationErrors })
              : errorMessage || validationErrors.join(' ')}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
