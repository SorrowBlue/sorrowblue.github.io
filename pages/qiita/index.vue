<template>
  <v-container grid-list-md>
    <v-layout column>
      <v-layout column align-center>
        <v-flex xs1 align-center>
          <template v-for="i in pages">
            <v-chip :key="i" ripple :light="page == i" v-text="i" @click="setpage(i)"></v-chip>
          </template>
          <v-chip ripple>></v-chip>
        </v-flex>
      </v-layout>
      <v-flex fluid xs12 sm11 md10 lg8 xl8 class="blue">
        <v-layout row wrap>
          <v-flex xs12>
            <v-list>
              <template v-for="(data, index) in datas">
                <v-list-item :key="data.id" ripple :to="`/qiita/${data.id}`">
                  <v-list-item-avatar>
                    <v-img :src="data.icon_url"></v-img>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  async asyncData({ app, params, query }) {
    const response = await app.$axios.$get('https://qiita.com/api/v2/tags', {
      params: {
        page: query.page,
        sort: 'count'
      }
    })
    const datas = []
    response.forEach(element => {
      const date = new Date(element.created_at)
      element.date = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
      datas.push(element)
    })
    const page = query.page * 1 || 1
    const pages = [1, 2, 3, 4, 5].map((v, i) => (page <= 3 ? v : page - 2 + i))
    return {
      pages,
      page: query.page || 1,
      datas
    }
  },
  methods: {
    async setpage(page) {
      const response = await this.$axios.$get('https://qiita.com/api/v2/tags', {
        params: {
          page,
          sort: 'count'
        }
      })
      const datas = []
      response.forEach(element => {
        const date = new Date(element.created_at)
        element.date = `${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
        datas.push(element)
      })
      this.datas = datas
      this.page = page
    }
  }
}
</script>
