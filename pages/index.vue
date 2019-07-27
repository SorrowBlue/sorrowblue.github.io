<template>
  <v-layout ma-5 row wrap align-center>
    <template v-for="card in cards">
      <v-flex :key="card.title" xs12 sm6 md4 lg3>
        <v-card
          :to="convertLink(card.link, true)"
          :href="convertLink(card.link, false)"
        >
          <!-- prettier-ignore -->
          <v-img :src="card.src" :aspect-ratio="16/9">
            <v-card-title class="align-end fill-height" v-text="card.title" />
          </v-img>
          <v-card-text v-text="card.desc" />
        </v-card>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
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
      }
    ]
  },
  methods: {
    convertLink: (path, isInternal) =>
      !/^https?:\/\//.test(path) && isInternal ? path : ''
  }
}
</script>
