import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**', 'out/**', 'build/**']
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': typescriptEslint
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true }
      }
    },
    rules: {
      // Базові правила JS та TS
      ...js.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,

      // Базові правила Next.js (вручну, щоб не зациклювати)
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      // Твої кастомні правила
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/self-closing-comp': 'off' // Вимкни, якщо не стоїть плагін react
    }
  },
  prettierConfig
]
