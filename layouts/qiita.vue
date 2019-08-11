<template>
  <v-app>
    <v-app-bar app fixed hide-on-scroll column wrap>
      <router-link class="toolbar__title" to="/">
        <v-toolbar-title v-text="title" />
      </router-link>
      <v-spacer />
      <v-text-field v-model="query" hide-details prepend-icon="search" single-line />
      <v-spacer />
      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-avatar v-if="authUser" v-ripple size="40" v-on="on">
            <v-img :src="authUser.profile_image_url" />
          </v-avatar>
          <v-avatar v-else v-ripple size="40" v-on="on">
            <v-icon size="40" color="white" v-text="'mdi-account-circle'" />
          </v-avatar>
        </template>
        <template v-if="authUser">
          <v-card max-width="320">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-text="authUser.name" />
                  <v-list-item-subtitle v-text="`@${authUser.id}`" />
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon v-if="authUser.twitter_screen_name" @click="twitter(authUser)" v-text="'fab fa-twitter-square'" />
                  <v-icon v-if="authUser.github_login_name" @click="github(authUser)" v-text="'fab fa-github-square'" />
                </v-list-item-action>
              </v-list-item>
              <v-divider />
              <v-list-item v-if="authUser.description">
                <v-list-item-content>
                  <v-list-item-subtitle v-text="authUser.description" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-layout row wrap justify-space-around>
                  <v-flex v-for="tag in tags" :key="tag.id" mr-1 mb-1>
                    <v-badge v-model="showTag" class="align-self-center" overlap xs12>
                      <template v-slot:badge>
                        <span class="white--text" v-text="tag.items_count" />
                      </template>
                      <v-chip @click="twitter" @mouseover="showTag = true" @mouseout="showTag = false">
                        <v-avatar left @mouseover="showTag = true" @mouseout="showTag = false">
                          <v-img :src="tag.icon_url" />
                        </v-avatar>
                        {{ tag.id }}
                      </v-chip>
                    </v-badge>
                  </v-flex>
                </v-layout>
              </v-list-item>
            </v-list>
          </v-card>
        </template>
        <template v-else>
          <v-card max-width="320">
            <v-card-title>Qiita API V2 利用制限</v-card-title>
            <v-card-text>認証している状態ではユーザごとに1時間に1000回まで、認証していない状態ではIPアドレスごとに1時間に60回までリクエストを受け付けます。</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn rounded color="primary" @click="authorize">
                認証
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-menu>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Tag from '~/plugins/qiita/Tag'
import AuthUser from '~/plugins/qiita/AuthUser'

@Component
export default class Qiita extends Vue {
  constructor() {
    super()
    this.asyncInit()
  }

  async asyncInit() {
    this.authUser = await this.$qiitaApi.getAuthUser()
    this.tags = await this.$qiitaApi.getTags()
  }
  tags: Tag[] | null = null
  authUser: AuthUser | null = null
  show = false
  title = 'Qiita'
  showTag = false
  globals = [{ title: 'Blog', link: '/blog' }, { title: 'Android', link: '/android' }, { title: 'Portfolio', link: '/portfolio' }]

  twitter(authUser: AuthUser) {
    location.href = `https://twitter.com/${authUser.twitter_screen_name}`
  }
  github(authUser: AuthUser) {
    location.href = `https://github.com/${authUser.github_login_name}`
  }

  authorize() {
    this.$qiitaApi.authorize()
  }
}
</script>

<style scoped>
.toolbar__title {
  color: white;
  text-decoration: none;
}
</style>
