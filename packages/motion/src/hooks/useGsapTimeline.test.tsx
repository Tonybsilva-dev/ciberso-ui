/**
 * Testes para o hook useGsapTimeline
 * Valida criação, controle e limpeza de timelines GSAP
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGsapTimeline } from './useGsapTimeline';
import * as gsapModule from 'gsap';

// Mock do GSAP para testes
const mockTimeline = {
  play: vi.fn(),
  pause: vi.fn(),
  restart: vi.fn(),
  reverse: vi.fn(),
  seek: vi.fn(),
  isActive: vi.fn(() => false),
  add: vi.fn(),
  clear: vi.fn(),
  kill: vi.fn(),
  to: vi.fn(() => mockTimeline), // Retorna a timeline para permitir chaining
  fromTo: vi.fn(() => mockTimeline), // Retorna a timeline para permitir chaining
  from: vi.fn(() => mockTimeline), // Retorna a timeline para permitir chaining
};

vi.mock('gsap', async () => {
  const actual = await vi.importActual('gsap');
  return {
    ...actual,
    gsap: {
      timeline: vi.fn(() => mockTimeline),
    },
  };
});

describe('useGsapTimeline', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Criação da Timeline', () => {
    it('deve criar uma timeline quando o ref tem um elemento', () => {
      const div = document.createElement('div');
      const ref = { current: div };

      const { result } = renderHook(() => useGsapTimeline(ref));

      expect(gsapModule.gsap.timeline).toHaveBeenCalled();
      expect(result.current.timeline).toBeDefined();
    });

    it('deve criar timeline com opções padrão quando nenhuma opção é fornecida', () => {
      const div = document.createElement('div');
      const ref = { current: div };

      renderHook(() => useGsapTimeline(ref));

      expect(gsapModule.gsap.timeline).toHaveBeenCalledWith(
        expect.objectContaining({
          paused: false,
          repeat: 0,
          repeatDelay: 0,
          yoyo: false,
          delay: 0,
        }),
      );
    });

    it('deve criar timeline com opções customizadas', () => {
      const div = document.createElement('div');
      const ref = { current: div };

      renderHook(() =>
        useGsapTimeline(ref, {
          paused: true,
          repeat: true,
          repeatDelay: 0.5,
          yoyo: true,
          delay: 1,
          duration: 2,
        }),
      );

      expect(gsapModule.gsap.timeline).toHaveBeenCalledWith(
        expect.objectContaining({
          paused: true,
          repeat: -1, // infinito quando repeat é true
          repeatDelay: 0.5,
          yoyo: true,
          delay: 1,
          duration: 2,
        }),
      );
    });

    it('não deve criar timeline quando o ref é null', () => {
      const ref = { current: null };

      const { result } = renderHook(() => useGsapTimeline(ref));

      // Timeline não deve ser criada se não houver elemento
      // O hook deve retornar timeline como null
      expect(result.current.timeline).toBeNull();
    });

    it('deve executar animationFn quando fornecida', () => {
      const div = document.createElement('div');
      const ref = { current: div };

      const animationFn = vi.fn((tl) => {
        tl.to(div, { opacity: 1, duration: 1 });
      });

      renderHook(() => useGsapTimeline(ref, {}, animationFn));

      expect(animationFn).toHaveBeenCalled();
    });
  });

  describe('Controles da Timeline', () => {
    it('deve fornecer função play que chama timeline.play()', () => {
      const div = document.createElement('div');
      const ref = { current: div };

      const { result } = renderHook(() => useGsapTimeline(ref));

      result.current.play();

      expect(mockTimeline.play).toHaveBeenCalled();
    });

    it('deve fornecer função pause que chama timeline.pause()', () => {
      const div = document.createElement('div');
      const ref = { current: div };

      const { result } = renderHook(() => useGsapTimeline(ref));

      result.current.pause();

      expect(mockTimeline.pause).toHaveBeenCalled();
    });

    it('deve fornecer função restart que chama timeline.restart()', () => {
      const div = document.createElement('div');
      const ref = { current: div };

      const { result } = renderHook(() => useGsapTimeline(ref));

      result.current.restart();

      expect(mockTimeline.restart).toHaveBeenCalled();
    });

    it('deve fornecer função reverse que chama timeline.reverse()', () => {
      const div = document.createElement('div');
      const ref = { current: div };

      const { result } = renderHook(() => useGsapTimeline(ref));

      result.current.reverse();

      expect(mockTimeline.reverse).toHaveBeenCalled();
    });

    it('deve fornecer função seek que chama timeline.seek()', () => {
      const div = document.createElement('div');
      const ref = { current: div };

      const { result } = renderHook(() => useGsapTimeline(ref));

      result.current.seek(1.5);

      expect(mockTimeline.seek).toHaveBeenCalledWith(1.5);
    });

    it('deve fornecer função isActive que chama timeline.isActive()', () => {
      const div = document.createElement('div');
      const ref = { current: div };

      mockTimeline.isActive.mockReturnValue(true);

      const { result } = renderHook(() => useGsapTimeline(ref));

      const isActive = result.current.isActive();

      expect(mockTimeline.isActive).toHaveBeenCalled();
      expect(isActive).toBe(true);
    });

    it('deve fornecer função add que chama timeline.add()', () => {
      const div = document.createElement('div');
      const ref = { current: div };

      const { result } = renderHook(() => useGsapTimeline(ref));
      const mockTween = {} as any;

      result.current.add(mockTween);

      expect(mockTimeline.add).toHaveBeenCalledWith(mockTween);
    });

    it('deve fornecer função clear que chama timeline.clear()', () => {
      const div = document.createElement('div');
      const ref = { current: div };

      const { result } = renderHook(() => useGsapTimeline(ref));

      result.current.clear();

      expect(mockTimeline.clear).toHaveBeenCalled();
    });
  });

  describe('Limpeza e Memory Leaks', () => {
    it('deve matar a timeline quando o componente é desmontado', () => {
      const div = document.createElement('div');
      const ref = { current: div };

      const { unmount } = renderHook(() => useGsapTimeline(ref));

      unmount();

      expect(mockTimeline.kill).toHaveBeenCalled();
    });

    it('não deve causar erro quando timeline é null durante limpeza', () => {
      const ref = { current: null };

      const { unmount } = renderHook(() => useGsapTimeline(ref));

      // Não deve lançar erro mesmo sem timeline criada
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Re-execução de animationFn', () => {
    it('deve re-executar animationFn quando ela muda', () => {
      const div = document.createElement('div');
      const ref = { current: div };

      const animationFn1 = vi.fn((tl) => {
        tl.to(div, { opacity: 0.5, duration: 1 });
      });

      const { rerender } = renderHook(
        ({ animationFn }) => useGsapTimeline(ref, {}, animationFn),
        { initialProps: { animationFn: animationFn1 } },
      );

      expect(animationFn1).toHaveBeenCalled();

      const animationFn2 = vi.fn((tl) => {
        tl.to(div, { opacity: 1, duration: 1 });
      });

      rerender({ animationFn: animationFn2 });

      // animationFn2 deve ser chamada após a mudança
      expect(animationFn2).toHaveBeenCalled();
    });
  });
});

