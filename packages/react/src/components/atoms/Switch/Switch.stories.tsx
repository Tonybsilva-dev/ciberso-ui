/**
 * Switch Stories - Storybook stories para o componente Switch
 * Formato CSF 3 conforme documentação atualizada do Storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Switch/toggle acessível com React Aria. Suporta tamanhos sm, md, lg e estados checked/unchecked.',
      },
    },
  },
  args: {
    size: 'md',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Label do switch (opcional)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do switch',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    isSelected: {
      control: 'boolean',
      description: 'Se o switch está selecionado (checked)',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Se o switch está desabilitado',
    },
    onChange: {
      control: false,
      description: 'Callback chamado quando o estado muda',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/**
 * Story básica - Switch controlado
 */
export const Default: Story = {
  render: () => {
    const [isSelected, setIsSelected] = useState(false);
    return (
      <Switch isSelected={isSelected} onChange={setIsSelected}>
        Habilitar notificações
      </Switch>
    );
  },
};

/**
 * Story - Switch sem label
 */
export const WithoutLabel: Story = {
  render: () => {
    const [isSelected, setIsSelected] = useState(false);
    return <Switch isSelected={isSelected} onChange={setIsSelected} />;
  },
};

/**
 * Story - Switch desabilitado
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch isSelected={false} isDisabled>
        Desabilitado (unchecked)
      </Switch>
      <Switch isSelected={true} isDisabled>
        Desabilitado (checked)
      </Switch>
    </div>
  ),
};

/**
 * Story - Todos os tamanhos
 */
export const AllSizes: Story = {
  render: () => {
    const [smSelected, setSmSelected] = useState(false);
    const [mdSelected, setMdSelected] = useState(false);
    const [lgSelected, setLgSelected] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Switch size="sm" isSelected={smSelected} onChange={setSmSelected}>
          Pequeno (sm)
        </Switch>
        <Switch size="md" isSelected={mdSelected} onChange={setMdSelected}>
          Médio (md)
        </Switch>
        <Switch size="lg" isSelected={lgSelected} onChange={setLgSelected}>
          Grande (lg)
        </Switch>
      </div>
    );
  },
};

/**
 * Story - Estados checked/unchecked
 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch isSelected={false}>Desligado (unchecked)</Switch>
      <Switch isSelected={true}>Ligado (checked)</Switch>
    </div>
  ),
};

/**
 * Story - Exemplos de uso
 */
export const Examples: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [autoSave, setAutoSave] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
        <Switch isSelected={notifications} onChange={setNotifications}>
          Receber notificações por email
        </Switch>
        <Switch isSelected={darkMode} onChange={setDarkMode}>
          Modo escuro
        </Switch>
        <Switch isSelected={autoSave} onChange={setAutoSave}>
          Salvar automaticamente
        </Switch>
      </div>
    );
  },
};

