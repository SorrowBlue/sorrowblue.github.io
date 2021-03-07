/* eslint-disable camelcase */
export default interface QiitaTag {
  /**
   * このタグをフォローしているユーザの数
   */
  followers_count: number
  /**
   * このタグに設定されたアイコン画像のURL
   */
  icon_url: string | null
  /**
   * タグを特定するための一意な名前
   */
  id: string
  /**
   * このタグが付けられた記事の数
   */
  items_count: number
}
