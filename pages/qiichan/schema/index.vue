<template>
  <v-app>
    <qiita-appbar v-if="schema" v-model="drawer" :sub-title="schema.description"
                  :title="schema.title">
      <template #append>
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn icon text v-on="on">
              <v-icon v-bind="attrs">mdi-translate</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(language) in languages" :key="language.locale"
                         @click="updateLocale(language.locale)">
              <v-list-item-title>{{ language.display }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </qiita-appbar>
    <app-navigation-drawer v-model="drawer">
      <v-list-item v-for="(property, key) in properties" :key="property.link"
                   link
                   @click="updatePropKey(key)">
        <v-list-item-content>
          <v-list-item-title>{{ property.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </app-navigation-drawer>
    <v-main>
      <v-container v-if="schema">
        <qiita-scheme-property-card
          :property="schema.properties[propKey]"></qiita-scheme-property-card>

        <v-row class="mt-3">
          <v-col v-for="link in schema.properties[propKey].links" :key="link.title" cols="12">
            <QiitaSchemaLink :link="link" @copy="copyToClipBoard"></QiitaSchemaLink>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <app-footer></app-footer>
  </v-app>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useAsync,
  useRoute,
  useRouter
} from "@nuxtjs/composition-api";
import { qiitaStore } from "@/utils/store-accessor";
import QiitaSchemaLink from "@/components/qiichan/schema/QiitaSchemaLink.vue";
import QiitaAppbar from "@/components/qiichan/QiitaAppbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppNavigationDrawer from "@/components/AppNavigationDrawer.vue";
import { QiitaProperty } from "@/qiita-api/type/QiitaSchema";
import QiitaSchemePropertyCard from "@/components/qiichan/schema/QiitaSchemePropertyCard.vue";

export default defineComponent({
  components: {
    AppFooter,
    QiitaSchemePropertyCard,
    AppNavigationDrawer,
    QiitaAppbar,
    QiitaSchemaLink
  },
  layout: "empty",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const message = ref("");
    const snackbar = ref(false);
    const drawer = ref(false);
    const locale = ref(route.value.query.locale);
    const propKey = ref(route.value.query.prop_key);
    const languages = [{ display: "日本語", locale: "ja" }, { display: "English", locale: "en" }];
    const properties = ref<Map<string, QiitaProperty>>();
    const schema = useAsync(async () => {
      const schema = await qiitaStore.scrap.schema(typeof locale.value === "string" ? locale.value : undefined);
      properties.value = schema.properties;
      propKey.value = propKey.value ? propKey.value : schema.required[0];
      return schema;
    });
    const updatePropKey = (key: string) => {
      router.replace({ query: { prop_key: key, locale: locale.value } });
      propKey.value = key;
    };
    const updateLocale = async (locale: string) => {
      router.replace({ query: { prop_key: propKey.value, locale } });
      schema.value = await qiitaStore.scrap.schema(locale);
    };
    const copyToClipBoard = (str: string) => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(str);
        snackbar.value = true;
        message.value = "コピーしました。";
      }
    };
    const qiitaAuthUser = computed(() => qiitaStore.authUser);

    return {
      message,
      snackbar,
      drawer,
      qiitaAuthUser,
      propKey,
      languages,
      schema,
      properties,
      updatePropKey,
      updateLocale,
      copyToClipBoard
    };
  }
});
</script>
