import type { Preview } from '@storybook/nextjs';

// Importação dinâmica para evitar problemas de resolução no webpack
// O MotionProvider será adicionado quando necessário nas stories individuais
// ou via webpackFinal se necessário

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      description: {
        component: 'Componentes do Ciberso-UI Design System',
      },
    },
  },
  // Decorators serão adicionados quando o webpack resolver corretamente os módulos
  // decorators: [
  //   (Story) =>
  //     React.createElement(
  //       MotionProvider,
  //       {},
  //       React.createElement(Story),
  //     ),
  // ],
};

export default preview;