import { NuxtAxiosInstance } from '@nuxtjs/axios';

export default class QiitaClient {
  private _clientId: string;
  private _clientSecret: string;
  private _axios: NuxtAxiosInstance;
  public token: string = '';

  public constructor(axios: NuxtAxiosInstance, clientId: string, clientSecret: string) {
    this._clientId = clientId;
    this._clientSecret = clientSecret;
    this._axios = axios;
  }

  public get clientId(): string {
    return this._clientId;
  }

  public get clientSecret(): string {
    return this._clientSecret;
  }

  public get axios(): NuxtAxiosInstance {
    return this._axios;
  }
}
