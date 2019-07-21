<template>
  <v-container grid-list-md>
    <v-layout column>
      <v-flex v-for="data in datas" :key="data.title" xs12>
        <v-card v-ripple :to="`/blog/content?date=${data.date}&slug=${data.slug}`">
          <v-card-title class="headline" v-text="data.title" />
          <v-card-text v-text="data.summary" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  asyncData({ params }) {
    return { datas: require('~/assets/blog.json').contents }
  }
}

</script>
