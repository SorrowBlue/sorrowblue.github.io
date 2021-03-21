import QiitaClient from './QiitaClient'
import QiitaTag from '~/plugins/qiita/QiitaTag'

export default class QiitaUserApi {
  private client: QiitaClient

  constructor(client: QiitaClient) {
    this.client = client
  }

  /**
   * followingTags
   */
  public async followingTags(userId: string, page: number, perPage: number): Promise<Array<QiitaTag>> {
    return await this.client.$get(`/users/${userId}/following_tags?page=${page}&per_page=${perPage}`)
  }
}
