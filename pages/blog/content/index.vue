<template>
  <v-container class="markdown-body" grid-list-md v-html="bodyHtml" />
</template>

<script>
import MarkdownIt from 'markdown-it'
import HighlightJs from 'highlight.js'
import Sanitizer from 'markdown-it-sanitizer'
import Imsize from 'markdown-it-imsize'
import Axios from 'axios'
export default {
  validate({ params }) {
    return true
  },
  async asyncData({ params, query }) {
    const { data } = await Axios.get(`/blog/${query.date}/${query.slug}.md`)
    return {
      title: query.slug,
      bodyHtml: new MarkdownIt({
        highlight: (code, lang) => HighlightJs.highlightAuto(code, [lang]).value,
        linkify: true,
        breaks: true,
        typographer: true
      })
        .use(Sanitizer)
        .use(Imsize, { autofill: true })
        .render(data),
      params: query
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
