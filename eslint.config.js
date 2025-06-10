module.exports = {
    root: true,
    env: {
      es2021: true,
      node: true,
      'react-native/react-native': true,
    },
    extends: [
      'eslint:recommended',
      '@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      '@react-native-community',
      'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: './tsconfig.json',
    },
    plugins: [
      'react',
      'react-hooks',
      'react-native',
      '@typescript-eslint',
      'import',
    ],
    rules: {
      // Règles générales
      'no-console': 'warn',
      'no-unused-vars': 'off', // Désactivé car @typescript-eslint/no-unused-vars le gère
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      'no-var': 'error',

      // Règles d'import
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],

      // Règles React
      'react/react-in-jsx-scope': 'off', // Pas nécessaire avec React 17+
      'react/prop-types': 'off', // Si vous utilisez TypeScript
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Règles TypeScript
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-function': 'off',

      // Style de code
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never']
    }}