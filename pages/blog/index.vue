<template>
  <v-container grid-list-md>
    <v-layout column>
      <v-flex v-for="data in datas" :key="data.title" xs12>
        <v-card v-ripple :to="`/blog/${data.uri}/`">
          <v-list-item :key="data.title">
            <template>
              <v-list-item-content>
                <v-list-item-title v-text="data.title"></v-list-item-title>
                <!-- prettier-ignore -->
                <v-list-item-subtitle v-text="data.desc"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <!-- prettier-ignore -->
                <v-list-item-action-text v-text="data.date"></v-list-item-action-text>
              </v-list-item-action>
            </template>
          </v-list-item>
          <!-- <v-card-title class="headline" v-text="data.title" />
          <v-card-text v-text="data.date" />
          <v-card-text v-text="data.desc" /> -->
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
