import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactNativePlugin from 'eslint-plugin-react-native';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import customRules from './eslint-plugin-custom-rules.js';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-native': reactNativePlugin,
      'custom-rules': customRules,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        Box: 'readonly',
      },
    },
    rules: {
      'no-duplicate-imports': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/no-duplicates': ['error', { considerQueryString: true }],
      'no-unused-vars': 'off',
      'react-native/no-inline-styles': 'warn',
      'no-undef': 'off',
      'custom-rules/use-box-instead-of-view': 'error',
      'prettier/prettier': 'error',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: 'react-native',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'expo**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/hooks/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/services/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/utils/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/types/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/store/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/components/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react-native'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unused-modules': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-native',
              importNames: ['View'],
              message: 'You should use the custom Box components from @components.',
            },
          ],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        Box: 'readonly',
      },
    },
  },
  {
    files: [
      'jest.setup.js',
      '**/__tests__/**/*.[jt]s?(x)',
      '**/*.test.[jt]s?(x)',
      '**/*.spec.[jt]s?(x)',
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    ignores: [
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/__tests__/**',
      '**/__mocks__/**',
    ],
  },
  prettierConfig,
];
