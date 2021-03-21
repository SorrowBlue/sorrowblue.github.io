<template>
  <v-container>
    <v-banner> {{ $route.query.query }} の検索結果 </v-banner>
    <v-row justify="center" class="mr-auto">
      <v-col v-for="item in items" :key="item.id" cols="auto">
        <qiita-item :item="item"></qiita-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import QiitaItem from '@/components/ui/QiitaItem.vue'
import { defineComponent, ref, useAsync } from '@nuxtjs/composition-api'
import Item from '@/plugins/qiita/Item'
// import { QiitaApi } from '~/plugins/qiita-api.client'

export default defineComponent({
  components: {
    'qiita-item': QiitaItem,
  },
  layout: 'qiichan',
  setup(_) {
    // const qiitaApi: QiitaApi = useContext().app.$qiitaApi
    // const query = useRoute().value.query
    const items = ref<Item[]>([])
    useAsync(async () => {
      // items.value = query.query ? await qiitaApi.requestItems(1, 20, query.query as string) : await qiitaApi.requestItems(1, 20)
    })
    return {
      items,
    }
  },
})
</script>
