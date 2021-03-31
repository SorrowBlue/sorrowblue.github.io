<template>
  <v-card :width='$vuetify.breakpoint.thresholds.xs / 2'>
    <template v-if='authUser'>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-avatar>
          <v-img :src='authUser.profile_image_url' />
        </v-avatar>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-card-title class='justify-center'>{{ authUser.name }}</v-card-title>
      <v-card-subtitle class='text-center'>@{{ authUser.id }}</v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon :href='`https://twitter.com/${authUser.twitter_screen_name}`' target='_blank'>
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn icon :href='`https://github.com/${authUser.github_login_name}`' target='_blank'>
          <v-icon>mdi-github</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click='logout'>ログアウト</v-btn>
        <v-btn color='primary' outlined>マイページ</v-btn>
      </v-card-actions>
    </template>
    <template v-else>
      <v-card-title>Qiita API V2 利用制限</v-card-title>
      <v-card-text>認証している状態ではユーザごとに1時間に1000回まで、認証していない状態ではIPアドレスごとに1時間に60回までリクエストを受け付けます。
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color='primary' rounded @click='authorize'>認証</v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import QiitaAuthUser from '@/qiita-api/type/QiitaAuthUser';
import { qiitaStore } from '@/utils/store-accessor';

export default defineComponent({
  props: {
    authUser: {
      type: Object as PropType<QiitaAuthUser>,
      required: true
    }
  },
  setup() {
    const authorize = () => qiitaStore.authorize();
    const logout = async () => await qiitaStore.logout();
    return { authorize, logout };
  }
});
</script>
