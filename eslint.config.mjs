// eslint.config.mjs
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import next from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Ignore
  {
    ignores: [
      'eslint.config.mjs',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      'node_modules/**',
    ],
  },

  // Base presets (each item is a valid array element)
  js.configs.recommended,
  ...tseslint.configs.recommended, // fast TS rules
  ...tseslint.configs.recommendedTypeChecked, // ✅ top-level, not inside an object
  react.configs.flat.recommended,

  // Tell TS rules where your tsconfig is (separate block)
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parserOptions: { project: ['./tsconfig.json'] },
    },
    rules: {
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/return-await': 'off',
    },
  },

  // Project-wide rules/plugins
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    plugins: {
      import: importPlugin,
      'react-hooks': reactHooks,
      'unused-imports': unusedImports,
      '@next/next': next,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        typescript: { alwaysTryTypes: true, project: ['./tsconfig.json'] },
      },
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',

      // Enforcing and fixing the order of imports
      'import/no-unresolved': 'error',
      'import/order': [
        'warn',
        {
          groups: [
            ['builtin', 'external'], // Built-in and external modules first
            ['internal', 'parent', 'sibling', 'index'], // Internal modules and local imports next
            'type', // Then type imports
          ],
          'newlines-between': 'always', // Enforce newlines between different groups
          alphabetize: { order: 'asc', caseInsensitive: true }, // Alphabetize imports within each group
        },
      ],

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'react/react-in-jsx-scope': 'off', // React 17+ no longer requires `React` in scope
      'react/prop-types': 'off', // Disable prop-types validation (if using TypeScript)

      'react-hooks/rules-of-hooks': 'error', // Enforce React hooks rules
      'react-hooks/exhaustive-deps': 'warn', // Warn on missing dependencies in `useEffect`

      '@next/next/no-img-element': 'warn', // Warn against using <img> without `next/image`
      '@next/next/no-document-import-in-page': 'error', // Prevent importing from `_document.js` in pages
      '@next/next/no-head-element': 'warn', // Warn if there is a <head> element in _app.js

      // TypeScript-specific rules
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // Allow `any` type in TypeScript
    },
  },

  // Node globals for config/build scripts
  {
    files: ['**/*.{cjs,cts,mjs,mts}', '**/*.config.*', '**/.*rc.*'],
    languageOptions: { globals: { ...globals.node } },
  },

  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1, maxEOF: 1 }],
    },
  },
  prettierConfig,
]);
