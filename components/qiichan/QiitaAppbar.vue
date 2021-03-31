<template>
  <v-app-bar app fixed column clipped-left :color='!$vuetify.theme.dark ? "primary" : ""' dark>
    <v-app-bar-nav-icon
      v-if='($vuetify.breakpoint.xs || $vuetify.breakpoint.sm ||$vuetify.breakpoint.md)'
      @click.stop='$emit("input", !$event.target.value)'></v-app-bar-nav-icon>

    <v-toolbar-title>
      <v-list-item-content>
        <v-list-item-title>{{ title }}</v-list-item-title>
        <v-list-item-subtitle>{{ subTitle }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <slot name='center'></slot>

    <v-spacer></v-spacer>

    <slot name='append' class='me-1'></slot>

    <v-btn icon class='me-1' @click='$vuetify.theme.dark = !$vuetify.theme.dark'>
      <v-icon>{{ $vuetify.theme.dark ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny' }}
      </v-icon>
    </v-btn>

    <v-menu offset-y>
      <template #activator='{ on }'>
        <v-btn icon class='me-1' v-on='on'>
          <v-avatar v-if='qiitaAuthUser' v-ripple>
            <img :src='qiitaAuthUser.profile_image_url' alt='' />
          </v-avatar>
          <v-icon v-else>mdi-account-circle</v-icon>

        </v-btn>
      </template>
      <QiitaAuthUserCard :auth-user='qiitaAuthUser'></QiitaAuthUserCard>
    </v-menu>
  </v-app-bar>
</template>

<script lang='ts'>
import { computed, defineComponent } from '@nuxtjs/composition-api';
import { qiitaStore } from '@/utils/store-accessor';
import QiitaAuthUserCard from '@/components/qiichan/QiitaAuthUserCard.vue';

export default defineComponent({
  components: { QiitaAuthUserCard },
  props: {
    value: Boolean,
    title: {
      type: String,
      default: 'Qiichan'
    },
    subTitle: {
      type: String,
      default: ' by Qiita API v2'
    }
  },
  emits: ['input'],
  setup() {
    const qiitaAuthUser = computed(() => qiitaStore.authUser);
    return { qiitaAuthUser };
  }
});
</script>
