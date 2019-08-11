import User from "@/plugins/qiita/User";

export default interface AuthUser extends User{
  /**
   * 1ヶ月あたりにQiitaにアップロードできる画像の総容量
   */
  image_monthly_upload_limit: number
  /**
   * その月にQiitaにアップロードできる画像の残りの容量
   */
  image_monthly_upload_remaining: number
}