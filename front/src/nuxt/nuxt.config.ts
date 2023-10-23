// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Tagsell',
      htmlAttrs: {
        lang: 'pt-br',
      },
    },
  },

  css: [
    '~/assets/css/main.css',
  ],
  modules: [
    'nuxt-icon',
    'nuxt-lodash',
    '@nuxtjs/tailwindcss'
  ],

  lodash: {
    prefix: '_',
    prefixSkip: ['string'],
    upperAfterPrefix: false,
  },

  build: {
    transpile: ['@vee-validate/rules']
  }
})
