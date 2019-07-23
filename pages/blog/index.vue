<template>
  <v-container grid-list-md>
    <v-layout column>
      <v-flex v-for="data in datas" :key="data.title" xs12>
        <v-card v-ripple :to="`/blog/${data.date}/${data.slug}`">
          <v-card-title class="headline" v-text="data.slug" />
          <v-card-text v-text="data.date" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { sourceFileArray } from '../../static/content/blog/summary.json'

const pathToData = (filepath) => {
  const deleteExt = filepath.replace('.md', '')
  const fileName = deleteExt.split('/')[deleteExt.split('/').length - 1]
  const splitArray = fileName.split('_')
  return { date: splitArray[0], slug: splitArray[1] }
}

export default {
  data: () => ({
    datas: sourceFileArray.map(it => pathToData(it))
  })
}

</script>
