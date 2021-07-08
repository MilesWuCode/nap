<template>
  <a v-if="$auth.loggedIn" href="#" @click.prevent="logout">Logout</a>
</template>

<script>
export default {
  name: 'Logout',
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>