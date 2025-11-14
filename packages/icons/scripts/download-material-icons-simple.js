/**
 * Script simplificado para baixar Material Icons (Filled)
 * 
 * Este script usa uma abordagem mais simples: baixa ícones diretamente
 * do CDN do Google Fonts usando a API pública
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(__dirname, '../src/svg/material-filled');
const ICON_NAMES = [
  'add',
  'delete',
  'edit',
  'save',
  'close',
  'check',
  'cancel',
  'arrow_back',
  'arrow_forward',
  'home',
  'settings',
  'search',
  'menu',
  'more_vert',
  'more_horiz',
  'favorite',
  'favorite_border',
  'star',
  'star_border',
  'share',
  'download',
  'upload',
  'visibility',
  'visibility_off',
  'lock',
  'lock_open',
  'person',
  'person_add',
  'notifications',
  'notifications_off',
  'email',
  'phone',
  'chat',
  'send',
  'refresh',
  'filter_list',
  'sort',
  'expand_more',
  'expand_less',
  'chevron_right',
  'chevron_left',
  'info',
  'warning',
  'error',
  'check_circle',
  'cancel_circle',
  'help',
  'play_arrow',
  'pause',
  'stop',
];

/**
 * Baixa um ícone do Material Symbols (nova API do Google)
 */
async function downloadIcon(iconName) {
  // Material Symbols (nova API) - Filled style
  const url = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${iconName}/default/24px.svg`;
  
  // Tentar também o caminho antigo do Material Icons
  const altUrl = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbols/${iconName}/wght400/24px.svg`;
  
  const fileName = iconName.replace(/_/g, '-');
  const outputPath = path.join(OUTPUT_DIR, `${fileName}.svg`);
  
  return new Promise((resolve) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(outputPath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Baixado: ${iconName} -> ${fileName}.svg`);
          resolve(true);
        });
      } else {
        // Tentar URL alternativa
        https.get(altUrl, (altResponse) => {
          if (altResponse.statusCode === 200) {
            const file = fs.createWriteStream(outputPath);
            altResponse.pipe(file);
            file.on('finish', () => {
              file.close();
              console.log(`✓ Baixado (alt): ${iconName} -> ${fileName}.svg`);
              resolve(true);
            });
          } else {
            console.warn(`✗ Erro ao baixar ${iconName}: ${response.statusCode}`);
            resolve(false);
          }
        }).on('error', () => {
          console.warn(`✗ Erro ao baixar ${iconName}`);
          resolve(false);
        });
      }
    }).on('error', () => {
      console.warn(`✗ Erro ao baixar ${iconName}`);
      resolve(false);
    });
  });
}

/**
 * Função principal
 */
async function main() {
  console.log('🎨 Baixando Material Icons (Filled) - Lista Curta...\n');
  
  // Criar diretório de saída
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  console.log(`📥 Baixando ${ICON_NAMES.length} ícones comuns...\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const iconName of ICON_NAMES) {
    const success = await downloadIcon(iconName);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    
    // Pequeno delay
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n✅ Download concluído!`);
  console.log(`   ✓ Sucesso: ${successCount}`);
  console.log(`   ✗ Falhas: ${failCount}`);
  console.log(`\n📁 Ícones salvos em: ${OUTPUT_DIR}`);
}

if (require.main === module) {
  main();
}

module.exports = { downloadIcon };

