import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export default class QiitaClient {
  private _clientId: string
  private _clientSecret: string
  private _axios: NuxtAxiosInstance
  public token: string = ''

  public constructor(axios: NuxtAxiosInstance, clientId: string, clientSecret: string) {
    this._clientId = clientId
    this._clientSecret = clientSecret
    this._axios = axios
  }

  public get clientId(): string {
    return this._clientId
  }

  public get clientSecret(): string {
    return this._clientSecret
  }

  public get axios(): NuxtAxiosInstance {
    return this._axios
  }

  public post<T = any>(url: string, data?: any): Promise<T> {
    return this.axios.$post<T>('https://qiita.com/api/v2' + url, data)
  }

  public $get<T = any>(url: string): Promise<T> {
    return this.axios.$get<T>('https://qiita.com/api/v2' + url)
  }

  public get<T = any, R = AxiosResponse<T>>(url: string): Promise<R> {
    return this.axios.get('https://qiita.com/api/v2' + url)
  }

  public delete<T = any>(url: string): Promise<T> {
    return this.axios.$delete<T>('https://qiita.com/api/v2' + url)
  }

  public patch<T = any>(url: string, json: any): Promise<T> {
    return this.axios.$patch<T>('https://qiita.com/api/v2' + url, json)
  }

  public put<T = any>(url: string): Promise<T> {
    return this.axios.$put<T>('https://qiita.com/api/v2' + url)
  }
}
function config(token: string): AxiosRequestConfig {
  const config: AxiosRequestConfig = {}
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` }
  }
  return config
}
