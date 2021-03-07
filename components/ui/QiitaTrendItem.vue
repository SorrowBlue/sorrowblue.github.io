<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :raised="hover"
      :color="$vuetify.theme.dark ? (hover ? 'grey darken-3' : 'grey darken-4') : null"
      height="100%"
      width="344"
      :to="`/qiichan/items/${trendItem.node.uuid}`"
      ripple
    >
      <v-list-item>
        <v-list-item-avatar color="white" size="40">
          <v-img :src="trendItem.node.author.profileImageUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="'@' + trendItem.node.author.urlName"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-img src="/images/qiichan/qiichan-trend_0.webp" height="194" :aspect-ratio="16 / 5">
        <v-card-title class="body-1 white--text" v-text="trendItem.node.title"></v-card-title>
      </v-img>

      <v-card-text class="pa-0">
        <v-row justify="space-between" class="pa-3 pt-0 pb-0">
          <v-col class="caption" cols="auto" v-text="formatDate(trendItem.node.createdAt)"></v-col>
          <v-col class="caption" cols="auto" v-text="`${trendItem.node.likesCount} likes`"></v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-hover>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator"
import { QiitaTrendItem as TrendItem } from "@/plugins/qiita/types"

@Component
export default class QiitaTrendItem extends Vue {
  @Prop()
  trendItem!: TrendItem

  formatDate(date: Date) {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  }
}
</script>
