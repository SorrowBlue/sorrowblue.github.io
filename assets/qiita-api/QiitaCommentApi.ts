import QiitaClient from './QiitaClient'
import QiitaComment from '~/plugins/qiita/QiitaComment'

export default class QiitaCommentApi {
  private client: QiitaClient

  constructor(client: QiitaClient) {
    this.client = client
  }

  /**
   * getComment
   */
  public async getComment(commentId: string): Promise<QiitaComment> {
    return await this.client.$get(`/qiita-api/v2/comments/${commentId}`)
  }

  /**
   * updateComment
   */
  public async updateComment(commentId: string, body: string): Promise<QiitaComment> {
    return await this.client.patch(`/qiita-api/v2/comments/${commentId}`, { body })
  }

  /**
   * deleteComment
   */
  public async deleteComment(commentId: string) {
    await this.client.delete(`/comments/${commentId}`)
  }
}
