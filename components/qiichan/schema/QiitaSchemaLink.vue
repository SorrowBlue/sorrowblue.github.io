<template>
  <v-card rounded>
    <v-card-title>{{ link.title }}</v-card-title>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <v-card-subtitle v-html='link.description'></v-card-subtitle>
    <v-card-text>
      <v-list-item>
        <v-list-item-action>
          <v-list-item-action-text v-text='link.method'></v-list-item-action-text>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ link.href }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon @click='copyToClipBoard(link.href)'>mdi-content-copy</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-card-text>
    <v-card-actions>
      <v-simple-table v-if='link.schema'>
        <template #default>
          <thead>
          <tr>
            <th class='text-left'>名前</th>
            <th class='text-left'>説明</th>
            <th class='text-left'>型</th>
            <th class='text-left'>例</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for='(prop, key) in link.schema.properties' :key='key'>
            <td>{{ key }}</td>
            <td>{{ prop.description }}</td>
            <td>{{ prop.type }}</td>
            <td>{{ prop.example }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api';
import { QiitaLink } from '~/qiita-api/type/QiitaSchema';

export default defineComponent({
  props: {
    link: {
      type: Object as PropType<QiitaLink[]>,
      required: true
    }
  },
  emits: ['copy'],
  setup(_, context) {
    const message = ref('');
    const snackbar = ref(false);
    const copyToClipBoard = (str: string) => {
      context.emit('copy', str);
    };
    return {
      message,
      snackbar,
      copyToClipBoard
    };
  }
});
</script>
