/* eslint-disable camelcase */
export default interface AccessToken {
  /**
   * 登録されたAPIクライアントを特定するためのID
   */
  client_id: string
  /**
   * アクセストークンに許された操作の一覧
   */
  scopes: Array<string>
  /**
   * アクセストークンを表現する文字列
   */
  token: string
}
