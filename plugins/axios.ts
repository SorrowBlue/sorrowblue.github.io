import { Plugin } from '@nuxt/types'
import { qiitaStore } from '~/store'

const AxiosPlugin: Plugin = (context) => {
  context.$axios.onRequest((config) => {
    if (config.url?.startsWith('https://qiita.com/api/v2/') === true && qiitaStore.token != null) {
      config.headers = { Authorization: `Bearer ${qiitaStore.token}` }
    }
  })
}

export default AxiosPlugin

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWoker.js')
}
