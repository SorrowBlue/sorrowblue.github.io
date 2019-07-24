<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex v-for="card in cards" :key="card.title" xs12 sm6 md4>
        <v-card
          v-ripple
          :to="isInternalLink(card.link) ? card.link : ''"
          :href="isInternalLink(card.link) ? '' : card.link"
        >
          <!-- :aspect-ratio="16/9" -->
          <v-img :src="card.src" />
          <v-card-title primary-title>
            <v-layout align-center justify-space-between row wrap>
              <h3 headline v-text="card.title" />
              <v-btn flat outline :ripple="false">
                Read more
              </v-btn>
            </v-layout>
          </v-card-title>
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
        link: 'https://mymetableapp.sorrowblue.com/'
      },
      { title: 'Blog', src: '/images/blog.webp', link: '/blog' },
      { title: 'Portfolio', src: '/images/portfolio.webp', link: '/blog' }
    ]
  }),
  methods: {
    isInternalLink: path => !/^https?:\/\//.test(path)
  }
}
</script>
