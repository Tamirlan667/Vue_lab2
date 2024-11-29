export default defineNuxtConfig({
  plugins: ["~/plugins/vue-datepicker-ui.js"],
  mongoose: {
    options: {},
    modelsDir: "models", // Папка, где будут храниться схемы Mongoose
    devtools: true, // Включение инструментов разработки
  },

  runtimeConfig: {
    MONGODB_URI:
      process.env.MONGODB_URI ||
      "mongodb+srv://tamirlan650:510149361Karim@cluster0.jx8g3.mongodb.net/mydata?retryWrites=true&w=majority",
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "nuxt-mongoose", "@samk-dev/nuxt-vcalendar"],
  css: ["~/assets/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
