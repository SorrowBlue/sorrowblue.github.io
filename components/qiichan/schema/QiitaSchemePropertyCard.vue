<template>
  <v-card>
    <v-card-title class='text-h6'>{{ property.title }}</v-card-title>
    <!--  eslint-disable-next-line vue/no-v-html -->
    <v-card-subtitle v-html='property.description'></v-card-subtitle>
    <v-card-actions v-if='property.properties'>
      <v-simple-table>
        <thead>
        <tr>
          <th>名前</th>
          <th>説明</th>
          <th>型</th>
          <th>例</th>
          <th style='width: 64px'>詳細</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='(prop, key) in property.properties' :key='key'>
          <td>{{ key }}</td>
          <td>{{ prop.description }}</td>
          <td>{{ prop.type }}</td>
          <td>
            <code v-if='prop.example'>{{ prop.example }}</code>
          </td>
          <td>
            <v-menu v-if='prop.item || prop.format' offset-y bottom>
              <template #activator='{ on, attrs }'>
                <v-btn v-bind='attrs' icon v-on='on'>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-text v-if='prop.item'>items: {{ prop.item }}</v-card-text>
                <v-card-text v-if='prop.format'>フォーマット: {{ prop.format }}</v-card-text>
              </v-card>
            </v-menu>
          </td>
        </tr>
        </tbody>
      </v-simple-table>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { QiitaProperty } from '@/qiita-api/type/QiitaSchema';

export default defineComponent({
  props: {
    property: {
      type: Object as PropType<QiitaProperty>,
      required: true
    }
  },
  setup() {
  }
});
</script>
<style>
table {
  table-layout: fixed;
}
</style>
