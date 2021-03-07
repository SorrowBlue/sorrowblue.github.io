/* eslint-disable camelcase */
import { QiitaUser } from "@/plugins/qiita/types"

export default interface Like {
  /**
   * データが作成された日時
   */
  created_at: string
  /**
   * Qiita上のユーザを表します。
   */
  user: QiitaUser
}
