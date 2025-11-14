/**
 * Card - Componente de card do Ciberso-UI
 * Componente composicional com sub-componentes para estrutura flexível
 *
 * Utiliza tokens de design para bordas, sombras e espaçamento
 */

import { forwardRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Card - Componente contêiner principal
 *
 * Renderiza um card com borda, sombra e arredondamento de cantos.
 * Pode ser composto com CardHeader, CardBody e CardFooter.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>Título</CardHeader>
 *   <CardBody>Conteúdo</CardBody>
 *   <CardFooter>Ações</CardFooter>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-[#E5E7EB] bg-white shadow-sm',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

/**
 * CardHeader - Cabeçalho do card
 *
 * Renderiza uma seção de cabeçalho com padding e borda inferior opcional.
 *
 * @example
 * ```tsx
 * <CardHeader>Título do Card</CardHeader>
 * ```
 */
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-6 py-4 border-b border-[#E5E7EB]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardHeader.displayName = 'CardHeader';

/**
 * CardBody - Corpo do card
 *
 * Renderiza a seção principal de conteúdo com padding.
 *
 * @example
 * ```tsx
 * <CardBody>
 *   <p>Conteúdo principal do card</p>
 * </CardBody>
 * ```
 */
export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-6 py-4',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardBody.displayName = 'CardBody';

/**
 * CardFooter - Rodapé do card
 *
 * Renderiza uma seção de rodapé com padding e borda superior opcional.
 *
 * @example
 * ```tsx
 * <CardFooter>
 *   <Button>Salvar</Button>
 * </CardFooter>
 * ```
 */
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-6 py-4 border-t border-[#E5E7EB]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardFooter.displayName = 'CardFooter';

