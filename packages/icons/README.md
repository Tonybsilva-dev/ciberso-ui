# @ciberso/icons

Biblioteca de ícones do Ciberso-UI Design System baseada no Material Icons (Filled) do Google.

## Instalação

O pacote já está configurado no monorepo. Para instalar dependências:

```bash
pnpm install
```

## Uso

### Download de Ícones

Para baixar Material Icons (Filled) do Google Fonts:

```bash
pnpm run download:material
```

Este comando:
- Obtém a lista de ícones disponíveis da API do Google Fonts
- Baixa os SVGs dos primeiros 50 ícones (ajustável no script)
- Salva os arquivos em `src/svg/material-filled/`

### Build de Ícones

Para converter os SVGs baixados em componentes React:

```bash
pnpm run build:icons
```

Este comando:
- Lê todos os SVGs de `src/svg/`
- Otimiza os SVGs usando SVGO
- Converte em componentes React TypeScript usando SVGR
- Gera exports automáticos em `src/index.ts`
- Salva os componentes em `src/icons/`

### Uso nos Componentes

Após o build, você pode importar e usar os ícones:

```tsx
import { AddIcon, DeleteIcon } from '@ciberso/icons';

function MyComponent() {
  return (
    <div>
      <AddIcon className="w-5 h-5 text-blue-500" />
      <DeleteIcon className="w-5 h-5 text-red-500" />
    </div>
  );
}
```

## Estrutura

```
packages/icons/
├── scripts/
│   ├── download-material-icons.js  # Script para baixar ícones
│   ├── build-icons.js               # Script para converter SVG → React
│   └── generate-exports.js          # Script para gerar exports
├── src/
│   ├── svg/                         # SVGs baixados
│   │   └── material-filled/         # Material Icons (Filled)
│   ├── icons/                       # Componentes React gerados
│   └── index.ts                     # Exports (gerado automaticamente)
└── package.json
```

## Referências

- [Material Icons - Google Fonts](https://fonts.google.com/icons?icon.set=Material+Icons&icon.style=Filled)
- [Material Design Icons - GitHub](https://github.com/google/material-design-icons)
- [SVGO Documentation](https://github.com/svg/svgo)
- [SVGR Documentation](https://github.com/gregberge/svgr)

