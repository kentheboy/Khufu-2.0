<script setup lang="ts">
// Use definePageMeta for server-side redirect
definePageMeta({
  redirect: '/admin'
});
</script>

<template>
  <div class="redirect-page">
    <p>Redirecting to dashboard...</p>
  </div>
</template>

<style scoped>
.redirect-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
  color: #666;
}
</style>
