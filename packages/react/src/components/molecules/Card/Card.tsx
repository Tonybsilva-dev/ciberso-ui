/**
 * Card - Componente de card do Ciberso-UI
 * Componente composicional com sub-componentes para estrutura flexível
 *
 * Utiliza tokens de design para bordas, sombras e espaçamento
 * Estilização Ciberso com efeitos neon e animações
 */

import { forwardRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { animations } from '@ciberso/tokens';
import { cn } from '../../../utils/cn';

/**
 * Card - Componente contêiner principal
 *
 * Renderiza um card com estilo Ciberso: fundo escuro, bordas neon, sombras e animações.
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
    // Converter duração de string (ex: '150ms') para número (ex: 0.15)
    const parseDuration = (duration: string): number => {
      const match = duration.match(/(\d+)ms/);
      return match && match[1] ? parseInt(match[1], 10) / 1000 : 0.3;
    };

    const fastDurationValue: string = animations.duration.fast ?? '150ms';
    const fastDuration = parseDuration(fastDurationValue);

    return (
      <motion.div
        ref={ref}
        className={cn(
          // Estilos base Ciberso
          'rounded-lg',
          'bg-[#0A192F]', // darkBlue[500] - fundo escuro
          'border border-[#00F6FF]/30', // ciano neon com opacidade
          'shadow-lg shadow-[#00F6FF]/10', // sombra com brilho neon
          // Efeito de brilho neon na borda
          'relative',
          'before:absolute before:inset-0 before:rounded-lg',
          'before:bg-gradient-to-r before:from-[#00F6FF]/20 before:via-transparent before:to-[#007BFF]/20',
          'before:opacity-0 before:transition-opacity before:duration-300',
          'hover:before:opacity-100',
          // Borda interna para efeito neon
          'after:absolute after:inset-[1px] after:rounded-lg',
          'after:bg-[#0A192F] after:pointer-events-none',
          className
        )}
        whileHover={{
          y: -4,
          scale: 1.01,
          transition: {
            duration: fastDuration,
            ease: [0, 0, 0.2, 1], // easeOut
          },
        }}
        whileTap={{
          scale: 0.98,
          transition: {
            duration: fastDuration,
            ease: [0.4, 0, 1, 1], // easeIn
          },
        }}
        {...props}
      >
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  },
);

Card.displayName = 'Card';

/**
 * CardHeader - Cabeçalho do card
 *
 * Renderiza uma seção de cabeçalho com padding e borda inferior com efeito neon.
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
          'px-6 py-4 border-b border-[#00F6FF]/20', // borda neon sutil
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
 * Renderiza uma seção de rodapé com padding e borda superior com efeito neon.
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
          'px-6 py-4 border-t border-[#00F6FF]/20', // borda neon sutil
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

