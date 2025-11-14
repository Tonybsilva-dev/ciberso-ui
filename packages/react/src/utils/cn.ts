/**
 * cn - Utility function para combinar classes CSS
 * 
 * Combina classes condicionalmente, similar ao clsx mas otimizado para Tailwind CSS.
 * Remove valores falsy e mescla arrays de classes.
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes CSS de forma inteligente
 * 
 * Usa `clsx` para combinar classes condicionalmente e `tailwind-merge`
 * para resolver conflitos de classes do Tailwind CSS.
 * 
 * @example
 * ```tsx
 * cn('base-class', condition && 'conditional-class', { 'object-class': true })
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

