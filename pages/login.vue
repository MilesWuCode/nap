<template>
  <div>
    <h1 class="text-3xl text-gray-900">Login</h1>
    <form @submit.prevent="userLogin">
      <div class="flex flex-col max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md ">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-grey-darker" for="username">Username</label>
          <input
            id="username"
            v-model="login.username"
            class="w-full px-3 py-2 border rounded shadow appearance-none text-grey-darker"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-bold text-grey-darker" for="password">Password</label>
          <input
            id="password"
            v-model="login.password"
            class="w-full px-3 py-2 mb-3 border rounded shadow appearance-none border-red text-grey-darker"
            type="password"
            placeholder="******************"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-dark"
            type="submit"
          >Sign In</button>
          <a
            class="inline-block text-sm font-bold text-blue-600 align-baseline hover:text-blue-darker"
            href="#"
          >Forgot Password?</a>
        </div>
      </div>
    </form>
    <div class="flex items-baseline space-x-4">
      <a class="px-4 py-2 font-bold text-white bg-red-500 rounded" href="/passport/google">Google</a>
      <a class="px-4 py-2 font-bold text-white bg-blue-600 rounded" href="/passport/facebook">Facebook</a>
      <a class="px-4 py-2 font-bold text-white bg-black rounded" href="/passport/apple">Apple(wip)</a>
      <a class="px-4 py-2 font-bold text-white bg-green-600 rounded" href="/passport/line">Line</a>
    </div>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      login: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        const redirect = this.$store.$auth.$state.redirect || '/'

        await this.$auth
          .loginWith('local', {
            data: this.login,
          })
          .then(() => {
            // Manual redirect
            this.$router.push(redirect)
          })
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
