// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
  ],
  css: [
    '~/assets/style.css',
  ],
})