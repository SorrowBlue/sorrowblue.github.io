import fs from 'fs'
import path from 'path'
import { NuxtConfig } from '@nuxt/types'
import colors from 'vuetify/es5/util/colors'
import { QiitaApi } from './plugins/qiita-api.client'

require('dotenv').config()

const config: NuxtConfig = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' },
    ],
  },

  server: {
    https: {
      key: fs.readFileSync(path.join(__dirname, './localhost+1-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, './localhost+1.pem')),
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vuetify.ts', '@/plugins/qiita/QiitaApiClient.ts', '@/plugins/axios-accessor.ts', '~/plugins/axios.ts', '~/plugins/qiita-api.client.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/composition-api',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/proxy',
  ],

  proxy: {
    '/qiita/': {
      target: 'https://qiita.com',
      pathRewrite: {
        '^/qiita/': '/',
      },
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: '遅れます.me',
      title: '遅れます.me',
      'og:title': '遅れます.me',
      description:
        'いつものように起きたら、突然の頭痛、そんなとき、仕事のメールを打ちたいですか？朝、いつもどおりに出発・・・しかし突然の電車遅延。混雑した社内でメール打ちたいですか？そんなあなたのためのサービスです。',
      'og:description':
        'いつものように起きたら、突然の頭痛、そんなとき、仕事のメールを打ちたいですか？朝、いつもどおりに出発・・・しかし突然の電車遅延。混雑した社内でメール打ちたいですか？そんなあなたのためのサービスです。',
      lang: 'ja',
      theme_color: '#529b58',
      background_color: '#bde0c0',
      display: 'standalone',
      scope: '/',
      start_url: '/',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      primary: '#3F51B5',
      accent: '#FF4081',
      secondary: '#FF4081',
      info: colors.teal.lighten1,
      warning: colors.yellow.base,
      error: colors.red.base,
      success: colors.green.base,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    QIITA_CLIENT_ID: process.env.QIITA_CLIENT_ID!,
    QIITA_CLIENT_SECRET: process.env.QIITA_CLIENT_SECRET!,
    QIITA_CLIENT_ID_LOCAL: process.env.QIITA_CLIENT_ID_LOCAL!,
    QIITA_CLIENT_SECRET_LOCAL: process.env.QIITA_CLIENT_SECRET_LOCAL!,
  },
}
export default config
declare module 'vue/types/vue' {
  interface Vue {
    $qiitaApi: QiitaApi
  }
}
