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

    // Configurar PostCSS para Tailwind v3
    if (config.module && config.module.rules) {
      const postcssConfigPath = join(currentDir, '../postcss.config.mjs');
      
      // Função recursiva para processar regras (incluindo oneOf)
      const processRule = (rule: any) => {
        if (!rule || typeof rule !== 'object') return;
        
        // Processar oneOf se existir
        if (Array.isArray(rule.oneOf)) {
          rule.oneOf.forEach(processRule);
          return;
        }
        
        // Verificar se é regra CSS
        if (!rule.test || !rule.test.toString().includes('css')) return;
        
        // Processar use array
        if (Array.isArray(rule.use)) {
          // Configurar postcss-loader
          const postcssLoader = rule.use.find(
            (loader: any) => {
              if (!loader || typeof loader !== 'object') return false;
              const loaderPath = loader.loader || loader;
              return typeof loaderPath === 'string' && loaderPath.includes('postcss-loader');
            }
          );
          
          if (postcssLoader) {
            postcssLoader.options = {
              ...(postcssLoader.options || {}),
              postcssOptions: {
                config: postcssConfigPath,
              },
            };
          } else {
            // Se não encontrou postcss-loader, pode ser que precise adicionar
            // Mas primeiro vamos apenas garantir que o config está sendo usado
            console.log('[Storybook] PostCSS loader não encontrado na regra CSS');
          }
        }
      };
      
      // Processar todas as regras
      config.module.rules.forEach(processRule);
    }

    return config;
  },
};

export default config;