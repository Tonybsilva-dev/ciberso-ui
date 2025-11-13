/**
 * Testes unitários para tokens de tipografia do Ciberso-UI
 */

import { describe, it, expect } from 'vitest';
import { fontSizes, fontWeights, fontFamilies, typography } from './typography';

describe('Tokens de Tipografia - Ciberso-UI', () => {
  describe('fontSizes (Tamanhos de Fonte)', () => {
    it('deve ter xs com valor 12px', () => {
      expect(fontSizes.xs).toBe('12px');
    });

    it('deve ter sm com valor 14px', () => {
      expect(fontSizes.sm).toBe('14px');
    });

    it('deve ter md com valor 16px', () => {
      expect(fontSizes.md).toBe('16px');
    });

    it('deve ter lg com valor 18px', () => {
      expect(fontSizes.lg).toBe('18px');
    });

    it('deve ter xl com valor 20px', () => {
      expect(fontSizes.xl).toBe('20px');
    });

    it('deve ter 2xl com valor 24px', () => {
      expect(fontSizes['2xl']).toBe('24px');
    });

    it('deve ter todos os tamanhos definidos', () => {
      const expectedSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
      expectedSizes.forEach((size) => {
        expect(fontSizes[size as keyof typeof fontSizes]).toBeDefined();
      });
    });

    it('todos os valores devem estar em pixels', () => {
      Object.values(fontSizes).forEach((size) => {
        expect(size).toMatch(/^\d+px$/);
      });
    });
  });

  describe('fontWeights (Pesos de Fonte)', () => {
    it('deve ter regular com valor 400', () => {
      expect(fontWeights.regular).toBe(400);
    });

    it('deve ter medium com valor 500', () => {
      expect(fontWeights.medium).toBe(500);
    });

    it('deve ter bold com valor 700', () => {
      expect(fontWeights.bold).toBe(700);
    });

    it('deve ter todos os pesos definidos', () => {
      const expectedWeights = ['regular', 'medium', 'bold'];
      expectedWeights.forEach((weight) => {
        expect(fontWeights[weight as keyof typeof fontWeights]).toBeDefined();
      });
    });

    it('todos os valores devem ser números', () => {
      Object.values(fontWeights).forEach((weight) => {
        expect(typeof weight).toBe('number');
      });
    });
  });

  describe('fontFamilies (Famílias de Fonte)', () => {
    it('deve ter default definido', () => {
      expect(fontFamilies.default).toBeDefined();
      expect(typeof fontFamilies.default).toBe('string');
    });

    it('deve ter code definido', () => {
      expect(fontFamilies.code).toBeDefined();
      expect(typeof fontFamilies.code).toBe('string');
    });

    it('default deve conter sans-serif', () => {
      expect(fontFamilies.default).toContain('sans-serif');
    });

    it('code deve conter monospace', () => {
      expect(fontFamilies.code).toContain('monospace');
    });
  });

  describe('Typography (Objeto Completo)', () => {
    it('deve exportar fontSizes através do objeto typography', () => {
      expect(typography.fontSizes).toBeDefined();
      expect(typography.fontSizes).toEqual(fontSizes);
    });

    it('deve exportar fontWeights através do objeto typography', () => {
      expect(typography.fontWeights).toBeDefined();
      expect(typography.fontWeights).toEqual(fontWeights);
    });

    it('deve exportar fontFamilies através do objeto typography', () => {
      expect(typography.fontFamilies).toBeDefined();
      expect(typography.fontFamilies).toEqual(fontFamilies);
    });

    it('deve manter compatibilidade com estrutura antiga (sizes, weights, fonts)', () => {
      expect(typography.sizes).toBeDefined();
      expect(typography.weights).toBeDefined();
      expect(typography.fonts).toBeDefined();
    });
  });

  describe('Exports e Tipos', () => {
    it('fontSizes deve ser exportado corretamente', () => {
      expect(fontSizes).toBeDefined();
      expect(Object.keys(fontSizes).length).toBeGreaterThan(0);
    });

    it('fontWeights deve ser exportado corretamente', () => {
      expect(fontWeights).toBeDefined();
      expect(Object.keys(fontWeights).length).toBeGreaterThan(0);
    });

    it('fontFamilies deve ser exportado corretamente', () => {
      expect(fontFamilies).toBeDefined();
      expect(Object.keys(fontFamilies).length).toBeGreaterThan(0);
    });
  });
});

