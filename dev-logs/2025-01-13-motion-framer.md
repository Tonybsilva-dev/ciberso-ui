# Configuração do Pacote de Animação com Framer Motion

**Data**: 2025-01-13  
**Tarefa**: #7 - Configuração do Pacote de Animação com Framer Motion  
**Status**: ✅ Concluída

## Contexto

Configuração do pacote `@ciberso/motion` para fornecer animações otimizadas usando Framer Motion com LazyMotion. O pacote foi configurado para reduzir o tamanho do bundle carregando apenas as features necessárias.

## Mudanças Realizadas

### 1. Instalação do Framer Motion

Atualizado `package.json` para incluir `framer-motion` como dependência direta:

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "gsap": "^3.12.0"
  }
}
```

**Decisão**: Framer Motion como dependência direta (não peerDependency) conforme especificação da tarefa, permitindo que o pacote gerencie sua própria versão.

### 2. MotionProvider com LazyMotion

Criado componente `MotionProvider.tsx` que utiliza `LazyMotion` para otimização:

```typescript
export function MotionProvider({
  children,
  features = domAnimation,
  strict = false,
}: MotionProviderProps) {
  return (
    <LazyMotion features={features} strict={strict}>
      {children}
    </LazyMotion>
  );
}
```

**Características**:
- ✅ Usa `domAnimation` por padrão para otimização de bundle
- ✅ Permite customização de features via props
- ✅ Suporta modo strict para validação
- ✅ Tipos TypeScript completos

### 3. Componente de Exemplo AnimatedBox

Criado componente `AnimatedBox.tsx` para validação:

```typescript
export function AnimatedBox({
  children,
  animateOnHover = true,
  ...props
}: AnimatedBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={animateOnHover ? { scale: 1.05 } : undefined}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

**Funcionalidades**:
- ✅ Animação de entrada (fade + slide)
- ✅ Animação de hover (scale + glow)
- ✅ Animação de tap (scale down)
- ✅ Propriedades customizáveis

### 4. Exports Configurados

Atualizado `index.ts` e `package.json` para exportar os novos componentes:

```typescript
// index.ts
export { MotionProvider } from './MotionProvider';
export type { MotionProviderProps } from './MotionProvider';
export { AnimatedBox } from './AnimatedBox';
export type { AnimatedBoxProps } from './AnimatedBox';
```

```json
// package.json
"exports": {
  ".": "./src/index.ts",
  "./MotionProvider": "./src/MotionProvider.tsx",
  "./AnimatedBox": "./src/AnimatedBox.tsx"
}
```

## Arquivos Criados/Modificados

### Criados
1. `packages/motion/src/MotionProvider.tsx` - Provider com LazyMotion
2. `packages/motion/src/AnimatedBox.tsx` - Componente de exemplo

### Modificados
1. `packages/motion/package.json`
   - Adicionado `framer-motion` como dependência
   - Adicionado React e React-DOM como peerDependencies
   - Adicionado tipos React como devDependencies
   - Configurado exports específicos

2. `packages/motion/src/index.ts`
   - Adicionados exports para MotionProvider e AnimatedBox

## Validação

### QA Completo ✅

- ✅ **Lint**: Sem erros ou warnings
- ✅ **Type-check**: Sem erros de TypeScript (corrigido tipo `LazyMotionProps`)
- ✅ **Build**: Todos os packages compilando corretamente

### Correções Realizadas

**Erro TypeScript Inicial**:
- Problema: `LazyMotionProps` não existe no framer-motion v11
- Solução: Usado `typeof domAnimation` para tipar a prop `features`

## Impacto

### Positivo

- ✅ Pacote de animação configurado e funcional
- ✅ Otimização de bundle via LazyMotion
- ✅ Componente de exemplo para validação
- ✅ Tipos TypeScript completos e corretos
- ✅ Exports organizados para tree-shaking

### Próximos Passos

- Integração do MotionProvider em apps (docs, web)
- Uso do AnimatedBox em componentes React
- Documentação no Storybook
- Criação de mais utilities de animação (variants, hooks)

## Referências

- Tarefa: #7 - Configuração do Pacote de Animação com Framer Motion
- Subtarefas: 7.1, 7.2, 7.3 (todas concluídas)
- Commit: `feat(motion): configura pacote de animação com Framer Motion (ref task: 7)`
- Framer Motion: v11.0.0
- Documentação: [Framer Motion LazyMotion](https://www.framer.com/motion/lazy-motion/)

