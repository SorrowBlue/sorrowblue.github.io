<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="2" lg="1" xl="1" class="shrink" justify="end">
        <v-row justify="center" align="center">
          <v-col cols="auto" md="12">
            <v-btn outlined>
              <v-icon left v-text="'mdi-thumb-up'" />
              {{ item.likes_count }}
            </v-btn>
          </v-col>
          <v-col cols="auto" md="12">
            <v-btn outlined>
              <v-icon left v-text="'mdi-chat'" />
              {{ item.comments_count }}
            </v-btn>
          </v-col>
          <v-col cols="auto" md="12">
            <v-btn v-ripple small fab color="white">
              <v-icon color="black" @click="twitter(authUser)" v-text="'fab fa-twitter'" />
            </v-btn>
          </v-col>
          <v-col cols="auto" md="12">
            <v-btn v-ripple small fab color="white">
              <v-icon color="black" @click="github(authUser)" v-text="'fab fa-github'" />
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="10" lg="10" xl="10">
        <v-card class="pa-3">
          <v-card-title primary-title v-text="item.title" />
          <div class="markdown" v-html="item.rendered_body" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { QiitaApi } from '@/plugins/qiita-api.client'

@Component({
  layout: 'qiita',
  async asyncData({ params, app }) {
    const qiitaApi: QiitaApi = app.$qiitaApi
    return {
      item: await qiitaApi.requestItem(params.id + '')
    }
  }
})
class Item extends Vue {
  actions = [
    {
      icon: 'mdi-thumb-up',
      prop: 'likes_count'
    },
    {
      icon: 'mdi-chat',
      prop: 'comments_count'
    }
  ]
}

export default Item
</script>

<style lang="scss">
.fa-link {
  visibility: hidden;
}
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
.highlight {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  border: 1px solid #fff;
  background: #2b2b2b !important;
  color: #bababa;
}
.highlight-strong,
.highlight-emphasis {
  color: #a8a8a2;
}
.mi,
.mf,
.kc,
.highlight-bullet,
.highlight-quote,
.highlight-link,
.highlight-number,
.highlight-regexp,
.highlight-literal {
  color: #6896ba;
}
.highlight-code,
.highlight-selector-class {
  color: #a6e22e;
}
.highlight-emphasis {
  font-style: italic;
}
.k,
.kd,
.highlight-keyword,
.highlight-selector-tag,
.highlight-section,
.highlight-attribute,
.highlight-name,
.highlight-variable {
  color: #cb7832;
}
.highlight-params {
  color: #b9b9b9;
}
.s,
.s1,
.highlight-string {
  color: #6a8759;
}
.nt,
.highlight-subst,
.highlight-type,
.highlight-built_in,
.highlight-builtin-name,
.highlight-symbol,
.highlight-selector-id,
.highlight-selector-attr,
.highlight-selector-pseudo,
.highlight-template-tag,
.highlight-template-variable,
.highlight-addition {
  color: #e0c46c;
}
.highlight-comment,
.highlight-deletion,
.highlight-meta {
  color: #7f7f7f;
}
</style>
