<template>
    <AdminHeader />
    <main>
      <slot />
    </main>
</template>

<script setup>
import AdminHeader from '~/components/Admin/Header.vue';
</script>
