import NuxtConfiguration from '@nuxt/config'
import sourceFileNameToUrl from './assets/js/sourceFileNameToUri'
import { sourceFileArray } from './static/content/blog/summary.json'
const config: NuxtConfiguration = {
  mode: 'spa',
  generate: {
    routes: () => sourceFileArray.map(sourceFileName => sourceFileNameToUrl(sourceFileName))
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vuetify.ts',
    '~/plugins/axios.ts',
    '~/plugins/qiita-api.client.ts'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/qiita_api/': 'https://qiita.com/api/v2/'
  },
  vuetify: {
    theme: {
      dark: true,
      primary: '#ff00ff'
      // accent: colors.grey.darken3,
      // secondary: colors.amber.darken3,
      // info: colors.teal.lighten1,
      // warning: colors.amber.base,
      // error: colors.deepOrange.accent4,
      // success: colors.green.accent3
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
        // config.module.rules.push({
          // enforce: 'pre',
          // test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          // exclude: /(node_modules)/
        // })
      // }
    // }
  }
}
export default config
