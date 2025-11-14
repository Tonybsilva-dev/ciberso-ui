/**
 * Button Stories - Storybook stories para o componente Button
 * Formato CSF 3 conforme documentação atualizada do Storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Add, Delete, Close, Check, ArrowForward, Save, Edit, Search } from '@ciberso/icons';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Botão acessível com React Aria. Suporta variantes primary (azul), secondary (cinza), ghost, outline e danger, com opção de ícones.',
      },
    },
  },
  args: {
    size: 'md',
    variant: 'primary',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Conteúdo do botão',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline', 'danger'],
      description: 'Variante visual do botão',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do botão',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    leftIcon: {
      control: false,
      description: 'Ícone à esquerda do texto',
    },
    rightIcon: {
      control: false,
      description: 'Ícone à direita do texto',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Se true, renderiza apenas o ícone (botão icon-only)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Se o botão está desabilitado',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Story básica - Button primary
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Story - Button secondary
 */
export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'md',
  },
};

/**
 * Story - Button ghost
 */
export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
    size: 'md',
  },
};

/**
 * Story - Button outline
 */
export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
    size: 'md',
  },
};

/**
 * Story - Button danger
 */
export const Danger: Story = {
  args: {
    children: 'Button',
    variant: 'danger',
    size: 'md',
  },
};

/**
 * Story - Button desabilitado
 */
export const Disabled: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    isDisabled: true,
  },
};

/**
 * Story - Todos os tamanhos
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * Story - Todas as variantes
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

/**
 * Story - Button com ícone à esquerda
 */
export const WithLeftIcon: Story = {
  render: () => (
    <Button leftIcon={<Add className="w-4 h-4" />}>
      Adicionar
    </Button>
  ),
};

/**
 * Story - Button com ícone à direita
 */
export const WithRightIcon: Story = {
  render: () => (
    <Button rightIcon={<ArrowForward className="w-4 h-4" />}>
      Continuar
    </Button>
  ),
};

/**
 * Story - Button icon-only
 */
export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Button iconOnly rightIcon={<Add className="w-5 h-5" />} aria-label="Adicionar" />
      <Button iconOnly rightIcon={<Close className="w-5 h-5" />} aria-label="Fechar" variant="secondary" />
      <Button iconOnly rightIcon={<Check className="w-5 h-5" />} aria-label="Confirmar" variant="ghost" />
      <Button iconOnly rightIcon={<Add className="w-5 h-5" />} aria-label="Adicionar" variant="outline" />
      <Button iconOnly rightIcon={<Delete className="w-5 h-5" />} aria-label="Excluir" variant="danger" />
    </div>
  ),
};

/**
 * Story - Button com ícone e texto
 */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <Button leftIcon={<Add className="w-4 h-4" />}>
        Adicionar Item
      </Button>
      <Button rightIcon={<ArrowForward className="w-4 h-4" />}>
        Próximo Passo
      </Button>
      <Button leftIcon={<Save className="w-4 h-4" />} rightIcon={<ArrowForward className="w-4 h-4" />}>
        Salvar e Continuar
      </Button>
      <Button leftIcon={<Edit className="w-4 h-4" />} variant="secondary">
        Editar
      </Button>
      <Button leftIcon={<Search className="w-4 h-4" />} variant="ghost">
        Buscar
      </Button>
      <Button leftIcon={<Delete className="w-4 h-4" />} variant="danger">
        Excluir
      </Button>
    </div>
  ),
};

