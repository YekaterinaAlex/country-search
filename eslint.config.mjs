import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(globalIgnores(['dist/', 'coverage/', '.vitest/']), {
  files: ['**/*.{ts,js,mjs}'],
  extends: [js.configs.recommended, tseslint.configs.recommended],
});
