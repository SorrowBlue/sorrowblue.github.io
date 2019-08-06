module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  plugins: ['@typescript-eslint'],
  parserOptions: {
    // parser: 'babel-eslint'
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'prettier/vue',
    '@nuxtjs',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  rules: {
    semi: 'off',
    'no-unused-vars': 'off',
    'max-len': ["error", { "code": 200 }],
    'arrow-parens': 'off',
    'vue/html-self-closing': 'off',
    'space-before-function-paren': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-v-html': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': 1
  }
}
