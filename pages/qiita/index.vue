<template>
  <v-container grid-list-md>
    <qiita-items />
  </v-container>
</template>

<script lang="ts">
import { AxiosError } from 'axios'
import { Vue, Component } from 'vue-property-decorator'
import Tag from '@/plugins/qiita/Tag'
import AuthUser from '@/plugins/qiita/AuthUser'
import { QiitaApi } from '@/plugins/qiita-api.client'
import Items from '@/components/qiita/items.vue'

@Component({
  layout: 'qiita',
  components: {
    'qiita-items': Items
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
export default class extends Vue {}
</script>
