import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { AxiosError, AxiosRequestConfig } from "axios"
import { Plugin, Context } from "@nuxt/types"
import {
  AccessToken,
  QiitaAuthUser,
  QiitaTag,
  QiitaItem,
  QiitaLike,
  QiitaTrendItem,
  QiitaComment
} from "@/plugins/qiita/types"

class QiitaApiClient {
  private clientId: string
  private clientSecret: string
  private $axios: NuxtAxiosInstance

  private scope = "read_qiita"
  private static readonly TOKEN_KEY = "QIICHAN_WEB"
  private static readonly API_ROOT = "https://qiita.com/api/v2"

  private _authUser!: QiitaAuthUser | null

  get clientState() {
    return "BP6TcjN-jDY2K22J9CU-iEQeeiWQ3PGN"
  }

  get token() {
    return sessionStorage.getItem(QiitaApiClient.TOKEN_KEY)
  }

  set token(token: string | null) {
    if (token != null) {
      sessionStorage.setItem(QiitaApiClient.TOKEN_KEY, token)
    } else {
      sessionStorage.removeItem(QiitaApiClient.TOKEN_KEY)
    }
  }

  constructor(axios: NuxtAxiosInstance) {
    const hostname = document.location.hostname
    const isDebug = hostname === "localhost" || hostname === "127.0.0.1"
    this.clientId = ""
    this.clientSecret = isDebug
      ? "17f0134d0c8cefe4a17ce91f4089268fa24ed9d7"
      : "5a1e96ce9f568478eac99a602676cbe2872c33cc"

    this.$axios = axios
  }

  async getAuthUser() {
    if (this._authUser == null) {
      this._authUser = await this.requestAuthUser()
    }
    return this._authUser
  }

  authorize() {
    location.href = `https://qiita.com/api/v2/oauth/authorize?client_id=${this.clientId}&scope=${this.scope}&state=${this.clientState}`
  }

  async requestAuthUser(): Promise<QiitaAuthUser | null> {
    return this.token != null
      ? await this.$axios.$get("https://qiita.com/api/v2/authenticated_user", this.config)
      : null
  }

  async requestFollowingTags(userId: string): Promise<Array<QiitaTag>> {
    return await this.$axios.$get(`https://qiita.com/api/v2/users/${userId}/following_tags`, this.config)
  }

  async requestUserArticle(userId: string): Promise<Array<any>> {
    return await this.$axios.$get(`https://qiita.com/api/v2/users/${userId}/items`, this.config)
  }

  async requestComments(itemId: string): Promise<Array<QiitaComment>> {
    return await this.$axios.$get(`https://qiita.com/api/v2/items/${itemId}/comments`, this.config)
  }

  async deleteComment(commentId: string) {
    await this.$axios.$delete(`https://qiita.com/api/v2/comments/${commentId}`, this.config)
  }

  async commentLike(commentId: string) {
    await this.$axios.$put(`https://qiita.com/api/v2/comments/${commentId}/thank`, this.config)
  }

  async deleteCommentLike(commentId: string) {
    await this.$axios.$delete(`https://qiita.com/api/v2/comments/${commentId}/thank`, this.config)
  }

  async requestItems(page: number = 1, per_page: number = 20, query: string = ""): Promise<Array<QiitaItem>> {
    const config = this.config
    config.params = query === "" ? { page, per_page } : { page, per_page, query }
    return await this.$axios.$get(`https://qiita.com/api/v2/items`, config)
  }

  async requestItem(itemId: string): Promise<QiitaItem> {
    return await this.$axios.$get(`https://qiita.com/api/v2/items/${itemId}`, this.config)
  }

  async requestItemLikes(itemId: string): Promise<Array<QiitaLike>> {
    return await this.$axios.$get(`https://qiita.com/api/v2/items/${itemId}/likes`, this.config)
  }

  async requestPutLike(itemId: string) {
    await this.$axios.$put(`https://qiita.com/api/v2/items/${itemId}/like`, this.config)
  }

  async requestDeleteLike(itemId: string) {
    await this.$axios.$delete(`https://qiita.com/api/v2/items/${itemId}/like`, this.config)
  }

  async isItemLike(itemId: string): Promise<Boolean> {
    return await this.$axios.$get(`https://qiita.com/api/v2/items/${itemId}/like`, this.config)
  }

  async requestAccessTokens(code: string, state: string, failure: (error: AxiosError) => void) {
    if (state === this.clientState) {
      let response: AccessToken | null = null
      try {
        response = await this.$axios.$post(`${QiitaApiClient.API_ROOT}/access_tokens`, {
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

  async trend(): Promise<Array<QiitaTrendItem>> {
    const res: string = await this.$axios.$get("/api/")
    const html = new DOMParser().parseFromString(res, "text/html")
    const container = html.getElementsByClassName("p-home_container")
    const json = container!
      .item(0)!
      .getElementsByClassName("p-home_main")!
      .item(0)!
      .getElementsByTagName("div")
      .item(0)!
      .getAttribute("data-hyperapp-props")
    const result: QiitaTrendItem[] = []
    JSON.parse(json!).trend.edges.forEach(
      (element: {
        followingLikers: any
        isLikedByViewer: any
        isNewArrival: any
        hasCodeBlock: any
        node: {
          createdAt: string | number | Date
          likesCount: any
          title: any
          uuid: any
          author: { profileImageUrl: any; urlName: any }
        }
      }) => {
        result.push({
          followingLikers: element.followingLikers,
          isLikedByViewer: element.isLikedByViewer,
          isNewArrival: element.isNewArrival,
          hasCodeBlock: element.hasCodeBlock,
          node: {
            createdAt: new Date(element.node.createdAt),
            likesCount: element.node.likesCount,
            title: element.node.title,
            uuid: element.node.uuid,
            author: {
              profileImageUrl: element.node.author.profileImageUrl,
              urlName: element.node.author.urlName
            }
          }
        })
      }
    )
    return result
  }

  private get config(): AxiosRequestConfig {
    const config: AxiosRequestConfig = {}
    if (this.token != null) {
      config.headers = { Authorization: `Bearer ${this.token}` }
    }
    return config
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $qiitaApiClient: QiitaApiClient
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $qiitaApiClient: QiitaApiClient
  }
}

declare module "vuex/types/index" {
  interface Store<S> {
    $qiitaApiClient: QiitaApiClient
  }
}

const QiitaApiClientPlugin: Plugin = (context: Context, inject) => {
  inject("qiitaApiClient", new QiitaApiClient(context.$axios))
}

export default QiitaApiClientPlugin
