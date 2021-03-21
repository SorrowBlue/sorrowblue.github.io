import QiitaClient from './QiitaClient'
import QiitaTag from '~/plugins/qiita/QiitaTag'

export default class QiitaTagApi {
  private client: QiitaClient

  constructor(client: QiitaClient) {
    this.client = client
  }

  /**
   * tags
   */
  public async tags(page: number, perPage: number, sort: string): Promise<Array<QiitaTag>> {
    return await this.client.$get(`/qiita-api/tags?page=${page}&per_page=${perPage}&sort=${sort}`)
  }

  /**
   * tag
   */
  public async tag(tagId: string): Promise<QiitaTag> {
    return await this.client.$get(`/qiita-api/tags/${tagId}`)
  }

  /**
   * unFollow
   */
  public async unFollow(tagId: string): Promise<void> {
    return await this.client.delete(`/qiita-api/tags/${tagId}/following`)
  }

  /**
   * isFollow
   */
  public async isFollowing(tagId: string): Promise<QiitaTag> {
    return await this.client.$get(`/qiita-api/tags/${tagId}/following`)
  }

  /**
   * isFollow
   */
  public async follow(tagId: string): Promise<void> {
    return await this.client.put(`/qiita-api/tags/${tagId}/following`)
  }
}
