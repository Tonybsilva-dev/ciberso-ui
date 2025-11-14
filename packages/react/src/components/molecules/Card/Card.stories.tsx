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
        component: 'Componente de card composicional com sub-componentes (CardHeader, CardBody, CardFooter) para estrutura flexível.',
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
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * Story básica - Card simples
 */
export const Default: Story = {
  render: () => (
    <Card>
      <CardBody>
        <Text>Este é um card simples com apenas o corpo.</Text>
      </CardBody>
    </Card>
  ),
};

/**
 * Story - Card completo com todas as seções
 */
export const Complete: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <Heading level={3}>Título do Card</Heading>
      </CardHeader>
      <CardBody>
        <Text>
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
  ),
};

/**
 * Story - Card apenas com Header e Body
 */
export const HeaderAndBody: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <Heading level={3}>Card sem Footer</Heading>
      </CardHeader>
      <CardBody>
        <Text>
          Este card não possui rodapé, apenas cabeçalho e corpo.
        </Text>
      </CardBody>
    </Card>
  ),
};

/**
 * Story - Card apenas com Body e Footer
 */
export const BodyAndFooter: Story = {
  render: () => (
    <Card>
      <CardBody>
        <Text>
          Este card não possui cabeçalho, apenas corpo e rodapé.
        </Text>
      </CardBody>
      <CardFooter>
        <Button variant="primary">Ação</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Story - Card apenas com Body
 */
export const BodyOnly: Story = {
  render: () => (
    <Card>
      <CardBody>
        <Text>
          Card minimalista com apenas o corpo, sem cabeçalho ou rodapé.
        </Text>
      </CardBody>
    </Card>
  ),
};

/**
 * Story - Múltiplos cards em grid
 */
export const Grid: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
      gap: '1.5rem' 
    }}>
      <Card>
        <CardHeader>
          <Heading level={4}>Card 1</Heading>
        </CardHeader>
        <CardBody>
          <Text size="sm">Conteúdo do primeiro card.</Text>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Heading level={4}>Card 2</Heading>
        </CardHeader>
        <CardBody>
          <Text size="sm">Conteúdo do segundo card.</Text>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Heading level={4}>Card 3</Heading>
        </CardHeader>
        <CardBody>
          <Text size="sm">Conteúdo do terceiro card.</Text>
        </CardBody>
      </Card>
    </div>
  ),
};

/**
 * Story - Card com conteúdo complexo
 */
export const ComplexContent: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Heading level={3}>Card com Conteúdo Complexo</Heading>
          <Button variant="ghost" size="sm">Ações</Button>
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Text>
            Este card demonstra como diferentes tipos de conteúdo podem ser organizados
            dentro de um card usando os sub-componentes.
          </Text>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#F3F4F6', 
            borderRadius: '0.5rem' 
          }}>
            <Text size="sm" color="muted">
              Área de conteúdo destacado
            </Text>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text size="sm" color="muted">Última atualização: hoje</Text>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="outline" size="sm">Editar</Button>
            <Button variant="primary" size="sm">Salvar</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  ),
};

