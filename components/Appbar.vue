<template>
  <v-app-bar app fixed hide-on-scroll class="primary" dark>
    <nuxt-link id="toolbar__title" to="/">
      <v-toolbar-title class="text-uppercase">sorrowblue.github.io</v-toolbar-title>
    </nuxt-link>
    <v-spacer></v-spacer>
    <template v-if="!$vuetify.breakpoint.xs">
      <v-toolbar-items v-for="global in globals" :key="global.title">
        <v-btn text :to="global.link" v-text="global.title" />
      </v-toolbar-items>
    </template>
    <template v-if="$vuetify.breakpoint.xs" #extension>
      <v-toolbar-items v-for="global in globals" :key="global.title">
        <v-btn text :to="global.link" v-text="global.title" />
      </v-toolbar-items>
    </template>
    <v-menu offset-y :close-on-content-click="false">
      <template #activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>
            <v-switch v-model="$vuetify.theme.dark" label="Dark Mode"></v-switch>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {
      globals: [
        { title: 'Blog', link: '/blog' },
        { title: 'Portfolio', link: '/portfolio' },
        { title: 'Qiichan', link: '/qiichan' },
      ],
    }
  },
})
</script>
<style lang="scss" scoped>
#toolbar__title {
  color: var(--v-red-lighten5);
  text-decoration: none;
}
</style>
