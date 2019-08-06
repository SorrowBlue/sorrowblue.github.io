<template>
  <v-container grid-list-md>
    <v-layout row justify-center>
      <v-flex class="markdown" xs12 sm11 md10 lg8 v-html="bodyHtml"></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  validate({ params }) {
    return true
  },
  asyncData({ params }) {
    const data = require(`static/content/blog/json/${params.date}_${params.slug}.json`)
    return {
      title: data.title,
      bodyHtml: data.bodyHtml,
      params
    }
  },
  head() {
    const title = `${this.title} - sorrowblue.com`
    const url = `https://sorrowblue.com/blog/${this.params.date}/${this.params.slug}/`
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
          content: 'sorrowblue.github.io'
        }
      ],
      link: [{ rel: 'canonica', href: url }]
    }
  }
}
</script>

<style lang="scss">
.markdown {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 16px;
    margin-bottom: 8px;
  }
  h1,
  h2 {
    border-bottom: 4px solid #fff;
  }

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  table {
    margin: 8px 0;
    border-collapse: collapse;
    color: #212121;

    td,
    th {
      border: 1px solid #fff;
      padding: 6px 13px;
    }
    th {
      color: #fff;
      background-color: #707070;
    }

    tr {
      background-color: #cfcfcf;
      &:nth-child(2n) {
        background-color: #9e9e9e;
      }
    }
  }
  code {
    padding: 0 8px;
    &::before,
    &::after {
      content: '';
    }
  }
  pre {
    margin: 8px 0;
    code {
      color: #bababa;
      padding: 8px;
      width: 100%;
      &::before,
      &::after {
        content: '';
      }
    }
  }
  hr {
    margin: 32px 0;
    border-width: 0 0 1px;
    border-image: linear-gradient(90deg, hsla(0, 0%, 100%, 0.5), hsla(0, 0%, 100%, 0) 25%, hsla(0, 0%, 100%, 0.5) 50%, hsla(0, 0%, 100%, 0) 75%, hsla(0, 0%, 100%, 0.5) 100%) 0 0 100%;
    border-style: solid;
  }

  blockquote {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 8px;
    padding-left: 16px;
    border-left: 4px solid #fff;
    a {
      color: lightgreen;
    }
  }
  img {
    max-width: 100%;
  }
}
.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  border: 1px solid #fff;
  background: #2b2b2b !important;
  color: #bababa;
}
.hljs-strong,
.hljs-emphasis {
  color: #a8a8a2;
}
.hljs-bullet,
.hljs-quote,
.hljs-link,
.hljs-number,
.hljs-regexp,
.hljs-literal {
  color: #6896ba;
}
.hljs-code,
.hljs-selector-class {
  color: #a6e22e;
}
.hljs-emphasis {
  font-style: italic;
}
.hljs-keyword,
.hljs-selector-tag,
.hljs-section,
.hljs-attribute,
.hljs-name,
.hljs-variable {
  color: #cb7832;
}
.hljs-params {
  color: #b9b9b9;
}
.hljs-string {
  color: #6a8759;
}
.hljs-subst,
.hljs-type,
.hljs-built_in,
.hljs-builtin-name,
.hljs-symbol,
.hljs-selector-id,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-template-tag,
.hljs-template-variable,
.hljs-addition {
  color: #e0c46c;
}
.hljs-comment,
.hljs-deletion,
.hljs-meta {
  color: #7f7f7f;
}
</style>
