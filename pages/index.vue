<template>
  <v-container grid-list-md>
    <v-layout justify-center>
      <v-flex column justify-center xs12 md11 lg10>
        <v-layout grid-list-md row wrap align-start justify-start>
          <v-flex v-for="card in cards" :key="card.title" xs12 sm6 md4 lg3>
            <v-card :to="isInternal(card.link) ? card.link : ''" :href="isInternal(card.link) ? '' : card.link">
              <v-img :src="card.src" :aspect-ratio="16 / 9">
                <v-card-title class="align-end fill-height" v-text="card.title" />
              </v-img>
              <v-card-text v-text="card.desc" />
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import { Vue, Component } from 'vue-property-decorator'
// import HomepageItems from '~/assets/data/HomepageItems'
// @Component({})
// class HomeVue extends Vue {
// get cards(): Array<HomepageItem> {
// return HomepageItems
// }
// isInternal(path: string): boolean {
// return !/^https?:\/\//.test(path)
// }
// }
export default {
  computed: {
    cards: () => [
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
  },
  methods: {
    isInternal: path => !/^https?:\/\//.test(path)
  }
}
</script>
