module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  plugins: ['@typescript-eslint'],
  parserOptions: { parser: '@typescript-eslint/parser' },
  extends: ['eslint:recommended', 'prettier', 'prettier/vue', '@nuxtjs', 'plugin:vue/recommended', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
  rules: {
    'no-unused-vars': 'off',
    'vue/no-v-html': 'off',
    'vue/max-attributes-per-line': 'off'
  }
}
