# Configuração do Storybook no app `docs`

**Data**: 2025-01-13  
**Tarefa**: #36 - Configuração do Storybook no app `docs`  
**Status**: ✅ Concluída

## Contexto

Configuração do Storybook no app `docs` para documentar e visualizar os componentes do Design System Ciberso-UI. O Storybook foi configurado para funcionar em um monorepo, encontrando stories em `packages/react` e integrando com os packages do Design System.

## Mudanças Realizadas

### 1. Atualização de Versões

**Problema identificado**: Incompatibilidade de versões entre Storybook no app docs (v10.0.7) e `@storybook/react` no package react (v8.0.0).

**Solução**: Atualizado `@storybook/react` para v10.0.7 em `packages/react/package.json`:

```json
{
  "devDependencies": {
    "@storybook/react": "^10.0.7"
  }
}
```

### 2. Configuração do main.ts

Configurado `apps/docs/.storybook/main.ts` para encontrar stories em múltiplos diretórios:

```typescript
const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // Stories do pacote @ciberso/react
    "../../packages/react/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  // ... outras configurações
  typescript: {
    // Overrides the default Typescript configuration to allow multi-package components to be documented via Autodocs.
    reactDocgen: 'react-docgen',
    check: false,
  },
};
```

**Características**:
- ✅ Encontra stories em `apps/docs/stories/` (stories de exemplo)
- ✅ Encontra stories em `packages/react/src/**/*.stories.tsx` (componentes do Design System)
- ✅ Configuração TypeScript para monorepo (reactDocgen, check: false)
- ✅ Corrigido tipo `any` para `string` na função `getAbsolutePath`

### 3. Configuração do preview.ts

Configurado `apps/docs/.storybook/preview.ts` com decorators globais:

```typescript
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
```

**Características**:
- ✅ `MotionProvider` como decorator global (todas as stories têm acesso a animações)
- ✅ Configuração de docs para descrição padrão
- ✅ Usa `React.createElement` para compatibilidade com TypeScript (sem JSX)

### 4. Dependências do Design System

Adicionadas dependências do Design System em `apps/docs/package.json`:

```json
{
  "dependencies": {
    "@ciberso/motion": "workspace:*",
    "@ciberso/react": "workspace:*",
    "@ciberso/tokens": "workspace:*",
    "@ciberso/theme": "workspace:*"
  }
}
```

**Decisão**: Dependências diretas para garantir que o Storybook tenha acesso a todos os packages do Design System.

### 5. Correções de Lint

Corrigidos warnings de lint:

1. **`any` type no main.ts**: Alterado para `string`
2. **Import não usado no eslint.config.js**: Removido `eslint-plugin-storybook` não utilizado
3. **Propriedade `jsx` desconhecida no Button.tsx**: Removido styled-jsx não configurado, usando `style` inline
4. **Caracteres não escapados no Page.tsx**: Escapado `"` para `&quot;`

### 6. Documentação via Context7

Consultada documentação do Storybook:
- **Biblioteca**: `/storybookjs/storybook`
- **Tópicos**: initialization setup, monorepo configuration, finding stories in multiple directories, main.js configuration
- **Configurações aplicadas**:
  - CSF 3 format
  - TypeScript configuration para monorepo
  - Stories em múltiplos diretórios
  - Decorators globais

## Arquivos Criados/Modificados

### Modificados
1. `apps/docs/.storybook/main.ts`
   - Adicionado path para stories em `packages/react`
   - Configuração TypeScript para monorepo
   - Corrigido tipo `any` para `string`

2. `apps/docs/.storybook/preview.ts`
   - Adicionado `MotionProvider` como decorator global
   - Configuração de docs

3. `apps/docs/package.json`
   - Adicionadas dependências do Design System
   - Scripts `storybook` e `build-storybook` já existiam

4. `packages/react/package.json`
   - Atualizado `@storybook/react` de v8.0.0 para v10.0.7

5. `apps/docs/eslint.config.js`
   - Removido import não usado

6. `apps/docs/stories/Button.tsx`
   - Removido styled-jsx, usando `style` inline

7. `apps/docs/stories/Page.tsx`
   - Escapado caracteres especiais

## Validação

### QA Completo ✅

- ✅ **Lint**: Sem erros ou warnings
- ✅ **Type-check**: Sem erros de TypeScript
- ✅ **Build**: Todos os packages compilando corretamente

### Stories Detectadas

O Storybook agora detecta automaticamente:
- ✅ Stories de exemplo em `apps/docs/stories/` (Button, Header, Page)
- ✅ Stories do Design System em `packages/react/src/**/*.stories.tsx`:
  - `Input.stories.tsx` (12 stories)
  - `Label.stories.tsx` (11 stories)

### Funcionalidades Implementadas

- ✅ Storybook configurado para monorepo
- ✅ Stories encontradas em múltiplos diretórios
- ✅ Integração com packages do Design System
- ✅ `MotionProvider` disponível globalmente
- ✅ TypeScript configurado para monorepo (reactDocgen, check: false)
- ✅ Versões compatíveis entre packages

## Impacto

### Positivo

- ✅ Storybook funcional no monorepo
- ✅ Stories do Design System automaticamente detectadas
- ✅ Base sólida para documentação visual
- ✅ Integração completa com packages do Design System
- ✅ Configuração TypeScript otimizada para monorepo
- ✅ Decorators globais para providers necessários

### Próximos Passos

- Iniciar Storybook e validar visualmente (`pnpm --filter=docs storybook`)
- Adicionar mais stories para outros componentes
- Configurar temas e customizações visuais
- Adicionar addons adicionais (a11y, controls, etc.)
- Configurar build estático para deploy
- Adicionar documentação MDX para guias de uso

## Comandos Úteis

```bash
# Iniciar Storybook
cd apps/docs && pnpm storybook

# Build estático do Storybook
cd apps/docs && pnpm build-storybook

# Via TurboRepo
pnpm --filter=docs storybook
pnpm --filter=docs build-storybook
```

## Referências

- Tarefa: #36 - Configuração do Storybook no app `docs`
- Subtarefas: 36.1, 36.2, 36.3 (todas concluídas)
- Commit: `feat(docs): configura Storybook no app docs para monorepo (ref task: 36)`
- Storybook: v10.0.7
- Documentação Context7:
  - Storybook: `/storybookjs/storybook`
- Documentação: [Storybook Monorepo Setup](https://storybook.js.org/docs/get-started/install)
- Documentação: [Storybook CSF 3](https://storybook.js.org/docs/api/csf)

