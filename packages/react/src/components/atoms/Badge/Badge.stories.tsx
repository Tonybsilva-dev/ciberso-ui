/**
 * Badge Stories - Storybook stories para o componente Badge
 * Formato CSF 3 conforme documentação atualizada do Storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente de badge para exibir status ou informações curtas. Suporta variantes de cor baseadas nos tokens semânticos do Ciberso-UI.',
      },
    },
  },
  args: {
    variant: 'info',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Conteúdo do badge',
    },
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Variante visual do badge',
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Story básica - Badge info
 */
export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'info',
  },
};

/**
 * Story - Badge success
 */
export const Success: Story = {
  args: {
    children: 'Ativo',
    variant: 'success',
  },
};

/**
 * Story - Badge warning
 */
export const Warning: Story = {
  args: {
    children: 'Atenção',
    variant: 'warning',
  },
};

/**
 * Story - Badge error
 */
export const Error: Story = {
  args: {
    children: 'Erro',
    variant: 'error',
  },
};

/**
 * Story - Todas as variantes
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      <Badge variant="info">Info</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
    </div>
  ),
};

/**
 * Story - Exemplos de uso com texto
 */
export const WithText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Status:</span>
        <Badge variant="success">Online</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Status:</span>
        <Badge variant="error">Offline</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Status:</span>
        <Badge variant="warning">Manutenção</Badge>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Status:</span>
        <Badge variant="info">Novo</Badge>
      </div>
    </div>
  ),
};

