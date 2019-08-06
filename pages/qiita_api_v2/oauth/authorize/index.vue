<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>vcard</v-card>
        <v-btn :loading="loading" color="primary" @click="onClickAuth">認証</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { setTimeout } from 'timers'
import getToken from '~/assets/qiita_api/getToken'
const clientStat = 'BP6TcjN-jDY2K22J9CU-iEQeeiWQ3PGN'
export default {
  async asyncData({ $axios, query }) {
    if (query.code != null && query.state === clientStat) {
      let response
      try {
        response = getToken($axios, query.code)
      } catch (error) {
        const { status, statusText } = error.response
        console.log(`Error! HTTP Status: ${status} ${statusText}`)
        return {
          message: '認証エラーが発生しました',
          loading: false
        }
      }
      sessionStorage.setItem('TOKEN', response.token)
      const response2 = await $axios.$get('https://qiita.com/api/v2/authenticated_user', {
        headers: { Authorization: `Bearer ${response.token}` }
      })
      console.log(`UserName ${response2.name}`)
      window.setTimeout(() => {
        location.href = '/qiita_api_v2/oauth/'
      }, 2000)
      return {
        loading: true
      }
    } else {
      return {
        loading: false
      }
    }
  },
  methods: {
    onClickAuth() {
      this.loading = true
      setTimeout(() => {
        location.href = `https://qiita.com/api/v2/oauth/authorize?client_id=112ffccc148278536d0b84c8ca0fc1f46c9163ea&scope=read_qiita&state=${clientStat}`
      }, 2000)
    }
  }
}
</script>
