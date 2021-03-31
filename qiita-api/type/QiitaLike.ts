import QiitaUser from "@/qiita-api/type/QiitaUser";

/* eslint-disable camelcase */
export default interface Like {
  /**
   * データが作成された日時
   */
  created_at: string;
  /**
   * Qiita上のユーザを表します。
   */
  user: QiitaUser;
}
