export interface QiitaTrendItemAuthor {
  profileImageUrl: string
  urlName: string
}

export interface QiitaTrendItemNode {
  createdAt: Date
  likesCount: number
  title: string
  uuid: string
  author: QiitaTrendItemAuthor
}

export interface QiitaTrendItem {
  followingLikers: []
  isLikedByViewer: boolean
  isNewArrival: boolean
  hasCodeBlock: boolean
  node: QiitaTrendItemNode
}
