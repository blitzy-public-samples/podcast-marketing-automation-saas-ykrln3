module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

// TODO: Review and adjust ESLint rules based on team preferences and project requirements
// TODO: Consider adding custom rules specific to the project's coding standards
// TODO: Evaluate if any rules need to be disabled or modified for certain files or directories
// TODO: Ensure the configuration is compatible with the IDE/editor setup of all team members
// TODO: Consider adding rules for accessibility (e.g., eslint-plugin-jsx-a11y)
// TODO: Review and update the 'env' section if additional environments are needed
// TODO: Consider adding rules for import order and grouping (e.g., eslint-plugin-import)