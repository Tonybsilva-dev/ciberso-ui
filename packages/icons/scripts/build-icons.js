/**
 * Script para construir componentes React a partir de arquivos SVG
 * 
 * Este script:
 * 1. Lê todos os arquivos SVG do diretório src/svg/
 * 2. Otimiza os SVGs usando SVGO
 * 3. Converte os SVGs otimizados em componentes React usando SVGR
 * 4. Salva os componentes em src/icons/
 * 
 * Referências:
 * - SVGO: https://github.com/svg/svgo
 * - SVGR: https://github.com/gregberge/svgr
 */

const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');
const { transform } = require('@svgr/core');

const SVG_DIR = path.join(__dirname, '../src/svg');
const ICONS_DIR = path.join(__dirname, '../src/icons');

/**
 * Configuração do SVGO para otimização
 */
const svgoConfig = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Manter viewBox para responsividade
          removeViewBox: false,
        },
      },
    },
    // Remover atributos desnecessários
    'removeUselessDefs',
    'removeEmptyAttrs',
    'removeHiddenElems',
    // Otimizar paths
    'convertPathData',
    'convertTransform',
  ],
};

/**
 * Configuração do SVGR para conversão em React
 */
const svgrConfig = {
  typescript: true,
  svgProps: {
    role: 'img',
    'aria-hidden': 'true',
  },
  replaceAttrValues: {
    '#000': 'currentColor',
    '#000000': 'currentColor',
  },
  template: (variables, { tpl }) => {
    return tpl`
import * as React from 'react';
import type { SVGProps } from 'react';

export const ${variables.componentName} = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    ${variables.jsx}
  )
);

${variables.componentName}.displayName = '${variables.componentName}';
`;
  },
};

/**
 * Converte nome de arquivo para nome de componente (PascalCase)
 */
function fileNameToComponentName(fileName) {
  return fileName
    .replace(/\.svg$/i, '')
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Processa um arquivo SVG
 */
async function processSvgFile(filePath) {
  const fileName = path.basename(filePath);
  const componentName = fileNameToComponentName(fileName);
  
  try {
    // 1. Ler arquivo SVG
    const svgContent = fs.readFileSync(filePath, 'utf-8');
    
    // 2. Otimizar com SVGO
    const optimized = optimize(svgContent, svgoConfig);
    if (optimized.error) {
      throw new Error(`SVGO error: ${optimized.error}`);
    }
    
    // 3. Converter para componente React com SVGR
    const componentCode = await transform(
      optimized.data,
      {
        ...svgrConfig,
        // Garantir que o template seja usado
        template: svgrConfig.template,
      },
      {
        componentName,
        filePath,
      }
    );
    
    // 4. Salvar componente
    const outputPath = path.join(ICONS_DIR, `${componentName}.tsx`);
    fs.writeFileSync(outputPath, componentCode, 'utf-8');
    
    console.log(`✓ Processado: ${fileName} -> ${componentName}.tsx`);
    return { fileName, componentName, success: true };
  } catch (error) {
    console.error(`✗ Erro ao processar ${fileName}:`, error.message);
    return { fileName, componentName, success: false, error: error.message };
  }
}

/**
 * Função principal
 */
async function main() {
  console.log('🔨 Iniciando build de ícones...\n');
  
  // Criar diretório de saída
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }
  
  // Verificar se diretório SVG existe
  if (!fs.existsSync(SVG_DIR)) {
    console.error(`❌ Diretório SVG não encontrado: ${SVG_DIR}`);
    console.log('💡 Execute primeiro: pnpm run download:material');
    process.exit(1);
  }
  
  // Encontrar todos os arquivos SVG
  const svgFiles = [];
  
  function findSvgFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        findSvgFiles(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.svg')) {
        svgFiles.push(fullPath);
      }
    }
  }
  
  findSvgFiles(SVG_DIR);
  
  if (svgFiles.length === 0) {
    console.warn('⚠️  Nenhum arquivo SVG encontrado!');
    console.log('💡 Execute primeiro: pnpm run download:material');
    process.exit(0);
  }
  
  console.log(`📁 Encontrados ${svgFiles.length} arquivos SVG\n`);
  console.log('🔄 Processando ícones...\n');
  
  // Processar cada arquivo
  const results = [];
  for (const filePath of svgFiles) {
    const result = await processSvgFile(filePath);
    results.push(result);
  }
  
  // Estatísticas
  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  
  console.log(`\n✅ Build concluído!`);
  console.log(`   ✓ Sucesso: ${successCount}`);
  console.log(`   ✗ Falhas: ${failCount}`);
  console.log(`\n📁 Componentes salvos em: ${ICONS_DIR}`);
  
  if (failCount > 0) {
    console.log('\n⚠️  Alguns ícones falharam ao processar:');
    results
      .filter(r => !r.success)
      .forEach(r => console.log(`   - ${r.fileName}: ${r.error}`));
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  });
}

module.exports = { processSvgFile, fileNameToComponentName };

