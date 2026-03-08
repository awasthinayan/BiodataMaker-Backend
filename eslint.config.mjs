import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, node: true },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node }
  }
]);
