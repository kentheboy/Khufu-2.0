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

const isVisible = ref(!props.enableFadeIn);

// Get y-axis of the component
const containerRef = ref(null);
const componentTopY = ref(0);
onMounted(() => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect();
    console.log("title: " + props.title);
    console.log("Component Top Y: ", rect.top);
    console.log("window.scrollY: ", window.scrollY);
    componentTopY.value = rect.top + window.scrollY;
  }
});

// Watch for scroll position
const { y } = useScroll(window);
watch(y, (scrollY) => {
  console.log("Scroll Y:", scrollY);
  if (props.enableFadeIn) {
    // Adjust threshold based on your preference
    isVisible.value = scrollY + window.innerHeight * 0.7 > componentTopY.value;
  }
});
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
