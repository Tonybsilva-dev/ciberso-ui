/**
 * Input Stories - Storybook stories para o componente Input
 * Formato CSF 3 conforme documentação atualizada do Storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Campo de texto acessível com React Aria. Suporta label, descrição, validação e estados de erro.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label do campo de texto',
    },
    description: {
      control: 'text',
      description: 'Descrição ou hint do campo',
    },
    errorMessage: {
      control: 'text',
      description: 'Mensagem de erro exibida quando o campo é inválido',
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder do input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'search'],
      description: 'Tipo do input HTML',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do input',
    },
    isRequired: {
      control: 'boolean',
      description: 'Se o campo é obrigatório',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Se o campo está desabilitado',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Se o campo é somente leitura',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Se o campo é inválido',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * Story básica - Input com label
 */
export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    type: 'email',
  },
};

/**
 * Story - Input com placeholder
 */
export const WithPlaceholder: Story = {
  args: {
    label: 'Nome',
    placeholder: 'Digite seu nome completo',
    type: 'text',
  },
};

/**
 * Story - Input desabilitado
 */
export const Disabled: Story = {
  args: {
    label: 'Campo Desabilitado',
    placeholder: 'Este campo está desabilitado',
    type: 'text',
    isDisabled: true,
    defaultValue: 'Valor pré-definido',
  },
};

/**
 * Story - Input com valor pré-definido
 */
export const WithValue: Story = {
  args: {
    label: 'Nome',
    type: 'text',
    defaultValue: 'João Silva',
  },
};

/**
 * Story - Input obrigatório
 */
export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    type: 'email',
    isRequired: true,
  },
};

/**
 * Story - Input com descrição
 */
export const WithDescription: Story = {
  args: {
    label: 'Senha',
    type: 'password',
    description: 'A senha deve ter pelo menos 8 caracteres',
    isRequired: true,
  },
};

/**
 * Story - Input com erro
 */
export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    type: 'email',
    isInvalid: true,
    errorMessage: 'Por favor, insira um email válido',
  },
};

/**
 * Story - Input somente leitura
 */
export const ReadOnly: Story = {
  args: {
    label: 'ID do Usuário',
    type: 'text',
    defaultValue: 'USR-12345',
    isReadOnly: true,
  },
};

/**
 * Story - Input de busca
 */
export const Search: Story = {
  args: {
    label: 'Buscar',
    placeholder: 'Digite sua busca...',
    type: 'search',
  },
};

/**
 * Story - Input de telefone
 */
export const Phone: Story = {
  args: {
    label: 'Telefone',
    placeholder: '(00) 00000-0000',
    type: 'tel',
  },
};

/**
 * Story - Input de URL
 */
export const URL: Story = {
  args: {
    label: 'Website',
    placeholder: 'https://exemplo.com',
    type: 'url',
  },
};

/**
 * Story - Todos os tamanhos
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <Input label="Pequeno" placeholder="Tamanho pequeno" size="sm" />
      <Input label="Médio" placeholder="Tamanho médio" size="md" />
      <Input label="Grande" placeholder="Tamanho grande" size="lg" />
    </div>
  ),
};

