import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { AxiosRequestConfig } from 'axios'
import { QiitaAuthUser } from '@/plugins/qiita/types'
import { QiitaAccessScope, QiitaAccessToken, QiitaOAuthApi } from '~/assets/qiita-api/QiitaOAuthApi'
import QiitaClient from '~/assets/qiita-api/QiitaClient'
import QiitaScrap from '~/assets/qiita-api/QiitaScrap'
import { $axios } from '~/utils/api'
import QiitaCommentApi from '~/assets/qiita-api/QiitaCommentApi'
import QiitaItemApi from '~/assets/qiita-api/QiitaItemApi'
import QiitaTagApi from '~/assets/qiita-api/QiitaTagApi'
import QiitaUserApi from '~/assets/qiita-api/QiitaUserApi'

interface AccessToken {
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

interface AccessStateCode {
  code: string
  state: string
}

@Module({
  name: 'qiita',
  stateFactory: true,
  namespaced: true,
})
export default class Qiita extends VuexModule {
  private QIITA_API_TOKEN = 'qiita_api_token'

  private isLocal = document.location.hostname === 'localhost' || document.location.hostname === '127.0.0.1'
  private clientState = 'eypVUF36dXWmsabH7jFp'
  private clientId = this.isLocal ? process.env.QIITA_CLIENT_ID_LOCAL! : process.env.QIITA_CLIENT_ID!
  private clientSecret = this.isLocal ? process.env.QIITA_CLIENT_SECRET_LOCAL! : process.env.QIITA_CLIENT_SECRET!

  private authUser: QiitaAuthUser | null = null
  private status: string = ''

  public get client() {
    return new QiitaClient($axios, this.clientId, this.clientSecret)
  }

  public get getAuthUser(): QiitaAuthUser | null {
    return this.authUser
  }

  @Mutation
  private setAuthUser(authUser: QiitaAuthUser | null) {
    this.authUser = authUser
  }

  public get getStatus(): string {
    return this.status
  }

  @Mutation
  public setStatus(status: string) {
    this.status = status
  }

  @Action
  public authorize() {
    location.href = this.oauth.authorize(this.clientState, QiitaAccessScope.READ)
  }

  @Action
  public resetStatus() {
    this.status = ''
  }

  @Action({ rawError: true })
  async authenticate(stateCode: AccessStateCode) {
    this.setAuthUser(null)
    if (stateCode.state === this.clientState) {
      console.log(`stateCode.state is "${stateCode.state}"`)
      let response: QiitaAccessToken | null = null
      try {
        response = await this.oauth.accessTokens(stateCode.code)
        this.setStatus('認証されました')
      } catch (e) {
        console.log(e)
        this.setStatus('認証できませんでした')
      }
      if (response !== null) {
        localStorage.setItem(this.QIITA_API_TOKEN, response.token)
      } else {
        localStorage.removeItem(this.QIITA_API_TOKEN)
      }
    } else {
      this.setStatus('認証されませんでした')
    }
    this.loadAuthUser()
  }

  @Action({ rawError: true })
  async loadAuthUser() {
    console.log(`authUser is "${this.authUser}"`)
    if (this.authUser != null) return
    const token = localStorage.getItem(this.QIITA_API_TOKEN)
    console.log(`token is "${token}"`)
    if (!token) return
    try {
      const request = await this.oauth.authenticatedUser()
      if (request.status === 200) {
        this.setAuthUser(request.data)
      } else {
        this.setStatus(request.statusText)
      }
    } catch (e) {
      console.log(e)
      this.setStatus('認証できませんでした')
    }
  }

  @Action({ rawError: true })
  logout() {
    const token = localStorage.getItem(this.QIITA_API_TOKEN)
    if (token) {
      try {
        $axios.$delete(`/qiita-api/access_tokens/${token}`)
        this.setStatus('ログアウトしました')
      } catch {
        this.setStatus('ログアウトできませんでした')
      } finally {
        this.setAuthUser(null)
        localStorage.removeItem('qiita_api_token')
      }
    }
  }

  @Action
  public config(): AxiosRequestConfig {
    const config: AxiosRequestConfig = {}
    if (localStorage.getItem(this.QIITA_API_TOKEN)) {
      config.headers = { Authorization: `Bearer ${localStorage.getItem(this.QIITA_API_TOKEN)}` }
    }
    return config
  }

  public get oauth(): QiitaOAuthApi {
    return new QiitaOAuthApi(this.client)
  }

  public get scrap(): QiitaScrap {
    return new QiitaScrap(this.client)
  }

  public get comment(): QiitaCommentApi {
    return new QiitaCommentApi(this.client)
  }

  public get item(): QiitaItemApi {
    return new QiitaItemApi(this.client)
  }

  public get tag(): QiitaTagApi {
    return new QiitaTagApi(this.client)
  }

  public get user(): QiitaUserApi {
    return new QiitaUserApi(this.client)
  }

  /**
   * token
   */
  public get token(): string | null {
    return localStorage.getItem(this.QIITA_API_TOKEN)
  }
}
