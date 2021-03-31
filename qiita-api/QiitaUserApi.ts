import QiitaTag from "@/qiita-api/type/QiitaTag";
import QiitaApi from "@/qiita-api/QiitaApi";

export default class QiitaUserApi extends QiitaApi {
  /**
   * followingTags
   */
  public async followingTags(
    userId: string,
    page: number,
    perPage: number
  ): Promise<Array<QiitaTag>> {
    return await this.$get(
      `/users/${userId}/following_tags?page=${page}&per_page=${perPage}`
    );
  }
}
