<template>
  <v-container grid-list-md>
    <v-layout row justify-center>
      <v-flex xs12 sm11 md10 lg8>
        <nuxt-content :document="page" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { defineComponent, useAsync, useContext, useRoute } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    useContext().$vuetify.theme.dark = false
    const params = useRoute().value.params
    const page = useAsync(async () => await useContext().$content(`blog/${params.date}`).fetch())
    const isDark = useContext().$vuetify.theme.dark
    return {
      page,
      params,
      isDark,
    }
  },
  head() {
    if (this.page == null) return
    const title = `${this.page.title} - sorrowblue.com`
    const url = `https://sorrowblue.com/blog/${this.page.slug}`
    const imageUrl = 'https://sorrowblue.com/images/ogp/blog.png'
    return {
      title,
      meta: [
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:image', property: 'og:image', content: imageUrl },
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'sorrowblue.github.io',
        },
      ],
      link: [
        { rel: 'canonica', href: url },
        // { rel: 'stylesheet', href: this.isDark ? '/css/prism-material-light.css' : 'css/prism-material-dark.css' },
        // { rel: 'stylesheet', href: '/css/prism-material-dark.css' },
      ],
    }
  },
})
</script>

<style lang="scss">
@import '~assets/css/nuxt-content.css';
</style>
