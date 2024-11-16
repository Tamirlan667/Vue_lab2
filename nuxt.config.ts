// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  mongoose: {
    options: {},
    modelsDir: 'models',
    devtools: true,
  },
  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'nuxt-mongoose'],
  css: ['~/assets/main.css']
})