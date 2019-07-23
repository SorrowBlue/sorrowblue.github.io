<template>
  <v-container class="markdown-body" grid-list-md v-html="bodyHtml" />
</template>

<script>
// import { sourceFileArray } from '../../../../static/content/blog/summary.json'

export default {
  validate({ params }) {
    return true
  },
  asyncData({ params }) {
    const data = require(`static/content/blog/json/${params.date}_${params.slug}.json`)
    return {
      title: data.title,
      bodyHtml: data.bodyHtml,
      params: params
    }
  },
  head() {
    const title = `${this.title} - sorrowblue.com`;
    const url = `https://sorrowblue.com/blog/${this.params.date}/${this.params.slug}/`;
    return {
      title: title,
      meta: [
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:title', property: 'og:title', content: title }
      ],
      link: [
        { rel: 'canonical', href: url },
        { rel: 'stylesheet', href: 'http://raw.githubusercontent.com/yrgoldteeth/darkdowncss/raw/master/darkdown.css' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/idea.min.css' }
      ]
    };
  }
};
</script>

<style scoped>
img, code {
  max-width: 100%;
  height: auto;
  word-wrap: break-word;
}

.hljs{display:block;overflow-x:auto;padding:.5em;color:#000;background:#fff}.hljs-subst,.hljs-title{font-weight:normal;color:#000}.hljs-comment,.hljs-quote{color:#808080;font-style:italic}.hljs-meta{color:#808000}.hljs-tag{background:#efefef}.hljs-section,.hljs-name,.hljs-literal,.hljs-keyword,.hljs-selector-tag,.hljs-type,.hljs-selector-id,.hljs-selector-class{font-weight:bold;color:#000080}.hljs-attribute,.hljs-number,.hljs-regexp,.hljs-link{font-weight:bold;color:#0000ff}.hljs-number,.hljs-regexp,.hljs-link{font-weight:normal}.hljs-string{color:#008000;font-weight:bold}.hljs-symbol,.hljs-bullet,.hljs-formula{color:#000;background:#d0eded;font-style:italic}.hljs-doctag{text-decoration:underline}.hljs-variable,.hljs-template-variable{color:#660e7a}.hljs-addition{background:#baeeba}.hljs-deletion{background:#ffc8bd}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:bold}
</style>
