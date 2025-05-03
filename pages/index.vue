<script setup>
const { t } = useI18n()
</script>
<template>
    <div>
        Hello Wrld! Khfu 2.0 Here it comes!
    </div>
    <div class="p-6 bg-blue-500 text-white rounded">
        Hello from Tailwind toge!
    </div>
    <p>{{ $t('greetings.hello') }}</p>
</template>
