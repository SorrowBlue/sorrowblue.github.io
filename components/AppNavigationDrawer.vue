<template>
  <v-navigation-drawer v-model='drawer' app clipped :bottom='$vuetify.breakpoint.xs'
                       :permanent='!($vuetify.breakpoint.xs || $vuetify.breakpoint.sm || $vuetify.breakpoint.md)'>
    <v-list dense nav>
      <slot></slot>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang='ts'>
import { computed, defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    value: Boolean
  },
  emits: ['input'],
  setup(props, { emit }) {
    const drawer = computed({
      get: () => props.value,
      set: (v) => emit('input', v)
    });
    return {
      drawer
    };
  }
});
</script>
