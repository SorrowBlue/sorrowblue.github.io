<template>
  <v-app dark>
    <v-toolbar app fixed :prominent="$vuetify.breakpoint.xs" :extended="$vuetify.breakpoint.xs">
      <router-link class="toolbar__title" to="/">
        <v-toolbar-title v-text="title" />
      </router-link>
      <v-spacer />
      <template v-if="!$vuetify.breakpoint.xs">
        <v-toolbar-items v-for="global in globals" :key="global.title">
          <v-btn flat :to="global.link" v-text="global.title" />
        </v-toolbar-items>
      </template>
      <template v-if="$vuetify.breakpoint.xs" v-slot:extension>
        <v-toolbar-items v-for="global in globals" :key="global.title">
          <v-btn flat :to="global.link" v-text="global.title" />
        </v-toolbar-items>
      </template>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'sorrowblue.github.io',
      globals: [
        { title: 'Blog', link: '/blog' },
        { title: 'Android', link: '/android' },
        { title: 'Portfolio', link: '/portfolio' }
      ]
    }
  }
}

</script>

<style scoped>
.toolbar__title {
  color: white;
  text-decoration: none;
}
</style>
