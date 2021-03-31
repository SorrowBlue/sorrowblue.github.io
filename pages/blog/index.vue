<template>
  <v-container grid-list-md>
    <v-layout justify-center>
      <v-flex lg8 md10 sm11 xs12>
        <v-layout row wrap>
          <v-flex v-for="content in contents" :key="content.title" xs12>
            <v-card v-ripple :to="`${content.path}`">
              <v-list-item :key="content.title">
                <v-list-item-content>
                  <v-list-item-title v-text="content.title" />
                  <v-list-item-subtitle v-text="content.description" />
                </v-list-item-content>
                <v-list-item-action>
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
import { defineComponent, onMounted, ref, useContext } from "@nuxtjs/composition-api";
import { IContentDocument } from "@nuxt/content/types/content";

export default defineComponent({
  setup() {
    const contents = ref<IContentDocument[]>([]);
    onMounted(async () => {
      contents.value = await useContext().$content("blog").sortBy("createdAt").fetch() as IContentDocument[];
    });
    return {
      contents
    };
  }
});
</script>
