module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    camelcase: 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'func-names': 'off',
  },
};
