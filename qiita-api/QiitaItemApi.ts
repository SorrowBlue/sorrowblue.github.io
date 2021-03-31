import QiitaItem from "@/qiita-api/type/QiitaItem";
import Like from "@/qiita-api/type/QiitaLike";
import QiitaApi from "@/qiita-api/QiitaApi";

export default class QiitaItemApi extends QiitaApi {
  /**
   * likes
   */
  public async likes(itemId: string): Promise<Array<Like>> {
    return await this.$get(`/items/${itemId}/likes`);
  }

  /**
   * comments
   */
  public async comments(itemId: string): Promise<Array<QiitaItem>> {
    return await this.$get(`/items/${itemId}/comments`);
  }

  /**
   * postComment
   */
  public async postComment(
    itemId: string,
    body: string
  ): Promise<Array<QiitaItem>> {
    return await this.$post(`/items/${itemId}/comments`, { body });
  }

  /**
   * items
   */
  public async items(
    page: number,
    perPage: number,
    query: string
  ): Promise<Array<QiitaItem>> {
    return await this.$get(
      `/items?page=${page}&per_page=${perPage}&query=${query}`
    );
  }

  /**
   * item
   */
  public async item(itemId: string): Promise<QiitaItem> {
    return await this.$get(`/items/${itemId}`);
  }
}
