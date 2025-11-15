/**
 * Testes para o componente Text
 * Valida renderização de tags HTML, props e classes de estilo
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text', () => {
  describe('Renderização Padrão e Props', () => {
    it('deve renderizar como tag <p> por padrão', () => {
      render(<Text>Texto padrão</Text>);
      
      const text = screen.getByText('Texto padrão');
      expect(text).toBeInTheDocument();
      expect(text.tagName).toBe('P');
    });

    it('deve renderizar como tag <span> quando as="span"', () => {
      render(<Text as="span">Texto como span</Text>);
      
      const text = screen.getByText('Texto como span');
      expect(text).toBeInTheDocument();
      expect(text.tagName).toBe('SPAN');
    });

    it('deve renderizar como tag <div> quando as="div"', () => {
      render(<Text as="div">Texto como div</Text>);
      
      const text = screen.getByText('Texto como div');
      expect(text).toBeInTheDocument();
      expect(text.tagName).toBe('DIV');
    });

    it('deve renderizar o conteúdo children corretamente', () => {
      render(<Text>Conteúdo do texto</Text>);
      
      const text = screen.getByText('Conteúdo do texto');
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent('Conteúdo do texto');
    });
  });

  describe('Aplicação de Classes de Estilo (size, weight, color)', () => {
    it('deve aplicar classes de tamanho corretas', () => {
      const { rerender } = render(<Text size="xs">Texto</Text>);
      let text = screen.getByText('Texto');
      expect(text).toHaveClass('text-xs');
      expect(text).toHaveAttribute('data-size', 'xs');

      rerender(<Text size="sm">Texto</Text>);
      text = screen.getByText('Texto');
      expect(text).toHaveClass('text-sm');
      expect(text).toHaveAttribute('data-size', 'sm');

      rerender(<Text size="md">Texto</Text>);
      text = screen.getByText('Texto');
      expect(text).toHaveClass('text-base');
      expect(text).toHaveAttribute('data-size', 'md');

      rerender(<Text size="lg">Texto</Text>);
      text = screen.getByText('Texto');
      expect(text).toHaveClass('text-lg');
      expect(text).toHaveAttribute('data-size', 'lg');

      rerender(<Text size="xl">Texto</Text>);
      text = screen.getByText('Texto');
      expect(text).toHaveClass('text-xl');
      expect(text).toHaveAttribute('data-size', 'xl');

      rerender(<Text size="2xl">Texto</Text>);
      text = screen.getByText('Texto');
      expect(text).toHaveClass('text-2xl');
      expect(text).toHaveAttribute('data-size', '2xl');
    });

    it('deve usar size="md" por padrão', () => {
      render(<Text>Texto padrão</Text>);
      
      const text = screen.getByText('Texto padrão');
      expect(text).toHaveClass('text-base');
      expect(text).toHaveAttribute('data-size', 'md');
    });

    it('deve aplicar classes de peso corretas', () => {
      const { rerender } = render(<Text weight="regular">Texto</Text>);
      let text = screen.getByText('Texto');
      expect(text).toHaveClass('font-normal');
      expect(text).toHaveAttribute('data-weight', 'regular');

      rerender(<Text weight="medium">Texto</Text>);
      text = screen.getByText('Texto');
      expect(text).toHaveClass('font-medium');
      expect(text).toHaveAttribute('data-weight', 'medium');

      rerender(<Text weight="bold">Texto</Text>);
      text = screen.getByText('Texto');
      expect(text).toHaveClass('font-bold');
      expect(text).toHaveAttribute('data-weight', 'bold');
    });

    it('deve usar weight="regular" por padrão', () => {
      render(<Text>Texto padrão</Text>);
      
      const text = screen.getByText('Texto padrão');
      expect(text).toHaveClass('font-normal');
      expect(text).toHaveAttribute('data-weight', 'regular');
    });

    it('deve aplicar classes de cor corretas', () => {
      const { rerender } = render(<Text color="default">Texto</Text>);
      let text = screen.getByText('Texto');
      expect(text).toHaveClass('text-foreground');
      expect(text).toHaveAttribute('data-color', 'default');

      rerender(<Text color="muted">Texto</Text>);
      text = screen.getByText('Texto');
      expect(text).toHaveClass('text-muted-foreground');
      expect(text).toHaveAttribute('data-color', 'muted');

      rerender(<Text color="primary">Texto</Text>);
      text = screen.getByText('Texto');
      expect(text).toHaveClass('text-primary');
      expect(text).toHaveAttribute('data-color', 'primary');

      rerender(<Text color="success">Texto</Text>);
      text = screen.getByText('Texto');
      expect(text).toHaveClass('text-primary'); // success usa text-primary conforme Text.variants
      expect(text).toHaveAttribute('data-color', 'success');

      rerender(<Text color="error">Texto</Text>);
      text = screen.getByText('Texto');
      expect(text).toHaveClass('text-destructive');
      expect(text).toHaveAttribute('data-color', 'error');

      rerender(<Text color="warning">Texto</Text>);
      text = screen.getByText('Texto');
      expect(text).toHaveClass('text-primary'); // warning usa text-primary conforme Text.variants
      expect(text).toHaveAttribute('data-color', 'warning');
    });

    it('deve usar color="default" por padrão', () => {
      render(<Text>Texto padrão</Text>);
      
      const text = screen.getByText('Texto padrão');
      expect(text).toHaveClass('text-foreground');
      expect(text).toHaveAttribute('data-color', 'default');
    });

    it('deve aplicar múltiplas classes de estilo simultaneamente', () => {
      render(
        <Text size="lg" weight="bold" color="primary">
          Texto Completo
        </Text>
      );
      
      const text = screen.getByText('Texto Completo');
      expect(text).toHaveClass('text-lg');
      expect(text).toHaveClass('font-bold');
      expect(text).toHaveClass('text-primary');
      expect(text).toHaveAttribute('data-size', 'lg');
      expect(text).toHaveAttribute('data-weight', 'bold');
      expect(text).toHaveAttribute('data-color', 'primary');
    });
  });

  describe('Atributos Data e Classes Customizadas', () => {
    it('deve ter atributos data-* para size, weight e color', () => {
      render(
        <Text size="md" weight="medium" color="muted">
          Texto
        </Text>
      );
      
      const text = screen.getByText('Texto');
      expect(text).toHaveAttribute('data-size', 'md');
      expect(text).toHaveAttribute('data-weight', 'medium');
      expect(text).toHaveAttribute('data-color', 'muted');
    });

    it('deve aceitar className customizada', () => {
      render(<Text className="custom-class">Texto</Text>);
      
      const text = screen.getByText('Texto');
      expect(text).toHaveClass('custom-class');
    });

    it('deve aplicar classes base (font-sans) sempre', () => {
      render(<Text>Texto</Text>);
      
      const text = screen.getByText('Texto');
      expect(text).toHaveClass('font-sans');
    });
  });

  describe('Combinação de Props', () => {
    it('deve funcionar corretamente com as, size, weight e color juntos', () => {
      render(
        <Text as="span" size="sm" weight="bold" color="error" className="extra-class">
          Texto combinado
        </Text>
      );
      
      const text = screen.getByText('Texto combinado');
      expect(text.tagName).toBe('SPAN');
      expect(text).toHaveClass('text-sm');
      expect(text).toHaveClass('font-bold');
      expect(text).toHaveClass('text-destructive');
      expect(text).toHaveClass('extra-class');
      expect(text).toHaveAttribute('data-size', 'sm');
      expect(text).toHaveAttribute('data-weight', 'bold');
      expect(text).toHaveAttribute('data-color', 'error');
    });
  });
});

