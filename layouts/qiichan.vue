<template>
  <v-app>
    <v-app-bar app fixed hide-on-scroll column wrap>
      <router-link class="toolbar__title" to="/qiichan">
        <v-toolbar-title v-text="title" />
      </router-link>
      <v-toolbar-title v-text="subTitle" />
      <v-spacer />
      <v-text-field v-model="query" class="pl-5 pr-5" hide-details label="検索" single-line @keyup.enter="enter" />
      <v-spacer />
      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-avatar v-if="authUser" v-ripple size="40" v-on="on">
            <v-img :src="authUser.profile_image_url" />
          </v-avatar>
          <v-avatar v-else v-ripple size="40" v-on="on">
            <v-icon size="40" v-text="'mdi-account-circle'" />
          </v-avatar>
        </template>
        <template v-if="authUser">
          <v-card :max-width="$vuetify.breakpoint.width">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-text="authUser.name" />
                  <v-list-item-subtitle v-text="`@${authUser.id}`" />
                </v-list-item-content>
                <v-icon v-if="authUser.twitter_screen_name" @click="twitter(authUser)">fab fa-twitter-square</v-icon>
                <v-icon v-if="authUser.github_login_name" @click="github(authUser)">fab fa-github-square</v-icon>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item v-if="authUser.description">
                <v-list-item-content>
                  <v-list-item-subtitle v-text="authUser.description" />
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-row>
                  <v-col v-for="tag in tags" :key="tag.id" cols="auto">
                    <v-chip @click="twitter">
                      <v-avatar left>
                        <v-img :src="tag.icon_url" />
                      </v-avatar>
                      {{ tag.id }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
          </v-card>
        </template>
        <template v-else>
          <v-card max-width="320">
            <v-card-title>Qiita API V2 利用制限</v-card-title>
            <v-card-text
              >認証している状態ではユーザごとに1時間に1000回まで、認証していない状態ではIPアドレスごとに1時間に60回までリクエストを受け付けます。</v-card-text
            >
            <v-card-actions>
              <v-spacer />
              <v-btn rounded color="primary" @click="authorize">
                認証
              </v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-switch v-model="$vuetify.theme.dark" label="Dark Mode"></v-switch>
            </v-card-actions>
          </v-card>
        </template>
      </v-menu>
    </v-app-bar>
    <v-content>
      <div>
        <v-alert
          v-model="status"
          dismissible
          color="cyan"
          border="left"
          elevation="2"
          colored-border
          icon="mdi-twitter"
          v-text="status"
        >
        </v-alert>
      </div>
      <nuxt />
    </v-content>
    <v-footer>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"
import { QiitaTag, QiitaAuthUser } from "@/plugins/qiita/types"
import { qiitaStore } from "@/store"
@Component
export default class Qiita extends Vue {
  subTitle: string = ""
  constructor() {
    super()
    this.$vuetify.theme.dark = false
  }

  setSubtitle(subTitle: string) {
    this.subTitle = subTitle
  }

  enter() {
    this.$router.push(`/qiichan/search?query=${this.query}`)
  }

  async created() {
    this.$nuxt.$on("SubTitle", this.setSubtitle)
    await qiitaStore.loadAuthUser()
  }

  get authUser() {
    return qiitaStore.authUser
  }

  get status() {
    return qiitaStore.status
  }

  tags: QiitaTag[] | null = null
  show = false
  title = "Qiita"
  query = ""

  twitter(authUser: QiitaAuthUser) {
    location.href = `https://twitter.com/${authUser.twitter_screen_name}`
  }

  github(authUser: QiitaAuthUser) {
    location.href = `https://github.com/${authUser.github_login_name}`
  }

  submit() {
    this.$nuxt.$emit("qiitaQuery", this.query)
  }

  authorize() {
    location.href = qiitaStore.authorize
  }
}
</script>

<style scoped>
.toolbar__title {
  color: var(--v-red-lighten5);
  text-decoration: none;
}
</style>
