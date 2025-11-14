import type { StorybookConfig } from '@storybook/nextjs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

// Calcular caminho absoluto para stories do monorepo
// currentDir = apps/docs/.storybook
// ../.. = apps (errado)
// ../../.. = root do projeto (correto)
const currentDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(currentDir, '../../..');
const reactStoriesPath = join(projectRoot, 'packages/react/src/**/*.stories.@(js|jsx|mjs|ts|tsx)');

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    // Stories do pacote @ciberso/react (caminho absoluto)
    reactStoriesPath,
  ],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  staticDirs: ['../public'],
  typescript: {
    // Overrides the default Typescript configuration to allow multi-package components to be documented via Autodocs.
    reactDocgen: 'react-docgen',
    check: false,
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      // Adicionar node_modules do projeto root e packages
      config.resolve.modules = [
        ...(config.resolve.modules || []),
        join(projectRoot, 'node_modules'),
        join(projectRoot, 'packages'),
        'node_modules',
      ];
      
      // Alias para packages do monorepo (usando caminhos absolutos)
      config.resolve.alias = {
        ...config.resolve.alias,
        '@ciberso/react': join(projectRoot, 'packages/react/src'),
        '@ciberso/motion': join(projectRoot, 'packages/motion/src'),
        '@ciberso/tokens': join(projectRoot, 'packages/tokens/src'),
        '@ciberso/theme': join(projectRoot, 'packages/theme/src'),
      };
      
      // Garantir que symlinks sejam resolvidos (importante para pnpm workspaces)
      config.resolve.symlinks = true;
    }
    return config;
  },
};

export default config;