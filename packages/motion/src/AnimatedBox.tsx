/**
 * AnimatedBox - Componente de exemplo para validação do MotionProvider
 * Demonstra uma animação básica usando Framer Motion
 */

import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

export interface AnimatedBoxProps extends HTMLMotionProps<'div'> {
  /**
   * Conteúdo do box
   */
  children?: ReactNode;
  /**
   * Se deve aplicar animação de hover
   */
  animateOnHover?: boolean;
}

/**
 * AnimatedBox
 * 
 * Componente de exemplo que demonstra animações básicas do Framer Motion.
 * Usado para validar que o MotionProvider está configurado corretamente.
 * 
 * @example
 * ```tsx
 * <MotionProvider>
 *   <AnimatedBox animateOnHover>
 *     Conteúdo animado
 *   </AnimatedBox>
 * </MotionProvider>
 * ```
 */
export function AnimatedBox({
  children,
  animateOnHover = true,
  ...props
}: AnimatedBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={
        animateOnHover
          ? {
              scale: 1.05,
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
              transition: { duration: 0.2 },
            }
          : undefined
      }
      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

