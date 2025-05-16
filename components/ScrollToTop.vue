<script setup>
import { ref, watch } from "vue";
import { useScroll } from "@vueuse/core";

let showScrollTopButton = ref(false);

const { y } = useScroll(window);

watch(y, (scrollY) => {
  showScrollTopButton.value = scrollY > 200;
});

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <Transition name="fade">
    <div v-show="showScrollTopButton" class="scrollTopButton fixed bottom-6 right-6 z-50">
      <UButton
        @click="scrollTop"
        icon="i-lucide-chevrons-up"
        color="gray"
        size="sm"
        class="contrast"
      />
    </div>
  </Transition>
</template>
<style scoped lang="scss">
.scrollTopButton {
  background-color: var(--ui-primary);
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
