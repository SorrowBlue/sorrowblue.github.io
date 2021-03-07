<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="2" lg="1" class="shrink" justify="end">
        <v-row justify="center" align="center">
          <v-col cols="auto" md="12">
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on }">
                <v-avatar v-ripple size="48" color="red" v-on="on">
                  <v-img :src="item.user.profile_image_url" alt="alt" />
                </v-avatar>
              </template>
              <v-card max-width="80vw">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.user.name" />
                      <v-list-item-subtitle v-text="`@${item.user.id}`" />
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-icon v-if="item.user.twitter_screen_name" @click="twitter" v-text="'fab fa-twitter-square'" />
                      <v-icon v-if="item.user.github_login_name" @click="github" v-text="'fab fa-github-square'" />
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider />
                  <v-list-item v-if="item.user.description">
                    <v-list-item-content>
                      <v-list-item-subtitle v-text="item.user.description" />
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </v-col>
          <v-col cols="auto" md="12">
            <v-btn outlined :color="isLike ? 'primary' : 'white'" @click="switchLike">
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
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn small :outlined="!isStock" :color="isStock ? 'primary' : 'white'" fab @click="switchStock" v-on="on">
                  <v-icon v-text="isStock ? 'mdi-folder-open' : 'mdi-folder'" />
                </v-btn>
              </template>
              <span v-if="isStock">ストックから外します</span>
              <span v-else>ストックします</span>
            </v-tooltip>
          </v-col>
          <v-col cols="auto" md="12">
            <v-btn small fab color="white">
              <v-icon color="black" @click="twitter(authUser)" v-text="'fab fa-twitter'" />
            </v-btn>
          </v-col>
          <v-col cols="auto" md="12">
            <v-btn small fab color="white">
              <v-icon color="black" @click="github(authUser)" v-text="'fab fa-github'" />
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="10" lg="11">
        <v-card class="pa-3">
          <v-card-title class="display-1" primary-title v-text="item.title" />
          <v-card-text>
            <div class="markdown" v-html="item.rendered_body" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="auto">
        <v-btn left small color="info" :href="`https://qiita.com/${item.user.name}/items/${item.id}/edit`">
          <v-icon left v-text="'mdi-chat'" />
          編集リクエスト
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn :outlined="!isLike" small :color="isLike ? 'green' : 'white'" @click="switchLike" v-on="on">
              <v-icon left v-text="'mdi-thumb-up'" />
              {{ item.likes_count }}
            </v-btn>
          </template>
          <span v-if="isLike">いいねを外します</span>
          <span v-else>いいね</span>
        </v-tooltip>
      </v-col>
      <v-col cols="auto">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small :outlined="!isStock" :color="isStock ? 'primary' : 'white'" @click="switchStock" v-on="on">
              <v-icon left v-text="isStock ? 'mdi-folder-open' : 'mdi-folder'" />
              ストック
            </v-btn>
          </template>
          <span v-if="isStock">ストックから外します</span>
          <span v-else>ストックします</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { QiitaApi } from '@/plugins/qiita-api.client'
import Item from '@/plugins/qiita/Item'

@Component({
  layout: 'qiita',
  async asyncData({ params, app }) {
    const qiitaApi: QiitaApi = app.$qiitaApi
    const item = await qiitaApi.requestItem(params.id + '')
    return {
      authUser: item.user,
      item,
      isStock: false,
      isLike: await qiitaApi.isItemLike(item.id),
    }
  },
})
class ItemIndex extends Vue {
  item!: Item
  isLike!: Boolean
  isStock!: Boolean

  switchStock() {
    if (this.isStock) {
      // TODO
    } else {
      // TODO
    }
    this.isStock = !this.isStock
  }

  switchLike() {
    if (this.isLike) {
      this.$qiitaApi.requestDeleteLike(this.item.id)
      this.isLike = false
      this.item.likes_count--
    } else {
      this.$qiitaApi.requestPutLike(this.item.id)
      this.isLike = true
      this.item.likes_count++
    }
  }

  twitter() {
    location.href = `https://twitter.com/${this.item.user.twitter_screen_name}`
  }
  github() {
    location.href = `https://github.com/${this.item.user.github_login_name}`
  }
}

export default ItemIndex
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

  a:hover {
    text-decoration: underline;
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
