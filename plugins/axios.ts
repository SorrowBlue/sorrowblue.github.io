import { Plugin } from '@nuxt/types';
import { qiitaStore } from '../store';
import { $axiosQiita } from '~/utils/api';

const AxiosPlugin: Plugin = () => {
  $axiosQiita.onRequest((config) => {
    if (qiitaStore.token) {
      config.headers.Authorization = `Bearer ${qiitaStore.token}`;
      config.headers['Access-Control-Expose-Headers'] = `link`;
    }
  });
  $axiosQiita.onResponseError(() => {});
};

export default AxiosPlugin;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWoker.js');
}
