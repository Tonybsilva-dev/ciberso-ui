/**
 * Script alternativo para construir componentes React a partir de SVGs
 * Gera componentes manualmente quando o SVGR não funciona corretamente
 */

const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');

const SVG_DIR = path.join(__dirname, '../src/svg');
const ICONS_DIR = path.join(__dirname, '../src/icons');

const svgoConfig = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    'removeUselessDefs',
    'removeEmptyAttrs',
    'removeHiddenElems',
    'convertPathData',
    'convertTransform',
  ],
};

/**
 * Converte SVG para JSX
 */
function svgToJsx(svgContent) {
  // Remover xmlns se presente (será adicionado pelo React)
  let jsx = svgContent
    .replace(/xmlns="[^"]*"/g, '')
    .replace(/xmlns:xlink="[^"]*"/g, '')
    .replace(/<svg/g, '<svg')
    .replace(/width="([^"]*)"/g, 'width="$1"')
    .replace(/height="([^"]*)"/g, 'height="$1"')
    .replace(/viewBox="([^"]*)"/g, 'viewBox="$1"')
    .replace(/#000000/g, 'currentColor')
    .replace(/#000/g, 'currentColor');

  // Garantir que todos os paths tenham fill="currentColor"
  // Substituir qualquer fill existente por currentColor
  // Tratar tanto <path ... /> quanto <path ...></path>
  jsx = jsx.replace(/<path([^>]*?)(\/?)>/g, (match, attrs, selfClose) => {
    // Se já tem fill, substituir por currentColor
    if (match.includes('fill=')) {
      return match.replace(/fill="[^"]*"/g, 'fill="currentColor"');
    }
    // Se não tem fill, adicionar fill="currentColor" antes do /> ou >
    if (selfClose) {
      return match.replace(/(<path[^>]*)(\/>)/, '$1 fill="currentColor"$2');
    } else {
      return match.replace(/(<path[^>]*)(>)/, '$1 fill="currentColor"$2');
    }
  });

  // Garantir que o SVG tenha fill="currentColor" como padrão se não houver paths com fill
  if (!jsx.includes('fill="currentColor"')) {
    jsx = jsx.replace(/<svg([^>]*)>/, '<svg$1 fill="currentColor">');
  }

  return jsx.trim();
}

/**
 * Gera código do componente React
 */
function generateComponentCode(componentName, jsx) {
  // Adicionar ref e props ao SVG
  const jsxWithProps = jsx.replace(
    /<svg([^>]*)>/,
    '<svg$1 ref={ref} {...props} role="img" aria-hidden="true">'
  );

  return `import * as React from 'react';
import type { SVGProps } from 'react';

export const ${componentName} = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    ${jsxWithProps}
  )
);

${componentName}.displayName = '${componentName}';
`;
}

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
function processSvgFile(filePath) {
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

    // 3. Converter SVG para JSX
    const jsx = svgToJsx(optimized.data);

    // 4. Gerar código do componente
    const componentCode = generateComponentCode(componentName, jsx);

    // 5. Salvar componente
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
function main() {
  console.log('🔨 Iniciando build de ícones (método manual)...\n');

  // Criar diretório de saída
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }

  // Verificar se diretório SVG existe
  if (!fs.existsSync(SVG_DIR)) {
    console.error(`❌ Diretório SVG não encontrado: ${SVG_DIR}`);
    console.log('💡 Execute primeiro: pnpm run download:material:simple');
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
    console.log('💡 Execute primeiro: pnpm run download:material:simple');
    process.exit(0);
  }

  console.log(`📁 Encontrados ${svgFiles.length} arquivos SVG\n`);
  console.log('🔄 Processando ícones...\n');

  // Processar cada arquivo
  const results = [];
  for (const filePath of svgFiles) {
    const result = processSvgFile(filePath);
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

if (require.main === module) {
  main();
}

module.exports = { processSvgFile, fileNameToComponentName };

