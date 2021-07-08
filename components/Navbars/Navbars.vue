<template>
  <div>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/login">Login</NuxtLink>
    <NuxtLink to="/private">Private</NuxtLink>
    <NuxtLink to="/private2">Private2</NuxtLink>
    <NuxtLink to="/guest">Guest</NuxtLink>
    <Logout />
  </div>
</template>

<script>
export default {
  name: 'Navbars',
}
</script>