import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosError, AxiosRequestConfig } from 'axios'
import Tag from '@/plugins/qiita/Tag'
import Item from '@/plugins/qiita/Item'
import AuthUser from '@/plugins/qiita/AuthUser'
import AccessToken from '@/plugins/qiita/AccessToken'
import Like from '@/plugins/qiita/Like';

export class QiitaApi {

  private clientId: string
  private clientSecret: string
  private $axios: NuxtAxiosInstance

  private scope = 'read_qiita'
  private static readonly TOKEN_KEY = 'QIITA_API_V2_TOKEN'
  private _tags!: Array<Tag> | null
  private _authUser!: AuthUser | null
  
  async getAuthUser() {
    if (this._authUser == null) {
      this._authUser = await this.requestAuthUser()
    }
    return this._authUser
  }


  async getTags() {
    if (this._tags == null && this._authUser != null) {
      this._tags = await this.requestFollowingTags(this._authUser.id)
    }
    return this._tags
  }
 
  get clientState() { return 'BP6TcjN-jDY2K22J9CU-iEQeeiWQ3PGN' }

  get token() {
    return sessionStorage.getItem(QiitaApi.TOKEN_KEY)

  }
  set token(token: string | null) {
    if (token != null) {
      sessionStorage.setItem(QiitaApi.TOKEN_KEY, token)
    } else {
      sessionStorage.removeItem(QiitaApi.TOKEN_KEY)
    }
  }
  constructor(axios: NuxtAxiosInstance) {
    const hostname = document.location.hostname
    const isDebug = hostname === 'localhost' || hostname === '127.0.0.1'
    this.clientId = isDebug ? '4184ec122a974f422f27866bca74de401df8dcf9' : '112ffccc148278536d0b84c8ca0fc1f46c9163ea'
    this.clientSecret = isDebug ? '17f0134d0c8cefe4a17ce91f4089268fa24ed9d7' : '5a1e96ce9f568478eac99a602676cbe2872c33cc'

    this.$axios = axios
  }

  authorize() {
    location.href = `https://qiita.com/api/v2/oauth/authorize?client_id=${this.clientId}&scope=${this.scope}&state=${this.clientState}`
  }

  async requestAccessTokens(code: string, state: string, failure: (error: AxiosError) => void) {
    if (state === this.clientState) {
      let response: AccessToken | null = null
      try {
        response = await this.$axios.$post('https://qiita.com/api/v2/access_tokens', {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code
        })
      } catch (error) {
        failure(error as AxiosError)
      } finally {
        this.token = response && response.token
      }
    }
  }

  async requestAuthUser(): Promise<AuthUser | null> {
    return this.token != null ? await this.$axios.$get('https://qiita.com/api/v2/authenticated_user', this.config) : null
  }

  async requestFollowingTags(userId: string): Promise<Array<Tag>> {
    return await this.$axios.$get(`https://qiita.com/api/v2/users/${userId}/following_tags`, this.config)
  }

  async requestUserArticle(userId: string): Promise<Array<any>> {
    return await this.$axios.$get(`https://qiita.com/api/v2/users/${userId}/items`, this.config)
  }
  
  async requestItems(page: number = 1, per_page: number = 20, query: string = ''): Promise<Array<Item>> {
    const config = this.config
    config.params = query == '' ?  { page, per_page } : { page, per_page, query }
    return await this.$axios.$get(`https://qiita.com/api/v2/items`, config)
  }

  async requestItem(itemId: string): Promise<Item> {
    return await this.$axios.$get(`https://qiita.com/api/v2/items/${itemId}`, this.config)
  }

  async requestItemLikes(itemId: string): Promise<Array<Like>> {
    return await this.$axios.$get(`https://qiita.com/api/v2/items/${itemId}/likes`, this.config)
  }
  async requestPutLike(itemId: string) {
    this.$axios.$put(`https://qiita.com/api/v2/items/${itemId}/like`, this.config)
  }

  async requestDeleteLike(itemId: string) {
    this.$axios.$delete(`https://qiita.com/api/v2/items/${itemId}/like`, this.config)
  }
  
  async isItemLike(itemId: string): Promise<Boolean> {
    return false
    return await this.$axios.$get(`https://qiita.com/api/v2/items/${itemId}/like`, this.config)
  }

  private get config(): AxiosRequestConfig {
    const config: AxiosRequestConfig = {}
    if (this.token != null) {
      config.headers = { Authorization: `Bearer ${this.token}` }
    }
    return config
  }

}

export default ( { app }, inject) => {
  inject('qiitaApi', new QiitaApi(app.$axios))
}
