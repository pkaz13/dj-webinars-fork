// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/ui', '@vueuse/nuxt', '@nuxtjs/storybook'],
  
  // Component auto-import configuration
  components: [
    {
      path: '~/components',
      pathPrefix: true,
    },
    {
      path: '~/components/layout',
      pathPrefix: true,
    },
    {
      path: '~/components/ui-library',
      pathPrefix: true,
    }
  ],
  // Top-level transpile configuration for Nuxt 3
  build: {
    transpile: ['@jridgewell/sourcemap-codec', 'magic-string']
  },
  // Vite configuration for StackBlitz/WebContainer compatibility
  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: ['@jridgewell/sourcemap-codec'],
      force: true
    },
    ssr: {
      noExternal: ['@jridgewell/sourcemap-codec', 'magic-string']
    },
  },

  css: [
    '~/assets/css/main.css',
    'leaflet/dist/leaflet.css'
  ],
  app: {
    head: {
      title: 'Deliveroo Logistics - European Transportation & Warehousing',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Professional logistics services across Europe. Road transportation and warehousing solutions connecting Poland with Europe.' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' }
      ]
    }
  },

})