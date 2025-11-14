/**
 * Testes para o componente Alert
 * Valida renderização de variantes, funcionalidade de dismiss e acessibilidade
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  describe('Renderização de Variantes', () => {
    it('deve renderizar o alerta com o conteúdo esperado', () => {
      render(<Alert>Mensagem de alerta</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent('Mensagem de alerta');
    });

    it('deve renderizar com variante info por padrão', () => {
      render(<Alert>Mensagem</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('data-variant', 'info');
      expect(alert).toHaveClass('bg-[#E6F2FF]');
      expect(alert).toHaveClass('text-[#007BFF]');
    });

    it('deve renderizar com variante info', () => {
      render(<Alert variant="info">Mensagem informativa</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('data-variant', 'info');
      expect(alert).toHaveClass('bg-[#E6F2FF]');
      expect(alert).toHaveClass('text-[#007BFF]');
    });

    it('deve renderizar com variante success', () => {
      render(<Alert variant="success">Mensagem de sucesso</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('data-variant', 'success');
      expect(alert).toHaveClass('bg-[#E6FFE6]');
      expect(alert).toHaveClass('text-[#00C853]');
    });

    it('deve renderizar com variante warning', () => {
      render(<Alert variant="warning">Mensagem de aviso</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('data-variant', 'warning');
      expect(alert).toHaveClass('bg-[#FFF4E6]');
      expect(alert).toHaveClass('text-[#FF9500]');
    });

    it('deve renderizar com variante error', () => {
      render(<Alert variant="error">Mensagem de erro</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('data-variant', 'error');
      expect(alert).toHaveClass('bg-[#FFE6E6]');
      expect(alert).toHaveClass('text-[#FF4444]');
    });

    it('deve renderizar com título quando fornecido', () => {
      render(
        <Alert title="Título do Alerta">
          Conteúdo do alerta
        </Alert>
      );

      expect(screen.getByText('Título do Alerta')).toBeInTheDocument();
      expect(screen.getByText('Conteúdo do alerta')).toBeInTheDocument();
      
      const titleElement = screen.getByText('Título do Alerta');
      expect(titleElement).toHaveAttribute('data-alert-title');
    });

    it('não deve renderizar título quando não fornecido', () => {
      const { container } = render(<Alert>Conteúdo do alerta</Alert>);

      const titleElement = container.querySelector('[data-alert-title]');
      expect(titleElement).not.toBeInTheDocument();
      expect(screen.getByText('Conteúdo do alerta')).toBeInTheDocument();
    });
  });

  describe('Funcionalidade de Dismiss (Botão Fechar)', () => {
    it('não deve exibir botão de fechar quando isDismissible é false', () => {
      render(<Alert>Mensagem</Alert>);

      const closeButton = screen.queryByLabelText(/fechar alerta/i);
      expect(closeButton).not.toBeInTheDocument();
    });

    it('não deve exibir botão de fechar quando isDismissible é true mas onDismiss não é fornecido', () => {
      render(<Alert isDismissible>Mensagem</Alert>);

      const closeButton = screen.queryByLabelText(/fechar alerta/i);
      expect(closeButton).not.toBeInTheDocument();
    });

    it('deve exibir botão de fechar quando isDismissible é true e onDismiss é fornecido', () => {
      const onDismiss = vi.fn();
      render(
        <Alert isDismissible onDismiss={onDismiss}>
          Mensagem
        </Alert>
      );

      const closeButton = screen.getByLabelText(/fechar alerta/i);
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAttribute('type', 'button');
    });

    it('deve chamar onDismiss quando o botão de fechar é clicado', () => {
      const onDismiss = vi.fn();
      render(
        <Alert isDismissible onDismiss={onDismiss}>
          Mensagem
        </Alert>
      );

      const closeButton = screen.getByLabelText(/fechar alerta/i);
      fireEvent.click(closeButton);

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onDismiss quando o botão de fechar é clicado via userEvent', async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      render(
        <Alert isDismissible onDismiss={onDismiss}>
          Mensagem
        </Alert>
      );

      const closeButton = screen.getByLabelText(/fechar alerta/i);
      await user.click(closeButton);

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('deve acionar onDismiss quando a tecla Enter é pressionada no botão de fechar', async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      render(
        <Alert isDismissible onDismiss={onDismiss}>
          Mensagem
        </Alert>
      );

      const closeButton = screen.getByLabelText(/fechar alerta/i);
      closeButton.focus();
      expect(closeButton).toHaveFocus();

      await user.keyboard('{Enter}');

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('deve acionar onDismiss quando a tecla Espaço é pressionada no botão de fechar', async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      render(
        <Alert isDismissible onDismiss={onDismiss}>
          Mensagem
        </Alert>
      );

      const closeButton = screen.getByLabelText(/fechar alerta/i);
      closeButton.focus();
      expect(closeButton).toHaveFocus();

      await user.keyboard(' ');

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('Acessibilidade e Conteúdo', () => {
    it('deve ter role="alert" para acessibilidade', () => {
      render(<Alert>Mensagem</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('deve ter aria-label no botão de fechar', () => {
      const onDismiss = vi.fn();
      render(
        <Alert isDismissible onDismiss={onDismiss}>
          Mensagem
        </Alert>
      );

      const closeButton = screen.getByLabelText(/fechar alerta/i);
      expect(closeButton).toHaveAttribute('aria-label', 'Fechar alerta');
    });

    it('deve ter ícone com aria-hidden="true"', () => {
      render(<Alert variant="info">Mensagem</Alert>);

      // O ícone deve estar presente e ter aria-hidden
      const alert = screen.getByRole('alert');
      const icon = alert.querySelector('svg[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it('deve ter ícone correto para cada variante', () => {
      const { rerender } = render(<Alert variant="info">Info</Alert>);
      let alert = screen.getByRole('alert');
      let icon = alert.querySelector('svg');
      expect(icon).toBeInTheDocument();

      rerender(<Alert variant="success">Success</Alert>);
      alert = screen.getByRole('alert');
      icon = alert.querySelector('svg');
      expect(icon).toBeInTheDocument();

      rerender(<Alert variant="warning">Warning</Alert>);
      alert = screen.getByRole('alert');
      icon = alert.querySelector('svg');
      expect(icon).toBeInTheDocument();

      rerender(<Alert variant="error">Error</Alert>);
      alert = screen.getByRole('alert');
      icon = alert.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('deve ter data-alert-content no conteúdo', () => {
      render(<Alert>Conteúdo do alerta</Alert>);

      const contentElement = screen.getByText('Conteúdo do alerta');
      expect(contentElement).toHaveAttribute('data-alert-content');
    });

    it('deve aceitar className customizada', () => {
      render(<Alert className="custom-class">Mensagem</Alert>);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('custom-class');
    });

    it('deve renderizar conteúdo complexo (ReactNode)', () => {
      render(
        <Alert>
          <strong>Texto em negrito</strong> e <em>texto em itálico</em>
        </Alert>
      );

      expect(screen.getByText('Texto em negrito')).toBeInTheDocument();
      expect(screen.getByText('texto em itálico')).toBeInTheDocument();
    });

    it('deve renderizar título como ReactNode', () => {
      render(
        <Alert title={<strong>Título em negrito</strong>}>
          Conteúdo
        </Alert>
      );

      expect(screen.getByText('Título em negrito')).toBeInTheDocument();
    });
  });

  describe('Estrutura e Layout', () => {
    it('deve ter estrutura correta com ícone, conteúdo e botão de fechar', () => {
      const onDismiss = vi.fn();
      render(
        <Alert isDismissible onDismiss={onDismiss} title="Título">
          Conteúdo
        </Alert>
      );

      const alert = screen.getByRole('alert');
      
      // Verificar que tem ícone
      const icon = alert.querySelector('svg[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();

      // Verificar que tem título
      expect(screen.getByText('Título')).toBeInTheDocument();

      // Verificar que tem conteúdo
      expect(screen.getByText('Conteúdo')).toBeInTheDocument();

      // Verificar que tem botão de fechar
      const closeButton = screen.getByLabelText(/fechar alerta/i);
      expect(closeButton).toBeInTheDocument();
    });

    it('deve aplicar classes de variante corretas ao ícone', () => {
      const { rerender } = render(<Alert variant="info">Info</Alert>);
      let alert = screen.getByRole('alert');
      let icon = alert.querySelector('svg');
      expect(icon).toHaveClass('text-[#007BFF]');

      rerender(<Alert variant="success">Success</Alert>);
      alert = screen.getByRole('alert');
      icon = alert.querySelector('svg');
      expect(icon).toHaveClass('text-[#00C853]');

      rerender(<Alert variant="warning">Warning</Alert>);
      alert = screen.getByRole('alert');
      icon = alert.querySelector('svg');
      expect(icon).toHaveClass('text-[#FF9500]');

      rerender(<Alert variant="error">Error</Alert>);
      alert = screen.getByRole('alert');
      icon = alert.querySelector('svg');
      expect(icon).toHaveClass('text-[#FF4444]');
    });

    it('deve aplicar classes de variante corretas ao botão de fechar', () => {
      const onDismiss = vi.fn();
      const { rerender } = render(
        <Alert variant="info" isDismissible onDismiss={onDismiss}>
          Info
        </Alert>
      );
      let closeButton = screen.getByLabelText(/fechar alerta/i);
      expect(closeButton).toHaveClass('text-[#007BFF]');

      rerender(
        <Alert variant="success" isDismissible onDismiss={onDismiss}>
          Success
        </Alert>
      );
      closeButton = screen.getByLabelText(/fechar alerta/i);
      expect(closeButton).toHaveClass('text-[#00C853]');

      rerender(
        <Alert variant="warning" isDismissible onDismiss={onDismiss}>
          Warning
        </Alert>
      );
      closeButton = screen.getByLabelText(/fechar alerta/i);
      expect(closeButton).toHaveClass('text-[#FF9500]');

      rerender(
        <Alert variant="error" isDismissible onDismiss={onDismiss}>
          Error
        </Alert>
      );
      closeButton = screen.getByLabelText(/fechar alerta/i);
      expect(closeButton).toHaveClass('text-[#FF4444]');
    });
  });
});

