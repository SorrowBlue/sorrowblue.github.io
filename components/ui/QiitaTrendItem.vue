<template>
  <v-hover v-slot="{ hover1 }">
    <v-card :elevation="hover1 ? 12 : 2" width="344" :to="`/qiichan/items/${trendItem.node.uuid}`" ripple>
      <v-list-item>
        <v-list-item-avatar color="white" size="24">
          <v-img :src="trendItem.node.author.profileImageUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle v-text="'@' + trendItem.node.author.urlName"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text v-text="trendItem.node.createdAt"></v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
      <v-card-title v-text="trendItem.node.title"></v-card-title>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-list-item>
          <v-row align="center" justify="end">
            <v-icon class="mr-1">mdi-thumb-up-outline</v-icon>
            <span class="subheading mr-2">{{ trendItem.node.likesCount }}</span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1"> mdi-share-variant </v-icon>
            <span class="subheading">45</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script lang="ts">
import { QiitaTrendItem as TrendItem } from '@/plugins/qiita/types'
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    trendItem: {
      type: Object as PropType<TrendItem>,
      required: true,
    },
  },
  setup() {
    const hover1 = ref<boolean>(false)
    const formatDate = (date: Date) => {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    }
    return { formatDate, hover1 }
  },
})
</script>
