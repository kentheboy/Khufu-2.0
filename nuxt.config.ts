// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/image", "@nuxt/icon", "@nuxt/fonts", "@nuxtjs/i18n"],
  css: ["@/assets/css/main.scss"],
  i18n: {
    defaultLocale: 'ja',
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'ja', file: 'ja.json' },
      { code: 'ko', file: 'ko.json' },
      { code: 'zh-yue', file: 'zh-yue.json' },
    ],
    lazy: true,
    langDir: 'locales/'
  }
});
