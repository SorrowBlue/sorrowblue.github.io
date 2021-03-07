<template>
  <v-container>
    <v-row justify="center" class="mr-auto">
      <v-col v-for="item in items" :key="item.id" cols="auto">
        <qiita-item :item="item"></qiita-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"
import QiitaItem from "@/components/ui/QiitaItem.vue"

@Component({
  layout: "qiichan",
  components: {
    "qiita-item": QiitaItem
  },
  async asyncData({ app }) {
    return {
      items: await app.$qiitaApiClient.requestItems(1, 20)
    }
  }
})
export default class Search extends Vue {}
</script>
