import QiitaAuthUser from "@/qiita-api/type/QiitaAuthUser";
import QiitaApi from "@/qiita-api/QiitaApi";

export enum QiitaAccessScope {
  READ,
  WRITE,
}

export interface QiitaAccessToken {
  /**
   * 登録されたAPIクライアントを特定するためのID
   */
  // eslint-disable-next-line camelcase
  client_id: string;
  /**
   * アクセストークンに許された操作の一覧
   */
  scopes: Array<string>;
  /**
   * アクセストークンを表現する文字列
   */
  token: string;
}

export class QiitaOAuthApi extends QiitaApi {
  public authorize(state: string, ...scopes: QiitaAccessScope[]): string {
    const scope = scopes
      .map((s) =>
        s === QiitaAccessScope.READ
          ? "read_qiita"
          : s === QiitaAccessScope.WRITE
          ? "write_qiita"
          : ""
      )
      .join(" ");
    return `https://qiita.com/api/v2/oauth/authorize?client_id=${this.clientId}&scope=${scope}&state=${state}`;
  }

  /**
   * 与えられた認証情報をもとに新しいアクセストークンを発行します。
   * @param code リダイレクト用のURLに付与された、アクセストークンと交換するための文字列
   */
  public async accessTokens(code: string): Promise<QiitaAccessToken | null> {
    return await this.$post("/access_tokens", {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code,
    });
  }

  /**
   * アクセストークンを失効させ、それ以降利用できないようにします。
   */
  public async delete(): Promise<void> {
    await this.$delete(`/access_tokens/${this.token}`);
  }

  /**
   * authenticatedUser
   */
  public async authenticatedUser() {
    return await this.get<QiitaAuthUser>(`/authenticated_user`);
  }
}
