<template>
  <v-container grid-list-md>
    <v-layout row wrap justify-start align-start>
      <v-flex xs12 sm5 md3 xl2>
        <user-board :auth-user="authUser" :tags="tags" :client-stat="clientStata" />
      </v-flex>
      <v-flex xs12 sm7 md9 xl10>
        <v-list v-for="i in 20" :key="i" two-line>
          <!-- <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>title</v-list-tile-title>
              <v-list-tile-sub-title>subTitle</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>-->
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AuthUser from '../../assets/qiita_api/AuthUser'
import Tag from '../../assets/qiita_api/Tag'
import userBoard from '~/components/qiita_api_user-board.vue'

const clientStat = 'BP6TcjN-jDY2K22J9CU-iEQeeiWQ3PGN'

@Component({
  components: {
    'user-board': userBoard
  },
  async asyncData({ app, query }) {
    const token = sessionStorage.getItem('TOKEN')
    if (token != null) {
      const response2: AuthUser = await app.$axios.$get('https://qiita.com/api/v2/authenticated_user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const tagResponse: Array<Tag> = await app.$axios.$get(`https://qiita.com/api/v2/users/${response2.id}/following_tags`)
      return {
        authUser: response2,
        tags: tagResponse
      }
    } else if (query.code != null && query.state === clientStat) {
      let response
      try {
        response = await app.$axios.$post('https://qiita.com/api/v2/access_tokens', {
          client_id: '112ffccc148278536d0b84c8ca0fc1f46c9163ea',
          client_secret: '5a1e96ce9f568478eac99a602676cbe2872c33cc',
          code: query.code
        })
      } catch (error) {
        const { status, statusText } = error.response
        console.log(`Error! HTTP Status: ${status} ${statusText}`)
        return {
          message: '認証エラーが発生しました',
          loading: false
        }
      }
      sessionStorage.setItem('TOKEN', response.token)
      const response2: AuthUser = await app.$axios.$get('https://qiita.com/api/v2/authenticated_user', {
        headers: { Authorization: `Bearer ${response.token}` }
      })
      const tagResponse: Array<Tag> = await app.$axios.$get(`https://qiita.com/api/v2/users/${response2.id}/following_tags`)
      const articleResponse = await app.$axios.$get(`https://qiita.com/ /api/v2/users/${response2.id}/items`)
      return {
        articles: articleResponse,
        authUser: response2,
        tags: tagResponse
      }
    }
  }
})
class QiitaApiV2 extends Vue {
  tags: Array<Tag> = []
  authUser: AuthUser | null = null
  clientStata = clientStat
}
export default QiitaApiV2
</script>
