<template>
  <v-container grid-list-md fill-height>
    <v-layout row wrap justify-center fill-height align-center>
      <v-flex fill-height>
        <v-card height="300">
          <v-layout row pa-5 fill-height>
            <v-flex xs12 sm4 class>
              <v-layout row>
                <v-avatar xs12 :size="96">
                  <img v-if="response.profile_image_url" :src="response.profile_image_url" alt="avatar" />
                </v-avatar>
                <v-flex xs12 display-1 v-text="response.name"></v-flex>
                <v-flex xs12>
                  <v-divider xs12></v-divider>
                </v-flex>
                <v-flex xs12 subtitle2>@{{ response.twitter_screen_name }}</v-flex>
                <v-flex xs12>
                  <v-divider xs12></v-divider>
                </v-flex>
                <v-flex subtitle2>{{ response.description }}</v-flex>
                <v-flex xs12>
                  <v-divider xs12></v-divider>
                </v-flex>
                <v-flex>
                  <a caption :href="response.website_url">{{ response.website_url }}</a>
                  <span caption v-text="response.location"></span>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 sm8 class="blue"></v-flex>
            <!-- <v-avatar xs4 :size="96">
              <img v-if="response.profile_image_url" :src="response.profile_image_url" alt="avatar" />
            </v-avatar>
            <v-flex xs8 display-1 ml-5>UserName</v-flex>-->
          </v-layout>
        </v-card>
      </v-flex>
      <!-- <v-flex v-if="token != null">User Name {{ response.name }}</v-flex>
      <v-flex v-else>
        <v-btn color="info" to="/qiita_api_v2/oauth/authorize/">認証へ</v-btn>
      </v-flex>-->
    </v-layout>
  </v-container>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const token = sessionStorage.getItem('TOKEN')
    if (token != null) {
      const response = await $axios.$get('https://qiita.com/api/v2/authenticated_user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      return {
        token,
        response
      }
    }
    return {
      token,
      response: null
    }
  }
}
</script>
