/**
 * Testes para o componente Heading
 * Valida renderização de tags HTML (h1-h6), tamanhos padrão e classes de estilo
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';

describe('Heading', () => {
  describe('Renderização da Tag HTML Correta', () => {
    it('deve renderizar h1 quando level={1}', () => {
      render(<Heading level={1}>Título H1</Heading>);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
      expect(heading).toHaveTextContent('Título H1');
    });

    it('deve renderizar h2 quando level={2}', () => {
      render(<Heading level={2}>Título H2</Heading>);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
      expect(heading).toHaveTextContent('Título H2');
    });

    it('deve renderizar h3 quando level={3}', () => {
      render(<Heading level={3}>Título H3</Heading>);
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
      expect(heading).toHaveTextContent('Título H3');
    });

    it('deve renderizar h4 quando level={4}', () => {
      render(<Heading level={4}>Título H4</Heading>);
      
      const heading = screen.getByRole('heading', { level: 4 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H4');
      expect(heading).toHaveTextContent('Título H4');
    });

    it('deve renderizar h5 quando level={5}', () => {
      render(<Heading level={5}>Título H5</Heading>);
      
      const heading = screen.getByRole('heading', { level: 5 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H5');
      expect(heading).toHaveTextContent('Título H5');
    });

    it('deve renderizar h6 quando level={6}', () => {
      render(<Heading level={6}>Título H6</Heading>);
      
      const heading = screen.getByRole('heading', { level: 6 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H6');
      expect(heading).toHaveTextContent('Título H6');
    });

    it('deve renderizar h1 por padrão quando level não é fornecido', () => {
      render(<Heading>Título Padrão</Heading>);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
    });
  });

  describe('Tamanhos Padrão Baseados no Level', () => {
    it('deve usar tamanho 2xl para level={1}', () => {
      render(<Heading level={1}>Título</Heading>);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveAttribute('data-size', '2xl');
      expect(heading).toHaveClass('text-2xl');
    });

    it('deve usar tamanho xl para level={2}', () => {
      render(<Heading level={2}>Título</Heading>);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveAttribute('data-size', 'xl');
      expect(heading).toHaveClass('text-xl');
    });

    it('deve usar tamanho lg para level={3}', () => {
      render(<Heading level={3}>Título</Heading>);
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveAttribute('data-size', 'lg');
      expect(heading).toHaveClass('text-lg');
    });

    it('deve usar tamanho md para level={4}', () => {
      render(<Heading level={4}>Título</Heading>);
      
      const heading = screen.getByRole('heading', { level: 4 });
      expect(heading).toHaveAttribute('data-size', 'md');
      expect(heading).toHaveClass('text-base');
    });

    it('deve usar tamanho sm para level={5}', () => {
      render(<Heading level={5}>Título</Heading>);
      
      const heading = screen.getByRole('heading', { level: 5 });
      expect(heading).toHaveAttribute('data-size', 'sm');
      expect(heading).toHaveClass('text-sm');
    });

    it('deve usar tamanho xs para level={6}', () => {
      render(<Heading level={6}>Título</Heading>);
      
      const heading = screen.getByRole('heading', { level: 6 });
      expect(heading).toHaveAttribute('data-size', 'xs');
      expect(heading).toHaveClass('text-xs');
    });

    it('deve usar tamanho customizado quando size é fornecido', () => {
      render(<Heading level={1} size="lg">Título</Heading>);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveAttribute('data-size', 'lg');
      expect(heading).toHaveClass('text-lg');
    });
  });

  describe('Aplicação de Classes de Estilo (size, weight, color)', () => {
    it('deve aplicar classes de tamanho corretas', () => {
      const { rerender } = render(<Heading level={1} size="xs">Título</Heading>);
      let heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-xs');

      rerender(<Heading level={1} size="sm">Título</Heading>);
      heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-sm');

      rerender(<Heading level={1} size="md">Título</Heading>);
      heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-base');

      rerender(<Heading level={1} size="lg">Título</Heading>);
      heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-lg');

      rerender(<Heading level={1} size="xl">Título</Heading>);
      heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-xl');

      rerender(<Heading level={1} size="2xl">Título</Heading>);
      heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-2xl');
    });

    it('deve aplicar classes de peso corretas', () => {
      const { rerender } = render(<Heading level={1} weight="regular">Título</Heading>);
      let heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('font-normal');
      expect(heading).toHaveAttribute('data-weight', 'regular');

      rerender(<Heading level={1} weight="medium">Título</Heading>);
      heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('font-medium');
      expect(heading).toHaveAttribute('data-weight', 'medium');

      rerender(<Heading level={1} weight="bold">Título</Heading>);
      heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('font-bold');
      expect(heading).toHaveAttribute('data-weight', 'bold');
    });

    it('deve usar weight="bold" por padrão', () => {
      render(<Heading level={1}>Título</Heading>);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('font-bold');
      expect(heading).toHaveAttribute('data-weight', 'bold');
    });

    it('deve aplicar classes de cor corretas', () => {
      const { rerender } = render(<Heading level={1} color="default">Título</Heading>);
      let heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-[#111827]');
      expect(heading).toHaveAttribute('data-color', 'default');

      rerender(<Heading level={1} color="muted">Título</Heading>);
      heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-[#6B7280]');
      expect(heading).toHaveAttribute('data-color', 'muted');

      rerender(<Heading level={1} color="primary">Título</Heading>);
      heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-[#007BFF]');
      expect(heading).toHaveAttribute('data-color', 'primary');

      rerender(<Heading level={1} color="success">Título</Heading>);
      heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-[#00F6FF]');
      expect(heading).toHaveAttribute('data-color', 'success');

      rerender(<Heading level={1} color="error">Título</Heading>);
      heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-[#FF4444]');
      expect(heading).toHaveAttribute('data-color', 'error');

      rerender(<Heading level={1} color="warning">Título</Heading>);
      heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-[#FF9500]');
      expect(heading).toHaveAttribute('data-color', 'warning');
    });

    it('deve aplicar múltiplas classes de estilo simultaneamente', () => {
      render(
        <Heading level={2} size="lg" weight="medium" color="primary">
          Título Completo
        </Heading>
      );
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('text-lg');
      expect(heading).toHaveClass('font-medium');
      expect(heading).toHaveClass('text-[#007BFF]');
      expect(heading).toHaveAttribute('data-size', 'lg');
      expect(heading).toHaveAttribute('data-weight', 'medium');
      expect(heading).toHaveAttribute('data-color', 'primary');
    });
  });

  describe('Atributos Data e Acessibilidade', () => {
    it('deve ter atributos data-* para level, size, weight e color', () => {
      render(
        <Heading level={3} size="md" weight="bold" color="primary">
          Título
        </Heading>
      );
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveAttribute('data-level', '3');
      expect(heading).toHaveAttribute('data-size', 'md');
      expect(heading).toHaveAttribute('data-weight', 'bold');
      expect(heading).toHaveAttribute('data-color', 'primary');
    });

    it('deve aceitar className customizada', () => {
      render(<Heading level={1} className="custom-class">Título</Heading>);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('custom-class');
    });
  });
});

