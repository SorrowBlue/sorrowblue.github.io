import { defineNuxtPlugin } from "@nuxtjs/composition-api";
import { qiitaStore } from "@/utils/store-accessor";

export default defineNuxtPlugin((ctx) => {
  qiitaStore.init([ctx.$config.QIITA_CLIENT_ID, ctx.$config.QIITA_CLIENT_SECRET]);
});
