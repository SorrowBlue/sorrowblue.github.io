<template>
  <v-list>
    <template v-for="(item, i) in items">
      <v-list-item :key="item ? item.id : i" two-line>
        <v-list-item-avatar>
          <v-img v-if="item && item.user.profile_image_url != ''" :src="item.user.profile_image_url" @on:error="change(item.id)" />
          <v-icon v-else size="48" v-text="'mdi-account-circle'" />
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

@Component
class ItemList extends Vue {
  @Prop()
  items!: Item[]

  change(id: string) {
    this.items.some((v, i, a) => {
      if (v.id === id) {
        v.user.profile_image_url = ''
        return true
      } else {
        return false
      }
    })
  }
}

export default ItemList
</script>
