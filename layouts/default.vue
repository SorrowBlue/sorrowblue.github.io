<template>
  <v-app>
    <v-app-bar app fixed hide-on-scroll>
      <router-link class="toolbar__title" to="/">
        <v-toolbar-title v-text="title" />
      </router-link>
      <v-spacer />
      <template v-if="!$vuetify.breakpoint.xs">
        <v-toolbar-items v-for="global in globals" :key="global.title">
          <v-btn text :to="global.link" v-text="global.title" />
        </v-toolbar-items>
      </template>
      <template v-if="$vuetify.breakpoint.xs" v-slot:extension>
        <v-toolbar-items v-for="global in globals" :key="global.title">
          <v-btn text :to="global.link" v-text="global.title" />
        </v-toolbar-items>
      </template>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    title: 'sorrowblue.github.io',
    globals: [{ title: 'Blog', link: '/blog' }, { title: 'Android', link: '/android' }, { title: 'Portfolio', link: '/portfolio' }]
  })
}
</script>

<style scoped>
.toolbar__title {
  color: white;
  text-decoration: none;
}
</style>
