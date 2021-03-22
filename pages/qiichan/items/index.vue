<template>
  <v-container>
    <v-row justify="center" class="mr-auto">
      <v-col v-for="item in data.items" :key="item.id" cols="auto">
        <QiitaItem :item="item"></QiitaItem>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import QiitaItem from '@/components/ui/QiitaItem.vue'
import { defineComponent, useAsync } from '@nuxtjs/composition-api'
import { qiitaStore } from '~/store'

export default defineComponent({
  components: {
    QiitaItem,
  },
  layout: 'qiichan',
  setup() {
    const data = useAsync(async () => {
      return {
        items: await qiitaStore.item.items(1, 20, ''),
      }
    })
    return {
      data,
    }
  },
})
</script>
