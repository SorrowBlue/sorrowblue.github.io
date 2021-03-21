import QiitaClient from './QiitaClient'
import QiitaAuthUser from '~/plugins/qiita/QiitaAuthUser'

export enum QiitaAccessScope {
  READ,
  WRITE,
}

export interface QiitaAccessToken {
  /**
   * 登録されたAPIクライアントを特定するためのID
   */
  // eslint-disable-next-line camelcase
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

export class QiitaOAuthApi {
  private client: QiitaClient

  constructor(client: QiitaClient) {
    this.client = client
  }

  public authorize(state: string, ...scopes: QiitaAccessScope[]): string {
    const scope = scopes.map((s) => (s === QiitaAccessScope.READ ? 'read_qiita' : s === QiitaAccessScope.WRITE ? 'write_qiita' : '')).join(' ')
    return `https://qiita.com/api/v2/oauth/authorize?client_id=${this.client.clientId}&scope=${scope}&state=${state}`
  }

  /**
   * 与えられた認証情報をもとに新しいアクセストークンを発行します。
   * @param code リダイレクト用のURLに付与された、アクセストークンと交換するための文字列
   */
  public async accessTokens(code: string): Promise<QiitaAccessToken | null> {
    let response: QiitaAccessToken | null = null
    response = await this.client.post('/access_tokens', {
      client_id: this.client.clientId,
      client_secret: this.client.clientSecret,
      code,
    })
    this.client.token = response !== null ? response.token : ''
    return response
  }

  /**
   * アクセストークンを失効させ、それ以降利用できないようにします。
   */
  public async delete() {
    await this.client.delete(`/access_tokens/${this.client.token}`)
  }

  /**
   * authenticatedUser
   */
  public async authenticatedUser() {
    return await this.client.get<QiitaAuthUser>(`/authenticated_user`)
  }
}
