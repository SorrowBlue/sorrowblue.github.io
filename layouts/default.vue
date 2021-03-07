<template>
  <v-app>
    <v-app-bar app fixed elevate-on-scroll>
      <nuxt-link class="black--text" to="/" style="text-decoration: none">
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
    <v-main>
      <nuxt />
    </v-main>
    <v-footer>
      <v-btn v-for="social in socials" :key="social.link" class="mx-4" icon :href="social.link">
        <v-icon size="24px">{{ social.icon }}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <div>&copy; 2017 - {{ new Date().getFullYear() }} SorrowBlue</div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {
      socials: [
        { icon: 'fab fa-twitter', link: 'https://twitter.com/sorrowblue_sb' },
        { icon: 'fab fa-quora', link: 'https://qiita.com/SorrowBlue' },
      ],
      globals: [
        { title: 'Blog', link: '/blog' },
        { title: 'Portfolio', link: '/portfolio' },
        { title: 'Qiichan', link: '/qiichan' },
      ],
    }
  },
})
</script>
