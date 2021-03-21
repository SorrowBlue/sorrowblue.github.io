export class QiitaApi {}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $qiitaApi: QiitaApi
  }
}
