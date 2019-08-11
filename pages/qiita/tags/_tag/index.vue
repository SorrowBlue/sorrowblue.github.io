<template>
  <v-container grid-list-md>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <v-layout column align-center>
          <v-flex>
            <v-chip v-if="pages[0] != 1" :to="`/qiita_api_v2/tags/${tag}?page=${page - 1}`" ripple v-text="'<'" />
            <template v-for="i in pages">
              <v-chip :key="i" ripple :disabled="page == i" :to="`/qiita_api_v2/tags/${tag}?page=${i}`" v-text="i + ''" />
            </template>
            <v-chip v-if="pages[4] != 100" :to="`/qiita_api_v2/tags/${tag}?page=${page + 1}`" ripple v-text="'>'" />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm11 md10 lg8>
        <v-layout row wrap>
          <v-flex xs12>
            <v-list>
              <v-subheader v-text="tag" />
              <template v-for="(item, index) in items">
                <v-divider v-if="index < items.length" :key="index" />
                <v-list-item :key="item.title" ripple>
                  <v-list-item-avatar>
                    <v-img :src="item.user.profile_image_url" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title" />
                    <v-list-item-subtitle v-html="`Posted by ${item.user.name}`" />
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text v-text="item.time_lag + ' update'" />
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-list>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  watchQuery: ['page'],
  async asyncData({ app, params, query }) {
    const response = await app.$axios.$get(`https://qiita.com/api/v2/tags/${params.tag}/items`, {
      params: { page: query.page || 1, per_page: query.per_page || 20 }
    })
    const items = response.map((v, i, a) => {
      const nowDate = new Date()
      const updatedDate = new Date(v.updated_at)
      return Object.assign(
        {
          time_lag:
            (nowDate.getFullYear() - updatedDate.getFullYear() > 0
              ? `${nowDate.getFullYear() - updatedDate.getFullYear()} years`
              : nowDate.getMonth() - updatedDate.getMonth() > 0
              ? `${nowDate.getMonth() - updatedDate.getMonth()} months`
              : nowDate.getDate() - updatedDate.getDate() > 0
              ? `${nowDate.getDate() - updatedDate.getDate()} days`
              : nowDate.getHours() - updatedDate.getHours() > 0
              ? `${nowDate.getHours() - updatedDate.getHours()} hours`
              : nowDate.getMinutes() - updatedDate.getMinutes() > 0
              ? `${nowDate.getMinutes() - updatedDate.getMinutes()} minutes`
              : `${nowDate.getSeconds() - updatedDate.getSeconds()} seconds`) + ' ago'
        },
        v
      )
    })
    const page = query.page - 0 || 1
    const pages = [1, 2, 3, 4, 5].map((v, i) => (page <= 3 ? v : page - 2 + i))
    return {
      pages,
      page,
      items,
      tag: params.tag
    }
  }
}
</script>
