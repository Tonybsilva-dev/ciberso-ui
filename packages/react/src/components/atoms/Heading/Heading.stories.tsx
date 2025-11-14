import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';
import { Text as TextComponent } from '../Text/Text';

const meta: Meta<typeof Heading> = {
  title: 'Atoms/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente de título que renderiza tags de cabeçalho HTML (h1-h6) com estilos consistentes.',
      },
    },
  },
  args: {
    level: 1,
    weight: 'bold',
    color: 'default',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Conteúdo do título',
    },
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Nível do cabeçalho (1-6)',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Tamanho da fonte (opcional, usa padrão baseado no level se não especificado)',
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'bold'],
      description: 'Peso da fonte',
      table: {
        defaultValue: { summary: 'bold' },
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
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

/**
 * Story básica - Heading h1
 */
export const Default: Story = {
  args: {
    children: 'Título Principal',
    level: 1,
  },
};

/**
 * Story - Todos os níveis (h1-h6)
 */
export const AllLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={1}>Heading Level 1 (h1)</Heading>
      <Heading level={2}>Heading Level 2 (h2)</Heading>
      <Heading level={3}>Heading Level 3 (h3)</Heading>
      <Heading level={4}>Heading Level 4 (h4)</Heading>
      <Heading level={5}>Heading Level 5 (h5)</Heading>
      <Heading level={6}>Heading Level 6 (h6)</Heading>
    </div>
  ),
};

/**
 * Story - Heading com cores diferentes
 */
export const WithColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={1} color="default">
        Título padrão
      </Heading>
      <Heading level={2} color="primary">
        Título primário
      </Heading>
      <Heading level={3} color="success">
        Título de sucesso
      </Heading>
      <Heading level={4} color="error">
        Título de erro
      </Heading>
      <Heading level={5} color="warning">
        Título de aviso
      </Heading>
    </div>
  ),
};

/**
 * Story - Heading com tamanhos customizados
 */
export const CustomSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={1} size="2xl">
        H1 com tamanho 2xl
      </Heading>
      <Heading level={2} size="xl">
        H2 com tamanho xl
      </Heading>
      <Heading level={3} size="lg">
        H3 com tamanho lg
      </Heading>
      <Heading level={4} size="md">
        H4 com tamanho md
      </Heading>
    </div>
  ),
};

/**
 * Story - Heading com diferentes pesos
 */
export const WithWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={2} weight="regular">
        Heading regular
      </Heading>
      <Heading level={2} weight="medium">
        Heading medium
      </Heading>
      <Heading level={2} weight="bold">
        Heading bold
      </Heading>
    </div>
  ),
};

/**
 * Story - Exemplo de hierarquia de títulos
 */
export const Hierarchy: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
      <Heading level={1}>Título Principal da Página</Heading>
      <TextComponent size="md" color="muted">
        Descrição ou subtítulo do conteúdo principal.
      </TextComponent>

      <Heading level={2}>Seção Importante</Heading>
      <TextComponent size="md">
        Conteúdo da seção importante com informações relevantes.
      </TextComponent>

      <Heading level={3}>Subseção</Heading>
      <TextComponent size="sm" color="muted">
        Detalhes adicionais da subseção.
      </TextComponent>

      <Heading level={4}>Tópico Específico</Heading>
      <TextComponent size="sm">
        Informações específicas sobre o tópico.
      </TextComponent>
    </div>
  ),
};

