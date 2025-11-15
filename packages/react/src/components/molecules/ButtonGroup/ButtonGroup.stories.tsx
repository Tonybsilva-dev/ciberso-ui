/**
 * ButtonGroup Stories - Storybook stories para o componente ButtonGroup
 * Formato CSF 3 conforme documentação atualizada do Storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Add, Delete, Close, Check, ArrowForward, Search } from '@ciberso/icons';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente que agrupa botões e inputs em um grupo visualmente conectado. Remove bordas internas e aplica bordas arredondadas apenas nas extremidades.',
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: 'Elementos filhos (Button, Input, etc.)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do grupo (afeta os elementos filhos)',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

/**
 * Story básica - Grupo de botões
 */
export const Default: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Pequeno</Button>
      <Button variant="outline">Botão</Button>
      <Button variant="outline">Grupo</Button>
      <Button variant="outline" iconOnly rightIcon={<Add className="w-5 h-5" />} aria-label="Adicionar" />
    </ButtonGroup>
  ),
};

/**
 * Story - Tamanhos
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}>Extra Pequeno</div>
        <ButtonGroup size="xs">
          <Button variant="outline" size="xs">Extra</Button>
          <Button variant="outline" size="xs">Pequeno</Button>
          <Button variant="outline" size="xs">Botão</Button>
          <Button variant="outline" size="xs" iconOnly rightIcon={<Add className="w-3 h-3" />} aria-label="Adicionar" />
        </ButtonGroup>
      </div>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}>Pequeno</div>
        <ButtonGroup size="sm">
          <Button variant="outline" size="sm">Pequeno</Button>
          <Button variant="outline" size="sm">Botão</Button>
          <Button variant="outline" size="sm">Grupo</Button>
          <Button variant="outline" size="sm" iconOnly rightIcon={<Add className="w-4 h-4" />} aria-label="Adicionar" />
        </ButtonGroup>
      </div>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}>Padrão</div>
        <ButtonGroup size="md">
          <Button variant="outline" size="md">Padrão</Button>
          <Button variant="outline" size="md">Botão</Button>
          <Button variant="outline" size="md">Grupo</Button>
          <Button variant="outline" size="md" iconOnly rightIcon={<Add className="w-5 h-5" />} aria-label="Adicionar" />
        </ButtonGroup>
      </div>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}>Grande</div>
        <ButtonGroup size="lg">
          <Button variant="outline" size="lg">Grande</Button>
          <Button variant="outline" size="lg">Botão</Button>
          <Button variant="outline" size="lg">Grupo</Button>
          <Button variant="outline" size="lg" iconOnly rightIcon={<Add className="w-6 h-6" />} aria-label="Adicionar" />
        </ButtonGroup>
      </div>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: 'bold' }}>Extra Grande</div>
        <ButtonGroup size="xl">
          <Button variant="outline" size="xl">Extra</Button>
          <Button variant="outline" size="xl">Grande</Button>
          <Button variant="outline" size="xl">Botão</Button>
          <Button variant="outline" size="xl" iconOnly rightIcon={<Add className="w-7 h-7" />} aria-label="Adicionar" />
        </ButtonGroup>
      </div>
    </div>
  ),
};

/**
 * Story - Variantes de botões
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ButtonGroup>
        <Button variant="primary">Primário</Button>
        <Button variant="primary">Segundo</Button>
        <Button variant="primary">Terceiro</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary">Secundário</Button>
        <Button variant="secondary">Segundo</Button>
        <Button variant="secondary">Terceiro</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Outline</Button>
        <Button variant="outline">Segundo</Button>
        <Button variant="outline">Terceiro</Button>
      </ButtonGroup>
    </div>
  ),
};

/**
 * Story - Input com botão (busca)
 */
export const WithInput: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <ButtonGroup>
        <Input placeholder="Buscar..." size="md" />
        <Button variant="outline" size="md" iconOnly rightIcon={<Search className="w-5 h-5" />} aria-label="Buscar" />
      </ButtonGroup>
    </div>
  ),
};

/**
 * Story - Apenas dois botões
 */
export const TwoButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Anterior</Button>
      <Button variant="outline">Próximo</Button>
    </ButtonGroup>
  ),
};

/**
 * Story - Botões com ícones
 */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ButtonGroup>
        <Button variant="outline" leftIcon={<Add className="w-5 h-5" />}>Adicionar</Button>
        <Button variant="outline" leftIcon={<Delete className="w-5 h-5" />}>Remover</Button>
        <Button variant="outline" leftIcon={<Check className="w-5 h-5" />}>Confirmar</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" iconOnly rightIcon={<Add className="w-5 h-5" />} aria-label="Adicionar" />
        <Button variant="outline" iconOnly rightIcon={<Delete className="w-5 h-5" />} aria-label="Remover" />
        <Button variant="outline" iconOnly rightIcon={<Close className="w-5 h-5" />} aria-label="Fechar" />
      </ButtonGroup>
    </div>
  ),
};

/**
 * Story - Navegação
 */
export const Navigation: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" leftIcon={<ArrowForward className="w-5 h-5 rotate-180" />}>Anterior</Button>
      <Button variant="outline">1</Button>
      <Button variant="outline">2</Button>
      <Button variant="outline">3</Button>
      <Button variant="outline" rightIcon={<ArrowForward className="w-5 h-5" />}>Próximo</Button>
    </ButtonGroup>
  ),
};

