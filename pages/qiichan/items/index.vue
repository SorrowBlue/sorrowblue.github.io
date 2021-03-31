<template>
  <v-container>
    <v-row justify="center">
      <v-col v-for="item in items" :key="item.id" align-self="stretch" cols="auto">
        <QiitaItemUi :item="item"></QiitaItemUi>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useAsync } from "@nuxtjs/composition-api";
import { qiitaStore } from "@/store";
import QiitaItemUi from "~/components/qiichan/QiitaItemUi.vue";

export default defineComponent({
  components: { QiitaItemUi },
  layout: "qiichan",
  setup() {
    const items = useAsync(async () => await qiitaStore.item.items(1, 20, "android"));
    return {
      items
    };
  }
});
</script>
