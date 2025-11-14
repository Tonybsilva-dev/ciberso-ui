/**
 * useGsapTimeline - Hook customizado para animações GSAP
 * 
 * Abstrai a criação e controle de timelines de animação do GSAP,
 * facilitando o uso em componentes React com gerenciamento automático
 * do ciclo de vida e limpeza para evitar memory leaks.
 */

import { useEffect, useRef, useCallback, type RefObject } from 'react';
import { gsap } from 'gsap';

/**
 * Opções para configuração da timeline GSAP
 */
export interface UseGsapTimelineOptions {
  /**
   * Se true, a timeline será pausada após a criação
   * @default false
   */
  paused?: boolean;
  /**
   * Se true, a timeline será repetida infinitamente
   * @default false
   */
  repeat?: boolean;
  /**
   * Número de repetições (se repeat não for infinito)
   * @default 0
   */
  repeatDelay?: number;
  /**
   * Se true, a timeline será revertida ao finalizar
   * @default false
   */
  yoyo?: boolean;
  /**
   * Delay antes de iniciar a animação (em segundos)
   * @default 0
   */
  delay?: number;
  /**
   * Duração total da timeline (em segundos)
   * Se não especificado, será calculada automaticamente
   */
  duration?: number;
}

/**
 * Controles retornados pelo hook useGsapTimeline
 */
export interface UseGsapTimelineReturn {
  /**
   * Instância da timeline GSAP
   */
  timeline: gsap.core.Timeline | null;
  /**
   * Iniciar a animação
   */
  play: () => void;
  /**
   * Pausar a animação
   */
  pause: () => void;
  /**
   * Reiniciar a animação do início
   */
  restart: () => void;
  /**
   * Reverter a animação
   */
  reverse: () => void;
  /**
   * Ir para um tempo específico na timeline (em segundos)
   */
  seek: (time: number) => void;
  /**
   * Verificar se a timeline está ativa (não pausada)
   */
  isActive: () => boolean;
  /**
   * Adicionar uma animação à timeline
   */
  add: (animation: gsap.core.Tween | gsap.core.Timeline) => void;
  /**
   * Limpar a timeline e remover todas as animações
   */
  clear: () => void;
}

/**
 * useGsapTimeline
 * 
 * Hook customizado para criar e gerenciar timelines de animação GSAP.
 * Gerencia automaticamente o ciclo de vida da timeline, incluindo limpeza
 * quando o componente é desmontado.
 * 
 * @param ref - Referência ao elemento DOM que será animado
 * @param options - Opções de configuração da timeline
 * @param animationFn - Função que define as animações da timeline
 * 
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const elementRef = useRef<HTMLDivElement>(null);
 *   
 *   const { play, pause, timeline } = useGsapTimeline(
 *     elementRef,
 *     { duration: 1, repeat: true },
 *     (tl) => {
 *       tl.to(elementRef.current, {
 *         opacity: 1,
 *         y: 0,
 *         duration: 1,
 *       });
 *     }
 *   );
 *   
 *   return (
 *     <div ref={elementRef} style={{ opacity: 0, transform: 'translateY(20px)' }}>
 *       Conteúdo animado
 *     </div>
 *   );
 * };
 * ```
 */
export function useGsapTimeline<T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T>,
  options: UseGsapTimelineOptions = {},
  animationFn?: (tl: gsap.core.Timeline) => void,
): UseGsapTimelineReturn {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const {
    paused = false,
    repeat = false,
    repeatDelay = 0,
    yoyo = false,
    delay = 0,
    duration,
  } = options;

  // Criar a timeline quando o componente é montado ou quando as dependências mudam
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    // Criar nova timeline
    const tl = gsap.timeline({
      paused,
      repeat: repeat ? -1 : 0, // -1 = infinito
      repeatDelay,
      yoyo,
      delay,
      ...(duration !== undefined && { duration }),
    });

    // Aplicar animações se a função fornecida
    if (animationFn) {
      animationFn(tl);
    }

    timelineRef.current = tl;

    // Limpeza: matar a timeline quando o componente for desmontado
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // ref não deve estar nas dependências (causa recriações desnecessárias)
    paused,
    repeat,
    repeatDelay,
    yoyo,
    delay,
    duration,
    // animationFn não deve estar nas dependências para evitar recriações desnecessárias
    // Se necessário, o usuário pode usar useCallback para memoizar a função
  ]);

  // Re-executar animationFn quando ela mudar (se fornecida)
  useEffect(() => {
    if (!timelineRef.current || !animationFn || !ref.current) {
      return;
    }

    // Limpar animações existentes
    timelineRef.current.clear();
    // Aplicar novas animações
    animationFn(timelineRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationFn]);

  // Funções de controle
  const play = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.play();
    }
  }, []);

  const pause = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.pause();
    }
  }, []);

  const restart = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.restart();
    }
  }, []);

  const reverse = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.reverse();
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (timelineRef.current) {
      timelineRef.current.seek(time);
    }
  }, []);

  const isActive = useCallback(() => {
    return timelineRef.current ? timelineRef.current.isActive() : false;
  }, []);

  const add = useCallback((animation: gsap.core.Tween | gsap.core.Timeline) => {
    if (timelineRef.current) {
      timelineRef.current.add(animation);
    }
  }, []);

  const clear = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.clear();
    }
  }, []);

  return {
    timeline: timelineRef.current,
    play,
    pause,
    restart,
    reverse,
    seek,
    isActive,
    add,
    clear,
  };
}

