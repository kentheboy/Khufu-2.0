<template>
  <UCard class="vehicle-carousel">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium">Featured Vehicles</h3>
        <UButton icon="i-lucide-more-horizontal" color="gray" variant="ghost" />
      </div>
    </template>
    
    <div class="relative">
      <!-- Carousel -->
      <div class="overflow-hidden">
        <div 
          class="flex transition-transform duration-300 ease-in-out"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div 
            v-for="vehicle in vehicles" 
            :key="vehicle.id"
            class="w-full flex-shrink-0 px-2"
          >
            <div class="relative">
              <img 
                :src="vehicle.image" 
                :alt="vehicle.name" 
                class="w-full h-48 object-cover rounded-lg"
              />
              <div class="absolute top-2 right-2">
                <UBadge :color="vehicle.status === 'Available' ? 'green' : 'amber'">
                  {{ vehicle.status }}
                </UBadge>
              </div>
              <div class="mt-2">
                <h4 class="font-medium">{{ vehicle.name }}</h4>
                <div class="flex items-center text-sm text-gray-500">
                  <UIcon name="i-lucide-users" class="mr-1" />
                  <span>{{ vehicle.capacity }} seats</span>
                  <span class="mx-2">•</span>
                  <UIcon name="i-lucide-fuel" class="mr-1" />
                  <span>{{ vehicle.fuelType }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Navigation buttons -->
      <button 
        class="absolute top-1/2 left-0 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
        @click="prevSlide"
        :disabled="currentSlide === 0"
        :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
      >
        <UIcon name="i-lucide-chevron-left" class="size-5" />
      </button>
      <button 
        class="absolute top-1/2 right-0 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
        @click="nextSlide"
        :disabled="currentSlide === vehicles.length - 1"
        :class="{ 'opacity-50 cursor-not-allowed': currentSlide === vehicles.length - 1 }"
      >
        <UIcon name="i-lucide-chevron-right" class="size-5" />
      </button>
    </div>
    
    <!-- Indicators -->
    <div class="flex justify-center mt-4">
      <button 
        v-for="(_, index) in vehicles" 
        :key="index"
        class="w-2 h-2 rounded-full mx-1"
        :class="currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'"
        @click="goToSlide(index)"
      ></button>
    </div>
    
    <template #footer>
      <div class="text-center">
        <UButton to="/admin/products" variant="ghost" trailing-icon="i-lucide-arrow-right">
          View All Vehicles
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Mock vehicle data
const vehicles = ref([
  {
    id: 1,
    name: 'Tesla Model 3',
    image: '/images/car-images/ALPHARD7/1.jpg',
    status: 'Available',
    capacity: 5,
    fuelType: 'Electric'
  },
  {
    id: 2,
    name: 'Toyota Alphard',
    image: '/images/car-images/ALPHARD7/1.jpg',
    status: 'Reserved',
    capacity: 7,
    fuelType: 'Hybrid'
  },
  {
    id: 3,
    name: 'Honda CR-V',
    image: '/images/car-images/ALPHARD7/1.jpg',
    status: 'Available',
    capacity: 5,
    fuelType: 'Gasoline'
  }
])

// Carousel state
const currentSlide = ref(0)

// Carousel controls
const nextSlide = () => {
  if (currentSlide.value < vehicles.value.length - 1) {
    currentSlide.value++
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}
</script>

<style lang="scss" scoped>
.vehicle-carousel {
  height: 100%;
}
</style>
