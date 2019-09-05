importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/387c3aca7174f6b6d42e.js",
    "revision": "12be0aa7f32e4d581d1aa5b6ec9eecea"
  },
  {
    "url": "/_nuxt/566f4ed2d58be85f910e.js",
    "revision": "780e01275e87d6848da2a095cce4b85e"
  },
  {
    "url": "/_nuxt/59d1128d8c5934d41667.js",
    "revision": "5e4461a1089214f0787322733ed341d7"
  },
  {
    "url": "/_nuxt/7053a251d97457bfa7a6.js",
    "revision": "73d74c89d42d141f8bca2e0cad097341"
  },
  {
    "url": "/_nuxt/71cc61fa6ec4472c895b.js",
    "revision": "9e6d5c73c2155fb9f745325363ce3eee"
  },
  {
    "url": "/_nuxt/9cbdeb5634a27fcd67b5.js",
    "revision": "84cc58091e6ef8d96cff46d8a479b4bf"
  },
  {
    "url": "/_nuxt/a4723e50bcea48d3d000.js",
    "revision": "2f8943d413012b10a3fc68bb1baf2022"
  },
  {
    "url": "/_nuxt/afe34c3e09736fbb08de.js",
    "revision": "8defecf10279ca5e021d6ae62b19b332"
  },
  {
    "url": "/_nuxt/c5bd8a9829246e2c0340.js",
    "revision": "738aab566883b6a80d63ab1fd47b47cc"
  },
  {
    "url": "/_nuxt/d110f5b76dbf700446ce.js",
    "revision": "41ae8a4f4dd923e8ba1a9a481dcbac78"
  },
  {
    "url": "/_nuxt/fb581cd7389c384296c4.js",
    "revision": "f99145ce8787f38d147c9caabe243150"
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
