/**
 * Testes unitários para tokens de cor do Ciberso-UI
 */

import { describe, it, expect } from 'vitest';
import { colors } from './colors';

describe('Tokens de Cor - Ciberso-UI', () => {
  describe('Cores primárias diretas', () => {
    it('deve ter ciano neon com valor #00F6FF', () => {
      expect(colors.primary.cianoNeon).toBe('#00F6FF');
    });

    it('deve ter azul royal com valor #007BFF', () => {
      expect(colors.primary.azulRoyal).toBe('#007BFF');
    });

    it('deve ter azul escuro com valor #0A192F', () => {
      expect(colors.primary.azulEscuro).toBe('#0A192F');
    });

    it('deve ter dourado com valor #FFD700', () => {
      expect(colors.primary.dourado).toBe('#FFD700');
    });

    it('deve ter preto com valor #000000', () => {
      expect(colors.primary.preto).toBe('#000000');
    });
  });

  describe('Cores Ciberso com escalas', () => {
    it('deve ter cyan[500] igual a ciano neon', () => {
      expect(colors.ciberso.cyan[500]).toBe(colors.primary.cianoNeon);
    });

    it('deve ter royalBlue[500] igual a azul royal', () => {
      expect(colors.ciberso.royalBlue[500]).toBe(colors.primary.azulRoyal);
    });

    it('deve ter darkBlue[500] igual a azul escuro', () => {
      expect(colors.ciberso.darkBlue[500]).toBe(colors.primary.azulEscuro);
    });

    it('deve ter gold[500] igual a dourado', () => {
      expect(colors.ciberso.gold[500]).toBe(colors.primary.dourado);
    });

    it('deve ter black[500] igual a preto', () => {
      expect(colors.ciberso.black[500]).toBe(colors.primary.preto);
    });
  });

  describe('Cores semânticas', () => {
    it('deve ter success usando ciano neon', () => {
      expect(colors.semantic.success).toBe('#00F6FF');
    });

    it('deve ter warning usando laranja (baseado na referência)', () => {
      expect(colors.semantic.warning).toBe('#FF9500');
    });

    it('deve ter info usando azul royal', () => {
      expect(colors.semantic.info).toBe('#007BFF');
    });

    it('deve ter error definido', () => {
      expect(colors.semantic.error).toBe('#FF4444');
    });
  });

  describe('Estrutura de escalas', () => {
    it('deve ter todas as escalas de cyan (50-900)', () => {
      const scales = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
      scales.forEach((scale) => {
        expect(colors.ciberso.cyan[scale as keyof typeof colors.ciberso.cyan]).toBeDefined();
      });
    });

    it('deve ter todas as escalas de royalBlue (50-900)', () => {
      const scales = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
      scales.forEach((scale) => {
        expect(colors.ciberso.royalBlue[scale as keyof typeof colors.ciberso.royalBlue]).toBeDefined();
      });
    });

    it('deve ter todas as escalas de darkBlue (50-900)', () => {
      const scales = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
      scales.forEach((scale) => {
        expect(colors.ciberso.darkBlue[scale as keyof typeof colors.ciberso.darkBlue]).toBeDefined();
      });
    });
  });

  describe('Valores hexadecimais válidos', () => {
    it('todas as cores primárias devem ser valores hexadecimais válidos', () => {
      const hexPattern = /^#[0-9A-F]{6}$/i;
      
      expect(colors.primary.cianoNeon).toMatch(hexPattern);
      expect(colors.primary.azulRoyal).toMatch(hexPattern);
      expect(colors.primary.azulEscuro).toMatch(hexPattern);
      expect(colors.primary.dourado).toMatch(hexPattern);
      expect(colors.primary.preto).toMatch(hexPattern);
    });
  });

  describe('Cores UI para componentes', () => {
    it('deve exportar cores UI', () => {
      expect(colors.ui).toBeDefined();
      expect(colors.ui.primary).toBeDefined();
      expect(colors.ui.secondary).toBeDefined();
      expect(colors.ui.input).toBeDefined();
      expect(colors.ui.tag).toBeDefined();
    });

    it('deve ter primary button com cores corretas', () => {
      expect(colors.ui.primary.bg).toBe('#007BFF');
      expect(colors.ui.primary.text).toBe('#FFFFFF');
      expect(colors.ui.primary.hover).toBe('#0066CC');
    });

    it('deve ter secondary button com cores corretas', () => {
      expect(colors.ui.secondary.bg).toBe('#6B7280');
      expect(colors.ui.secondary.text).toBe('#FFFFFF');
      expect(colors.ui.secondary.hover).toBe('#4B5563');
    });

    it('deve ter input com cores corretas', () => {
      expect(colors.ui.input.border).toBe('#9CA3AF');
      expect(colors.ui.input.borderFocused).toBe('#007BFF');
      expect(colors.ui.input.borderError).toBe('#FF4444');
    });
  });

  describe('Escala de cinza', () => {
    it('deve exportar escala de cinza', () => {
      expect(colors.ciberso.gray).toBeDefined();
    });

    it('deve ter valores corretos para gray[500], gray[400], gray[900]', () => {
      expect(colors.ciberso.gray[500]).toBe('#6B7280');
      expect(colors.ciberso.gray[400]).toBe('#9CA3AF');
      expect(colors.ciberso.gray[900]).toBe('#111827');
    });
  });
});

