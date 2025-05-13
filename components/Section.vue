<script setup>
const props = defineProps({
    title: String,
    subtitle: String,
})
</script>
<template>
    <UContainer class="mb-24 mx-auto text-center">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
            {{ title }}
        </h1>
        <h2 class="text-xl text-gray-600 dark:text-gray-400 pb-3">
            {{ subtitle }}
        </h2>
        <hr>
        <slot />
    </UContainer>
</template>
