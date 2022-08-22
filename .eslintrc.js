module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['tsconfig.json'],
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended'
  ],
  plugins: ['react'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'type', 'parent', 'sibling', 'index'],
        'newlines-between': 'always-and-inside-groups',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false
        },
        warnOnUnassignedImports: true
      }
    ]
  }
};
