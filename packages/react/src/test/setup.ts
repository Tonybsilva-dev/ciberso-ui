/**
 * Setup file para testes do Vitest
 * Configura o ambiente de testes e importa matchers do @testing-library/jest-dom
 */

import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Limpar após cada teste
afterEach(() => {
  cleanup();
});

