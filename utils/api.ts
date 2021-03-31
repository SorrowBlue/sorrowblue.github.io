import { NuxtAxiosInstance } from "@nuxtjs/axios";

// eslint-disable-next-line import/no-mutable-exports
let $axiosQiita: NuxtAxiosInstance;

// eslint-disable-next-line import/no-mutable-exports
let $axios: NuxtAxiosInstance;

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance;
  $axiosQiita = axiosInstance.create({
    baseURL: "https://qiita.com/api/v2",
  });
  $axiosQiita.defaults.headers["Access-Control-Expose-Headers"] = "*";
}

export { $axios, $axiosQiita };
