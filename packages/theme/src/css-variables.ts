/**
 * CSS Variables do Ciberso-UI
 * Gera variáveis CSS a partir dos tokens
 */

import { colors, spacing, typography } from '@ciberso/tokens';

/**
 * Gera CSS variables para uso em CSS puro
 */
export function generateCSSVariables(): string {
  const variables: string[] = [];

  // Colors
  Object.entries(colors.ciberso).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      variables.push(`  --ciberso-${colorName}-${shade}: ${value};`);
    });
  });

  // Semantic colors
  Object.entries(colors.semantic).forEach(([name, value]) => {
    variables.push(`  --ciberso-semantic-${name}: ${value};`);
  });

  // Spacing
  Object.entries(spacing).forEach(([name, value]) => {
    variables.push(`  --ciberso-spacing-${name}: ${value};`);
  });

  // Typography
  Object.entries(typography.sizes).forEach(([name, value]) => {
    variables.push(`  --ciberso-font-size-${name}: ${value};`);
  });

  return `:root {\n${variables.join('\n')}\n}`;
}

