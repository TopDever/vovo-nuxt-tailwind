
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  ssr: false,
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/url'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    'vue-sweetalert2/nuxt',
  ],
  /*
  ** Axios
  */
  axios: {
    baseURL: 'https://api.vovo.chat/'
  },
  /*
  ** Auth
  */
  router: {
    middleware: ['auth']
  },
  auth: {
    localStorage: false,
    redirect: {
      login: '/',
      home: '/profile'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'https://api.vovo.chat/auth/local',
            method: 'post',
            propertyName: 'jwt'
          },
          user: {
            url: 'https://api.vovo.chat/bots/profile',
            method: 'get',
            propertyName: null
          }
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
