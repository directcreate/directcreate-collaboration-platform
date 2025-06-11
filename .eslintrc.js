module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // Custom rules to enforce API patterns
    'no-hardcoded-urls': 'error',
    'prefer-api-client': 'error',
    
    // Existing React rules
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    
    // Additional security rules
    'no-eval': 'error',
    'no-implied-eval': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  // Load custom rules
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    { rules: require('./eslint-rules') }
  ]
};
