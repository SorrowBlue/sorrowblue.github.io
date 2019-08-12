<template>
  <v-container grid-list-md>
    <v-layout row justify-center>
      <v-flex xs12>
        <v-pagination v-model="page" circle :length="100" :page="page" :total-visible="7" />
      </v-flex>
      <template v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
        <v-flex xs12>
          <item-list :page="page" :pre-page="20" :query="query" />
        </v-flex>
      </template>
      <template v-else-if="$vuetify.breakpoint.md">
        <v-flex md6>
          <item-list :page="page * 2 - 1" :pre-page="20" :query="query" />
        </v-flex>
        <v-flex md6>
          <item-list :page="page * 2" :pre-page="20" :query="query" />
        </v-flex>
      </template>
      <template v-else>
        <v-flex lg4>
          <item-list :page="page * 3 - 2" :pre-page="20" :query="query" />
        </v-flex>
        <v-flex lg4>
          <item-list :page="page * 3 - 1" :pre-page="20" :query="query" />
        </v-flex>
        <v-flex lg4>
          <item-list :page="page * 3" :pre-page="20" :query="query" />
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { AxiosError } from 'axios'
import { Vue, Component } from 'vue-property-decorator'
import AuthUser from '../../assets/qiita_api/AuthUser'
import Tag from '../../assets/qiita_api/Tag'
import ItemList from '@/components/qiita/item-list.vue'
import { QiitaApi } from '~/plugins/qiita-api.client'

@Component({
  layout: 'qiita',
  components: {
    'item-list': ItemList
  },
  async asyncData({ app, query }) {
    let error
    const api: QiitaApi = app.$qiitaApi
    if ((await api.requestAuthUser()) != null) {
      const authUser = (await api.requestAuthUser()) as AuthUser
      const tags: Array<Tag> = await api.requestFollowingTags(authUser.id)
      return {
        authUser,
        tags
      }
    } else if (query.code) {
      await api.requestAccessTokens(query.code as string, query.state + '', (axiosError: AxiosError) => {
        error = {
          message: '認証エラーが発生しました',
          loading: false
        }
      })
      const authUser = (await api.requestAuthUser()) as AuthUser
      const tags: Array<Tag> = await api.requestFollowingTags(authUser.id)
      return {
        authUser,
        tags
      }
    }
  }
})
class QiitaIndex extends Vue {
  page = 1
  query = ''
}
export default QiitaIndex
</script>
