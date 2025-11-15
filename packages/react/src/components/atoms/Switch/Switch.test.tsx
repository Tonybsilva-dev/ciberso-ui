/**
 * Testes para o componente Switch
 * Valida renderização, eventos de mudança, estados disabled e interações de teclado
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
  describe('Renderização', () => {
    it('deve renderizar o switch com label', () => {
      render(<Switch>Habilitar notificações</Switch>);

      const switchElement = screen.getByRole('switch', { name: /habilitar notificações/i });
      expect(switchElement).toBeInTheDocument();
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('deve renderizar o switch sem label', () => {
      render(<Switch aria-label="Toggle" />);

      const switchElement = screen.getByRole('switch', { name: /toggle/i });
      expect(switchElement).toBeInTheDocument();
    });

    it('deve renderizar com tamanhos diferentes', () => {
      const { rerender } = render(<Switch size="sm" aria-label="Switch">Small</Switch>);
      let container = screen.getByRole('switch').closest('span[data-size]');
      expect(container).toHaveAttribute('data-size', 'sm');

      rerender(<Switch size="md" aria-label="Switch">Medium</Switch>);
      container = screen.getByRole('switch').closest('span[data-size]');
      expect(container).toHaveAttribute('data-size', 'md');

      rerender(<Switch size="lg" aria-label="Switch">Large</Switch>);
      container = screen.getByRole('switch').closest('span[data-size]');
      expect(container).toHaveAttribute('data-size', 'lg');
    });

    it('deve renderizar com estado checked quando isSelected é true', () => {
      render(<Switch isSelected aria-label="Switch">Checked</Switch>);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('deve renderizar com estado unchecked quando isSelected é false', () => {
      render(<Switch isSelected={false} aria-label="Switch">Unchecked</Switch>);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });
  });

  describe('Interações', () => {
    it('deve chamar onChange quando o switch é clicado', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Switch onChange={handleChange} aria-label="Switch">Toggle</Switch>);

      const switchElement = screen.getByRole('switch');
      await user.click(switchElement);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('deve alternar o estado quando clicado', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Switch isSelected={false} onChange={handleChange} aria-label="Switch">
          Toggle
        </Switch>,
      );

      const switchElement = screen.getByRole('switch');
      await user.click(switchElement);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('deve alternar de checked para unchecked quando clicado', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Switch isSelected={true} onChange={handleChange} aria-label="Switch">
          Toggle
        </Switch>,
      );

      const switchElement = screen.getByRole('switch');
      await user.click(switchElement);

      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('deve ser navegável por teclado', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Switch onChange={handleChange} aria-label="Switch">Toggle</Switch>);

      const switchElement = screen.getByRole('switch');
      switchElement.focus();
      await user.keyboard('{Space}');

      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Estados Disabled', () => {
    it('deve renderizar como desabilitado quando isDisabled é true', () => {
      render(
        <Switch isDisabled aria-label="Switch">
          Disabled
        </Switch>,
      );

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDisabled();
    });

    it('não deve chamar onChange quando desabilitado', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Switch isDisabled onChange={handleChange} aria-label="Switch">
          Disabled
        </Switch>,
      );

      const switchElement = screen.getByRole('switch');
      await user.click(switchElement);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('deve ter cursor not-allowed quando desabilitado', () => {
      render(
        <Switch isDisabled aria-label="Switch">
          Disabled
        </Switch>,
      );

      const label = screen.getByRole('switch').closest('label');
      expect(label).toHaveClass('cursor-not-allowed');
    });
  });

  describe('Estados Visuais', () => {
    it('deve ter data-pressed quando pressionado', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Switch onChange={handleChange} aria-label="Switch">Toggle</Switch>);

      const switchElement = screen.getByRole('switch');
      const container = switchElement.closest('span[data-pressed]');

      await user.pointer({ keys: '[MouseLeft>]', target: switchElement });
      
      // Verificar se data-pressed está presente durante o pressionamento
      expect(container).toHaveAttribute('data-pressed');
    });

    it('deve ter data-focus-visible quando focado via teclado', async () => {
      const user = userEvent.setup();

      render(<Switch aria-label="Switch">Toggle</Switch>);

      const switchElement = screen.getByRole('switch');
      await user.tab();
      
      expect(switchElement).toHaveFocus();
      
      const container = switchElement.closest('span[data-focus-visible]');
      expect(container).toHaveAttribute('data-focus-visible');
    });

    it('deve ter aria-pressed no input', () => {
      render(<Switch aria-label="Switch">Toggle</Switch>);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-pressed');
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter role="switch"', () => {
      render(<Switch aria-label="Switch">Toggle</Switch>);

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('deve ter aria-checked correto baseado no estado', () => {
      const { rerender } = render(
        <Switch isSelected={false} aria-label="Switch">
          Toggle
        </Switch>,
      );

      let switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      rerender(
        <Switch isSelected={true} aria-label="Switch">
          Toggle
        </Switch>,
      );

      switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('deve ter aria-label ou label associado', () => {
      render(<Switch aria-label="Toggle notifications">Toggle</Switch>);

      const switchElement = screen.getByRole('switch', { name: /toggle notifications/i });
      expect(switchElement).toBeInTheDocument();
    });
  });
});

