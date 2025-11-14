/**
 * Card - Componente de card do Ciberso-UI
 * Componente composicional com sub-componentes para estrutura flexível
 *
 * Utiliza tokens de design para bordas, sombras e espaçamento
 * Estilização Ciberso com efeitos neon e animações
 */

import { forwardRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { animations } from '@ciberso/tokens';
import { cn } from '../../../utils/cn';

/**
 * Card - Componente contêiner principal
 *
 * Renderiza um card com identidade visual consistente: fundo branco, bordas cinzas, sombras sutis.
 * Segue o mesmo padrão visual dos componentes Button, Input e Badge.
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
export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: ReactNode;
  /**
   * Se true, aplica animações de hover e tap
   * @default false
   */
  isAnimated?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, isAnimated = false, ...props }, ref) => {
    // Converter duração de string (ex: '150ms') para número (ex: 0.15)
    const parseDuration = (duration: string): number => {
      const match = duration.match(/(\d+)ms/);
      return match && match[1] ? parseInt(match[1], 10) / 1000 : 0.3;
    };

    const fastDurationValue: string = animations.duration.fast ?? '150ms';
    const fastDuration = parseDuration(fastDurationValue);

    // Animações condicionais baseadas em isAnimated
    const hoverAnimation = isAnimated
      ? {
        y: -4,
        scale: 1.01,
        transition: {
          duration: fastDuration,
          ease: [0, 0, 0.2, 1], // easeOut
        },
      }
      : undefined;

    const tapAnimation = isAnimated
      ? {
        scale: 0.98,
        transition: {
          duration: fastDuration,
          ease: [0.4, 0, 1, 1], // easeIn
        },
      }
      : undefined;

    // Estilos base consistentes com outros componentes (Button, Input, Badge)
    // Fundo branco, borda cinza, sombra sutil - seguindo identidade visual da referência
    const baseCardClasses = cn(
      'rounded-lg',
      'bg-white', // Fundo branco como Input e Badge
      'border border-[#E5E7EB]', // Borda cinza como Input (gray-200)
      'shadow-sm', // Sombra sutil como na referência
      'transition-shadow', // Transição suave para hover
      'hover:shadow-md', // Elevação sutil no hover
      className
    );

    // Se não animado, usar div normal em vez de motion.div
    if (!isAnimated) {
      return (
        <div
          ref={ref}
          className={baseCardClasses}
          {...(props as HTMLAttributes<HTMLDivElement>)}
        >
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={baseCardClasses}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

Card.displayName = 'Card';

/**
 * CardHeader - Cabeçalho do card
 *
 * Renderiza uma seção de cabeçalho com padding e borda inferior cinza.
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
          'px-6 py-4 border-b border-[#E5E7EB]', // Borda cinza consistente com Input (gray-200)
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
 * Renderiza uma seção de rodapé com padding e borda superior cinza.
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
          'px-6 py-4 border-t border-[#E5E7EB]', // Borda cinza consistente com Input (gray-200)
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

