<template>
  <v-card v-if="shouldDisplayHint">
    <template v-if="authUser">
      <v-layout row pa-3>
        <v-avatar xs12 :size="96">
          <img :src="authUser.profile_image_url" alt="profile_image_url" />
        </v-avatar>
        <v-flex xs12 title :class="authUser.name ? '' : 'grey--text'" v-text="authUser.name || '未設定'"></v-flex>
        <v-flex xs12 subtitle-2 v-text="`@${authUser.id}`"></v-flex>
        <v-flex xs12>
          <v-icon v-if="authUser.twitter_screen_name" @click="twitter">fab fa-twitter-square</v-icon>
          <v-icon v-if="authUser.github_login_name" @click="github">fab fa-github-square</v-icon>
        </v-flex>
        <v-flex xs12>
          <v-divider></v-divider>
        </v-flex>
        <v-flex v-if="authUser.description" body-1 v-text="authUser.description"></v-flex>
        <v-flex v-if="authUser.description" xs12>
          <v-divider></v-divider>
        </v-flex>
        <v-flex v-if="authUser.website_url" xs12>
          <v-icon>mdi-link</v-icon>
          <a :href="authUser.website_url" v-text="authUser.website_url"></a>
        </v-flex>
        <v-flex v-if="authUser.organization" xs12>
          <v-icon>mdi-domain</v-icon>
          <span v-text="authUser.organization"></span>
        </v-flex>
        <v-flex v-if="authUser.location" xs12>
          <v-icon>mdi-home</v-icon>
          <span v-text="authUser.location"></span>
        </v-flex>
        <v-flex xs12>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex v-for="tag in tags" :key="tag.id">
              <v-badge v-model="showTag" class="align-self-center" overlap mr-3 pr-3>
                <template v-slot:badge>
                  <span class="white--text" v-text="tag.items_count"></span>
                </template>
                <v-chip @click="twitter" @mouseover="showTag = true" @mouseout="showTag = false">
                  <v-avatar left @mouseover="showTag = true" @mouseout="showTag = false">
                    <v-img :src="tag.icon_url"></v-img>
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
        <v-btn text @click="changeHint">このまま使用する</v-btn>
        <v-spacer></v-spacer>
        <v-btn rounded color="primary" @click="auth">認証</v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import AuthUser from '@/assets/qiita_api/AuthUser'
import Tag from '@/assets/qiita_api/Tag'

const clientId = '112ffccc148278536d0b84c8ca0fc1f46c9163ea'
const scope = 'read_qiita'

@Component
class UserBoard extends Vue {
  @Prop({ default: null })
  authUser: AuthUser | undefined

  @Prop({ default: '' })
  clientStat: string = 'BP6TcjN-jDY2K22J9CU-iEQeeiWQ3PGN'

  @Prop({ default: null })
  tags: Array<Tag> | undefined

  showTag = false

  shouldDisplayHint = sessionStorage.getItem('QiitaAuthHint') !== 'false'
  changeHint() {
    this.shouldDisplayHint = !this.shouldDisplayHint
    sessionStorage.setItem('QiitaAuthHint', `${this.shouldDisplayHint}`)
  }
  twitter() {
    location.href = `https://twitter.com/${this.$props.authUser.twitter_screen_name}`
  }
  github() {
    location.href = `https://github.com/${this.$props.authUser.github_login_name}`
  }
  auth() {
    setTimeout(() => {
      location.href = `https://qiita.com/api/v2/oauth/authorize?client_id=${clientId}&scope=${scope}&state=${this.clientStat}`
    }, 200)
  }
}
export default UserBoard
</script>
