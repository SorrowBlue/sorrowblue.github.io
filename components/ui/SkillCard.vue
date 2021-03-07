<template>
  <v-hover v-slot:default="{ hover }">
    <v-card v-if="!$vuetify.theme.dark" :raised="hover" background-color="grey darken-4" height="100%">
      <v-row>
        <v-col cols="auto">
          <v-list>
            <v-list-item v-for="icon in skill.icons" :key="icon">
              <v-avatar tile class="mb-3">
                <v-img height="48px" width="48px" contain :src="icon.src" class="pa-0 ma-0" :alt="icon.alt"></v-img>
              </v-avatar>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col>
          <v-rating v-model="skill.stars" :readonly="true"></v-rating>
          <v-card-title v-text="skill.title"></v-card-title>
          <v-card-text v-text="skill.desc"> </v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-else :raised="hover" :color="hover ? 'grey darken-3' : 'grey darken-4'" height="100%">
      <v-row>
        <v-col cols="auto">
          <v-list :color="hover ? 'grey darken-3' : 'grey darken-4'">
            <v-list-item v-for="icon in skill.icons" :key="icon">
              <v-avatar tile color="white" class="mb-3">
                <v-img height="48px" width="48px" contain :src="icon.src" class="pa-0 ma-0" :alt="icon.alt"></v-img>
              </v-avatar>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col>
          <v-rating v-model="skill.stars" :readonly="true"></v-rating>
          <v-card-title v-text="skill.title"></v-card-title>
          <v-card-text v-text="skill.desc"> </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator"

export interface SkillIcon {
  src: string
  alt: string
}

export interface Skill {
  icons: SkillIcon[]
  stars: number
  title: string
  desc: string
}

@Component
export default class SkillCardCompoent extends Vue {
  @Prop({ required: true })
  skill!: Skill

  hover = true
}
</script>
