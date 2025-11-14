# Análise de Referência - Design System Ciberso-UI

**Data**: 2025-01-13  
**Fonte**: Referência visual de Design System completo  
**Objetivo**: Extrair padrões, componentes, estados e estruturas para implementação no Ciberso-UI

---

## 📦 Componentes Identificados

### 1. **Buttons (Botões)**

#### Variantes Identificadas:
- **Primary**: Fundo azul, texto branco
- **Secondary**: Fundo cinza, texto branco
- **Com Ícone**: Botão com ícone "+" à direita do texto
- **Icon Only**: Apenas ícone "+" em quadrado azul

#### Estados:
- Default (normal)
- Hover (implícito)
- Disabled (implícito)
- Active/Pressed (implícito)

#### Padrões de Implementação:
```tsx
// Estrutura sugerida para Button
<Button variant="primary" size="md" icon="plus" iconPosition="right">
  btn_text
</Button>

<Button variant="primary" iconOnly>
  <PlusIcon />
</Button>
```

---

### 2. **Profile Picture / Select Components**

#### Características:
- **Profile Picture**: Texto com seta (direita/baixo) ou dropdown arrow
- **Select**: Texto com ícone de diamante ou sem ícone
- **Estados**: Active, Default, Disabled

#### Padrões:
- Dropdown arrows indicam estado aberto/fechado
- Setas direcionais indicam navegação ou expansão
- Ícones opcionais (diamante) para diferenciação visual

---

### 3. **Date Pickers**

#### Tipos Identificados:

**A. Date Input (Numerical)**
- Input numérico com três campos (dia, mês, ano)
- Valores destacados: "10 10 16"
- Formato: `DD MM YY` ou `MM DD YY`

**B. Date Pickers (Text)**
- Input de texto com placeholder "Pick a date"
- Ícone de calendário
- Formato: "Oct 16, 2022" ou "Oct 16, 2022 12:00 am"
- Suporte a data e hora

#### Componentes Necessários:
```tsx
<DateInput 
  format="numerical" 
  fields={['day', 'month', 'year']}
/>

<DatePicker 
  format="text" 
  showTime={false}
  placeholder="Pick a date"
/>

<DatePicker 
  format="text" 
  showTime={true}
  timeFormat="12h"
/>
```

---

### 4. **Toggle Switches**

#### Características:
- **Estado Off**: Fundo cinza
- **Estado On**: Fundo azul
- **Layout**: Vertical (pode ser horizontal também)
- **Tamanho**: Padrão (médio)

#### Implementação:
```tsx
<Toggle 
  checked={isOn} 
  onChange={setIsOn}
  label="Toggle Label"
/>
```

---

### 5. **Icon Grid**

#### Ícones Identificados (24 total):
1. Search (busca)
2. Checkmark (duas variantes)
3. Chart (gráfico)
4. Image (imagem)
5. Send (enviar)
6. Chat bubble (chat)
7. Phone (telefone)
8. Bell (notificação)
9. Document (documento)
10. Globe (globo)
11. Plus (adicionar)
12. Smiley face (emoji)
13. Link (link)
14. Star (estrela)
15. Three dots (menu)
16. X (fechar)
17. Calendar (calendário)
18. Folder (pasta)
19. Gear (configurações)
20. Download (download)
21. Question mark (ajuda)
22. Wrench (ferramentas)

#### Padrão de Biblioteca de Ícones:
- Grid organizado (8 rows × 3 columns)
- Tamanhos consistentes
- Estilo unificado
- Exportação individual para tree-shaking

---

### 6. **Language & Chatbox Color Selectors**

#### Language Selector:
- Label: "Language"
- Input: "Auto-detect"
- **Estados**:
  - Default: Dropdown arrow (baixo)
  - Open: Arrow up (cima)
  - Focused: Borda azul

#### Chatbox Color Selector:
- Label: "Chatbox color"
- Input: "Default (Blue)"
- **Indicador visual**: Ponto azul ao lado do texto
- **Estados**: Dropdown arrow (baixo/cima)

#### Padrão de Select:
```tsx
<Select 
  label="Language"
  value="auto-detect"
  options={[...]}
  placeholder="Auto-detect"
/>

<ColorSelect 
  label="Chatbox color"
  value="default-blue"
  options={[...]}
  showColorIndicator={true}
/>
```

---

### 7. **Text Inputs & Tag Components**

#### Tipos de Input:

**A. Basic Text Input**
- Placeholder: "Enter a value"
- Estado: Vazio, focado

**B. Text Input with Value**
- Valor: "Cameron"
- Estado: Preenchido

**C. Tag Input (Partial)**
- Tags: "Cameron" (tag removível com 'x')
- Texto livre: "Lora"
- Estado: Misto (tag + texto)

**D. Tag Input (Full)**
- Tags: "Cameron", "Lora" (ambas removíveis)
- Estado: Apenas tags

#### Implementação:
```tsx
<Input 
  placeholder="Enter a value"
/>

<TagInput 
  value={tags}
  onChange={setTags}
  allowFreeText={true}
/>
```

---

### 8. **Navigation / Tabs**

#### Características:
- **Layout**: Horizontal
- **Itens**: "Visitors", "Globe", "Contacts", "Compaigns", "Analytics", "Plugins"
- **Estado Ativo**: "Contacts" destacado em azul
- **Ícones**: Opcionais (alguns tabs têm ícones)

#### Padrão:
```tsx
<Tabs value="contacts" onChange={setValue}>
  <Tab value="visitors">Visitors</Tab>
  <Tab value="globe" icon={<GlobeIcon />}>Globe</Tab>
  <Tab value="contacts" icon={<ContactsIcon />}>Contacts</Tab>
  {/* ... */}
</Tabs>
```

---

### 9. **Calendar Component**

#### Características:
- **Cabeçalho**: "October 2022"
- **Dias da Semana**: "Mon Tue Wed Thu Fri Sat Sun"
- **Grid de Datas**: 7 colunas × ~5-6 linhas
- **Estados**:
  - Hover: Círculo azul claro (data "6")
  - Selected: Quadrado azul sólido (data "16")
- **Ações**: Botão "Clear"

#### Implementação:
```tsx
<Calendar 
  month={10}
  year={2022}
  selectedDate={selectedDate}
  onSelect={setSelectedDate}
  onClear={clearSelection}
/>
```

---

### 10. **Filters / Tags**

#### Filter Component:
- **Label**: "Another favorite filter"
- **Subtext**: "1 condition"
- **Ações**: "Edit" (texto) + ícone de lixeira

#### Tag Components:
- **Tag "Chat"**: Ponto laranja + texto "Pending"
- **Tag "Chat x"**: Ponto laranja + texto "Pending x" + ícone de remoção

#### Padrão:
```tsx
<Filter 
  label="Another favorite filter"
  conditionCount={1}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

<Tag 
  color="orange"
  icon={<DotIcon />}
  onRemove={handleRemove}
>
  Chat
</Tag>
```

---

### 11. **Rich Text Editor**

#### Toolbar:
- **Ícones**: Bold, Italic, Underline, Align Left, Link, Image, Video, Table
- **Layout**: Horizontal, compacto

#### Text Area:
- **Placeholder**: "Enter a message for this shortcut !test..."
- **Multi-line**: Suporta múltiplas linhas
- **Mentions**: Suporte a shortcuts (!test)

#### Implementação:
```tsx
<RichTextEditor 
  placeholder="Enter a message..."
  toolbar={['bold', 'italic', 'underline', 'link', 'image', 'video', 'table']}
  onMention={handleMention}
/>
```

---

### 12. **Progress Bars**

#### Características:
- **Label**: "50/100", "100/100", "25/100", "0"
- **Suffix**: "in total"
- **Visual**: Barra azul preenchida proporcionalmente
- **Estados**: 0%, 25%, 50%, 100%

#### Padrão:
```tsx
<ProgressBar 
  current={50}
  total={100}
  suffix="in total"
  showLabel={true}
/>
```

---

### 13. **Radio Buttons / Checkboxes**

#### Type Selection (Radio Group):
- **Opções**: "Text" (ícone de linhas), "Number" (ícone #), "Status" (ícone círculo), "Segments" (ícone 3 pessoas)
- **Selecionado**: "Text"
- **Layout**: Horizontal

#### Color Selection (Radio Group):
- **Label**: "Colors"
- **Opções**: "Red" (ponto vermelho), "Green" (ponto verde + checkmark), "Blue" (ponto azul)
- **Selecionado**: "Green"
- **Layout**: Horizontal

#### Implementação:
```tsx
<RadioGroup value="text" onChange={setValue}>
  <Radio value="text" icon={<TextIcon />}>Text</Radio>
  <Radio value="number" icon={<NumberIcon />}>Number</Radio>
  {/* ... */}
</RadioGroup>

<RadioGroup value="green" onChange={setValue} label="Colors">
  <Radio value="red" colorIndicator="red">Red</Radio>
  <Radio value="green" colorIndicator="green" checked>Green</Radio>
  <Radio value="blue" colorIndicator="blue">Blue</Radio>
</RadioGroup>
```

---

## 🎨 Padrões de Design Extraídos

### 1. **Sistema de Cores**
- **Primary**: Azul (#007BFF baseado no Ciberso-UI)
- **Secondary**: Cinza
- **Success/Active**: Azul (variante)
- **Warning/Orange**: Laranja (para tags)
- **Indicadores**: Pontos coloridos para estados visuais

### 2. **Estados de Componentes**
- **Default**: Estado inicial
- **Hover**: Feedback visual ao passar mouse
- **Focused**: Borda azul ou destaque
- **Active/Selected**: Fundo azul sólido
- **Disabled**: Cinza, opacidade reduzida
- **Open/Expanded**: Seta para cima
- **Closed/Collapsed**: Seta para baixo

### 3. **Ícones**
- **Posicionamento**: À esquerda, direita, ou apenas ícone
- **Tamanho**: Consistente com o texto
- **Estilo**: Outline ou filled conforme contexto
- **Biblioteca**: 24+ ícones essenciais

### 4. **Tipografia**
- **Labels**: Texto descritivo acima dos inputs
- **Placeholders**: Texto de exemplo em cinza
- **Values**: Texto preenchido em cor padrão
- **Subtext**: Texto secundário menor (ex: "1 condition")

### 5. **Espaçamento**
- **Grid**: Organização em grid (8×3 para ícones)
- **Padding**: Consistente entre componentes similares
- **Gap**: Espaçamento uniforme entre elementos relacionados

### 6. **Interatividade**
- **Remoção**: Ícone 'x' para tags e filtros
- **Edição**: Link "Edit" para ações secundárias
- **Navegação**: Setas direcionais
- **Expansão**: Dropdown arrows

---

## 📋 Componentes Prioritários para Implementação

### Fase 1 - Atoms (Básicos)
1. ✅ **Button** (já implementado - adicionar variantes com ícones)
2. ✅ **Input** (já implementado - adicionar TagInput)
3. ✅ **Label** (já implementado)
4. **Toggle** (novo)
5. **Radio** (novo)
6. **Checkbox** (novo)
7. **ProgressBar** (novo)
8. **Tag** (novo)

### Fase 2 - Molecules (Compostos)
1. **Select** (com dropdown)
2. **DatePicker** (text e numerical)
3. **TagInput** (input com suporte a tags)
4. **ColorSelect** (select com indicador de cor)
5. **Filter** (com ações edit/delete)

### Fase 3 - Organisms (Complexos)
1. **Calendar** (componente completo)
2. **Tabs** (navegação horizontal)
3. **RichTextEditor** (com toolbar)

### Fase 4 - Icons Package
1. **Icon Library** (24+ ícones essenciais)
2. **Icon Component** (wrapper reutilizável)

---

## 🔧 Estruturas de Dados Sugeridas

### TagInput
```typescript
interface Tag {
  id: string;
  label: string;
  color?: 'default' | 'orange' | 'blue' | 'green' | 'red';
  removable?: boolean;
}

interface TagInputProps {
  value: Tag[];
  onChange: (tags: Tag[]) => void;
  allowFreeText?: boolean;
  placeholder?: string;
}
```

### Select Options
```typescript
interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
  colorIndicator?: string;
  disabled?: boolean;
}
```

### Calendar
```typescript
interface CalendarProps {
  month: number;
  year: number;
  selectedDate?: Date;
  onSelect: (date: Date) => void;
  onClear?: () => void;
  minDate?: Date;
  maxDate?: Date;
}
```

---

## 🎯 Próximos Passos Recomendados

1. **Expandir Button**: Adicionar suporte a ícones (left/right/only)
2. **Criar Toggle**: Componente de switch on/off
3. **Criar Tag**: Componente de tag removível
4. **Criar TagInput**: Input com suporte a múltiplas tags
5. **Criar Select**: Componente de seleção com dropdown
6. **Criar Radio/Checkbox**: Componentes de seleção
7. **Criar ProgressBar**: Barra de progresso
8. **Criar Calendar**: Componente de calendário completo
9. **Criar Tabs**: Navegação por tabs
10. **Expandir Icons Package**: Adicionar os 24+ ícones identificados

---

## 📝 Notas de Implementação

### Acessibilidade
- Todos os componentes devem usar React Aria
- Suporte completo a navegação por teclado
- ARIA labels apropriados
- Focus management correto

### Animações
- Transições suaves para estados (hover, focus, active)
- Animações de abertura/fechamento para dropdowns
- Feedback visual imediato para interações

### Responsividade
- Componentes devem funcionar em mobile e desktop
- Tabs devem scroll horizontal em mobile se necessário
- Calendar deve adaptar-se a diferentes tamanhos de tela

---

**Última atualização**: 2025-01-13  
**Status**: Análise completa - Pronto para implementação

