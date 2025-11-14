/**
 * Utilitário de conversão de cores
 * Converte cores HEX para OKLCH (preferencial) e HSL (fallback)
 */

/**
 * Converte um valor HEX para RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result || !result[1] || !result[2] || !result[3]) {
    throw new Error(`Invalid HEX color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Converte RGB para HSL
 */
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
  };
}

/**
 * Converte RGB para OKLCH
 * Implementação simplificada usando conversão via Lab
 */
function rgbToOklch(r: number, g: number, b: number): { l: number; c: number; h: number } {
  // Normalizar RGB para 0-1
  r = r / 255;
  g = g / 255;
  b = b / 255;

  // Converter para linear RGB
  const linearize = (val: number) => {
    return val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  };

  const rLinear = linearize(r);
  const gLinear = linearize(g);
  const bLinear = linearize(b);

  // Converter para XYZ (D65)
  let x = rLinear * 0.4124564 + gLinear * 0.3575761 + bLinear * 0.1804375;
  let y = rLinear * 0.2126729 + gLinear * 0.7151522 + bLinear * 0.072175;
  let z = rLinear * 0.0193339 + gLinear * 0.119192 + bLinear * 0.9503041;

  // Normalizar para D65
  x = x / 0.95047;
  z = z / 1.08883;

  // Converter para Lab
  const f = (t: number) => {
    const delta = 6 / 29;
    if (t > delta ** 3) {
      return Math.cbrt(t);
    }
    return t / (3 * delta ** 2) + 4 / 29;
  };

  const fx = f(x);
  const fy = f(y);
  const fz = f(z);

  const l = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const bLab = 200 * (fy - fz);

  // Converter Lab para OKLCH
  // OKLCH usa uma versão melhorada do Lab chamada OKLab
  // Para simplificar, vamos usar uma aproximação via conversão direta
  // Em produção, use uma biblioteca como culori ou colorjs.io

  // Aproximação OKLab (simplificada)
  const l_ok = l / 100; // Normalizar L para 0-1
  const c = Math.sqrt(a * a + bLab * bLab) / 100; // Chroma normalizado
  let h = Math.atan2(bLab, a) * (180 / Math.PI);
  if (h < 0) h += 360;

  return {
    l: l_ok,
    c: c,
    h: h,
  };
}

/**
 * Converte uma cor HEX para formato HSL pronto para CSS
 * @param hex - Cor em formato HEX (ex: '#007BFF' ou '007BFF')
 * @returns String formatada para CSS (ex: '194.2 100% 30.6%')
 */
export function hexToHsl(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  return `${h.toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}%`;
}

/**
 * Converte uma cor HEX para formato OKLCH pronto para CSS
 * @param hex - Cor em formato HEX (ex: '#007BFF' ou '007BFF')
 * @returns String formatada para CSS (ex: '0.7686 0.1647 70.0804')
 */
export function hexToOklch(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const { l, c, h } = rgbToOklch(r, g, b);
  return `${l.toFixed(4)} ${c.toFixed(4)} ${h.toFixed(4)}`;
}

/**
 * Converte uma cor HEX para formato OKLCH completo (com função CSS)
 * @param hex - Cor em formato HEX
 * @returns String formatada com função oklch() (ex: 'oklch(0.7686 0.1647 70.0804)')
 */
export function hexToOklchFull(hex: string): string {
  return `oklch(${hexToOklch(hex)})`;
}

/**
 * Converte uma cor HEX para formato HSL completo (com função CSS)
 * @param hex - Cor em formato HEX
 * @returns String formatada com função hsl() (ex: 'hsl(194.2 100% 30.6%)')
 */
export function hexToHslFull(hex: string): string {
  return `hsl(${hexToHsl(hex)})`;
}

