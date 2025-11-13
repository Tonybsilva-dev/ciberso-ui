/**
 * Testes unitários para tokens de raio de borda do Ciberso-UI
 */

import { describe, it, expect } from 'vitest';
import { radii } from './radii';

describe('Tokens de Raio de Borda (Radii) - Ciberso-UI', () => {
  describe('radii', () => {
    it('deve ter none com valor 0px', () => {
      expect(radii.none).toBe('0px');
    });

    it('deve ter sm com valor 4px', () => {
      expect(radii.sm).toBe('4px');
    });

    it('deve ter md com valor 8px', () => {
      expect(radii.md).toBe('8px');
    });

    it('deve ter lg com valor 16px', () => {
      expect(radii.lg).toBe('16px');
    });

    it('deve ter xl com valor 24px', () => {
      expect(radii.xl).toBe('24px');
    });

    it('deve ter full com valor 9999px', () => {
      expect(radii.full).toBe('9999px');
    });

    it('deve ter todos os valores definidos', () => {
      const expectedRadii = ['none', 'sm', 'md', 'lg', 'xl', 'full'];
      expectedRadii.forEach((key) => {
        expect(radii[key as keyof typeof radii]).toBeDefined();
      });
    });

    it('todos os valores devem estar em pixels', () => {
      Object.values(radii).forEach((value) => {
        expect(value).toMatch(/^\d+px$/);
      });
    });

    it('deve ter estrutura correta de chaves', () => {
      const keys = Object.keys(radii);
      expect(keys.length).toBe(6);
      expect(keys).toContain('none');
      expect(keys).toContain('sm');
      expect(keys).toContain('md');
      expect(keys).toContain('lg');
      expect(keys).toContain('xl');
      expect(keys).toContain('full');
    });
  });

  describe('Exports e Tipos', () => {
    it('radii deve ser exportado corretamente', () => {
      expect(radii).toBeDefined();
      expect(Object.keys(radii).length).toBeGreaterThan(0);
    });
  });
});

