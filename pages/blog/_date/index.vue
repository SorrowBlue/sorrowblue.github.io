<template>
  <nuxt-content :document="page" />
</template>

<script>
import { defineComponent, useAsync, useContext, useRoute } from "@nuxtjs/composition-api";
import vuetify from "~/plugins/vuetify";

export default defineComponent({
  setup() {
    const params = useRoute().value.params;
    const page = useAsync(async () => await useContext().$content(`blog/${params.date}`).fetch());
    const isDark = vuetify.framework.theme.dark;
    return {
      page,
      params,
      isDark
    };
  }
  // head() {
  //   if (this.page == null) return;
  //   const title = `${this.page.title} - sorrowblue.com`;
  //   const url = `https://sorrowblue.com/blog/${this.page.slug}`;
  //   const imageUrl = 'https://sorrowblue.com/images/ogp/blog.png';
  //   return {
  //     title,
  //     meta: [
  //       { hid: 'og:url', property: 'og:url', content: url },
  //       { hid: 'og:type', property: 'og:type', content: 'article' },
  //       { hid: 'og:image', property: 'og:image', content: imageUrl },
  //       { hid: 'og:title', property: 'og:title', content: title },
  //       {
  //         hid: 'og:site_name',
  //         property: 'og:site_name',
  //         content: 'sorrowblue.github.io'
  //       }
  //     ],
  //     link: [
  //       { rel: 'canonica', href: url }
  //     ]
  //   };
  // }
});
</script>
