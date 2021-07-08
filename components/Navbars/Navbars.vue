<template>
  <div class="flex items-baseline space-x-4">
    <NuxtLink class="nav-btn" to="/">Home</NuxtLink>
    <NuxtLink class="nav-btn" to="/login">Login</NuxtLink>
    <NuxtLink class="nav-btn" to="/private">Private</NuxtLink>
    <NuxtLink class="nav-btn" to="/private2">Private2</NuxtLink>
    <NuxtLink class="nav-btn" to="/guest">Guest</NuxtLink>
    <Logout class="nav-btn" />
  </div>
</template>

<script>
export default {
  name: 'Navbars',
}
</script>

<style lang="postcss" scoped>
a.nav-btn {
  @apply px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-gray-800;
}

a.nav-btn.nuxt-link-exact-active {
  @apply text-gray-800;
}
</style>