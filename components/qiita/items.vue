<template>
  <v-layout row justify-center>
    <v-progress-linear :active="loading" indeterminate />
    <v-flex
      v-for="i in $vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 1 : $vuetify.breakpoint.md ? 2 : 3"
      :key="i"
      :class="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 'xs12' : $vuetify.breakpoint.md ? 'md6' : 'lg4'"
    >
      <item-list :items="items[i - 1]" />
    </v-flex>
    <v-flex xs12>
      <v-pagination v-model="page" circle :length="100" :page="page" :total-visible="7" />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, SetupContext, watch } from '@nuxtjs/composition-api'
import ItemList from '@/components/qiita/item-list.vue'
import QiitaItem from '@/plugins/qiita/QiitaItem'

export default defineComponent({
  components: {
    'item-list': ItemList,
  },
  setup(_, context: SetupContext) {
    const page = ref(1)
    const loading = ref(false)
    const items = reactive<Array<Array<QiitaItem>>>([])
    const query = ref('')
    const requestItems = async (reqCount: number) => {
      loading.value = true
      for (let i = 0; i < reqCount; i++) {
        const result: Array<QiitaItem> = await context.root.$qiitaApi.requestItems(page.value + i, 10, query.value)
        items[i] = result.map((v) => {
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
      }
      loading.value = false
    }
    watch(
      () => page,
      () => {
        requestItems(context.root.$vuetify.breakpoint.xs || context.root.$vuetify.breakpoint.sm ? 1 : context.root.$vuetify.breakpoint.md ? 2 : 3)
      }
    )
    const queryChange = (q: string) => {
      query.value = q
      requestItems(context.root.$vuetify.breakpoint.xs || context.root.$vuetify.breakpoint.sm ? 1 : context.root.$vuetify.breakpoint.md ? 2 : 3)
    }
    requestItems(context.root.$vuetify.breakpoint.xs || context.root.$vuetify.breakpoint.sm ? 1 : context.root.$vuetify.breakpoint.md ? 2 : 3)

    context.root.$nuxt.$on('qiitaQuery', queryChange)
    return {
      page,
      loading,
      items,
      query,
    }
  },

  // created() {
  //   this.$nuxt.$on('qiitaQuery', this.queryChange)
  // }
})
</script>
