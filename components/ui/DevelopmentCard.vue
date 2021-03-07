<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      v-if="!$vuetify.theme.dark"
      :raised="hover"
      :elevation="hover ? 12 : 1"
      background-color="grey darken-4"
      height="100%"
      class="d-flex flex-column justify-start"
    >
      <v-img :src="development.img" height="200px" max-height="200px"></v-img>
      <v-card-title v-text="development.title"></v-card-title>
      <v-card-subtitle v-text="development.category"></v-card-subtitle>
      <v-card-text class="text--primary" v-text="development.desc"> </v-card-text>
      <v-spacer />
      <v-card-actions v-if="development.link">
        <v-btn class="ma-4" large :href="development.link" target="_blank">
          Go to page
        </v-btn>
      </v-card-actions>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <v-card-actions v-else v-html="development.view"></v-card-actions>
    </v-card>
    <v-card
      v-else
      :color="hover ? 'grey darken-3' : 'grey darken-4'"
      :raised="hover"
      background-color="grey darken-4"
      height="100%"
      class="d-flex flex-column justify-start"
    >
      <v-img :src="development.img" height="200px" max-height="200px"></v-img>
      <v-card-title v-text="development.title"></v-card-title>
      <v-card-subtitle v-text="development.category"></v-card-subtitle>
      <v-card-text class="text--primary" v-text="development.desc"> </v-card-text>
      <v-spacer />
      <v-card-actions v-if="development.link">
        <v-btn class="ma-4" large :href="development.link" target="_blank">
          Go to page
        </v-btn>
      </v-card-actions>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <v-card-actions v-else v-html="development.view"></v-card-actions>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator"

export interface Development {
  category: string
  img: string
  view: string | undefined
  link: string | undefined
  title: string
  desc: string
}

@Component
export default class DevelopmentCardCompoent extends Vue {
  @Prop({ required: true })
  development!: Development

  hover = true
}
</script>
