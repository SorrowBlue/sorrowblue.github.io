<template>
  <v-container grid-list-md>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <v-layout column align-center>
          <v-flex>
            <v-pagination v-model="page" circle :length="100" :page="page" :total-visible="6"></v-pagination>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm11>
        <v-list>
          <template v-for="(data, index) in datas">
            <v-list-item :key="data.id" ripple :to="`/qiita_api_v2/tags/${data.id}`">
              <v-list-item-avatar>
                <v-img v-if="data.icon_url != null" :src="data.icon_url"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="data.id"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text v-text="data.items_count + ' notes'"></v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
            <v-divider v-if="index + 1 < datas.length" :key="index"></v-divider>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  watchQuery: ['page'],
  watch: {
    page(newPage) {
      this.$router.push({ query: { page: newPage } })
    }
  },
  async asyncData({ app, params, query }) {
    const response = await app.$axios.$get('https://qiita.com/api/v2/tags', {
      params: {
        page: query.page,
        sort: 'count'
      },
      headers: {
        Authorization: 'Bearer c43e667cf24b8e34c4f4a0532862be2c7be765ee'
      }
    })
    const page = query.page * 1 || 1
    const pages = [1, 2, 3, 4, 5].map((v, i) => (page <= 3 ? v : page - 2 + i))
    return {
      pages,
      page: query.page - 0 || 1,
      datas: response
    }
  }
}
</script>
