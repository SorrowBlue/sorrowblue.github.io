<template>
  <v-container v-if="item != null">
    <v-row justify="center">
      <v-col cols="12" lg="4" md="4" order="2" order-md="1" sm="10" xl="3" xs="11">
        <QiitaUserCard :user="item.user"></QiitaUserCard>
      </v-col>
      <v-col cols="12" lg="8" md="8" order="1" order-md="2" sm="10" xl="6" xs="11">
        <v-card class="pa-5">
          <p class="display-1 font-weight-black" v-text="item.title"></p>
          <!--  eslint-disable-next-line vue/no-v-html -->
          <p class="markdown-body" v-html="item.rendered_body"></p>
        </v-card>
      </v-col>
      <v-col cols="12" lg="10" md="10" order="3" order-md="3" sm="10" xl="3" xs="11">
        <QiitaCommentsCard :auth-user="user" :comments="comments"></QiitaCommentsCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, Ref, useAsync, useRoute } from "@nuxtjs/composition-api";
import QiitaUser from "@/qiita-api/type/QiitaUser";
import { qiitaStore } from "@/store";
import QiitaItem from "~/qiita-api/type/QiitaItem";
import QiitaComment from "~/qiita-api/type/QiitaComment";
import QiitaUserCard from "~/components/qiichan/QiitaUserCard.vue";
import QiitaCommentsCard from "~/components/qiichan/QiitaCommentsCard.vue";

export default defineComponent({
  components: { QiitaCommentsCard, QiitaUserCard },
  layout: "qiichan",
  setup() {
    const serviceLinks = (user: QiitaUser | null) => {
      return [
        {
          id: user?.twitter_screen_name,
          url: `https://twitter.com/${user?.twitter_screen_name}`,
          icon: "fab fa-twitter-square"
        },
        {
          id: user?.linkedin_id,
          url: `https://www.linkedin.com/in/${user?.linkedin_id}`,
          icon: "fab fa-linkedin"
        },
        {
          id: user?.github_login_name,
          url: `https://github.com/${user?.github_login_name}`,
          icon: "fab fa-github-square"
        },
        {
          id: user?.facebook_id,
          url: `https://www.facebook.com/${user?.facebook_id}`,
          icon: "fab fa-facebook-square"
        }
      ];
    };
    const deleteComment = async (id: string) => {
      await qiitaStore.comment.deleteComment(id);
    };
    const route = useRoute();
    const item: Ref<QiitaItem | null> = useAsync(async () => await qiitaStore.item.item(route.value.params.id));
    const comments: Ref<QiitaComment[] | null> = useAsync(async () => await qiitaStore.item.comments(route.value.params.id));
    return {
      serviceLinks,
      deleteComment,
      item,
      comments,
      user: qiitaStore.authUser
    };
  }
});
</script>

<style lang="scss">
img {
  max-width: 100%;
}
</style>
