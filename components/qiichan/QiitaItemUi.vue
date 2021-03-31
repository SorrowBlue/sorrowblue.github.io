<template>
  <v-card height='100%' class='d-flex flex-column' width='344' :to='`/qiichan/items/${item.id}`'>
    <v-card-title class='grow d-table-cell'>{{ item.title }}</v-card-title>
    <v-card-text>
      <v-chip v-for='tag in item.tags' :key='tag.urlName' class='mt-1 mr-1' small
              :to='`/qiichan/tags/${tag.urlName}`'>{{ tag.name }}
      </v-chip>
    </v-card-text>
    <v-card-actions>
      <v-list-item>
        <v-list-item-avatar>
          <img :src='item.user.profile_image_url' alt='' />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.user.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>{{ formatDate(item.created_at) }}</v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import QiitaItem from '@/qiita-api/type/QiitaItem';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<QiitaItem>,
      required: true
    }
  },
  setup() {
    const formatDate = (strDate: string) => {
      const date = new Date(strDate);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    };
    return { formatDate };
  }
});
</script>
