import HomeCardItem from "../ts/item/HomepageItem";

const homepageItems: Array<HomeCardItem> = [
  {
    title: 'Mymetable',
    src: '/images/mymetable.webp',
    link: 'https://mymetableapp.sorrowblue.com/',
    desc: '時間割を管理するアプリです。'
  },
  {
    title: 'Blog',
    src: '/images/blog.webp',
    link: '/blog',
    desc: 'ブログです'
  },
  {
    title: 'Portfolio',
    src: '/images/portfolio.webp',
    link: '/blog',
    desc: 'ポートフォリオです'
  },
  {
    title: 'Qiita API v2 test β',
    src: '/images/qiita.webp',
    link: '/qiita_api_v2',
    desc: 'Qiita API v2 個人使用試験用のテストページです。'
  }
]
export default homepageItems