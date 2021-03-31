<template>
  <v-card class='pa-1 text-center' :to='`/qiichan/${user.id}`'>
    <v-btn class='mt-3' fab icon>
      <v-avatar><img :src='user.profile_image_url' alt='user'></v-avatar>
    </v-btn>

    <v-card-title :to='`/qiichan/${user.id}`'>
      <span style='width: 100%' v-text='user.name'></span>
    </v-card-title>

    <v-card-subtitle>
      <span style='width: 100%' v-text='`@${user.id}`'></span>
    </v-card-subtitle>

    <v-card-actions>
      <v-spacer></v-spacer>
      <template v-for='s in service'>
        <v-btn v-if='s.isVisible' :key='s.link' :href='s.link' target='_blank'
               icon>
          <v-icon :color='s.color' large v-text='s.icon'></v-icon>
        </v-btn>
      </template>
      <v-spacer></v-spacer>
    </v-card-actions>

    <v-card-text v-if='user.description'
                 v-text='user.description'></v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text large>{{ user.items_count }}<br />投稿</v-btn>
      <v-btn text large>{{ user.followees_count }}<br />フォロー</v-btn>
      <v-btn text large>{{ user.followers_count }}<br />フォロワー</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
    <v-list>
      <v-list-item v-if='user.website_url' :href='user.website_url' dense
                   target='_blank'>
        <v-list-item-icon>
          <v-icon>mdi-web</v-icon>
        </v-list-item-icon>
        <v-list-item-content class='text-left'>
          <v-list-item-title v-text='user.website_url'></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if='user.location' dense>
        <v-list-item-icon>
          <v-icon>mdi-map-marker</v-icon>
        </v-list-item-icon>
        <v-list-item-content class='text-left'>
          <v-list-item-title v-text='user.location'></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if='user.organization' dense>
        <v-list-item-icon>
          <v-icon>mdi-domain</v-icon>
        </v-list-item-icon>
        <v-list-item-content class='text-left'>
          <v-list-item-title v-text='user.organization'></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import QiitaUser from '@/qiita-api/type/QiitaUser';

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<QiitaUser>,
      required: true
    }
  },
  setup(prop) {
    const service = [
      {
        isVisible: prop.user.twitter_screen_name,
        link: `https://twitter.com/${prop.user.twitter_screen_name}`,
        icon: 'mdi-twitter',
        color: '#1DA1F2'
      }, {
        isVisible: prop.user.github_login_name,
        link: `https://github.com/${prop.user.github_login_name}`,
        icon: 'mdi-github',
        color: '#211F1F'
      }, {
        isVisible: prop.user.facebook_id,
        link: `https://www.facebook.com/${prop.user.facebook_id}`,
        icon: 'mdi-facebook',
        color: '#3B5998'
      }, {
        isVisible: prop.user.linkedin_id,
        link: `https://www.linkedin.com/in/${prop.user.linkedin_id}`,
        icon: 'mdi-linkedin',
        color: '#0077B5'
      }
    ];
    return { service };
  }
});
</script>
