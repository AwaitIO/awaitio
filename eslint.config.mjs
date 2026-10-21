import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';

// Same rules as edicek-monorepo/.eslintrc.js, written as one flat config for this small workspace.
const eslintConfig = [
  {
    ignores: ['**/dist/**', '**/node_modules/**', 'reference/**', '.claude/**', '**/.next/**', '**/out/**', '**/next-env.d.ts'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      import: importPlugin,
      'react-hooks': reactHooks,
    },
    settings: {
      'import/resolver': { node: { extensions: ['.js', '.ts', '.tsx'] } },
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-restricted-syntax': [
        'warn',
        {
          selector: 'SwitchStatement',
          message: "Switch statements are not allowed. Use match function instead from 'ts-pattern' package.",
        },
        {
          selector: "TSTypeAliasDeclaration[id.name='Props']",
          message: 'Props type name should follow the component or hook name.',
        },
        {
          selector: "TSTypeAliasDeclaration[id.name='Args']",
          message: 'Args type name should follow the function name.',
        },
        {
          selector: "TSTypeAliasDeclaration[id.name='Options']",
          message: 'Options type name should follow the class name.',
        },
        {
          selector: 'TSInterfaceDeclaration',
          message: 'Use type instead of interface.',
        },
      ],
      'no-process-env': 'error',
      'import/no-extraneous-dependencies': 'error',
      'import/no-default-export': 'error',
      'space-before-blocks': 'error',
      'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }, { blankLine: 'always', prev: '*', next: 'if' }, { blankLine: 'always', prev: 'if', next: '*' }],
      curly: 'error',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index', 'object', 'type'],
          ],
          'newlines-between': 'never',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['**/*.config.mts'],
    rules: { 'import/no-default-export': 'off' },
  },
];

export default eslintConfig;
