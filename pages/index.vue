<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex v-for="card in cards" :key="card.title" xs12 sm6 md4 lg3>
        <v-card
          :to="isInternalLink(card.link) ? card.link : ''"
          :href="isInternalLink(card.link) ? '' : card.link"
        >
          <!-- prettier-ignore -->
          <v-img :src="card.src" :aspect-ratio="16/9">
            <v-card-title class="align-end fill-height" v-text="card.title" />
          </v-img>
          <v-card-text v-text="card.desc" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    cards: [
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
        title: 'Portfolio',
        src: '/images/portfolio.webp',
        link: '/blog',
        desc: 'ポートフォリオです'
      },
      {
        title: 'Portfolio',
        src: '/images/portfolio.webp',
        link: '/blog',
        desc: 'ポートフォリオです'
      },
      {
        title: 'Portfolio',
        src: '/images/portfolio.webp',
        link: '/blog',
        desc: 'ポートフォリオです'
      },
      {
        title: 'Portfolio',
        src: '/images/portfolio.webp',
        link: '/blog',
        desc: 'ポートフォリオです'
      },
      {
        title: 'Portfolio',
        src: '/images/portfolio.webp',
        link: '/blog',
        desc: 'ポートフォリオです'
      }
    ]
  }),
  methods: {
    isInternalLink: path => !/^https?:\/\//.test(path)
  }
}
</script>
