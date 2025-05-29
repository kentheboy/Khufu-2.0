<template>
  <UCard class="progress-chart">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium">Overall Progress</h3>
        <USelect
          v-model="selectedPeriod"
          :options="periods"
          size="sm"
          class="w-40"
        />
      </div>
    </template>
    
    <div class="flex flex-col items-center justify-center py-4">
      <div class="relative w-48 h-48">
        <!-- Progress circle -->
        <svg class="w-full h-full" viewBox="0 0 100 100">
          <!-- Background circle -->
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#f1f5f9"
            stroke-width="10"
          />
          
          <!-- Progress arc -->
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#3b82f6"
            stroke-width="10"
            stroke-dasharray="282.7"
            :stroke-dashoffset="progressOffset"
            stroke-linecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        <!-- Percentage text -->
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-3xl font-bold">{{ progressPercentage }}%</span>
          <span class="text-sm text-gray-500">Completed</span>
        </div>
      </div>
      
      <!-- Stats -->
      <div class="grid grid-cols-4 gap-4 w-full mt-8">
        <div class="text-center">
          <div class="text-xl font-semibold">{{ totalVehicles }}</div>
          <div class="text-xs text-gray-500">Total vehicles</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-semibold text-green-500">{{ availableVehicles }}</div>
          <div class="text-xs text-gray-500">Available</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-semibold text-amber-500">{{ reservedVehicles }}</div>
          <div class="text-xs text-gray-500">Reserved</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-semibold text-red-500">{{ maintenanceVehicles }}</div>
          <div class="text-xs text-gray-500">Maintenance</div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Period options
const periods = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
]

const selectedPeriod = ref('30d')

// Mock data
const progressPercentage = ref(72)
const totalVehicles = ref(24)
const availableVehicles = ref(17)
const reservedVehicles = ref(4)
const maintenanceVehicles = ref(3)

// Calculate progress offset for SVG circle
const progressOffset = computed(() => {
  const circumference = 2 * Math.PI * 45
  return circumference - (progressPercentage.value / 100) * circumference
})
</script>

<style lang="scss" scoped>
.progress-chart {
  height: 100%;
}
</style>
