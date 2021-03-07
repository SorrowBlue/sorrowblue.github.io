import { Plugin } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosError, AxiosRequestConfig } from 'axios'

const AxiosPlugin: Plugin = (context, inject) => {
  context.$axios.onResponse( response => {
    context.$axios.setHeader('Access-Control-Allow-Origin', 'https://qiita.com')
  })
}

export default AxiosPlugin