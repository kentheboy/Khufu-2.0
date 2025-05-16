// composables/useFadeInOnScroll.js
import { ref, onMounted, watch } from 'vue'
import { useScroll } from '@vueuse/core'

export function useFadeInOnScroll(targetRef, enabled = true, threshold = 0.7) {
  const isVisible = ref(!enabled)
  const componentTopY = ref(0)

  onMounted(() => {
    if (enabled && targetRef.value instanceof HTMLElement) {
      const rect = targetRef.value.getBoundingClientRect()
      componentTopY.value = rect.top + window.scrollY
    }
  })

  const { y } = useScroll(window)
  watch(y, (scrollY) => {
    if (enabled) {
      isVisible.value = scrollY + window.innerHeight * threshold > componentTopY.value
    }
  })

  return { isVisible }
}
