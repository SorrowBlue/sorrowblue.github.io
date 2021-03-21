import QiitaClient from './QiitaClient'
import { QiitaTrendItem } from '~/plugins/qiita/QiitaTrendItem'

export default class QiitaScrap {
  private client: QiitaClient

  constructor(client: QiitaClient) {
    this.client = client
  }

  /**
   * trend
   */
  public async trend(): Promise<Array<QiitaTrendItem>> {
    const res = await this.client.axios.$get<string>('https://localhost:3000/qiita/')
    const html = new DOMParser().parseFromString(res, 'text/html')
    const components = html.getElementsByClassName('js-react-on-rails-component')
    const result: QiitaTrendItem[] = []
    for (let i = 0; i <= components.length; i++) {
      if (components.item(i)?.getAttribute('data-component-name') === 'HomeArticleTrendFeed') {
        const json = components.item(i)?.innerHTML
        JSON.parse(json!).trend.edges.forEach(
          (element: {
            followingLikers: any
            isLikedByViewer: any
            isNewArrival: any
            hasCodeBlock: any
            node: {
              createdAt: string | number | Date
              likesCount: any
              title: any
              uuid: any
              author: { profileImageUrl: any; urlName: any }
            }
          }) => {
            result.push({
              followingLikers: element.followingLikers,
              isLikedByViewer: element.isLikedByViewer,
              isNewArrival: element.isNewArrival,
              hasCodeBlock: element.hasCodeBlock,
              node: {
                createdAt: new Date(element.node.createdAt),
                likesCount: element.node.likesCount,
                title: element.node.title,
                uuid: element.node.uuid,
                author: {
                  profileImageUrl: element.node.author.profileImageUrl,
                  urlName: element.node.author.urlName,
                },
              },
            })
          }
        )
      }
    }
    return result
  }
}
