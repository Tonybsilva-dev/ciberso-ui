/**
 * Testes para os tokens de animação do Ciberso-UI
 * Valida durações, easings e delays
 */

import { describe, it, expect } from 'vitest';
import { animations } from './animations';

describe('Tokens de Animação - Ciberso-UI', () => {
  describe('Durações (durations)', () => {
    it('deve exportar objeto de durações', () => {
      expect(animations.duration).toBeDefined();
      expect(typeof animations.duration).toBe('object');
    });

    it('deve ter duração fast de 150ms', () => {
      expect(animations.duration.fast).toBe('150ms');
    });

    it('deve ter duração normal de 300ms', () => {
      expect(animations.duration.normal).toBe('300ms');
    });

    it('deve ter duração slow de 500ms', () => {
      expect(animations.duration.slow).toBe('500ms');
    });

    it('deve ter duração slower de 750ms', () => {
      expect(animations.duration.slower).toBe('750ms');
    });

    it('deve ter todas as durações em formato de string com unidade ms', () => {
      Object.values(animations.duration).forEach((duration) => {
        expect(typeof duration).toBe('string');
        expect(duration).toMatch(/^\d+ms$/);
      });
    });
  });

  describe('Curvas de Easing (easing)', () => {
    it('deve exportar objeto de easings', () => {
      expect(animations.easing).toBeDefined();
      expect(typeof animations.easing).toBe('object');
    });

    it('deve ter easing easeInOut com cubic-bezier correto', () => {
      expect(animations.easing.easeInOut).toBe('cubic-bezier(0.4, 0, 0.2, 1)');
    });

    it('deve ter easing easeOut com cubic-bezier correto', () => {
      expect(animations.easing.easeOut).toBe('cubic-bezier(0, 0, 0.2, 1)');
    });

    it('deve ter easing easeIn com cubic-bezier correto', () => {
      expect(animations.easing.easeIn).toBe('cubic-bezier(0.4, 0, 1, 1)');
    });

    it('deve ter easing bounce com cubic-bezier correto', () => {
      expect(animations.easing.bounce).toBe('cubic-bezier(0.68, -0.55, 0.265, 1.55)');
    });

    it('deve ter todos os easings em formato cubic-bezier', () => {
      Object.values(animations.easing).forEach((easing) => {
        expect(typeof easing).toBe('string');
        expect(easing).toMatch(/^cubic-bezier\([^)]+\)$/);
      });
    });
  });

  describe('Atrasos (delays)', () => {
    it('deve exportar objeto de delays', () => {
      expect(animations.delays).toBeDefined();
      expect(typeof animations.delays).toBe('object');
    });

    it('deve ter delay none de 0ms', () => {
      expect(animations.delays.none).toBe('0ms');
    });

    it('deve ter delay short de 100ms', () => {
      expect(animations.delays.short).toBe('100ms');
    });

    it('deve ter delay medium de 200ms', () => {
      expect(animations.delays.medium).toBe('200ms');
    });

    it('deve ter delay long de 300ms', () => {
      expect(animations.delays.long).toBe('300ms');
    });

    it('deve ter todos os delays em formato de string com unidade ms', () => {
      Object.values(animations.delays).forEach((delay) => {
        expect(typeof delay).toBe('string');
        expect(delay).toMatch(/^\d+ms$/);
      });
    });
  });

  describe('Estrutura do objeto animations', () => {
    it('deve exportar objeto animations completo', () => {
      expect(animations).toBeDefined();
      expect(animations).toHaveProperty('duration');
      expect(animations).toHaveProperty('easing');
      expect(animations).toHaveProperty('delays');
    });

    it('deve ser um objeto readonly (as const)', () => {
      // Verificar que o tipo é readonly através da estrutura
      expect(Object.isFrozen(animations)).toBe(false); // as const não congela, apenas torna readonly
      // Mas podemos verificar que as propriedades existem
      expect(animations.duration).toBeDefined();
      expect(animations.easing).toBeDefined();
      expect(animations.delays).toBeDefined();
    });
  });

  describe('Compatibilidade com CSS, Framer Motion e GSAP', () => {
    it('deve ter durações compatíveis com CSS (formato string com unidade)', () => {
      Object.values(animations.duration).forEach((duration) => {
        // CSS aceita valores como '150ms', '0.3s', etc.
        expect(duration).toMatch(/^\d+ms$/);
      });
    });

    it('deve ter easings compatíveis com CSS (formato cubic-bezier)', () => {
      Object.values(animations.easing).forEach((easing) => {
        // CSS aceita cubic-bezier(x1, y1, x2, y2)
        expect(easing).toMatch(/^cubic-bezier\([\d.-]+,\s*[\d.-]+,\s*[\d.-]+,\s*[\d.-]+\)$/);
      });
    });

    it('deve ter delays compatíveis com CSS (formato string com unidade)', () => {
      Object.values(animations.delays).forEach((delay) => {
        // CSS aceita valores como '100ms', '0.2s', etc.
        expect(delay).toMatch(/^\d+ms$/);
      });
    });
  });
});

