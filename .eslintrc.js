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
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'arrow-parens': 'off',
    'vue/html-self-closing': 'off',
    'space-before-function-paren': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-v-html': 'off'
  }
}
