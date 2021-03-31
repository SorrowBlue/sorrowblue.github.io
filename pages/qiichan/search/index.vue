<template>
  <v-row justify="center">
    <v-col v-for="item in items" :key="item.id" cols="auto">
      <qiita-item-ui :item="item"></qiita-item-ui>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useAsync, useRoute } from "@nuxtjs/composition-api";
import { qiitaStore } from "~/utils/store-accessor";
import QiitaItemUi from "~/components/qiichan/QiitaItemUi.vue";

export default defineComponent({
  components: { QiitaItemUi },
  layout: "qiichan",
  setup(_) {
    const query = useRoute().value.query;
    const items = useAsync(async () => await qiitaStore.item.items(1, 20, query.query.toString()));
    return {
      items
    };
  }
});
</script>
