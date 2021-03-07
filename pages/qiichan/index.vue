<template>
  <v-container>
    <v-row justify="center" class="mr-auto">
      <v-col v-for="trend in trends" :key="trend.node.uuid" cols="auto">
        <qiita-trend-item :trend-item="trend"></qiita-trend-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"
import QiitaTrendItem from "@/components/ui/QiitaTrendItem.vue"
import { QiitaTrendItem as TrendItem } from "@/plugins/qiita/types"
import { qiitaStore } from "@/utils/store-accessor"

@Component({
  layout: "qiichan",
  components: {
    "qiita-trend-item": QiitaTrendItem
  },
  async asyncData({ app, query }) {
    const trends = await app.$qiitaApiClient.trend()
    if (query.code) {
      await qiitaStore.requestLoadAuthUser({ code: query.code + "", state: query.state + "" })
    }
    return { trends }
  }
})
export default class Qiichan extends Vue {
  restrendsult: TrendItem[] = []

  mounted() {
    this.$nuxt.$emit("SubTitle", "トレンド")
  }
}
</script>
