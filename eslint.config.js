import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ...js.configs.recommended,
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      // 変数・関数
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      
      // ES6+ 構文
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'prefer-destructuring': ['warn', {
        array: true,
        object: true,
      }],
      'object-shorthand': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      
      // コードスタイル
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-trailing-spaces': 'error',
      
      // async/await
      'prefer-promise-reject-errors': 'error',
      'no-async-promise-executor': 'error',
      
      // セキュリティ
      'no-eval': 'error',
      'no-implied-eval': 'error',
    },
  },
  {
    files: ['eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];