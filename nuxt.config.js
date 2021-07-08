import path from 'path'
import fs from 'fs'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'login',
    htmlAttrs: {
      lang: 'en-US'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-tailwind.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
  ],

  router: {
    middleware: ['auth', 'passport']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          maxAge: 1800,
          global: true,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          refresh: { url: '/api/auth/refresh', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' },
        },
      },
      line: {
        scheme: 'local',
        token: {
          property: 'access_token',
          maxAge: 60 * 60 * 24 * 30,
          global: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: false,
          logout: { url: '/passport/line/logout', method: 'post' },
          user: { url: '/passport/line/user', method: 'get' },
        },
      },
      google: {
        scheme: 'local',
        token: {
          property: 'access_token',
          maxAge: 60 * 60 * 24 * 30,
          global: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: false,
          logout: { url: '/passport/google/logout', method: 'post' },
          user: { url: '/passport/google/user', method: 'get' },
        },
      },
      facebook: {
        scheme: 'local',
        token: {
          property: 'access_token',
          maxAge: 60 * 60 * 24 * 30,
          global: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: false,
          logout: { url: '/passport/facebook/logout', method: 'post' },
          user: { url: '/passport/facebook/user', method: 'get' },
        },
      }
    }
  },

  serverMiddleware: [
    { path: '/api/auth', handler: '~/server/local.js' },
    { path: '/passport/google', handler: '~/server/google.js' },
    { path: '/passport/facebook', handler: '~/server/facebook.js' },
    // { path: '/passport/apple', handler: '~/server/apple.js' },
    { path: '/passport/line', handler: '~/server/line.js' },
  ],

  // for Facebook Test
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt'))
  //   }
  // },
}
