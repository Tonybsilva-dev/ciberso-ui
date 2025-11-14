/**
 * GsapAnimatedBox - Componente de exemplo para teste de integração do useGsapTimeline
 * 
 * Demonstra o uso do hook useGsapTimeline para animar propriedades CSS
 * como opacity e transform, validando que a animação é aplicada corretamente.
 */

import { useRef, useEffect } from 'react';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import type { HTMLAttributes } from 'react';

export interface GsapAnimatedBoxProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Se true, a animação será executada automaticamente ao montar
   * @default true
   */
  autoPlay?: boolean;
  /**
   * Duração da animação em segundos
   * @default 1
   */
  duration?: number;
}

/**
 * GsapAnimatedBox
 * 
 * Componente de exemplo que usa useGsapTimeline para animar opacity e transform.
 * Usado para testes de integração e validação do hook.
 * 
 * @example
 * ```tsx
 * <GsapAnimatedBox autoPlay duration={1}>
 *   Conteúdo animado
 * </GsapAnimatedBox>
 * ```
 */
export function GsapAnimatedBox({
  autoPlay = true,
  duration = 1,
  children,
  style,
  ...props
}: GsapAnimatedBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  const { play } = useGsapTimeline(
    boxRef,
    {
      paused: !autoPlay,
      duration,
    },
    (tl) => {
      if (boxRef.current) {
        // Animação de fade in e slide up
        tl.fromTo(
          boxRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration,
            ease: 'power2.out',
          },
        );
      }
    },
  );

  // Se autoPlay for false, não fazer nada
  // Se autoPlay for true, a timeline já inicia automaticamente (paused: false)

  return (
    <div
      ref={boxRef}
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

