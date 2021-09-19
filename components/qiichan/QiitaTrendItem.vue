<template>
  <v-card height='100%' class='d-flex flex-column' width='100%' min-width='344'
          :to='`/qiichan/items/${trendItem.node.uuid}`'>
    <v-card-title class='grow d-table-cell'>{{ trendItem.node.title }}</v-card-title>
    <v-card-text>
      <v-chip v-for='tag in trendItem.node.tags' :key='tag.urlName' class='mt-1 mr-1' small
              :to='`/qiichan/tags/${tag.urlName}`'>{{ tag.name }}
      </v-chip>
    </v-card-text>
    <v-card-actions>
      <v-list-item>
        <v-list-item-avatar color='white' size='24'>
          <img :src='trendItem.node.author.profileImageUrl' alt='' />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-subtitle>{{ trendItem.node.author.urlName }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>
            {{ formatDate(trendItem.node.publishedAt) }}
          </v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { QiitaTrendItem as TrendItem } from '@/qiita-api/type/QiitaTrendItem';

export default defineComponent({
  props: {
    trendItem: {
      type: Object as PropType<TrendItem>,
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
