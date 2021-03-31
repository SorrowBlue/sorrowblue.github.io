<template>
  <v-row justify="center">
    <v-col v-for="trend in trends" :key="trend.node.uuid" align-self="stretch" cols="auto">
      <qiita-trend-item :trend-item="trend"></qiita-trend-item>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useAsync, useFetch, useRoute, useRouter } from "@nuxtjs/composition-api";
import { qiitaStore } from "@/store";
import QiitaTrendItem from "@/components/qiichan/QiitaTrendItem.vue";

export default defineComponent({
  components: { QiitaTrendItem },
  layout: "qiichan",
  setup() {
    const query = useRoute().value.query;
    const trends = useAsync(async () => await qiitaStore.scrap.trend());
    useFetch(async () => {
      if (query.code && query.state) {
        await useRouter().replace({ query: {} });
        await qiitaStore.authenticate({
          code: query.code.toString(),
          state: query.state.toString()
        });
      }
    });
    return {
      trends
    };
  }
});
</script>
