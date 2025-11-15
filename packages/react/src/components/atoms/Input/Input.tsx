/**
 * Input - Componente de campo de texto acessível do Ciberso-UI
 * Utiliza React Aria para garantir acessibilidade completa
 * 
 * Estilização gerenciada via Class Variance Authority (cva) para type-safe variants
 * Utiliza tokens do tema Ciberso-UI para cores e espaçamentos
 */

import { useTextField, type AriaTextFieldProps } from 'react-aria';
import { forwardRef, useRef } from 'react';
import type { ReactNode } from 'react';
import { inputVariants, inputLabelVariants } from './Input.variants';
import { cn } from '../../../utils/cn';

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
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

/**
 * Input
 * 
 * Componente de campo de texto acessível que utiliza React Aria para garantir
 * suporte completo a acessibilidade, incluindo navegação por teclado,
 * estados de foco, validação e atributos ARIA apropriados.
 * 
 * Utiliza tokens do tema Ciberso-UI:
 * - Borda padrão: border-input
 * - Borda foco: border-ring
 * - Borda erro: border-destructive
 * - Background: bg-background
 * - Placeholder: text-muted-foreground
 * - Texto: text-foreground
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

    // Usar cva para gerar classes baseadas nas variantes
    const inputClasses = inputVariants({
      state: isInvalid ? 'invalid' : 'default',
      size,
    });

    const labelClasses = inputLabelVariants({ size });

    return (
      <div className="flex flex-col gap-1.5" data-size={size}>
        {label && (
          <label 
            {...labelProps} 
            className={labelClasses}
          >
            {label}
            {props.isRequired && (
              <span aria-label="obrigatório" className="text-destructive ml-0.5">*</span>
            )}
          </label>
        )}
        <input
          {...inputProps}
          ref={ref}
          className={cn(inputClasses, props.className)}
          placeholder={props.placeholder}
          data-invalid={isInvalid ? '' : undefined}
          aria-invalid={isInvalid}
        />
        {description && !isInvalid && (
          <div 
            {...descriptionProps} 
            className="text-sm text-muted-foreground"
          >
            {description}
          </div>
        )}
        {isInvalid && (
          <div 
            {...errorMessageProps} 
            className="text-sm text-destructive" 
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
