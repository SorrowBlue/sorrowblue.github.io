import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import QiitaCommentApi from "@/qiita-api/QiitaCommentApi";
import QiitaItemApi from "@/qiita-api/QiitaItemApi";
import QiitaTagApi from "@/qiita-api/QiitaTagApi";
import QiitaUserApi from "@/qiita-api/QiitaUserApi";
import {
  QiitaAccessScope,
  QiitaAccessToken,
  QiitaOAuthApi,
} from "@/qiita-api/QiitaOAuthApi";
import QiitaAuthUser from "@/qiita-api/type/QiitaAuthUser";
import QiitaScrap from "@/qiita-api/QiitaScrap";

interface AccessStateCode {
  code: string;
  state: string;
}

@Module({
  name: "qiita",
  stateFactory: true,
  namespaced: true,
})
export default class Qiita extends VuexModule {
  private QIITA_API_TOKEN = "qiita_api_token";
  private clientState = "eypVUF36dXWmsabH7jFp";
  private _clientId = "";
  private _clientSecret = "";
  private _token: string | null = "";
  private _authUser: QiitaAuthUser | null = null;
  private _status: string = "";

  public get authUser(): QiitaAuthUser | null {
    return this._authUser;
  }

  @Mutation
  private setAuthUser(authUser: QiitaAuthUser | null) {
    this._authUser = authUser;
  }

  public get status(): string {
    return this._status;
  }

  @Mutation
  public setStatus(status: string) {
    this._status = status;
  }

  public get token(): string | null {
    return this._token;
  }

  @Mutation
  public setToken(token: string | null) {
    this._token = token;
  }

  public get clientId(): string {
    return this._clientId;
  }

  @Mutation
  public setClientId(clientId: string) {
    this._clientId = clientId;
  }

  public get clientSecret(): string {
    return this._clientSecret;
  }

  @Mutation
  public setClientSecret(clientSecret: string) {
    this._clientSecret = clientSecret;
  }

  @Action({ rawError: true })
  public authorize() {
    location.href = this.oauth.authorize(
      this.clientState,
      QiitaAccessScope.READ
    );
  }

  @Action({ rawError: true })
  async authenticate(stateCode: AccessStateCode) {
    this.setAuthUser(null);
    if (stateCode.state === this.clientState) {
      let response: QiitaAccessToken | null = null;
      try {
        response = await this.oauth.accessTokens(stateCode.code);
        this.setStatus("認証されました");
      } catch (e) {
        this.setStatus("認証できませんでした");
      }
      if (response !== null) {
        this.setToken(response.token);
      } else {
        this.setToken(null);
      }
    } else {
      this.setStatus("認証されませんでした");
    }
    await this.loadAuthUser();
  }

  @Action({ rawError: true })
  async loadAuthUser() {
    if (this.authUser != null) return;
    if (!this.token) return;
    try {
      const request = await this.oauth.authenticatedUser();
      if (request.status === 200) {
        this.setAuthUser(request.data);
      } else {
        this.setStatus(request.statusText);
      }
    } catch (e) {
      this.setStatus("認証できませんでした");
    }
  }

  @Action({ rawError: true })
  async logout() {
    const token = localStorage.getItem(this.QIITA_API_TOKEN);
    if (token) {
      try {
        await this.oauth.delete();
        this.setStatus("ログアウトしました");
      } catch {
        this.setStatus("ログアウトできませんでした");
      } finally {
        this.setAuthUser(null);
        localStorage.removeItem("qiita_api_token");
      }
    }
  }

  public get oauth(): QiitaOAuthApi {
    return new QiitaOAuthApi();
  }

  public get scrap(): QiitaScrap {
    return new QiitaScrap();
  }

  public get comment(): QiitaCommentApi {
    return new QiitaCommentApi();
  }

  public get item(): QiitaItemApi {
    return new QiitaItemApi();
  }

  public get tag(): QiitaTagApi {
    return new QiitaTagApi();
  }

  public get user(): QiitaUserApi {
    return new QiitaUserApi();
  }

  @Action({ rawError: true })
  init(client: string[]) {
    this.setClientId(client[0]);
    this.setClientSecret(client[1]);
  }
}
