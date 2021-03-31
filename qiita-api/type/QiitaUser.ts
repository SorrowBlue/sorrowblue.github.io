/* eslint-disable camelcase */
export default interface QiitaUser {
  /**
   * 自己紹介文
   */
  description: string | null;
  /**
   * Facebook ID
   */
  facebook_id: string | null;
  /**
   * このユーザがフォローしているユーザの数
   */
  followees_count: number;
  /**
   * このユーザをフォローしているユーザの数
   */
  followers_count: number;
  /**
   * GitHub ID
   */
  github_login_name: string | null;
  /**
   * Qiita ユーザID
   */
  id: string;
  /**
   * このユーザが qiita.com 上で公開している記事の数 (Qiita:Teamでの記事数は含まれません)
   */
  items_count: number;
  /**
   * LinkedIn ID
   */
  linkedin_id: string | null;
  /**
   * 居住地
   */
  location: string | null;
  /**
   * 設定している名前
   */
  name: string | null;
  /**
   * 所属している組織
   */
  organization: string | null;
  /**
   * ユーザごとに割り当てられる整数のID
   */
  permanent_id: number;
  /**
   * 設定しているプロフィール画像のURL
   */
  profile_image_url: string;
  /**
   * Qiita:Team専用モードに設定されているかどうか
   */
  team_only: boolean;
  /**
   * Twitterのスクリーンネーム
   */
  twitter_screen_name: string | null;
  /**
   * 設定しているWebサイトのURL
   */
  website_url: string | null;
}
