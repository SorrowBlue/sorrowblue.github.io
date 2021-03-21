<template>
  <v-app>
    <v-app-bar app fixed hide-on-scroll column wrap>
      <router-link class="toolbar__title" to="/qiichan">
        <v-toolbar-title v-text="title" />
      </router-link>
      <v-toolbar-title v-text="subTitle" />
      <v-spacer />
      <v-text-field v-model="query" class="pl-5 pr-5" hide-details label="検索" single-line @keyup.enter="$router.push(`/qiichan/search?query=${query}`)" />
      <v-spacer />
      <v-menu offset-y :close-on-content-click="false" rounded="lg">
        <template #activator="{ on }">
          <v-avatar v-if="qiitaAuthUser != null" v-ripple size="40" v-on="on">
            <v-img :src="qiitaAuthUser.profile_image_url" />
          </v-avatar>
          <v-avatar v-else v-ripple size="40" v-on="on">
            <v-icon size="40" v-text="'mdi-account-circle'" />
          </v-avatar>
        </template>
        <template v-if="qiitaAuthUser != null">
          <v-card :width="$vuetify.breakpoint.thresholds.xs / 1.5">
            <v-row class="mt-0 pt-5" justify="space-around">
              <v-avatar size="80">
                <v-img :src="qiitaAuthUser.profile_image_url" />
              </v-avatar>
            </v-row>
            <v-card-title class="justify-center" v-text="qiitaAuthUser.name" />
            <v-card-subtitle class="justify-center text-center" v-text="`@${qiitaAuthUser.id}`" />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" outlined @click="menu = false">マイページ</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-text="`@${qiitaAuthUser.twitter_screen_name}`"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                    <v-icon>mdi-twitter</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-text="qiitaAuthUser.github_login_name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                    <v-icon>mdi-github</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>
            <v-card-actions>
              <v-row justify="space-around" class="ma-1">
                <v-chip v-for="tag in tags" :key="tag.id" class="mt-1 mb-1" :to="`qiichan/tags/${tag.id}`">
                  <v-avatar left> <v-img left :src="tag.icon_url" /> </v-avatar>
                  {{ tag.id }}
                </v-chip>
              </v-row>
            </v-card-actions>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="logout">ログアウト</v-btn>
              <v-btn color="primary" outlined @click="menu = false">マイページ</v-btn>
            </v-card-actions>

            <v-divider></v-divider>

            <v-list>
              <v-list-item>
                <v-list-item-title>Enable dark mode</v-list-item-title>
                <v-list-item-action>
                  <v-switch v-model="$vuetify.theme.dark"></v-switch>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </template>

        <template v-else>
          <v-card :width="$vuetify.breakpoint.thresholds.xs / 1.5">
            <v-card-title>Qiita API V2 利用制限</v-card-title>
            <v-card-text>認証している状態ではユーザごとに1時間に1000回まで、認証していない状態ではIPアドレスごとに1時間に60回までリクエストを受け付けます。</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" rounded @click="authorize"> 認証 </v-btn>
            </v-card-actions>

            <v-divider></v-divider>

            <v-list>
              <v-list-item>
                <v-list-item-title>Enable dark mode</v-list-item-title>
                <v-list-item-action>
                  <v-switch v-model="$vuetify.theme.dark"></v-switch>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </template>
      </v-menu>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer>
      <span>&copy; 2017</span>
    </v-footer>
    <v-snackbar v-model="status" timeout="1500">
      {{ status }}
      <template #action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useAsync, useRouter } from '@nuxtjs/composition-api'
import { QiitaTag, QiitaAuthUser } from '@/plugins/qiita/types'
import { qiitaStore } from '@/store'

export default defineComponent({
  setup(_, context) {
    context.root.$vuetify.theme.dark = false

    const subTitle = ref<string>('')
    const tags = ref<QiitaTag[]>([])
    const show = ref(false)
    const title = ref('Qiichan')
    const query = ref('')
    const fav = ref(false)
    const qiitaAuthUser = computed(() => qiitaStore.getAuthUser)

    const logout = () => qiitaStore.logout()
    context.emit('SubTitle', subTitle.value)

    const twitter = (authUser: QiitaAuthUser) => {
      location.href = `https://twitter.com/${authUser.twitter_screen_name}`
    }

    const github = (authUser: QiitaAuthUser) => {
      location.href = `https://github.com/${authUser.github_login_name}`
    }

    const submit = () => context.emit('qiitaQuery', query.value)

    const authorize = () => {
      qiitaStore.authorize()
    }

    const enter = () => {
      useRouter().push(`/qiichan/search.html?query=${query.value}`)
    }

    const status = computed({
      get: () => qiitaStore.getStatus,
      set: (value: string) => qiitaStore.setStatus(value),
    })

    useAsync(async () => {
      await qiitaStore.loadAuthUser()
      if (qiitaStore.getAuthUser != null) {
        const r = await qiitaStore.user.followingTags(qiitaStore.getAuthUser.id, 1, 20)
        if (r) {
          tags.value = r
        }
      }
    })

    return {
      subTitle,
      tags,
      fav,
      show,
      title,
      query,
      twitter,
      github,
      submit,
      authorize,
      status,
      enter,
      qiitaAuthUser,
      logout,
    }
  },
})
</script>

<style scoped>
.toolbar__title {
  color: var(--v-red-lighten5);
  text-decoration: none;
}
</style>
