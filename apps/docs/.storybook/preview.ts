import type { Preview } from '@storybook/nextjs';
import React from 'react';
import { MotionProvider } from '@ciberso/motion';

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
        React.createElement(Story),
      ),
  ],
};

export default preview;