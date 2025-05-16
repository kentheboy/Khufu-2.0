<script setup>
import { useScroll } from "@vueuse/core";
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  title: String,
  subtitle: String,
  enableFadeIn: {
    type: Boolean,
    default: true,
  },
});

const containerRef = ref(null)
const { isVisible } = useFadeInOnScroll(containerRef, props.enableFadeIn)
</script>
<template>
  <div
    ref="containerRef"
    :class="[
      'section transition-opacity duration-700 ease-out',
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
    ]"
  >
    <!-- <div ref="containerRef" class="section"> -->
    <UContainer class="mb-24 mx-auto text-center">
      <h1 v-if="title" class="text-3xl font-bold text-gray-800 dark:text-white">
        {{ title }}
      </h1>
      <h2 v-if="subtitle" class="text-xl text-gray-600 dark:text-gray-400 pb-3">
        {{ subtitle }}
      </h2>
      <hr v-if="title || subtitle" />
      <slot />
    </UContainer>
  </div>
</template>
