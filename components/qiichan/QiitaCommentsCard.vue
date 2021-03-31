<template>
  <v-card class="pa-1">
    <v-list>
      <template v-if="comments && comments.length === 0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>この記事にコメントはありません。</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </template>
      <template v-for="(comment, i) in comments">
        <v-list-item :key="`${comment.id}user`">
          <v-list-item-avatar>
            <v-img :src="comment.user.profile_image_url"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline"
                               v-text="comment.user.id"></v-list-item-title>
            <v-list-item-subtitle
              v-text="`${comment.updated_at}に更新`"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action
            v-if="authUser != null && comment.user.id === authUser.id">
            <v-menu offset-y>
              <template #activator="{ on }">
                <v-list-item-icon>
                  <v-icon v-on="on">mdi-dots-vertical</v-icon>
                </v-list-item-icon>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title>削除</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>編集</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
        <v-list-item :key="`${comment.id}comment`">
          <v-list-item-content>
            <!--  eslint-disable-next-line vue/no-v-html -->
            <div class="body-1" v-html="comment.rendered_body"></div>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="i + 1< comments.length" :key="`${comment.id}divider`"></v-divider>
      </template>
      <template v-if="authUser">
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-avatar>
            <img :src="authUser.profile_image_url" alt="" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>投稿する</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <template v-if="authUser">
      <v-tabs v-model="tabs">
        <v-tab href="#input_comment">編集</v-tab>
        <v-tab href="#preview_comment">プレビュー</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item value="input_comment">
          <v-card flat>
            <v-textarea v-model="input" class="mt-1" name="comment"
                        outlined></v-textarea>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn>投稿</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
        <v-tab-item value="preview_comment">
          <!--  eslint-disable-next-line vue/no-v-html -->
          <div v-html="toMd(input)"></div>
        </v-tab-item>
      </v-tabs-items>
    </template>
  </v-card>
</template>

<script lang="ts">
import marked from "marked";
import { defineComponent, PropType, ref } from "@nuxtjs/composition-api";
import QiitaComment from "../../qiita-api/type/QiitaComment";
import QiitaAuthUser from "~/qiita-api/type/QiitaAuthUser";

export default defineComponent({
  props: {
    comments: {
      type: Array as PropType<QiitaComment[]>,
      required: false,
      default: null
    },
    authUser: {
      type: Object as PropType<QiitaAuthUser>,
      required: false,
      default: null
    }
  },
  setup() {
    const input = ref("");
    marked.setOptions({
      pedantic: false, // trueの場合はmarkdown.plに準拠する gfmを使用する場合はfalseで大丈夫
      gfm: true,       // GitHub Flavored Markdownを使用
      breaks: true,    // falseにすると改行入力は末尾の半角スペース2つになる
      sanitize: true,  // trueにすると特殊文字をエスケープする
      silent: false    // trueにするとパースに失敗してもExceptionを投げなくなる
    });
    const toMd = (text: string): string => marked(text);
    return {
      tabs: null,
      input,
      toMd
    };
  }
});
</script>
