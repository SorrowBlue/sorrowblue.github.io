<template>
  <v-container grid-list-md>
    <v-layout justify-center>
      <v-flex column justify-center lg10 md11 xs12>
        <v-layout align-start grid-list-md justify-start row wrap>
          <v-flex v-for="card in cards" :key="card.title" lg3 md4 sm6 xs12>
            <v-card :href="isInternal(card.link) ? '' : card.link" :to="isInternal(card.link) ? card.link : ''">
              <v-img :aspect-ratio="16 / 9" :src="card.src" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                <v-card-title class="align-end fill-height white--text">{{ card.title }}</v-card-title>
              </v-img>
              <v-card-text>{{ card.desc }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import {defineComponent} from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const isInternal = (path: string): Boolean => !/^https?:\/\//.test(path);
    const cards = [
      {
        title: "Mymetable",
        src: "/images/mymetable.webp",
        link: "https://mymetableapp.sorrowblue.com/",
        desc: "時間割を管理するアプリです。"
      },
      {
        title: "Blog",
        src: "/images/blog.webp",
        link: "/blog",
        desc: "ブログです"
      },
      {
        title: "Portfolio",
        src: "/images/portfolio.svg",
        link: "/blog",
        desc: "ポートフォリオです"
      },
      {
        title: "Qiichan",
        src: "/images/qiichan.webp",
        link: "/qiichan",
        desc: "Qiita API v2 個人使用試験用のテストページです。"
      }
    ];

    return {isInternal, cards};
  }
});
</script>
