# Análise da Referência Visual - Design System

**Data**: 2025-01-13  
**Referência**: UI Component Library/Design System

## Identidade Visual Extraída

### 1. **Cores Principais**

#### Primary (Azul)
- **Filled Buttons**: `#007BFF` (azul royal)
- **Outlined Buttons**: Borda `#007BFF`, texto `#007BFF`, fundo transparente
- **Ícones**: Azul `#007BFF` em fundo branco com borda cinza clara

#### Secondary (Cinza)
- **Filled Buttons**: Cinza médio `#6B7280`
- **Outlined Buttons**: Borda cinza, texto cinza, fundo transparente

#### Backgrounds
- **Cards**: Fundo branco `#FFFFFF` ou cinza muito claro `#F9FAFB`
- **Inputs**: Fundo branco `#FFFFFF` com borda cinza `#E5E7EB`
- **Hover States**: Cinza claro `#F3F4F6`

#### Text
- **Primary Text**: Preto `#111827` ou cinza escuro `#1F2937`
- **Secondary Text**: Cinza médio `#6B7280`
- **Muted Text**: Cinza claro `#9CA3AF`

### 2. **Bordas e Sombras**

#### Bordas
- **Cards**: Borda sutil `#E5E7EB` (cinza claro)
- **Inputs**: Borda `#E5E7EB` com foco em `#007BFF`
- **Buttons Outlined**: Borda `1px solid` com cor do tema

#### Sombras
- **Cards**: Sombra sutil (`shadow-sm`)
- **Elevação**: Sombras leves para profundidade

### 3. **Espaçamento**

#### Padding
- **Buttons**: `px-4 py-2` (médio), `px-3 py-1.5` (pequeno), `px-6 py-3` (grande)
- **Cards**: `px-6 py-4` (header/footer), `px-6 py-4` (body)
- **Inputs**: `px-4 py-2`

#### Gaps
- **Grid de Cards**: `1.5rem` (24px)
- **Elementos internos**: `0.5rem` (8px) a `1rem` (16px)

### 4. **Tipografia**

#### Tamanhos
- **Buttons**: `text-sm` (14px) para médio, `text-base` (16px) para grande
- **Headings**: Hierarquia clara (h1 maior, h6 menor)
- **Body Text**: `text-sm` (14px) ou `text-base` (16px)

#### Pesos
- **Buttons**: `font-medium` (500)
- **Headings**: `font-bold` (700) ou `font-semibold` (600)
- **Body**: `font-normal` (400)

### 5. **Componentes Específicos**

#### Buttons
- **Filled Primary**: Fundo `#007BFF`, texto branco, ícone branco
- **Filled Secondary**: Fundo cinza, texto branco
- **Outlined**: Borda colorida, fundo transparente, texto colorido
- **Icon Only**: Circular, ícone centralizado
- **Com Ícones**: Ícone à esquerda ou direita do texto

#### Cards
- **Fundo**: Branco `#FFFFFF`
- **Borda**: `#E5E7EB` (cinza claro)
- **Sombra**: Sutil (`shadow-sm`)
- **Arredondamento**: `rounded-lg` (8px)

#### Inputs
- **Fundo**: Branco `#FFFFFF`
- **Borda**: `#E5E7EB` (cinza claro)
- **Placeholder**: Cinza `#9CA3AF`
- **Foco**: Borda `#007BFF` (azul)

#### Tags/Badges
- **Fundo**: Branco com borda colorida
- **Texto**: Cor do tema
- **Remoção**: Ícone 'x' na cor do tema

### 6. **Estados Interativos**

#### Hover
- **Buttons Filled**: Escurecer cor de fundo (~10-15% mais escuro)
- **Buttons Outlined**: Fundo com opacidade baixa da cor do tema
- **Cards**: Elevação sutil (sombra)

#### Active/Pressed
- **Buttons**: Escurecer ainda mais (~20% mais escuro)
- **Scale**: Leve redução (`scale: 0.98`)

#### Focus
- **Inputs**: Borda `#007BFF` com ring de foco
- **Buttons**: Ring de foco na cor do tema

#### Disabled
- **Opacity**: `0.5` ou `0.6`
- **Cursor**: `not-allowed`

### 7. **Ícones**

#### Tamanhos
- **Buttons Small**: `16px` (w-4 h-4)
- **Buttons Medium**: `20px` (w-5 h-5)
- **Buttons Large**: `24px` (w-6 h-6)

#### Cores
- **Primary Buttons**: Branco `#FFFFFF`
- **Outlined Buttons**: Cor do tema (azul `#007BFF`)
- **Icon Buttons**: Cor do tema em fundo branco com borda

### 8. **Adaptação para Tema Ciberso**

Para manter a identidade visual da referência mas adaptar ao tema Ciberso:

#### Cores Adaptadas
- **Primary**: Manter `#007BFF` (royalBlue[500])
- **Background Cards**: Adaptar para `#0A192F` (darkBlue[500]) - fundo escuro
- **Bordas**: Adaptar para neon `#00F6FF/30` (ciano com opacidade)
- **Texto**: Adaptar para `#E0FFFF` (ciano claro) em fundo escuro
- **Sombras**: Adaptar para sombras com brilho neon

#### Mantendo a Estrutura
- **Espaçamento**: Manter os mesmos valores
- **Tipografia**: Manter hierarquia e tamanhos
- **Componentes**: Manter estrutura composicional
- **Estados**: Adaptar cores mas manter comportamento

## Próximos Passos

1. ✅ Adicionar `isAnimated` ao Card (concluído)
2. Atualizar tokens de cor para refletir referência + tema Ciberso
3. Adaptar componentes existentes para seguir padrões da referência
4. Criar variantes de componentes conforme referência (outlined, filled, etc.)

