import QiitaItem from '@/qiita-api/type/QiitaItem';
import QiitaTag from '@/qiita-api/type/QiitaTag';
import QiitaApi from '@/qiita-api/QiitaApi';

export default class QiitaTagApi extends QiitaApi {
  /**
   * tags
   */
  public async tags(page: number = 1, perPage: number = 20, sort: string = 'count'): Promise<Array<QiitaTag>> {
    return await this.$get(`/tags?page=${page}&per_page=${perPage}&sort=${sort}`);
  }

  /**
   * tags
   */
  public async tag(tagId: string): Promise<QiitaTag> {
    return await this.$get(`//tags/${tagId}`);
  }

  /**
   * unFollow
   */
  public async unFollow(tagId: string): Promise<void> {
    return await this.$delete(`/tags/${tagId}/following`);
  }

  /**
   * isFollow
   */
  public async isFollowing(tagId: string): Promise<QiitaTag> {
    return await this.$get(`/tags/${tagId}/following`);
  }

  /**
   * isFollow
   */
  public async follow(tagId: string): Promise<void> {
    return await this.$put(`/tags/${tagId}/following`);
  }

  /**
   * items
   */
  public async items(tagId: string, page: number = 1, perPage: number = 20): Promise<QiitaItem[]> {
    return await this.$get(`/tags/${tagId}/items?page=${page}&per_page=${perPage}`);
  }
}
