import User from '@/plugins/qiita/User'

export default interface Like {
  /**
   * データが作成された日時
   */
  created_at: string,
  /**
   * Qiita上のユーザを表します。
   */
  user: User
}