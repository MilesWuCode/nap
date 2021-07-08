<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="userLogin">
      <div>
        <label>Username</label>
        <input v-model="login.username" type="text" />
      </div>
      <div>
        <label>Password</label>
        <input v-model="login.password" type="text" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    <a href="/passport/google">Google Login</a><br/>
    <a href="/passport/facebook">Facebook Login</a><br/>
    <a href="/passport/line">Line Login</a><br/>
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
            this.$router.push(redirect)
          })

        // bad-fix-bug
        // window.location.reload()

        // can-working-redirect-to:/private
        // await this.$auth.setUserToken('abc', 'xyz')
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
