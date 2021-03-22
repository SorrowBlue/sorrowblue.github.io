<template>
  <v-container grid-list-md>
    <v-layout justify-center>
      <v-flex xs12 sm11 md10 lg8>
        <v-layout row wrap>
          <v-flex v-for="content in contents" :key="content.title" xs12>
            <v-card v-ripple :to="`${content.path}`">
              <v-list-item :key="content.title">
                <v-list-item-content>
                  <v-list-item-title v-text="content.title" />
                  <!-- prettier-ignore -->
                  <v-list-item-subtitle v-text="content.description" />
                </v-list-item-content>
                <v-list-item-action>
                  <!-- prettier-ignore -->
                  <v-list-item-action-text v-text="content.createdAt" />
                </v-list-item-action>
              </v-list-item>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { $content } from '@nuxt/content'
import { defineComponent, useAsync } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const contents = useAsync(async () => await $content('blog').sortBy('createdAt').fetch())
    return {
      contents,
    }
  },
})
</script>
