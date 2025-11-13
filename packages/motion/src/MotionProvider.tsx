/**
 * MotionProvider para Ciberso-UI
 * Configura Framer Motion com LazyMotion para otimização de bundle
 */

import { LazyMotion, domAnimation } from 'framer-motion';
import type { ReactNode } from 'react';

export interface MotionProviderProps {
  /**
   * Conteúdo a ser envolvido pelo provider
   */
  children: ReactNode;
  /**
   * Features de animação a serem carregadas
   * Por padrão usa `domAnimation` para otimização
   */
  features?: typeof domAnimation;
  /**
   * Se deve carregar features de forma estrita
   */
  strict?: boolean;
}

/**
 * MotionProvider
 * 
 * Provider que configura Framer Motion com LazyMotion para reduzir
 * o tamanho do bundle carregando apenas as features necessárias.
 * 
 * @example
 * ```tsx
 * <MotionProvider>
 *   <App />
 * </MotionProvider>
 * ```
 */
export function MotionProvider({
  children,
  features = domAnimation,
  strict = false,
}: MotionProviderProps) {
  return (
    <LazyMotion features={features} strict={strict}>
      {children}
    </LazyMotion>
  );
}

