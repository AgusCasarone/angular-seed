// eslint.config.mts
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import * as angularTemplateParser from '@angular-eslint/template-parser';

export default defineConfig([
  // 1) Base JS rules (for any stray .js tooling files)
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2021 },
    },
    ...js.configs.recommended,
  },

  // 2) TypeScript source (typed linting)
  {
    files: ['**/*.ts'],
    ignores: ['**/*.spec.ts', 'dist/**', '.angular/**'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Typed linting powered by the Project Service (no extra tsconfig needed)
        // https://typescript-eslint.io/blog/project-service/
        projectService: true,
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
      },
      globals: { ...globals.browser, ...globals.es2021 },
    },
    plugins: {
      '@angular-eslint': angular as any,
      '@typescript-eslint': tseslint.plugin,
    },
    extends: [
      // TS-ESLint recommended + typed rules for better safety
      ...tseslint.configs.recommendedTypeChecked,
    ],
    rules: {
      // Angular best practices aligned with your seed’s guidelines
      '@angular-eslint/component-class-suffix': ['error', { suffixes: ['Component'] }],
      '@angular-eslint/directive-class-suffix': ['error', { suffixes: ['Directive'] }],
      '@angular-eslint/no-attribute-decorator': 'error',
      '@angular-eslint/prefer-standalone': 'error', // prefer standalone components
      '@angular-eslint/use-injectable-provided-in': 'error',
      '@angular-eslint/no-lifecycle-call': 'error',

      // Inputs/Outputs (you use input()/output() APIs)
      '@angular-eslint/no-input-rename': 'warn',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-output-rename': 'warn',

      // TS hygiene that fits your rules (strict typing, safe async)
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-explicit-any': 'warn', // prefer `unknown` over `any`
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },

  // 3) External Angular templates (.html)
  {
    files: ['**/*.html'],
    // Use the plugin's recommended template config (works with your version)
    ...angularTemplate.configs.recommended,
    // Optional: add the accessibility preset if you want more a11y checks
    // ...angularTemplate.configs.accessibility,

    // Patch: plugins must be an object, not a string array
    plugins: {
      '@angular-eslint/template': angularTemplate as any,
    },

    // Tailor a couple of rules for your setup:
    rules: {
      // You use Tailwind utilities, so allow inline styles if you want:
      '@angular-eslint/template/no-inline-styles': 'off',
    },
  },

// 4) Inline templates inside .ts files (if you use inline templates)
{
  files: ['**/*.ts'],
  // If TS complains about typings, keep the cast:
  processor: (angularTemplate as unknown as { processInlineTemplates: unknown })
    .processInlineTemplates as any,
},

  // 4) Test files – relax strict async/any rules
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
