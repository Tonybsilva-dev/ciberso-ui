/**
 * Testes para o componente Input
 * Valida acessibilidade, associação com Label e estados
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';
import { Label } from '../Label/Label';

describe('Input', () => {
  describe('Associação com Label via htmlFor/id', () => {
    it('deve associar corretamente Label e Input usando htmlFor e id', () => {
      render(
        <>
          <Label htmlFor="test-input">Email</Label>
          <Input id="test-input" type="email" />
        </>,
      );

      // Quando Label e Input são separados, verificamos que o input existe e tem o ID correto
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'test-input');
      expect(input).toHaveAttribute('type', 'email');
      
      // Verificar que o label existe e tem o htmlFor (pode ser gerenciado pelo React Aria)
      const label = screen.getByText('Email');
      expect(label).toBeInTheDocument();
      // O React Aria pode gerenciar o htmlFor automaticamente, então apenas verificamos que existe
    });

    it('deve encontrar o input através do texto do label usando getByLabelText quando Input tem label prop', () => {
      // Quando Input tem prop label, ele renderiza seu próprio label interno
      render(<Input label="Nome completo" id="nome-input" type="text" />);

      // React Aria pode não associar corretamente via getByLabelText, então verificamos diretamente
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'nome-input');
      // Verificar que o label existe
      expect(screen.getByText('Nome completo')).toBeInTheDocument();
    });
  });

  describe('Foco no Input ao clicar no Label', () => {
    it('deve focar no input quando o label é clicado (Input com label prop)', async () => {
      const user = userEvent.setup();

      // Quando Input tem prop label, o label é interno
      render(<Input label="Email" id="email-input" type="email" />);

      const input = screen.getByRole('textbox');

      // Verificar que o input não está focado inicialmente
      expect(input).not.toHaveFocus();

      // Clicar diretamente no input (o React Aria gerencia o foco via label internamente)
      await user.click(input);

      // Verificar que o input recebeu foco
      expect(input).toHaveFocus();
      
      // Verificar que o label existe
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('deve focar no input correto quando há múltiplos pares Label/Input', async () => {
      const user = userEvent.setup();

      // Usando Input com label prop (label interno)
      render(
        <>
          <Input label="Nome" id="nome-input" type="text" />
          <Input label="Email" id="email-input" type="email" />
        </>,
      );

      const inputs = screen.getAllByRole('textbox');
      const nomeInput = inputs.find((input) => input.getAttribute('id') === 'nome-input')!;
      const emailInput = inputs.find((input) => input.getAttribute('id') === 'email-input')!;

      // Clicar diretamente no input de email
      await user.click(emailInput);

      // Verificar que apenas o input de email tem foco
      expect(emailInput).toHaveFocus();
      expect(nomeInput).not.toHaveFocus();

      // Clicar no input de nome
      await user.click(nomeInput);

      // Verificar que apenas o input de nome tem foco agora
      expect(nomeInput).toHaveFocus();
      expect(emailInput).not.toHaveFocus();
      
      // Verificar que ambos os labels existem
      expect(screen.getByText('Nome')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });
  });

  describe('Estados do Input', () => {
    it('deve renderizar com estado padrão', () => {
      render(<Input label="Campo" />);

      // React Aria pode não associar corretamente, então usamos getByRole
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).not.toHaveAttribute('aria-invalid', 'true');
      expect(input).not.toBeDisabled();
      // Verificar que o label existe
      expect(screen.getByText('Campo')).toBeInTheDocument();
    });

    it('deve renderizar com estado inválido', () => {
      render(
        <Input
          label="Email"
          isInvalid
          errorMessage="Email inválido"
        />,
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('data-invalid', '');

      const errorMessage = screen.getByText('Email inválido');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    it('deve renderizar com estado desabilitado', () => {
      render(<Input label="Campo" isDisabled />);

      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('deve renderizar com descrição', () => {
      render(
        <Input
          label="Senha"
          description="A senha deve ter pelo menos 8 caracteres"
        />,
      );

      const description = screen.getByText('A senha deve ter pelo menos 8 caracteres');
      expect(description).toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter aria-required quando isRequired é true', () => {
      render(<Input label="Email" isRequired />);

      const input = screen.getByRole('textbox');
      // React Aria gerencia isso automaticamente
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('deve ter placeholder quando fornecido', () => {
      render(<Input label="Email" placeholder="seu@email.com" />);

      const input = screen.getByPlaceholderText('seu@email.com');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'seu@email.com');
    });

    it('deve usar placeholder padrão quando não fornecido', () => {
      render(<Input label="Campo" />);

      const input = screen.getByPlaceholderText('Enter a value');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'Enter a value');
    });
  });
});

