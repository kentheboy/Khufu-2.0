<template>
  <UApp>
    <AdminHeader />
    <main>
      <slot />
    </main>
  </UApp>
</template>

<script setup>
import AdminHeader from '~/components/Admin/Header.vue';
</script>
