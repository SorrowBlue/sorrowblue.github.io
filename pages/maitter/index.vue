<template>
  <v-parallax height="100%" dark src="@/images/qiichan.webp">
    <v-list style="background-color: transparent">
      <v-list-item v-for="i in 100" :key="i">
        <v-list-item-content>
          <v-list-item-title>Title</v-list-item-title>
          <v-list-item-subtitle>Subtitle</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-parallax>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
  }
});
</script>
