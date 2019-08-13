<template>
  <v-layout row justify-center>
    <v-progress-linear :active="loading" indeterminate />
    <v-flex
      v-for="i in $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 1 : $vuetify.breakpoint.md ? 2 : 3"
      :key="i"
      v-class="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 'xs12' : $vuetify.breakpoint.md ? 'md6' : 'lg4'"
    >
      <item-list :items="items" />
    </v-flex>
    <v-flex xs12>
      <v-pagination v-model="page" circle :length="100" :page="page" :total-visible="7" />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator'
import Item from '@/plugins/qiita/Item'
import ItemList from '@/components/qiita/item-list.vue'

@Component({
  components: {
    'item-list': ItemList
  }
})
class Items extends Vue {
  page = 1
  loading = false
  items: Array<Item> = []

  @Watch('page', { immediate: true })
  pageChanged() {
    this.requestItems()
  }

  change(id: string) {
    ;(this.items as Array<Item>).some((v, i, a) => {
      if (v.id === id) {
        v.user.profile_image_url = ''
        return true
      } else {
        return false
      }
    })
  }

  created() {
    this.$nuxt.$on('qiitaQuery', this.queryChange)
  }

  async queryChange(query: string) {
    const items: Array<Item> = await this.$qiitaApi.requestItems(this.page, 10, query)
  }

  async requestItems() {
    this.$router.replace({
      path: this.$route.path,
      params: {
        page: `${this.page}`
      }
    })
    this.loading = true
    const items: Array<Item> = await this.$qiitaApi.requestItems(this.page, 10, '')
    this.items = items.map(v => {
      const now = new Date()
      const date = new Date(v.updated_at)
      if (now.getFullYear() > date.getFullYear()) {
        v.updated_at = now.getFullYear() - date.getFullYear() + 'years ago'
      } else if (now.getMonth() > date.getMonth()) {
        v.updated_at = now.getMonth() - date.getMonth() + 'months ago'
      } else if (now.getDate() > date.getDate()) {
        v.updated_at = now.getDate() - date.getDate() + 'days ago'
      } else if (now.getHours() > date.getHours()) {
        v.updated_at = now.getHours() - date.getHours() + 'hours ago'
      } else {
        v.updated_at = now.getMinutes() - date.getMinutes() + 'minutes ago'
      }
      return v
    })
    this.loading = false
  }
}
export default Items
</script>
