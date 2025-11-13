/**
 * Label Stories - Storybook stories para o componente Label
 * Formato CSF 3 conforme documentação atualizada do Storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { Input } from '../Input/Input';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Label acessível com React Aria. Pode ser usado de forma independente ou em conjunto com campos de formulário.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Conteúdo do label',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do label',
    },
    isRequired: {
      control: 'boolean',
      description: 'Se o campo associado é obrigatório',
    },
    elementType: {
      control: 'select',
      options: ['label', 'span'],
      description: 'Elemento HTML usado para renderizar o label',
    },
    htmlFor: {
      control: 'text',
      description: 'ID do campo associado (quando usando elemento label)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

/**
 * Story básica - Label simples
 */
export const Default: Story = {
  args: {
    children: 'Nome',
  },
};

/**
 * Story - Label obrigatório
 */
export const Required: Story = {
  args: {
    children: 'Email',
    isRequired: true,
  },
};

/**
 * Story - Label pequeno
 */
export const Small: Story = {
  args: {
    children: 'Campo pequeno',
    size: 'sm',
  },
};

/**
 * Story - Label médio
 */
export const Medium: Story = {
  args: {
    children: 'Campo médio',
    size: 'md',
  },
};

/**
 * Story - Label grande
 */
export const Large: Story = {
  args: {
    children: 'Campo grande',
    size: 'lg',
  },
};

/**
 * Story - Label como span (para casos especiais)
 */
export const AsSpan: Story = {
  args: {
    children: 'Label como span',
    elementType: 'span',
  },
};

/**
 * Story - Label associado a Input
 */
export const WithInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
      <Label htmlFor="email-input" isRequired>
        Email
      </Label>
      <Input id="email-input" placeholder="seu@email.com" type="email" />
    </div>
  ),
};

/**
 * Story - Label com Input usando useLabel (associação automática)
 */
export const WithInputAuto: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
      <Label>Nome completo</Label>
      <Input placeholder="Digite seu nome" />
    </div>
  ),
};

/**
 * Story - Todos os tamanhos
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <div>
        <Label size="sm">Label pequeno</Label>
        <Input size="sm" placeholder="Input pequeno" />
      </div>
      <div>
        <Label size="md">Label médio</Label>
        <Input size="md" placeholder="Input médio" />
      </div>
      <div>
        <Label size="lg">Label grande</Label>
        <Input size="lg" placeholder="Input grande" />
      </div>
    </div>
  ),
};

/**
 * Story - Label com Input obrigatório
 */
export const RequiredWithInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
      <Label htmlFor="required-input" isRequired>
        Campo obrigatório
      </Label>
      <Input id="required-input" placeholder="Este campo é obrigatório" isRequired />
    </div>
  ),
};

/**
 * Story - Label com Input e descrição
 */
export const WithInputAndDescription: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
      <Label htmlFor="password-input" isRequired>
        Senha
      </Label>
      <Input
        id="password-input"
        type="password"
        placeholder="Digite sua senha"
        description="A senha deve ter pelo menos 8 caracteres"
        isRequired
      />
    </div>
  ),
};

