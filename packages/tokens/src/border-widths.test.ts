/**
 * Testes unitários para tokens de largura de borda do Ciberso-UI
 */

import { describe, it, expect } from 'vitest';
import { borderWidths } from './border-widths';

describe('Tokens de Largura de Borda (Border Widths) - Ciberso-UI', () => {
  describe('borderWidths', () => {
    it('deve ter none com valor 0px', () => {
      expect(borderWidths.none).toBe('0px');
    });

    it('deve ter thin com valor 1px', () => {
      expect(borderWidths.thin).toBe('1px');
    });

    it('deve ter medium com valor 2px', () => {
      expect(borderWidths.medium).toBe('2px');
    });

    it('deve ter thick com valor 4px', () => {
      expect(borderWidths.thick).toBe('4px');
    });

    it('deve ter todos os valores definidos', () => {
      const expectedWidths = ['none', 'thin', 'medium', 'thick'];
      expectedWidths.forEach((key) => {
        expect(borderWidths[key as keyof typeof borderWidths]).toBeDefined();
      });
    });

    it('todos os valores devem estar em pixels', () => {
      Object.values(borderWidths).forEach((value) => {
        expect(value).toMatch(/^\d+px$/);
      });
    });

    it('deve ter estrutura correta de chaves', () => {
      const keys = Object.keys(borderWidths);
      expect(keys.length).toBe(4);
      expect(keys).toContain('none');
      expect(keys).toContain('thin');
      expect(keys).toContain('medium');
      expect(keys).toContain('thick');
    });

    it('valores devem seguir ordem crescente (exceto none)', () => {
      const values = {
        none: 0,
        thin: 1,
        medium: 2,
        thick: 4,
      };
      
      expect(parseInt(borderWidths.none)).toBe(values.none);
      expect(parseInt(borderWidths.thin)).toBe(values.thin);
      expect(parseInt(borderWidths.medium)).toBe(values.medium);
      expect(parseInt(borderWidths.thick)).toBe(values.thick);
    });
  });

  describe('Exports e Tipos', () => {
    it('borderWidths deve ser exportado corretamente', () => {
      expect(borderWidths).toBeDefined();
      expect(Object.keys(borderWidths).length).toBeGreaterThan(0);
    });
  });
});

