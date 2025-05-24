<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  mainStatement: String,
  description: String,
  number: String,
  enableFadeIn: {
    type: Boolean,
    default: true,
  },
});

const containerRef = ref(null);
const { isVisible } = useFadeInOnScroll(containerRef, props.enableFadeIn);
</script>
<template>
  <div
    ref="containerRef"
    :class="[
      'section transition-opacity duration-700 ease-out feature-card-parent mb-4',
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
    ]"
  >
    <UCard
      variant="soft"
      class="rounded-full feature-card flex items-center justify-center m-auto"
    >
      <h1
        v-if="mainStatement"
        class="text-3xl font-bold text-gray-800 dark:text-white"
        v-html="mainStatement"
      ></h1>
    </UCard>
    <h2 class="feature-number">{{ number }}</h2>
    <h3
      v-if="description"
      class="text-2xl text-gray-600 dark:text-gray-400 pb-3 mt-10 mb-16 mx-0"
      v-html="description"
    ></h3>
  </div>
</template>

<style scoped lang="scss">
.feature-card-parent {
  position: relative;
  .feature-card {
    background-color: var(--ui-primary);
    width: 27.48rem;
    height: 27.48rem;
    h1 {
      color: var(--font-contrast-style);
    }
  }
  .feature-number {
    position: absolute;
    font-size: 10rem;
    color: var(--font-contrast-style);
    font-weight: 500;
    text-shadow: 4.46875px 8.9375px 8.94px rgba(0, 0, 0, 0.5);
    right: 17%;
    bottom: 8rem;
  }

  @media screen and (max-width: 980px) {
    .feature-card {
      width: 45vw;
      height: 45vw;
      h1 {
        font-size: 4vw;
      }
    }
    h3 {
      font-size: 3vw;
    }

    .feature-number {
      font-size: 16vw;
    }
  }

  @media screen and (max-width: 750px) {
    .feature-number {
      right: -6vw;
    }
  }

  // @media screen and (max-width: 480px) {
  //   .feature-card {
  //     width: 18rem;
  //     height: 18rem;
  //   }

  //   .feature-number {
  //     font-size: 6rem;
  //     width: 40vw;
  //     top: 20px;
  //     right: 10%;
  //   }

  //   h3 {
  //     font-size: 1.2rem !important;
  //     margin: 8px 0 !important;
  //   }
  // }
}
</style>
