import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente de texto reutilizável que aplica tokens de tipografia de forma consistente.',
      },
    },
  },
  args: {
    size: 'md',
    weight: 'regular',
    color: 'default',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Conteúdo do texto',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Tamanho da fonte',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'bold'],
      description: 'Peso da fonte',
      table: {
        defaultValue: { summary: 'regular' },
      },
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'success', 'error', 'warning'],
      description: 'Cor do texto',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div'],
      description: 'Elemento HTML usado para renderizar o texto',
      table: {
        defaultValue: { summary: 'p' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

/**
 * Story básica - Text padrão
 */
export const Default: Story = {
  args: {
    children: 'Texto padrão do Ciberso-UI',
    size: 'md',
    weight: 'regular',
    color: 'default',
  },
};

/**
 * Story - Todos os tamanhos
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text size="xs">Texto extra pequeno (xs)</Text>
      <Text size="sm">Texto pequeno (sm)</Text>
      <Text size="md">Texto médio (md)</Text>
      <Text size="lg">Texto grande (lg)</Text>
      <Text size="xl">Texto extra grande (xl)</Text>
      <Text size="2xl">Texto 2x grande (2xl)</Text>
    </div>
  ),
};

/**
 * Story - Todos os pesos
 */
export const AllWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text weight="regular">Texto regular (400)</Text>
      <Text weight="medium">Texto medium (500)</Text>
      <Text weight="bold">Texto bold (700)</Text>
    </div>
  ),
};

/**
 * Story - Todas as cores
 */
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text color="default">Texto padrão (default)</Text>
      <Text color="muted">Texto secundário (muted)</Text>
      <Text color="primary">Texto primário (primary)</Text>
      <Text color="success">Texto de sucesso (success)</Text>
      <Text color="error">Texto de erro (error)</Text>
      <Text color="warning">Texto de aviso (warning)</Text>
    </div>
  ),
};

/**
 * Story - Text como span
 */
export const AsSpan: Story = {
  args: {
    children: 'Texto renderizado como <span>',
    as: 'span',
  },
};

/**
 * Story - Text como div
 */
export const AsDiv: Story = {
  args: {
    children: 'Texto renderizado como <div>',
    as: 'div',
  },
};

/**
 * Story - Combinações de variantes
 */
export const Combinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Text size="lg" weight="bold" color="primary">
        Título destacado
      </Text>
      <Text size="md" weight="regular" color="default">
        Texto de corpo padrão
      </Text>
      <Text size="sm" weight="medium" color="muted">
        Texto secundário menor
      </Text>
      <Text size="xl" weight="bold" color="success">
        Mensagem de sucesso grande
      </Text>
      <Text size="sm" weight="regular" color="error">
        Mensagem de erro pequena
      </Text>
    </div>
  ),
};

