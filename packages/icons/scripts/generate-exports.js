/**
 * Script para gerar exports automáticos dos componentes de ícones
 * 
 * Este script lê todos os componentes de ícones gerados e cria
 * um arquivo index.ts com todos os exports
 */

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../src/icons');
const INDEX_FILE = path.join(__dirname, '../src/index.ts');

/**
 * Função principal
 */
function main() {
  console.log('📝 Gerando exports de ícones...\n');
  
  if (!fs.existsSync(ICONS_DIR)) {
    console.error(`❌ Diretório de ícones não encontrado: ${ICONS_DIR}`);
    console.log('💡 Execute primeiro: pnpm run build:icons');
    process.exit(1);
  }
  
  // Encontrar todos os arquivos de componentes
  const iconFiles = fs.readdirSync(ICONS_DIR)
    .filter(file => file.endsWith('.tsx'))
    .map(file => file.replace('.tsx', ''));
  
  if (iconFiles.length === 0) {
    console.warn('⚠️  Nenhum componente de ícone encontrado!');
    console.log('💡 Execute primeiro: pnpm run build:icons');
    process.exit(0);
  }
  
  // Gerar conteúdo do index.ts
  const imports = iconFiles
    .map(icon => `export { ${icon} } from './icons/${icon}';`)
    .join('\n');
  
  const content = `/**
 * @ciberso/icons
 * Biblioteca de ícones do Ciberso-UI Design System
 * 
 * Ícones baseados no Material Icons (Filled) do Google
 * https://fonts.google.com/icons?icon.set=Material+Icons&icon.style=Filled
 * 
 * Este arquivo é gerado automaticamente. Não edite manualmente.
 * Para regenerar, execute: pnpm run build:icons
 */

${imports}
`;
  
  // Salvar arquivo
  fs.writeFileSync(INDEX_FILE, content, 'utf-8');
  
  console.log(`✅ Exports gerados para ${iconFiles.length} ícones`);
  console.log(`📁 Arquivo atualizado: ${INDEX_FILE}`);
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { main };

