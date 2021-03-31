<template>
  <v-app>
    <app-navigation-drawer v-model='drawer'>
      <v-list-item v-for='v in drawerList' :key='v.link' :to='v.link' link>
        <v-list-item-content>
          <v-list-item-title>{{ v.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </app-navigation-drawer>

    <qiita-appbar v-model='drawer'
                  :title='($vuetify.breakpoint.xs || $vuetify.breakpoint.sm) && input ? "" : title'>
      <template #center>
        <v-text-field v-if='!$vuetify.breakpoint.xs' v-model='query' label='Search' clearable
                      single-line hide-details
                      @keyup.enter='$router.push(`/qiichan/search?query=${query}`)'></v-text-field>
      </template>
    </qiita-appbar>
    <v-main>
      <v-container>
        <v-banner app :value='banner'>
          <div class='text-h6'>Qiita API V2 利用制限</div>
          <div class='text-subtitle-1'>
            認証している状態ではユーザごとに1時間に1000回まで、認証していない状態ではIPアドレスごとに1時間に60回までリクエストを受け付けます。
          </div>
          <template #actions>
            <v-btn text color='secondary' @click='visited'>Got It</v-btn>
          </template>
        </v-banner>
        <nuxt></nuxt>
      </v-container>
    </v-main>
    <app-footer></app-footer>
  </v-app>
</template>

<script lang='ts'>
import { computed, defineComponent, ref, useFetch, useRouter } from '@nuxtjs/composition-api';
import { qiitaStore } from '@/store';
import QiitaAuthUser from '~/qiita-api/type/QiitaAuthUser';
import QiitaAppbar from '~/components/qiichan/QiitaAppbar.vue';
import AppFooter from '~/components/AppFooter.vue';
import AppNavigationDrawer from '~/components/AppNavigationDrawer.vue';

export default defineComponent({
  components: { AppNavigationDrawer, AppFooter, QiitaAppbar },
  layout: 'qiichan',
  emits: ['SubTitle', 'qiitaQuery'],
  setup(_, context) {
    context.root.$vuetify.theme.dark = false;

    const banner = ref(localStorage.getItem('first_visited') == null);
    const visited = () => {
      banner.value = false;
      localStorage.setItem('first_visited', 'visited');
    };
    const snackbar = ref(false);
    const drawer = ref(false);
    const drawerList = ref([
      { title: 'トレンド', link: '/qiichan/trend' },
      { title: 'タグ', link: '/qiichan/tags' },
      { title: '投稿', link: '/qiichan/items' },
      { title: 'API', link: '/qiichan/schema' }]
    );
    const input = ref(false);
    const title = ref<string>('Qiichan');
    const subTitle = ref<string>('');
    const query = ref('');
    const fav = ref(false);
    const qiitaAuthUser = computed(() => qiitaStore.authUser);

    context.emit('SubTitle', subTitle.value);

    const twitter = (authUser: QiitaAuthUser) => {
      location.href = `https://twitter.com/${authUser.twitter_screen_name}`;
    };

    const github = (authUser: QiitaAuthUser) => {
      location.href = `https://github.com/${authUser.github_login_name}`;
    };

    const submit = () => context.emit('qiitaQuery', query.value);

    const enter = () => {
      useRouter().push(`/qiichan/search.html?query=${query.value}`);
    };

    const status = computed({
      get: () => qiitaStore.status,
      set: (value: string) => qiitaStore.setStatus(value)
    });

    useFetch(async () => {
      await qiitaStore.loadAuthUser();
    });

    context.root.$on('title', (value: string) => {
      title.value = value;
    });
    context.root.$on('sub_title', (value: string) => {
      subTitle.value = value;
    });
    context.root.$on('drawer_list', (value: { title: string, link: string }[]) => {
      drawerList.value = value;
    });
    return {
      banner,
      visited,
      title,
      subTitle,
      drawerList,
      fav,
      query,
      input,
      twitter,
      github,
      submit,
      status,
      snackbar,
      drawer,
      enter,
      qiitaAuthUser
    };
  }
});
</script>
