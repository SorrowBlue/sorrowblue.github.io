<template>
  <v-hover v-slot:default="{ hover }">
    <v-card v-if="!$vuetify.theme.dark" :raised="hover" height="100%" width="344" ripple>
      <v-list-item>
        <v-list-item-avatar color="white">
          <v-img :src="item.user.profile_image_url"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="'@' + item.user.id"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-img src="/images/qiichan/qiichan-trend_0.webp" height="194" :aspect-ratio="16 / 5">
        <v-card-title class="body-1 white--text" v-text="item.title"></v-card-title>
      </v-img>

      <v-card-text>
        <v-row justify="space-between">
          <v-col class="caption" cols="auto" v-text="formatDate(new Date(item.created_at))"></v-col>
          <v-col class="caption" cols="auto" v-text="`${item.likes_count} likes`"></v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card
      v-else
      :raised="hover"
      :color="$vuetify.theme.dark ? (hover ? 'grey darken-3' : 'grey darken-4') : null"
      height="100%"
      width="344"
      ripple
    >
      <v-list-item>
        <v-list-item-avatar color="white">
          <v-img :src="item.user.profile_image_url" height="194" :aspect-ratio="16 / 5"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="'@' + item.user.id"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-img src="/images/qiichan/qiichan-trend_0.webp" height="auto" :aspect-ratio="16 / 9">
        <v-card-title class="body-1 white--text" v-text="item.title"></v-card-title>
      </v-img>

      <v-card-text>
        <v-row justify="space-between">
          <v-col class="caption" cols="auto" v-text="formatDate(new Date(item.created_at))"></v-col>
          <v-col class="caption" cols="auto" v-text="`${item.likes_count} likes`"></v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-hover>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator"
import { QiitaItem as Item } from "@/plugins/qiita/types"

@Component({})
export default class QiitaItems extends Vue {
  @Prop()
  item!: Item

  formatDate(date: Date) {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  }
}
</script>
