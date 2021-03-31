import QiitaComment from "@/qiita-api/type/QiitaComment";
import QiitaApi from "@/qiita-api/QiitaApi";

export default class QiitaCommentApi extends QiitaApi {
  /**
   * getComment
   */
  public async getComment(commentId: string): Promise<QiitaComment> {
    return await this.$get(`/qiita-api/v2/comments/${commentId}`);
  }

  /**
   * updateComment
   */
  public async updateComment(
    commentId: string,
    body: string
  ): Promise<QiitaComment> {
    return await this.patch(`/qiita-api/v2/comments/${commentId}`, { body });
  }

  /**
   * deleteComment
   */
  public async deleteComment(commentId: string) {
    await this.$delete(`/comments/${commentId}`);
  }
}
