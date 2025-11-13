/**
 * Input - Componente de campo de texto acessível do Ciberso-UI
 * Utiliza React Aria para garantir acessibilidade completa
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

    return (
      <div className="ciberso-input-group" data-size={size}>
        {label && (
          <label {...labelProps} className="ciberso-label">
            {label}
            {props.isRequired && <span aria-label="obrigatório"> *</span>}
          </label>
        )}
        <input
          {...inputProps}
          ref={ref}
          className="ciberso-input"
          data-invalid={isInvalid}
          aria-invalid={isInvalid}
        />
        {description && !isInvalid && (
          <div {...descriptionProps} className="ciberso-input-description">
            {description}
          </div>
        )}
        {isInvalid && (
          <div {...errorMessageProps} className="ciberso-input-error" role="alert">
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

