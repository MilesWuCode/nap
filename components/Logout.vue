<template>
  <a href="#" @click.prevent="logout">Logout</a>
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