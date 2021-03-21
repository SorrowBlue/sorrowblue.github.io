<template>
  <v-container>
    <v-row justify="center">
      <v-col v-for="trend in trends" :key="trend.node.uuid" align-self="stretch" cols="auto">
        <QiitaTrendItem :trend-item="trend"></QiitaTrendItem>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { QiitaTrendItem as TrendItem } from '@/plugins/qiita/types'
import QiitaTrendItem from '@/components/ui/QiitaTrendItem.vue'
import { defineComponent, ref, useAsync, useRoute, useRouter } from '@nuxtjs/composition-api'
import { qiitaStore } from '@/store'

export default defineComponent({
  components: {
    QiitaTrendItem,
  },
  layout: 'qiichan',
  setup() {
    const query = useRoute().value.query
    const trends = ref<TrendItem[]>([])
    useAsync(async () => {
      if (query.code && query.state) {
        useRouter().replace({ query: {} })
        console.log(`code: ${query.code}, state: ${query.state}`)
        await qiitaStore.authenticate({
          code: query.code.toString(),
          state: query.state.toString(),
        })
      } else {
        await qiitaStore.loadAuthUser()
      }
      trends.value = await qiitaStore.scrap.trend()
    })
    return {
      trends,
    }
  },
})
</script>
