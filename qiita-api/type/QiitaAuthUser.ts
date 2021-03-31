/* eslint-disable camelcase */
import QiitaUser from "@/qiita-api/type/QiitaUser";

export default interface QiitaAuthUser extends QiitaUser {
  /**
   * 1ヶ月あたりにQiitaにアップロードできる画像の総容量
   */
  image_monthly_upload_limit: number;
  /**
   * その月にQiitaにアップロードできる画像の残りの容量
   */
  image_monthly_upload_remaining: number;
}
