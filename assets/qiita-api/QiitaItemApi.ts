import QiitaClient from './QiitaClient'
import Like from '~/plugins/qiita/Like'
import QiitaItem from '~/plugins/qiita/QiitaItem'

export default class QiitaItemApi {
  private client: QiitaClient

  constructor(client: QiitaClient) {
    this.client = client
  }

  /**
   * likes
   */
  public async likes(itemId: string): Promise<Array<Like>> {
    return await this.client.$get(`https://qiita.com/api/v2/items/${itemId}/likes`)
  }

  /**
   * comments
   */
  public async comments(itemId: string): Promise<Array<QiitaItem>> {
    return await this.client.$get(`/qiita-api/v2/items/${itemId}/comments`)
  }

  /**
   * postComment
   */
  public async postComment(itemId: string, body: string): Promise<Array<QiitaItem>> {
    return await this.client.post(`/qiita-api/v2/items/${itemId}/comments`, { body })
  }

  /**
   * items
   */
  public async items(page: number, perPage: number, query: string): Promise<Array<QiitaItem>> {
    return await this.client.$get(`/items?page=${page}&per_page=${perPage}&query=${query}`)
  }

  /**
   * item
   */
  public async item(itemId: string): Promise<QiitaItem> {
    return await this.client.$get(`/items/${itemId}`)
  }
}
