<template>
  <v-row>
    <template v-if="loading">

      <v-col v-for="i in 20" :key="i">
        <v-card height="100%" width="344">
          <v-skeleton-loader
            type="list-item-three-line, list-item-two-line, list-item-avatar"></v-skeleton-loader>
        </v-card>
      </v-col>
    </template>
    <template v-else>
      <v-col v-for="trend in trends" :key="trend.node.uuid">
        <qiita-trend-item :trend-item="trend"></qiita-trend-item>
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import {defineComponent, ref, useAsync, useFetch, useRoute, useRouter} from "@nuxtjs/composition-api";
import {qiitaStore} from "@/store";
import QiitaTrendItem from "@/components/qiichan/QiitaTrendItem.vue";

export default defineComponent({
  components: {QiitaTrendItem},
  layout: "qiichan",
  setup() {
    const loading = ref(false);
    const query = useRoute().value.query;
    const trends = useAsync(async () => {
      loading.value = true;
      const trends = await qiitaStore.scrap.trend();
      loading.value = false;
      return trends;
    });
    useFetch(async () => {
      if (query.code && query.state) {
        await useRouter().replace({query: {}});
        await qiitaStore.authenticate({
          code: query.code.toString(),
          state: query.state.toString()
        });
      }
    });
    return {
      loading,
      trends
    };
  }
});
</script>
