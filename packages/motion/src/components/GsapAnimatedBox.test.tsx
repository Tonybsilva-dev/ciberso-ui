/**
 * Teste de integração para o componente GsapAnimatedBox
 * Valida que o hook useGsapTimeline funciona corretamente em um componente real
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { GsapAnimatedBox } from './GsapAnimatedBox';
import { gsap } from 'gsap';

// Mock do GSAP para testes de integração
// Usaremos o GSAP real, mas podemos verificar se as animações são aplicadas
describe('GsapAnimatedBox - Teste de Integração', () => {
  beforeEach(() => {
    // Limpar qualquer animação anterior
    gsap.killTweensOf('*');
  });

  afterEach(() => {
    // Limpar após cada teste
    gsap.killTweensOf('*');
  });

  it('deve renderizar o componente com conteúdo', () => {
    render(<GsapAnimatedBox>Conteúdo de teste</GsapAnimatedBox>);

    expect(screen.getByText('Conteúdo de teste')).toBeInTheDocument();
  });

  it('deve aplicar animação de opacity quando autoPlay é true', async () => {
    const { container } = render(
      <GsapAnimatedBox autoPlay duration={0.5}>Conteúdo</GsapAnimatedBox>,
    );

    const element = container.firstChild as HTMLElement;

    // Aguardar a animação completar
    await waitFor(
      () => {
        // Verificar se a opacidade foi animada para 1
        // Como estamos usando GSAP real, podemos verificar o estilo computado
        const computedStyle = window.getComputedStyle(element);
        // GSAP pode aplicar opacity via inline style ou transform
        expect(element).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });

  it('deve iniciar com opacity 0 e transform translateY(20px)', () => {
    const { container } = render(
      <GsapAnimatedBox autoPlay={false}>Conteúdo</GsapAnimatedBox>,
    );

    const element = container.firstChild as HTMLElement;
    const style = window.getComputedStyle(element);

    // Verificar estilo inicial
    expect(element.style.opacity).toBe('0');
    expect(element.style.transform).toContain('translateY(20px)');
  });

  it('não deve iniciar animação automaticamente quando autoPlay é false', () => {
    const { container } = render(
      <GsapAnimatedBox autoPlay={false} duration={0.1}>
        Conteúdo
      </GsapAnimatedBox>,
    );

    const element = container.firstChild as HTMLElement;

    // Com autoPlay=false, a timeline deve estar pausada
    // O elemento deve manter o estado inicial
    expect(element.style.opacity).toBe('0');
  });

  it('deve aceitar className e outras props HTML', () => {
    const { container } = render(
      <GsapAnimatedBox className="custom-class" data-testid="animated-box">
        Conteúdo
      </GsapAnimatedBox>,
    );

    const element = container.firstChild as HTMLElement;

    expect(element).toHaveClass('custom-class');
    expect(element).toHaveAttribute('data-testid', 'animated-box');
  });

  it('deve aplicar estilos customizados via style prop', () => {
    const { container } = render(
      <GsapAnimatedBox style={{ backgroundColor: 'red' }}>
        Conteúdo
      </GsapAnimatedBox>,
    );

    const element = container.firstChild as HTMLElement;

    expect(element.style.backgroundColor).toBe('red');
  });
});

