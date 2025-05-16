// composables/useFadeInOnScroll.js
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useScroll } from '@vueuse/core'

export function useFadeInOnScroll(targetRef, enabled = true, threshold = 0.7) {
  const isVisible = ref(!enabled)
  const componentTopY = ref(0)
  const currentThreshold = ref(threshold)
  
  const updateThreshold = () => {
    currentThreshold.value = window.innerWidth < 750 ? 0.9 : threshold
  }

  onMounted(() => {
    if (enabled && targetRef.value instanceof HTMLElement) {
      const rect = targetRef.value.getBoundingClientRect()
      componentTopY.value = rect.top + window.scrollY
    }
    
    updateThreshold()
    window.addEventListener('resize', updateThreshold)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateThreshold)
  })

  const { y } = useScroll(window)
  watch(y, (scrollY) => {
    if (enabled) {
      isVisible.value = scrollY + window.innerHeight * currentThreshold.value > componentTopY.value
    }
  })

  return { isVisible }
}
