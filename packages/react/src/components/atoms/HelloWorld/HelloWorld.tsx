/**
 * HelloWorld - Componente de validação para @ciberso/react
 * Componente simples usado para validar a configuração do pacote
 */

import type { ReactNode } from 'react';

export interface HelloWorldProps {
  /**
   * Nome a ser exibido na mensagem
   * @default "World"
   */
  name?: string;
  /**
   * Conteúdo adicional opcional
   */
  children?: ReactNode;
}

/**
 * HelloWorld
 * 
 * Componente funcional simples usado para validar que o pacote
 * @ciberso/react está configurado corretamente e pode ser compilado.
 * 
 * @example
 * ```tsx
 * <HelloWorld name="Ciberso" />
 * ```
 */
export function HelloWorld({ name = 'World', children }: HelloWorldProps) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {children && <div>{children}</div>}
    </div>
  );
}

