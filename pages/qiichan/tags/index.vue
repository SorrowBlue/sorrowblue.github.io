<template>
  <v-row justify="center">
    <v-col>
      <v-pagination v-model="page" :page="page" circle
                    length="100"></v-pagination>
    </v-col>
    <v-col>
      <v-row justify="center">
        <v-card v-for="tag in tags" :key="tag.id" :to="`/qiichan/tags/${tag.id}`"
                class="ma-1"
                width="200">
          <v-img :src="tag.icon_url"
                 class="white--text align-end"
                 gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                 height="200px">
            <v-card-title v-text="tag.id"></v-card-title>
            <v-card-subtitle class="white--text"
                             v-text="tag.items_count + ' notes'"></v-card-subtitle>
          </v-img>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref, useFetch, watchEffect } from "@nuxtjs/composition-api";
import { qiitaStore } from "~/utils/store-accessor";
import QiitaTag from "~/qiita-api/type/QiitaTag";

export default defineComponent({
  layout: "qiichan",
  setup() {
    const page = ref(1);
    const tags = ref<QiitaTag[]>([]);
    useFetch(async () => {
      tags.value = await qiitaStore.tag.tags(page.value, 100, "count");
    });
    watchEffect(async () => {
      tags.value = await qiitaStore.tag.tags(page.value, 100, "count");
    });
    return {
      page, tags
    };
  }
});
</script>
