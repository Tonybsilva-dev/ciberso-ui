/**
 * Card Stories - Storybook stories para o componente Card
 * Formato CSF 3 conforme documentação atualizada do Storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Heading } from '../../atoms/Heading';
import { Text } from '../../atoms/Text';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente de card composicional com sub-componentes (CardHeader, CardBody, CardFooter) para estrutura flexível. Suporta animações opcionais via prop `isAnimated`.',
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: 'Conteúdo do card (geralmente CardHeader, CardBody, CardFooter)',
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais',
    },
    isAnimated: {
      control: 'boolean',
      description: 'Se true, aplica animações de hover e tap',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * Story básica - Card simples
 */
export const Default: Story = {
  args: {
    isAnimated: false,
  },
  render: (args) => (
    <div style={{ padding: '2rem', backgroundColor: '#020506' }}>
      <Card {...args}>
        <CardBody>
          <Text color="default" style={{ color: '#E0FFFF' }}>
            Este é um card simples com apenas o corpo.
          </Text>
        </CardBody>
      </Card>
    </div>
  ),
};

/**
 * Story - Card com animações
 */
export const Animated: Story = {
  args: {
    isAnimated: true,
  },
  render: (args) => (
    <div style={{ padding: '2rem', backgroundColor: '#020506' }}>
      <Card {...args}>
        <CardBody>
          <Text color="default" style={{ color: '#E0FFFF' }}>
            Este card tem animações de hover e tap ativadas. Passe o mouse e clique para ver.
          </Text>
        </CardBody>
      </Card>
    </div>
  ),
};

/**
 * Story - Card completo com todas as seções
 */
export const Complete: Story = {
  args: {
    isAnimated: false,
  },
  render: (args) => (
    <div style={{ padding: '2rem', backgroundColor: '#020506' }}>
      <Card {...args}>
        <CardHeader>
          <Heading level={3} color="primary" style={{ color: '#00F6FF' }}>
            Título do Card
          </Heading>
        </CardHeader>
        <CardBody>
          <Text style={{ color: '#E0FFFF' }}>
            Este é o conteúdo principal do card. Pode conter qualquer tipo de conteúdo,
            incluindo texto, imagens, formulários, etc.
          </Text>
        </CardBody>
        <CardFooter>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="primary">Salvar</Button>
            <Button variant="secondary">Cancelar</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  ),
};

/**
 * Story - Card apenas com Header e Body
 */
export const HeaderAndBody: Story = {
  args: {
    isAnimated: false,
  },
  render: (args) => (
    <div style={{ padding: '2rem', backgroundColor: '#020506' }}>
      <Card {...args}>
        <CardHeader>
          <Heading level={3} color="primary" style={{ color: '#00F6FF' }}>
            Card sem Footer
          </Heading>
        </CardHeader>
        <CardBody>
          <Text style={{ color: '#E0FFFF' }}>
            Este card não possui rodapé, apenas cabeçalho e corpo.
          </Text>
        </CardBody>
      </Card>
    </div>
  ),
};

/**
 * Story - Card apenas com Body e Footer
 */
export const BodyAndFooter: Story = {
  args: {
    isAnimated: false,
  },
  render: (args) => (
    <div style={{ padding: '2rem', backgroundColor: '#020506' }}>
      <Card {...args}>
        <CardBody>
          <Text style={{ color: '#E0FFFF' }}>
            Este card não possui cabeçalho, apenas corpo e rodapé.
          </Text>
        </CardBody>
        <CardFooter>
          <Button variant="primary">Ação</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

/**
 * Story - Card apenas com Body
 */
export const BodyOnly: Story = {
  args: {
    isAnimated: false,
  },
  render: (args) => (
    <div style={{ padding: '2rem', backgroundColor: '#020506' }}>
      <Card {...args}>
        <CardBody>
          <Text style={{ color: '#E0FFFF' }}>
            Card minimalista com apenas o corpo, sem cabeçalho ou rodapé.
          </Text>
        </CardBody>
      </Card>
    </div>
  ),
};

/**
 * Story - Múltiplos cards em grid
 */
export const Grid: Story = {
  args: {
    isAnimated: false,
  },
  render: (args) => (
    <div style={{ 
      padding: '2rem',
      backgroundColor: '#020506',
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
      gap: '1.5rem' 
    }}>
      <Card {...args}>
        <CardHeader>
          <Heading level={4} color="primary" style={{ color: '#00F6FF' }}>
            Card 1
          </Heading>
        </CardHeader>
        <CardBody>
          <Text size="sm" style={{ color: '#E0FFFF' }}>
            Conteúdo do primeiro card.
          </Text>
        </CardBody>
      </Card>
      <Card {...args}>
        <CardHeader>
          <Heading level={4} color="primary" style={{ color: '#00F6FF' }}>
            Card 2
          </Heading>
        </CardHeader>
        <CardBody>
          <Text size="sm" style={{ color: '#E0FFFF' }}>
            Conteúdo do segundo card.
          </Text>
        </CardBody>
      </Card>
      <Card {...args}>
        <CardHeader>
          <Heading level={4} color="primary" style={{ color: '#00F6FF' }}>
            Card 3
          </Heading>
        </CardHeader>
        <CardBody>
          <Text size="sm" style={{ color: '#E0FFFF' }}>
            Conteúdo do terceiro card.
          </Text>
        </CardBody>
      </Card>
    </div>
  ),
};

/**
 * Story - Card com conteúdo complexo
 */
export const ComplexContent: Story = {
  args: {
    isAnimated: false,
  },
  render: (args) => (
    <div style={{ padding: '2rem', backgroundColor: '#020506' }}>
      <Card {...args}>
      <CardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Heading level={3} color="primary" style={{ color: '#00F6FF' }}>
            Card com Conteúdo Complexo
          </Heading>
          <Button variant="ghost" size="sm">Ações</Button>
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Text style={{ color: '#E0FFFF' }}>
            Este card demonstra como diferentes tipos de conteúdo podem ser organizados
            dentro de um card usando os sub-componentes.
          </Text>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#1E293B', 
            borderRadius: '0.5rem',
            border: '1px solid rgba(0, 246, 255, 0.2)'
          }}>
            <Text size="sm" style={{ color: '#B0FFFF' }}>
              Área de conteúdo destacado
            </Text>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text size="sm" style={{ color: '#80FFFF' }}>
            Última atualização: hoje
          </Text>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="outline" size="sm">Editar</Button>
            <Button variant="primary" size="sm">Salvar</Button>
          </div>
        </div>
      </CardFooter>
      </Card>
    </div>
  ),
};

