module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
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
    'arrow-parens': 'off',
    'vue/html-self-closing': 'off',
    'space-before-function-paren': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-v-html': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': 1
  }
}
