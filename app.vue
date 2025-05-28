<script setup lang="ts">
const route = useRoute();

const isAdminRoute = computed(() => route.path.startsWith('/admin'));
</script>
<template>
  <NuxtLayout :name="isAdminRoute ? 'admin' : 'default'">
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
@import "tailwindcss";
@import "@nuxt/ui";
</style>
