<template>
  <UCard class="stats-card">
    <div class="flex items-start justify-between">
      <div>
        <h3 class="text-sm font-medium text-gray-500">{{ title }}</h3>
        <div class="mt-1 flex items-baseline">
          <span class="text-2xl font-semibold">{{ value }}</span>
          <span class="ml-1 text-sm text-gray-500">{{ subValue }}</span>
        </div>
        <div class="mt-2">
          <span :class="[trend === 'up' ? 'text-green-500' : 'text-red-500', 'text-xs flex items-center']">
            <UIcon :name="trend === 'up' ? 'i-lucide-trending-up' : 'i-lucide-trending-down'" class="mr-1" />
            {{ trendValue }}
          </span>
        </div>
      </div>
      <div :class="[iconBgColor, 'rounded-md p-2']">
        <UIcon :name="icon" :class="[iconColor, 'size-6']" />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  subValue: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    required: true
  },
  iconBgColor: {
    type: String,
    default: 'bg-blue-100'
  },
  iconColor: {
    type: String,
    default: 'text-blue-500'
  },
  trend: {
    type: String,
    default: 'up',
    validator: (value: string) => ['up', 'down'].includes(value)
  },
  trendValue: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.stats-card {
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
}
</style>
