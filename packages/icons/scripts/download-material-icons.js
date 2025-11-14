/**
 * Script para baixar Material Icons (Filled) do repositório oficial do Google
 * 
 * Este script baixa os SVGs do Material Icons no estilo "Filled" do repositório
 * oficial do Google e os salva no diretório src/svg/material-filled/
 * 
 * Referência: https://github.com/google/material-design-icons
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const MATERIAL_ICONS_REPO = 'google/material-design-icons';
const MATERIAL_ICONS_BRANCH = 'master';
const MATERIAL_ICONS_BASE_URL = `https://raw.githubusercontent.com/${MATERIAL_ICONS_REPO}/${MATERIAL_ICONS_BRANCH}/src`;
const ICON_STYLE = 'filled'; // 'filled', 'outlined', 'rounded', 'sharp', 'two-tone'

const OUTPUT_DIR = path.join(__dirname, '../src/svg/material-filled');
const ICON_LIST_URL = 'https://fonts.google.com/metadata/icons';

/**
 * Baixa um arquivo de uma URL
 */
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Seguir redirects
        downloadFile(response.headers.location, filePath)
          .then(resolve)
          .catch(reject);
      } else {
        file.close();
        fs.unlinkSync(filePath);
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      reject(err);
    });
  });
}

/**
 * Obtém a lista de ícones disponíveis do Material Icons
 * A API retorna JSONP, então precisamos remover o padding
 */
async function getIconList() {
  return new Promise((resolve, reject) => {
    https.get(ICON_LIST_URL, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          // A API retorna JSONP no formato: )]}'\n{...json...}
          // Remover o padding JSONP
          const jsonData = data.replace(/^\)\]\}'\n/, '');
          const metadata = JSON.parse(jsonData);
          resolve(metadata.icons || []);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Converte nome do ícone para formato de arquivo (kebab-case)
 */
function iconNameToFileName(iconName) {
  return iconName
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
}

/**
 * Baixa um ícone específico do Material Icons
 */
async function downloadIcon(iconName) {
  const fileName = iconNameToFileName(iconName);
  const iconPath = `${iconName}/${ICON_STYLE}/materialicons/24px.svg`;
  const url = `${MATERIAL_ICONS_BASE_URL}/${iconPath}`;
  const outputPath = path.join(OUTPUT_DIR, `${fileName}.svg`);
  
  try {
    await downloadFile(url, outputPath);
    console.log(`✓ Baixado: ${iconName} -> ${fileName}.svg`);
    return true;
  } catch (error) {
    console.warn(`✗ Erro ao baixar ${iconName}: ${error.message}`);
    return false;
  }
}

/**
 * Função principal
 */
async function main() {
  console.log('🎨 Iniciando download de Material Icons (Filled)...\n');
  
  // Criar diretório de saída
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  try {
    // Obter lista de ícones
    console.log('📋 Obtendo lista de ícones disponíveis...');
    const icons = await getIconList();
    console.log(`✓ Encontrados ${icons.length} ícones disponíveis\n`);
    
    // Baixar ícones (limitado a 50 para teste inicial)
    const iconsToDownload = icons.slice(0, 50);
    console.log(`📥 Baixando ${iconsToDownload.length} ícones (Filled)...\n`);
    
    let successCount = 0;
    let failCount = 0;
    
    for (const icon of iconsToDownload) {
      const success = await downloadIcon(icon.name);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
      
      // Pequeno delay para não sobrecarregar o servidor
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\n✅ Download concluído!`);
    console.log(`   ✓ Sucesso: ${successCount}`);
    console.log(`   ✗ Falhas: ${failCount}`);
    console.log(`\n📁 Ícones salvos em: ${OUTPUT_DIR}`);
    
  } catch (error) {
    console.error('❌ Erro ao baixar ícones:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { downloadIcon, getIconList };

