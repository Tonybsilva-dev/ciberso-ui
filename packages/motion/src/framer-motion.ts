/**
 * Utilities Framer Motion para Ciberso-UI
 */

import type { Variants } from 'framer-motion';

/**
 * Variants de animação para botões
 */
export const buttonVariants: Variants = {
  idle: {
    scale: 1,
    boxShadow: '0 0 0 0 rgba(0, 255, 255, 0)',
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
    transition: { duration: 0.2 },
  },
  pressed: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

/**
 * Variants de animação para cards
 */
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

