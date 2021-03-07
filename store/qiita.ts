import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"
import { AxiosRequestConfig } from "axios"
import { QiitaAuthUser } from "@/plugins/qiita/types"
import { $axios } from "~/utils/api"

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

const isLocal = document.location.hostname === "localhost" || document.location.hostname === "127.0.0.1"
const scope = "read_qiita"
const clientState = "BP6TcjN-jDY2K22J9CU-iEQeeiWQ3PGN"
const clientId = isLocal ? process.env.QIITA_CLIENT_ID_LOCAL : process.env.QIITA_CLIENT_ID
const clientSecret = isLocal ? process.env.QIITA_CLIENT_SECRET_LOCAL : process.env.QIITA_CLIENT_SECRET

@Module({ stateFactory: true, namespaced: true, name: "qiita" })
export default class Qiita extends VuexModule {
  authUser: QiitaAuthUser | null = null
  status: string = ""

  get authorize(): string {
    return `https://qiita.com/api/v2/oauth/authorize?client_id=${clientId}&scope=${scope}&state=${clientState}`
  }

  @Action
  async requestLoadAuthUser(stateCode: AccessStateCode) {
    if (stateCode.state === clientState) {
      let response: AccessToken | null = null
      try {
        response = await $axios.$post("https://qiita.com/api/v2/access_tokens", {
          client_id: clientId,
          client_secret: clientSecret,
          code: stateCode.code
        })
      } finally {
      }
      if (response) {
        localStorage.setItem("qiita_api_token", response.token)
      } else {
        localStorage.removeItem("qiita_api_token")
      }
      await this.loadAuthUser()
    }
  }

  @Mutation
  addUser(authUser: QiitaAuthUser | null) {
    this.authUser = authUser
  }

  @Mutation
  addStatus(status: string) {
    this.status = status + ""
  }

  @Action
  async loadAuthUser() {
    const token = localStorage.getItem("qiita_api_token")
    if (token) {
      try {
        const request = await $axios.get<QiitaAuthUser>("https://qiita.com/api/v2/authenticated_user", config(token))
        if (request.status === 200) {
          this.addUser(request.data)
        } else {
          this.addStatus(request.statusText)
        }
      } catch {
        this.addStatus("認証できませんでした")
      }
    }
  }

  @Action
  logout() {
    const token = localStorage.getItem("qiita_api_token")
    if (token) {
      $axios.onError(() => {})
      try {
        $axios.$delete(`https://qiita.com/api/v2/access_tokens/${token}`)
      } catch {
      } finally {
        this.addUser(null)
        localStorage.removeItem("qiita_api_token")
      }
    }
  }
}

function config(token: string): AxiosRequestConfig {
  const config: AxiosRequestConfig = {}
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` }
  }
  return config
}
