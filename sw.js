importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0854717f24fffc2f2f48.js",
    "revision": "5be2b1ad4df665a1a7559fbce713f103"
  },
  {
    "url": "/_nuxt/0c43b86d7ef40c2a9540.js",
    "revision": "3f3bd5a4e3045fd59fdb8764919c5604"
  },
  {
    "url": "/_nuxt/387c3aca7174f6b6d42e.js",
    "revision": "12be0aa7f32e4d581d1aa5b6ec9eecea"
  },
  {
    "url": "/_nuxt/50c29b570671887275d0.js",
    "revision": "da6d260fc8308e68e800212b0bb1b9f7"
  },
  {
    "url": "/_nuxt/657316e765e0ff8a19e0.js",
    "revision": "7e4ac95749557263ce22072440b97198"
  },
  {
    "url": "/_nuxt/7295de61567df3ca3ff6.js",
    "revision": "129a9f63c3e3d4532cf0d963e98deb11"
  },
  {
    "url": "/_nuxt/9cbdeb5634a27fcd67b5.js",
    "revision": "84cc58091e6ef8d96cff46d8a479b4bf"
  },
  {
    "url": "/_nuxt/a561f8549a002625a074.js",
    "revision": "d356ecad37c50069537ea19fef56bac7"
  },
  {
    "url": "/_nuxt/b745d96d3ba891c679d7.js",
    "revision": "2e3b6d319012ea06f09afd45f53a5ee9"
  },
  {
    "url": "/_nuxt/c39b88de08c42a1843e8.js",
    "revision": "e0a840df68b4f2748bbe6c584fac7718"
  },
  {
    "url": "/_nuxt/fa9243de4306487224ae.js",
    "revision": "99820c80ac3835755fb0bba8d28ba9d9"
  }
], {
  "cacheId": "sorrowblue.github.io",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
