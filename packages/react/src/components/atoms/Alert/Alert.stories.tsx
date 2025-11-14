/**
 * Alert Stories - Storybook stories para o componente Alert
 * Formato CSF 3 conforme documentação atualizada do Storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { useState } from 'react';

const meta: Meta<typeof Alert> = {
  title: 'Atoms/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente de alerta para exibir mensagens importantes com variantes de status (info, success, warning, error). Suporta ícones dinâmicos baseados na variante e botão de fechar opcional.',
      },
    },
  },
  args: {
    variant: 'info',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Conteúdo do alerta',
    },
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Variante visual do alerta (status)',
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    title: {
      control: 'text',
      description: 'Título do alerta (opcional)',
    },
    isDismissible: {
      control: 'boolean',
      description: 'Se true, exibe um botão de fechar',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback chamado quando o botão de fechar é clicado',
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

/**
 * Story básica - Alert info
 */
export const Default: Story = {
  args: {
    children: 'Esta é uma mensagem informativa.',
  },
};

/**
 * Story - Alert com título
 */
export const WithTitle: Story = {
  args: {
    title: 'Informação Importante',
    children: 'Esta é uma mensagem informativa com título.',
  },
};

/**
 * Story - Alert success
 */
export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Sucesso!',
    children: 'Operação realizada com sucesso.',
  },
};

/**
 * Story - Alert warning
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Atenção',
    children: 'Por favor, verifique as informações antes de continuar.',
  },
};

/**
 * Story - Alert error
 */
export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Erro',
    children: 'Ocorreu um erro ao processar sua solicitação. Tente novamente.',
  },
};

/**
 * Story - Alert dismissible (com botão de fechar)
 */
export const Dismissible: Story = {
  render: (args) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
      return <div style={{ padding: '1rem' }}>Alerta foi fechado.</div>;
    }

    return (
      <Alert
        {...args}
        isDismissible
        onDismiss={() => setIsVisible(false)}
      />
    );
  },
  args: {
    variant: 'info',
    title: 'Alerta Dismissible',
    children: 'Este alerta pode ser fechado clicando no botão X.',
  },
};

/**
 * Story - Todas as variantes
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
      <Alert variant="info" title="Informação">
        Esta é uma mensagem informativa.
      </Alert>
      <Alert variant="success" title="Sucesso!">
        Operação realizada com sucesso.
      </Alert>
      <Alert variant="warning" title="Atenção">
        Por favor, verifique as informações antes de continuar.
      </Alert>
      <Alert variant="error" title="Erro">
        Ocorreu um erro ao processar sua solicitação.
      </Alert>
    </div>
  ),
};

/**
 * Story - Alert dismissible em todas as variantes
 */
export const AllVariantsDismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState({
      info: true,
      success: true,
      warning: true,
      error: true,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
        {visible.info && (
          <Alert
            variant="info"
            title="Informação"
            isDismissible
            onDismiss={() => setVisible((prev) => ({ ...prev, info: false }))}
          >
            Esta é uma mensagem informativa.
          </Alert>
        )}
        {visible.success && (
          <Alert
            variant="success"
            title="Sucesso!"
            isDismissible
            onDismiss={() => setVisible((prev) => ({ ...prev, success: false }))}
          >
            Operação realizada com sucesso.
          </Alert>
        )}
        {visible.warning && (
          <Alert
            variant="warning"
            title="Atenção"
            isDismissible
            onDismiss={() => setVisible((prev) => ({ ...prev, warning: false }))}
          >
            Por favor, verifique as informações antes de continuar.
          </Alert>
        )}
        {visible.error && (
          <Alert
            variant="error"
            title="Erro"
            isDismissible
            onDismiss={() => setVisible((prev) => ({ ...prev, error: false }))}
          >
            Ocorreu um erro ao processar sua solicitação.
          </Alert>
        )}
      </div>
    );
  },
};

/**
 * Story - Alert sem título
 */
export const WithoutTitle: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
      <Alert variant="info">
        Esta é uma mensagem informativa sem título.
      </Alert>
      <Alert variant="success">
        Operação realizada com sucesso.
      </Alert>
      <Alert variant="warning">
        Por favor, verifique as informações antes de continuar.
      </Alert>
      <Alert variant="error">
        Ocorreu um erro ao processar sua solicitação.
      </Alert>
    </div>
  ),
};

/**
 * Story - Alert com conteúdo longo
 */
export const LongContent: Story = {
  args: {
    variant: 'warning',
    title: 'Atenção: Conteúdo Longo',
    children: 'Este é um exemplo de alerta com conteúdo mais extenso. Ele demonstra como o componente se comporta quando há mais texto para exibir. O componente deve manter a legibilidade e o layout consistente mesmo com mensagens longas.',
  },
};

