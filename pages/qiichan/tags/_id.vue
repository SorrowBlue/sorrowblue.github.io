<template>
  <div>
    <v-pagination v-model="page" :disabled="loading" :length="100"
                  total-visible="10"></v-pagination>
    <v-row v-if="loading" class="my-1" justify="center">
      <v-col v-for="i in 10" :key="i" cols="12" lg="4" md="6" sm="8" xl="3">
        <v-card>
          <v-skeleton-loader type="list-item-avatar, card-heading, actions"></v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else class="my-1" justify="center">
      <v-col v-for="item in items" :key="item.id" cols="12" lg="4" md="6" sm="8" xl="3">
        <QiitaItemUi :item="item"></QiitaItemUi>
      </v-col>
    </v-row>
    <v-pagination v-model="page" :disabled="loading" :length="100"
                  total-visible="10"></v-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, useAsync, useRoute, watch } from "@nuxtjs/composition-api";
import { qiitaStore } from "@/store";
import QiitaItem from "~/qiita-api/type/QiitaItem";
import QiitaItemUi from "~/components/qiichan/QiitaItemUi.vue";

// noinspection JSUnusedGlobalSymbols
export default defineComponent({
  components: { QiitaItemUi },
  layout: "qiichan",
  setup() {
    const page: Ref<number> = ref(1);
    const loading: Ref<boolean> = ref(false);
    const route = useRoute();
    const items: Ref<QiitaItem[] | null> = useAsync(async () => {
        loading.value = true;
        const items = await qiitaStore.tag.items(route.value.params.id, 1, 100);
        loading.value = false;
        return items;
      }
    );
    watch(page, async () => {
      loading.value = true;
      items.value = await qiitaStore.tag.items(route.value.params.id, page.value, 100);
      loading.value = false;
    });
    return { page, loading, items };
  }
});
</script>
