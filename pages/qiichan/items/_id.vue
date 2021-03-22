<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="3" order="2" order-md="1">
        <v-card class="pa-1 mx-auto" width="344">
          <v-row>
            <v-col cols="12" class="text-center">
              <v-avatar size="60"><v-img :src="item.user.profile_image_url"></v-img></v-avatar>
            </v-col>
            <v-col class="text-center body-1 pa-0 font-weight-bold" v-text="`${item.user.name}`"></v-col>
            <v-col cols="12" class="text-center body-1 pa-0" v-text="`@${item.user.id}`"></v-col>
            <v-col cols="12" class="text-center caption" v-text="item.user.description"></v-col>
            <v-col cols="12" class="text-center">
              <template v-for="service in serviceLinks(item.user)">
                <v-btn v-if="service.id" :key="service.url" icon :href="service.url" target="_blank"><v-icon v-text="service.icon"></v-icon> </v-btn>
              </template>
            </v-col>
            <v-col>
              <p class="body-1 text-center" v-text="item.user.items_count"></p>
              <p class="body-1 text-center">投稿</p>
            </v-col>
            <v-divider vertical class="my-3"></v-divider>
            <v-col>
              <p class="body-1 text-center" v-text="item.user.followers_count"></p>
              <p class="body-1 text-center">フォロワー</p>
            </v-col>
            <v-divider vertical class="my-3"></v-divider>
            <v-col>
              <p class="body-1 text-center" v-text="item.user.followees_count"></p>
              <p class="body-1 text-center">フォロー</p>
            </v-col>
            <v-col cols="12">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.user.location"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon><v-icon>fas fa-map-marker-alt</v-icon></v-list-item-icon>
                </v-list-item>
                <v-divider v-if="item.user.organization"></v-divider>
                <v-list-item v-if="item.user.organization">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.user.organization"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon><v-icon>fas fa-building</v-icon></v-list-item-icon>
                </v-list-item>
                <v-divider v-if="item.user.website_url"></v-divider>
                <v-list-item v-if="item.user.website_url" :href="item.user.website_url" target="_brank">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.user.website_url"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon><v-icon>fas fa-globe</v-icon></v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" xs="11" sm="10" md="8" lg="8" xl="6" order="1" order-md="2">
        <v-card class="pa-5">
          <p class="display-1 font-weight-black" v-text="item.title"></p>
          <p class="markdown-body" v-html="item.rendered_body"></p>
        </v-card>
      </v-col>
      <v-col cols="12" xs="11" sm="10" md="10" lg="10" xl="3" order="3" order-md="3">
        <v-card class="pa-3" width="100%">
          <v-list>
            <template v-for="(comment, i) in comments">
              <v-list-item :key="comment.id">
                <v-list-item-avatar>
                  <v-img :src="comment.user.profile_image_url"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline" v-text="comment.user.id"></v-list-item-title>
                  <v-list-item-subtitle v-text="`${comment.updated_at}に更新`"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action v-if="user != null && comment.user.id === user.id">
                  <v-menu offset-y>
                    <template #activator="{ on }">
                      <v-list-item-icon>
                        <v-icon color="grey lighten-1" v-on="on">fas fa-ellipsis-v</v-icon>
                      </v-list-item-icon>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>削除</v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>編集</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
              </v-list-item>
              <v-list-item :key="comment.id">
                <v-list-item-content>
                  <v-list-item-title class="body-1" v-html="comment.rendered_body"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="i !== comments.length - 1" :key="comment.id"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { QiitaUser } from '@/plugins/qiita/types'
import { defineComponent, useAsync, useRoute } from '@nuxtjs/composition-api'
import { qiitaStore } from '~/store'

export default defineComponent({
  layout: 'qiichan',
  setup() {
    const serviceLinks = (user: QiitaUser) => {
      return [
        {
          id: user.twitter_screen_name,
          url: `https://twitter.com/${user.twitter_screen_name}`,
          icon: 'fab fa-twitter-square',
        },
        {
          id: user.linkedin_id,
          url: `https://www.linkedin.com/in/${user.linkedin_id}`,
          icon: 'fab fa-linkedin',
        },
        {
          id: user.github_login_name,
          url: `https://github.com/${user.github_login_name}`,
          icon: 'fab fa-github-square',
        },
        {
          id: user.facebook_id,
          url: `https://www.facebook.com/${user.facebook_id}`,
          icon: 'fab fa-facebook-square',
        },
      ]
    }
    const deleteComment = async (id: string) => {
      await qiitaStore.comment.deleteComment(id)
    }
    const route = useRoute()
    const data = useAsync(async () => {
      if (route.value.params.id) {
        const item = await qiitaStore.item.item(route.value.params.id)
        const comments = await qiitaStore.item.comments(item.id)
        return {
          item,
          comments,
        }
      } else {
        return {
          item: null,
          comments: [],
        }
      }
    })
    return {
      serviceLinks,
      deleteComment,
      data,
      user: qiitaStore.getAuthUser,
    }
  },
})
</script>

<style lang="scss">
img {
  max-width: 100%;
}
</style>
