<template>
  <v-footer :app='!($vuetify.breakpoint.xs || $vuetify.breakpoint.sm || $vuetify.breakpoint.md)'>
    <v-btn v-for='s in sns' :key='s.icon' icon :href='s.link' target='_blank'>
      <v-icon v-if='s.icon' size='24px'>{{ s.icon }}</v-icon>
      <span v-else>{{ s.text }}</span>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn text href='https://docs.google.com/forms/d/e/1FAIpQLSdWkvC0RL_X22rPRKvsAkU900i9OXkHJzB3AilEBAEpBPwVfQ/viewform?usp=sf_link' target='_blank'>
      お問い合わせ
    </v-btn>
    <span>&copy; 2017-{{ new Date().getFullYear() }}<strong>SorrowBlue</strong></span>
  </v-footer>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const sns = [
      { icon: 'mdi-twitter', link: 'https://twitter.com/sorrowblue_sb' },
      { icon: 'mdi-github', link: 'https://github.com/SorrowBlue' },
      { icon: 'mdi-facebook', link: 'https://www.facebook.com/sorrowblue.sb' },
      { icon: 'mdi-youtube', link: 'https://www.youtube.com/channel/UCpr7M8p--26jjhuQr_mizaA' },
      { text: 'Q', link: 'https://qiita.com/SorrowBlue' }
    ];
    return { sns };
  }
});
</script>
