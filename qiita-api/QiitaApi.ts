import { AxiosResponse } from "axios";
import { $axiosQiita } from "@/utils/api";
import { qiitaStore } from "@/utils/store-accessor";

export default class QiitaApi {
  public get clientId(): string {
    return qiitaStore.clientId;
  }

  public get clientSecret(): string {
    return qiitaStore.clientSecret;
  }

  public get token(): string | null {
    return qiitaStore.token;
  }

  public $post<T = any>(url: string, data?: any): Promise<T> {
    return $axiosQiita.$post<T>(url, data);
  }

  public $get<T = any>(url: string): Promise<T> {
    return $axiosQiita.$get<T>(url);
  }

  public get<T = any, R = AxiosResponse<T>>(url: string): Promise<R> {
    return $axiosQiita.get(url);
  }

  public $delete<T = any>(url: string): Promise<T> {
    return $axiosQiita.$delete<T>(url);
  }

  public patch<T = any>(url: string, json: any): Promise<T> {
    return $axiosQiita.$patch<T>(url, json);
  }

  public $put<T = any>(url: string): Promise<T> {
    return $axiosQiita.$put<T>(url);
  }
}
