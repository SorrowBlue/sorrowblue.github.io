import Vue from 'vue'
import { QiitaApi } from "~/plugins/qiita-api.client"


declare module 'vue/types/vue' {
  interface Vue {
    $qiitaApi: QiitaApi
  }
}

declare module 'vuex' {
  interface Store<S> {
    readonly $qiitaApi: QiitaApi
  }
}
