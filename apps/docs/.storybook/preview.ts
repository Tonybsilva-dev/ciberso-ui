import type { Preview } from '@storybook/nextjs';
import React from 'react';
import { ThemeProvider } from '@ciberso/theme';
import { MotionProvider } from '@ciberso/motion';
// Importar CSS do theme diretamente (além do preview.css que usa @import)
import '@ciberso/theme/globals.css';
import './preview.css';

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
  decorators: [
    (Story) =>
      React.createElement(
        MotionProvider,
        {},
        React.createElement(
          ThemeProvider,
          {},
          React.createElement(Story),
        ),
      ),
  ],
};

export default preview;