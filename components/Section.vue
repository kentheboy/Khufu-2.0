<script setup>
const props = defineProps({
    title: String,
    subtitle: String,
})
</script>
<template>
    <UContainer class="h-32 mb-24 mx-auto text-center">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
            {{ title }}
        </h1>
        <h2 class="text-xl text-gray-600 dark:text-gray-400 pb-3">
            {{ subtitle }}
        </h2>
        <hr>
        <UContainer class="my-18 mx-auto text-center max-w-lg">
            <slot />
        </UContainer>
    </UContainer>
</template>
