/**
 * Label - Componente de label acessível do Ciberso-UI
 * Utiliza React Aria para garantir acessibilidade completa
 * Baseado na referência: Texto escuro (#111827), asterisco vermelho para obrigatório
 */

import { useLabel } from 'react-aria';
import { forwardRef, useRef } from 'react';
import type { ReactNode, LabelHTMLAttributes } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Conteúdo do label
   */
  children: ReactNode;
  /**
   * Label text (para uso com useLabel)
   */
  label?: ReactNode;
  /**
   * Tamanho do label
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Se o campo associado é obrigatório
   * @default false
   */
  isRequired?: boolean;
  /**
   * Elemento HTML usado para renderizar o label
   * @default 'label'
   */
  elementType?: 'label' | 'span';
}

/**
 * Label
 * 
 * Componente de label acessível que utiliza React Aria para garantir
 * associação correta com campos de formulário, incluindo navegação por teclado
 * e atributos ARIA apropriados.
 * 
 * Baseado na referência:
 * - Texto: cinza escuro/preto (#111827)
 * - Font weight: medium (500)
 * - Asterisco obrigatório: vermelho (#FF4444)
 * 
 * @example
 * ```tsx
 * <Label htmlFor="email" isRequired>Email</Label>
 * <Input id="email" />
 * ```
 * 
 * @example
 * ```tsx
 * // Com useLabel para associação automática
 * <Label>Nome</Label>
 * <Input />
 * ```
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, size = 'md', isRequired = false, elementType = 'label', ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLLabelElement>(null);
    const ref = forwardedRef || internalRef;

    const { labelProps } = useLabel(props);

    const Element = elementType;

    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    return (
      <Element
        {...labelProps}
        ref={elementType === 'label' ? (ref as React.RefObject<HTMLLabelElement>) : undefined}
        className={`font-medium text-[#111827] ${sizeClasses[size]}`}
        data-size={size}
        data-required={isRequired}
      >
        {children}
        {isRequired && (
          <span 
            aria-label="obrigatório" 
            className="text-[#FF4444] ml-0.5"
          >
            *
          </span>
        )}
      </Element>
    );
  }
);

Label.displayName = 'Label';

/**
 * Hook helper para obter fieldProps quando usando Label separadamente
 * Útil para casos onde você precisa aplicar fieldProps manualmente
 */
export function useLabelFieldProps(props: { label?: ReactNode; id?: string }): {
  id?: string;
  'aria-labelledby'?: string;
  'aria-label'?: string;
} {
  const { fieldProps } = useLabel(props);
  return fieldProps;
}
