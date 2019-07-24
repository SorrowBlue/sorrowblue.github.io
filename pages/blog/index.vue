<template>
  <v-container grid-list-md>
    <v-layout column>
      <v-flex v-for="data in datas" :key="data.title" xs12>
        <v-card v-ripple :to="`/blog/${data.uri}/`">
          <v-card-title class="headline" v-text="data.title" />
          <v-card-text v-text="data.date" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fileMap } from '~/static/content/blog/summary.json'

const pathToUri = filepath => {
  const fileName = filepath.replace('.md', '')
  const splitArray = fileName.split('_')
  return splitArray.join('/')
}
const fileArray = () => {
  const array = []
  for (const key in fileMap) {
    fileMap[key].uri = pathToUri(fileMap[key].sourceBase)
    array.push(fileMap[key])
  }
  return array
}

export default {
  data: () => ({
    datas: fileArray()
  })
}
</script>
