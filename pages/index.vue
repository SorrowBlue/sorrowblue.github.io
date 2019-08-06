<template>
  <v-container grid-list-md>
    <v-layout justify-center>
      <v-flex column justify-center xs12 md11 lg10>
        <v-layout grid-list-md row wrap align-start justify-start>
          <v-flex v-for="card in cards" :key="card.title" xs12 sm6 md4 lg3>
            <v-card :to="isInternal(card.link) ? card.link : ''" :href="isInternal(card.link) ? '' : card.link">
              <v-img :src="card.src" :aspect-ratio="16 / 9">
                <v-card-title class="align-end fill-height" v-text="card.title" />
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
import { Vue, Component } from 'vue-property-decorator'
import HomepageItem from '~/assets/ts/item/HomepageItem'
import HomepageItems from '~/assets/data/HomepageItems'
@Component({})
class HomeVue extends Vue {
  get cards(): Array<HomepageItem> {
    return HomepageItems
  }
  isInternal(path: string): boolean {
    return !/^https?:\/\//.test(path)
  }
}
export default HomeVue
</script>
