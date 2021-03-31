import * as fs from "fs";
import * as path from "path";
import { defineNuxtConfig } from "@nuxtjs/composition-api";

export default defineNuxtConfig({
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: `%s - ${process.env.npm_package_name}`,
    title: process.env.npm_package_name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/vuetify.ts",
    "@/plugins/axios-accessor.ts",
    "@/plugins/axios.ts",
    "@/plugins/qiita.ts",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    // https://composition-api.nuxtjs.org/
    "@nuxtjs/composition-api",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "ja",
      name: "遅れます.me",
      title: "遅れます.me",
      "og:title": "遅れます.me",
      description:
        "いつものように起きたら、突然の頭痛、そんなとき、仕事のメールを打ちたいですか？朝、いつもどおりに出発・・・しかし突然の電車遅延。混雑した社内でメール打ちたいですか？そんなあなたのためのサービスです。",
      "og:description":
        "いつものように起きたら、突然の頭痛、そんなとき、仕事のメールを打ちたいですか？朝、いつもどおりに出発・・・しかし突然の電車遅延。混雑した社内でメール打ちたいですか？そんなあなたのためのサービスです。",
      locale: "ja",
      theme_color: "#529b58",
      background_color: "#bde0c0",
      display: "standalone",
      scope: "/",
      start_url: "/",
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      themes: {
        light: {
          primary: "#3d62ad",
          secondary: "#883dad",
          accent: "#883dad",
          error: "#B00020",
        },
        dark: {
          primary: "#BB86FC",
          secondary: "#03DAC6",
          accent: "#03DAC6",
          error: "#CF6679",
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // RuntimeConfig properties https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config/
  publicRuntimeConfig: {
    QIITA_CLIENT_ID: process.env.QIITA_CLIENT_ID,
    QIITA_CLIENT_SECRET: process.env.QIITA_CLIENT_SECRET,
  },
  server: ((isDev) => {
    if (isDev) {
      return {
        https: {
          key: fs.readFileSync(path.join(__dirname, "./localhost-key.pem")),
          cert: fs.readFileSync(path.join(__dirname, "./localhost.pem")),
        },
      };
    }
  })(process.env.NODE_ENV !== "production"),
});
