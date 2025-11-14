# Guia de Theming - Ciberso-UI Design System

Este guia explica como o sistema de theming do Ciberso-UI funciona e como você pode estender e customizar temas seguindo o padrão shadcn/ui.

## Visão Geral

O Ciberso-UI utiliza um sistema de variáveis CSS baseado no padrão shadcn/ui, priorizando o formato de cor **OKLCH** para compatibilidade com Tailwind CSS v4, mantendo suporte a HSL como alternativa para Tailwind v3.

## Estrutura de Variáveis CSS

Todas as variáveis de tema são definidas no arquivo `packages/theme/src/globals.css` e seguem a nomenclatura do shadcn/ui:

### Cores Semânticas

- `--background`: Cor de fundo principal
- `--foreground`: Cor do texto principal
- `--primary`: Cor primária da marca
- `--primary-foreground`: Cor do texto sobre o primário
- `--secondary`: Cor secundária
- `--secondary-foreground`: Cor do texto sobre o secundário
- `--muted`: Cor para elementos sutis
- `--muted-foreground`: Cor do texto sobre elementos muted
- `--accent`: Cor de destaque
- `--accent-foreground`: Cor do texto sobre accent
- `--destructive`: Cor para ações destrutivas
- `--destructive-foreground`: Cor do texto sobre destructive
- `--border`: Cor das bordas
- `--input`: Cor das bordas de inputs
- `--ring`: Cor do anel de foco

### Componentes Específicos

- `--card`: Cor de fundo de cards
- `--card-foreground`: Cor do texto em cards
- `--popover`: Cor de fundo de popovers
- `--popover-foreground`: Cor do texto em popovers
- `--sidebar`: Cor de fundo da sidebar
- `--sidebar-foreground`: Cor do texto na sidebar
- `--sidebar-primary`: Cor primária da sidebar
- `--sidebar-accent`: Cor de destaque da sidebar
- `--sidebar-border`: Cor das bordas da sidebar
- `--sidebar-ring`: Cor do anel de foco da sidebar

### Cores de Gráficos

- `--chart-1` até `--chart-5`: Cores para gráficos e visualizações

### Outros Tokens

- `--font-sans`: Família de fonte sans-serif
- `--font-serif`: Família de fonte serif
- `--font-mono`: Família de fonte monospace
- `--radius`: Raio de borda base
- `--shadow-*`: Sombras (2xs, xs, sm, md, lg, xl, 2xl)
- `--tracking-normal`: Espaçamento entre letras
- `--spacing`: Unidade base de espaçamento

## Formato de Cores: OKLCH vs HSL

### OKLCH (Preferencial - Tailwind v4)

O formato OKLCH oferece melhor consistência visual e é o formato preferencial para Tailwind CSS v4:

```css
:root {
  --primary: oklch(0.6171 0.1375 39.0427);
}
```

**Vantagens:**

- Melhor consistência perceptual
- Suporte nativo no Tailwind v4
- Melhor para acessibilidade (contraste mais previsível)

### HSL (Fallback - Tailwind v3)

Para projetos usando Tailwind v3, você pode usar HSL:

```css
:root {
  --primary-hsl: 194.2 100% 30.6%;
}
```

E no `tailwind-preset.ts`, alterar de:

```typescript
primary: {
  DEFAULT: 'oklch(var(--primary))',
}
```

Para:

```typescript
primary: {
  DEFAULT: 'hsl(var(--primary-hsl))',
}
```

## Como Usar as Cores nos Componentes

### Com Classes Tailwind

```tsx
// Usando cores semânticas
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Botão Primário
  </button>
</div>

// Usando cores de componentes
<Card className="bg-card text-card-foreground">
  Conteúdo do Card
</Card>
```

### Com Variáveis CSS Diretamente

```tsx
<div style={{ backgroundColor: 'oklch(var(--primary))' }}>
  Conteúdo
</div>
```

## Customizando o Tema

### 1. Sobrescrever Variáveis CSS

Crie um arquivo CSS no seu projeto e importe após o `globals.css`:

```css
/* meu-tema.css */
:root {
  --primary: oklch(0.7 0.2 250); /* Sua cor primária customizada */
  --radius: 0.75rem; /* Raio de borda maior */
}

.dark {
  --primary: oklch(0.8 0.15 250);
}
```

```tsx
// No seu layout ou ponto de entrada
import '@ciberso/theme/globals.css';
import './meu-tema.css';
```

### 2. Adicionar Novas Cores

Para adicionar novas cores seguindo o padrão shadcn/ui:

```css
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}

.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}

@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

E no `tailwind-preset.ts`:

```typescript
colors: {
  // ... cores existentes
  warning: {
    DEFAULT: 'oklch(var(--warning))',
    foreground: 'oklch(var(--warning-foreground))',
  },
}
```

### 3. Estender o Preset do Tailwind

Você pode estender o preset do Ciberso-UI no seu `tailwind.config.js`:

```javascript
const { cibersoThemePreset } = require('@ciberso/theme/tailwind');

module.exports = {
  presets: [cibersoThemePreset],
  theme: {
    extend: {
      colors: {
        // Suas cores customizadas
        brand: {
          DEFAULT: 'oklch(var(--primary))',
          light: 'oklch(var(--accent))',
        },
      },
    },
  },
};
```

## Dark Mode

O dark mode é controlado pela classe `.dark` no elemento raiz:

```tsx
// Adicionar dark mode
document.documentElement.classList.add('dark');

// Remover dark mode
document.documentElement.classList.remove('dark');

// Alternar dark mode
document.documentElement.classList.toggle('dark');
```

### Com React

```tsx
import { useEffect, useState } from 'react';

function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return [isDark, setIsDark] as const;
}
```

## @theme inline (Tailwind v4)

O arquivo `globals.css` inclui a diretiva `@theme inline` que registra automaticamente todas as variáveis CSS como tokens do Tailwind v4. Isso significa que você pode usar as cores diretamente sem precisar configurá-las no `tailwind.config.js`:

```tsx
// Funciona automaticamente com Tailwind v4
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Botão
  </button>
</div>
```

## Retrocompatibilidade

Para garantir uma transição suave, o preset mantém as cores antigas do Ciberso-UI:

```tsx
// Ainda funciona (mas recomendamos migrar)
<div className="bg-ciberso-royal-blue-500">
  Conteúdo
</div>

// Nova forma recomendada
<div className="bg-primary">
  Conteúdo
</div>
```

## Migração de Componentes

Para migrar componentes existentes para o novo sistema:

1. **Substitua cores específicas por cores semânticas:**

   ```tsx
   // Antes
   className="bg-ciberso-royal-blue-500 text-white"
   
   // Depois
   className="bg-primary text-primary-foreground"
   ```

2. **Use variáveis de border radius:**

   ```tsx
   // Antes
   className="rounded-md"
   
   // Depois (usa --radius do tema)
   className="rounded-lg"
   ```

3. **Use variáveis de sombra:**

   ```tsx
   // Antes
   className="shadow-lg"
   
   // Depois (usa --shadow-lg do tema)
   className="shadow-lg"
   ```

## Exemplos Completos

### Exemplo 1: Botão Customizado

```tsx
import { Button } from '@ciberso/react';

function CustomButton() {
  return (
    <Button 
      className="bg-primary hover:bg-primary/90 text-primary-foreground"
    >
      Clique aqui
    </Button>
  );
}
```

### Exemplo 2: Card com Tema Customizado

```tsx
function CustomCard() {
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md p-6">
      <h2 className="text-foreground font-bold">Título</h2>
      <p className="text-muted-foreground">Descrição</p>
    </div>
  );
}
```

### Exemplo 3: Tema Completamente Customizado

```css
/* custom-theme.css */
:root {
  /* Sobrescrever cores principais */
  --primary: oklch(0.65 0.2 120); /* Verde */
  --primary-foreground: oklch(1 0 0); /* Branco */
  
  /* Customizar radius */
  --radius: 1rem;
  
  /* Customizar fontes */
  --font-sans: 'Inter', sans-serif;
}

.dark {
  --primary: oklch(0.75 0.18 120);
  --primary-foreground: oklch(0.1 0 0);
}
```

## Referências

- [shadcn/ui Theming Documentation](https://ui.shadcn.com/docs/theming)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [OKLCH Color Format](https://oklch.com/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

## Suporte

Para dúvidas ou problemas relacionados ao theming, consulte a documentação do projeto ou abra uma issue no repositório.
