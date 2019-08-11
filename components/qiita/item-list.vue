<template>
  <v-list>
    <template v-for="(item, i) in items">
      <v-list-item :key="item ? item.id : i" two-line>
        <v-list-item-avatar>
          <v-img v-if="item" :src="item.user.profile_image_url" @on:error="change(item.id)" />
          <v-icon v-else v-text="'mdi-photo'" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <span v-text="item ? item.title : ''" />
          </v-list-item-title>
          <v-list-item-subtitle v-text="item ? `by ${item.user.name}` : ''" />
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text v-text="item ? item.updated_at : ''" />
          <span v-if="item">
            <v-icon size="12">fas fa-thumbs-up</v-icon>
            {{ item.likes_count }} いいね
          </span>
        </v-list-item-action>
      </v-list-item>
      <v-divider v-if="i < items.length - 1" :key="`divider_${item ? item.id : i}`" />
    </template>
  </v-list>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator'
import Item from '@/plugins/qiita/Item'

@Component({
  mounted() {
    this.$nuxt.$on('qiitaQuery', this.queryChange)
  }
})
class ItemList extends Vue {
  items: Array<Item | null> = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]

  @Prop({ default: 1 })
  page!: number

  @Prop({ default: 20 })
  prePage!: number

  @Prop({ default: undefined })
  query!: string

  @Watch('page', { immediate: true })
  pageChanged() {
    this.requestItems()
  }
  change(id: string) {
    ;(this.items as Array<Item>).forEach(v => {
      if (v.id === id) {
        v.user.profile_image_url = 'https://pbs.twimg.com/profile_images/1124774641782837249/J59RKpBu_normal.jpg'
      }
    })
  }

  async queryChange(query: string) {
    const items: Array<Item> = await this.$qiitaApi.requestItems(this.page, this.prePage, query)
    this.items = items
  }

  async requestItems() {
    this.$router.replace({
      path: this.$route.path,
      params: {
        page: `${this.page}`
      }
    })
    const items: Array<Item> = await this.$qiitaApi.requestItems(this.page, this.prePage, '')
    this.items = items
  }
}

export default ItemList
</script>
