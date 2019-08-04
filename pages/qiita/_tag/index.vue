<template>
  <v-container grid-list-md>
    <v-tabs fixed-tabs>
      <v-tab>Option</v-tab>
      <v-tab>Another Selection</v-tab>
      <v-tab>Items</v-tab>
      <v-tab>Another Screen</v-tab>
    </v-tabs>
    <v-layout justify-center>
      <v-flex xs12 sm11 md10 lg8>
        <v-layout row wrap>
          <v-flex xs12>
            <v-list>
              <template v-for="(data, index) in datas">
                <v-list-item ripple :key="data.title">
                  <v-list-item-avatar>
                    <v-img :src="data.user.profile_image_url"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="data.title"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text v-text="data.date + ' update'"></v-list-item-action-text>
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
  async asyncData({ app, params }) {
    const response = await app.$axios.$get(
      `https://qiita.com/api/v2/tags/${params.tag}/items`,
      {
        params: {}
      }
    )
    const datas = []
    response.forEach(element => {
      const date = new Date(element.updated_at)
      element.date = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
      datas.push(element)
    })
    return {
      datas
    }
  }
}
</script>
