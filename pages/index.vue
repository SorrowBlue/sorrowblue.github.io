<template>
  <v-container grid-list-md>
    <v-layout justify-center>
      <v-flex column justify-center xs12 md11 lg10>
        <v-layout grid-list-md row wrap align-start justify-start>
          <v-flex v-for="card in cards" :key="card.title" xs12 sm6 md4 lg3>
            <v-card :to="isInternal(card.link) ? card.link : ''" :href="isInternal(card.link) ? '' : card.link">
              <v-img :src="card.src" :aspect-ratio="16 / 9" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                <v-card-title class="align-end fill-height white--text" v-text="card.title" />
              </v-img>
              <v-card-text v-text="card.desc" />
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const isInternal = (path: string): Boolean => !/^https?:\/\//.test(path)
    return {
      isInternal,
      cards: [
        {
          title: 'Mymetable',
          src: '/images/mymetable.webp',
          link: 'https://mymetableapp.sorrowblue.com/',
          desc: '時間割を管理するアプリです。',
        },
        {
          title: 'Blog',
          src: '/images/blog.webp',
          link: '/blog',
          desc: 'ブログです',
        },
        {
          title: 'Portfolio',
          src: '/images/portfolio.svg',
          link: '/blog',
          desc: 'ポートフォリオです',
        },
        {
          title: 'Qiichan',
          src: '/images/qiichan.webp',
          link: '/qiichan',
          desc: 'Qiita API v2 個人使用試験用のテストページです。',
        },
      ],
    }
  },
})
</script>
