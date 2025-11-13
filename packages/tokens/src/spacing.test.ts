/**
 * Testes unitários para tokens de espaçamento do Ciberso-UI
 */

import { describe, it, expect } from 'vitest';
import { space, spacing } from './spacing';

describe('Tokens de Espaçamento - Ciberso-UI', () => {
  describe('space (Escala baseada em 4px)', () => {
    it('deve ter space.1 com valor 0.25rem (4px)', () => {
      expect(space[1]).toBe('0.25rem');
    });

    it('deve ter space.2 com valor 0.5rem (8px)', () => {
      expect(space[2]).toBe('0.5rem');
    });

    it('deve ter space.4 com valor 1rem (16px)', () => {
      expect(space[4]).toBe('1rem');
    });

    it('deve ter space.8 com valor 2rem (32px)', () => {
      expect(space[8]).toBe('2rem');
    });

    it('deve ter space.12 com valor 3rem (48px)', () => {
      expect(space[12]).toBe('3rem');
    });

    it('deve ter space.24 com valor 6rem (96px)', () => {
      expect(space[24]).toBe('6rem');
    });

    it('deve ter todos os valores em rem', () => {
      Object.values(space).forEach((value) => {
        expect(value).toMatch(/^\d+(\.\d+)?rem$/);
      });
    });

    it('deve ter estrutura numérica correta', () => {
      const keys = Object.keys(space).map(Number);
      expect(keys.length).toBeGreaterThan(0);
      keys.forEach((key) => {
        expect(typeof key).toBe('number');
        expect(key).toBeGreaterThan(0);
      });
    });
  });

  describe('spacing (Compatibilidade)', () => {
    it('deve ter xs com valor 0.25rem', () => {
      expect(spacing.xs).toBe('0.25rem');
    });

    it('deve ter sm com valor 0.5rem', () => {
      expect(spacing.sm).toBe('0.5rem');
    });

    it('deve ter md com valor 1rem', () => {
      expect(spacing.md).toBe('1rem');
    });

    it('deve ter lg com valor 1.5rem', () => {
      expect(spacing.lg).toBe('1.5rem');
    });

    it('deve ter xl com valor 2rem', () => {
      expect(spacing.xl).toBe('2rem');
    });

    it('deve ter 2xl com valor 3rem', () => {
      expect(spacing['2xl']).toBe('3rem');
    });

    it('deve ter todos os valores em rem', () => {
      Object.values(spacing).forEach((value) => {
        expect(value).toMatch(/^\d+(\.\d+)?rem$/);
      });
    });
  });

  describe('Exports e Tipos', () => {
    it('space deve ser exportado corretamente', () => {
      expect(space).toBeDefined();
      expect(Object.keys(space).length).toBeGreaterThan(0);
    });

    it('spacing deve ser exportado corretamente', () => {
      expect(spacing).toBeDefined();
      expect(Object.keys(spacing).length).toBeGreaterThan(0);
    });
  });
});

