/**
 * ThemeProvider - Componente React para aplicar estilos globais do Ciberso-UI
 * 
 * Este componente importa as variáveis CSS globais e envolve a aplicação,
 * garantindo que todos os componentes tenham acesso às variáveis de tema.
 */

import type { ReactNode } from 'react';
import './styles/globals.css';

export interface ThemeProviderProps {
  /**
   * Conteúdo a ser envolvido pelo ThemeProvider
   */
  children: ReactNode;
}

/**
 * ThemeProvider
 * 
 * Componente que aplica as variáveis CSS globais do Ciberso-UI Design System.
 * Deve ser usado no nível raiz da aplicação para garantir que todos os componentes
 * tenham acesso às variáveis de tema.
 * 
 * @example
 * ```tsx
 * import { ThemeProvider } from '@ciberso/theme';
 * 
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  return <>{children}</>;
}

