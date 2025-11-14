/**
 * @ciberso/motion
 * Utilities de animação para Ciberso-UI
 * Usa Framer Motion e GSAP
 */

export * from './framer-motion';
export * from './gsap';
export { MotionProvider } from './MotionProvider';
export type { MotionProviderProps } from './MotionProvider';
export { AnimatedBox } from './AnimatedBox';
export type { AnimatedBoxProps } from './AnimatedBox';

// Exportar hooks GSAP diretamente
export { useGsapTimeline } from './hooks/useGsapTimeline';
export type {
  UseGsapTimelineOptions,
  UseGsapTimelineReturn,
} from './hooks/useGsapTimeline';

// Exportar componente de exemplo para testes de integração
export { GsapAnimatedBox } from './components/GsapAnimatedBox';
export type { GsapAnimatedBoxProps } from './components/GsapAnimatedBox';

