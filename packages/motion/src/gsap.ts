/**
 * Utilities GSAP para animações complexas
 * 
 * Exporta hooks e utilitários para animações GSAP no Ciberso-UI
 */

export { useGsapTimeline } from './hooks/useGsapTimeline';
export type {
  UseGsapTimelineOptions,
  UseGsapTimelineReturn,
} from './hooks/useGsapTimeline';

/**
 * useGlowAnimation - Hook para animação de brilho neon
 * 
 * @deprecated Será implementado em uma fase futura
 * Use useGsapTimeline para criar animações de glow customizadas
 */
export const useGlowAnimation = () => {
  // TODO: Implementar animação de glow usando useGsapTimeline
  console.warn('useGlowAnimation está em desenvolvimento. Use useGsapTimeline por enquanto.');
};

/**
 * usePulseAnimation - Hook para animação de pulso
 * 
 * @deprecated Será implementado em uma fase futura
 * Use useGsapTimeline para criar animações de pulse customizadas
 */
export const usePulseAnimation = () => {
  // TODO: Implementar animação de pulse usando useGsapTimeline
  console.warn('usePulseAnimation está em desenvolvimento. Use useGsapTimeline por enquanto.');
};

