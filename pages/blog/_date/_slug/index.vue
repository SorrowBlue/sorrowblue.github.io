<template>
  <v-container class="markdown-body" grid-list-md v-html="bodyHtml" />
</template>

<script>
// import { sourceFileArray } from '../../../../static/content/blog/summary.json'

export default {
  validate({ params }) {
    return true;
  },
  asyncData({ params }) {
    const data = require(`static/content/blog/json/${params.date}_${params.slug}.json`);
    return {
      title: data.title,
      bodyHtml: data.bodyHtml,
      params: params
    };
  },
  head() {
    const title = `${this.title} - sorrowblue.com`;
    const url = `https://sorrowblue.com/blog/${this.params.date}/${this.params.slug}/`;
    return {
      title: title,
      meta: [
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:image', property: 'og:image', content: 'https://sorrowblue.com/images/ogp/blog.png' },
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:site_name', property: 'og:site_name', content: 'sorrowblue.github.io' }
      ],
      link: [
        { rel: 'canonica', href: url },
        {
          rel: 'stylesheet',
          href: 'http://raw.githubusercontent.com/yrgoldteeth/darkdowncss/raw/master/darkdown.css'
        }
      ]
    };
  }
};
</script>

<style>
@import "@/assets/css/tomorrow-night.css";
</style>

<style scoped>
img,
code {
  max-width: 100%;
  height: auto;
  word-wrap: break-word;
}
</style>
