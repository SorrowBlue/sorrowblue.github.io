export interface QiitaTrendItemAuthor {
  displayName: string;
  isUser: boolean;
  linkUrl: string;
  profileImageUrl: string;
  urlName: string;
}

export interface QiitaTrendTag {
  urlName: string;
  name: string;
}

export interface QiitaTrendItemNode {
  encryptedId: string;
  isLikedByViewer: boolean;
  isStockableByViewer: boolean;
  isStockedByViewer: false;
  likesCount: 29;
  linkUrl: string;
  publishedAt: string;
  title: "WPFの軽量UIツールキット AdonisUIを試す";
  uuid: "5013b0b56be731db0cd8";
  author: QiitaTrendItemAuthor;
  recentlyFollowingLikers: [];
  tags: QiitaTrendTag[];
}

export interface QiitaTrendItem {
  hasCodeBlock: boolean;
  isLikedByViewer: boolean;
  isNewArrival: boolean;
  followingLikers: [];
  node: QiitaTrendItemNode;
}
