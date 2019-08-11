import Tag from '@/plugins/qiita/Tag'
import User from '@/plugins/qiita/User'

export default interface Item {
  /**
   * HTML形式の本文
   */
  rendered_body: string

  /**
   * Markdown形式の本文
   */
  body: string,
  /**
   この記事が共同更新状態かどうか (Qiita:Teamでのみ有効)
   */
  coediting: boolean,
  /**
   * この記事へのコメントの数
   */
  comments_count: number,
  /**
   * データが作成された日時
   */
  created_at: string,
  /**
   * Qiita:Teamのグループを表します。
   */
  group: any,
  /**
   * 記事の一意なID
   */
  id: string,
  /**
   * この記事への「いいね！」の数（Qiitaでのみ有効）
   */
  likes_count: number,
  /**
   * 限定共有状態かどうかを表すフラグ (Qiita:Teamでは無効)
   */
  private: boolean,
  /**
   * 絵文字リアクションの数（Qiita:Teamでのみ有効）
   */
  reactions_count: number,
  /**
   * 記事に付いたタグ一覧
   */
  tags: Array<Tag>,
  /**
   * 記事のタイトル
   */
  title: string,
  /**
   * データが最後に更新された日時
   */
  updated_at: string,
  /**
   * 記事のURL
   */
  url: string,
  /**
   * Qiita上のユーザを表します。
   */
  user: User,
  /**
   * 閲覧数
   */
  page_views_count: number | null
}