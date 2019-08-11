<template>
  <v-card>
    <template v-if="authUser">
      <v-layout row pa-3>
        <v-avatar xs12 :size="96">
          <v-img :src="authUser.profile_image_url" alt="profile_image_url" />
        </v-avatar>
        <v-flex xs12 title :class="authUser.name ? '' : 'grey--text'" v-text="authUser.name || '未設定'" />
        <v-flex xs12 subtitle-2 v-text="`@${authUser.id}`" />
        <v-flex xs12>
          <v-icon v-if="authUser.twitter_screen_name" @click="twitter" v-text="'fab fa-twitter-square'" />
          <v-icon v-if="authUser.github_login_name" @click="github" v-text="'fab fa-github-square'" />
        </v-flex>
        <v-flex xs12>
          <v-divider />
        </v-flex>
        <v-flex v-if="authUser.description" body-1 v-text="authUser.description" />
        <v-flex v-if="authUser.description" xs12>
          <v-divider />
        </v-flex>
        <v-flex v-if="authUser.website_url" xs12>
          <v-icon>mdi-link</v-icon>
          <a :href="authUser.website_url" v-text="authUser.website_url" />
        </v-flex>
        <v-flex v-if="authUser.organization" xs12>
          <v-icon>mdi-domain</v-icon>
          <span v-text="authUser.organization" />
        </v-flex>
        <v-flex v-if="authUser.location" xs12>
          <v-icon>mdi-home</v-icon>
          <span v-text="authUser.location" />
        </v-flex>
        <v-flex xs12>
          <v-divider />
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex v-for="tag in tags" :key="tag.id">
              <v-badge v-model="showTag" class="align-self-center" overlap mr-3 pr-3>
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
        </v-flex>
      </v-layout>
    </template>
    <template v-else>
      <v-card-title>Qiita API V2 利用制限</v-card-title>
      <v-card-text>認証している状態ではユーザごとに1時間に1000回まで、認証していない状態ではIPアドレスごとに1時間に60回までリクエストを受け付けます。</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn rounded :loading="loading" color="primary" @click="auth">
          認証
        </v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import AuthUser from '@/assets/qiita_api/AuthUser'
import Tag from '@/assets/qiita_api/Tag'

@Component
class UserBoard extends Vue {
  @Prop({ default: null })
  authUser!: AuthUser

  @Prop({ default: null })
  tags!: Array<Tag>

  showTag = false
  loading = false

  twitter() {
    location.href = `https://twitter.com/${this.$props.authUser.twitter_screen_name}`
  }
  github() {
    location.href = `https://github.com/${this.$props.authUser.github_login_name}`
  }
  auth() {
    this.loading = true
    setTimeout(() => {
      this.$qiitaApi.authorize()
      this.loading = false
    }, 2000)
  }
}
export default UserBoard
</script>
