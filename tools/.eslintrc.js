module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // extends: ['plugin:vue/recommended', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2020,
  },

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
    'arrow-parens': ['error', 'as-needed'],
    // https://github.com/benmosher/eslint-plugin-import/blob/v2.22.1/docs/rules/extensions.md
    'import/extensions': ['error', { vue: 'never' }],
    'no-shadow': [
      'error',
      {
        builtinGlobals: false,
        hoist: 'functions',
        allow: ['state', 'config', 'theme'],
      },
    ],
    'implicit-arrow-linebreak': 'off',
    'comma-dangle': 'off',
    // https://github.com/benmosher/eslint-plugin-import/blob/v2.22.1/docs/rules/no-cycle.md
    'import/no-cycle': [2, { maxDepth: 1 }],
    'max-len': [
      'error',
      {
        ignoreStrings: true,
        ignoreComments: true,
        ignorePattern: 'd="([\\s\\S]*?)"',
        // ignoreTrailingComments: true,
        // ignoreUrls: true,
        ignoreTemplateLiterals: true,
        // ignoreRegExpLiterals: true,
      },
    ],
    // https://eslint.org/docs/2.0.0/rules/operator-linebreak
    'operator-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'global-require': 'off',
    'object-curly-newline': ['error', { consistent: true }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
