import sourceFileNameToUrl from './assets/js/sourceFileNameToUri.js'
import { sourceFileArray } from './static/content/blog/summary.json'

const generateDynamicRoutes = (callback) => {
  const routes = sourceFileArray.map(sourceFileName => sourceFileNameToUrl(sourceFileName))
  callback(null, routes)
}

export default {
  mode: 'spa',
  generate: {
    routes: generateDynamicRoutes
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    script: [
      { src: '/js/404-redirect-ghpages.js' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true
  },
  vuetify: {
    theme: {
      primary: '#2196f3',
      secondary: '#e91e63',
      accent: '#ff5722',
      error: '#f44336',
      warning: '#ffc107',
      info: '#00bcd4',
      success: '#4caf50'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.node = {
        fs: 'empty'
      }
    }
  }
}
