<script setup>
import { ref, computed } from 'vue'

// Generate days of the week
const currentDate = new Date()
const days = ref([
  { name: 'Sun', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay()), displayDate: '25', isActive: false },
  { name: 'Mon', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 1), displayDate: '26', isActive: false },
  { name: 'Tue', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 2), displayDate: '27', isActive: false },
  { name: 'Wed', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 3), displayDate: '28', isActive: false },
  { name: 'Thu', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 4), displayDate: '29', isActive: true },
  { name: 'Fri', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 5), displayDate: '30', isActive: false },
  { name: 'Sat', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 6), displayDate: '31', isActive: false },
])

// Mock reservation data
const allReservations = ref([
  {
    id: 1,
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 4), // Thursday
    time: '11:30 AM',
    vehicleName: 'Chevrolet Tahoe',
    vehicleType: 'SUV',
    vehicleSize: 'Full-size',
    vehicleImage: '/images/car-images/ALPHARD7/1.jpg',
    customerName: 'Robert Taylor',
    customerEmail: 'robert@example.com',
    status: 'Confirmed'
  },
  {
    id: 2,
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 4), // Thursday
    time: '2:00 PM',
    vehicleName: 'Tesla Model 3',
    vehicleType: 'Sedan',
    vehicleSize: 'Mid-size',
    vehicleImage: '/images/car-images/ALPHARD7/1.jpg',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    status: 'Pending'
  },
  {
    id: 3,
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 5), // Friday
    time: '9:00 AM',
    vehicleName: 'Honda CR-V',
    vehicleType: 'SUV',
    vehicleSize: 'Compact',
    vehicleImage: '/images/car-images/ALPHARD7/1.jpg',
    customerName: 'Michael Brown',
    customerEmail: 'michael@example.com',
    status: 'Confirmed'
  }
])

// Selected day
const selectedDay = ref(days.value.find(day => day.isActive)?.date || days.value[4].date)

// Filter reservations for selected day
const selectedDayReservations = computed(() => {
  return allReservations.value.filter(reservation => {
    return reservation.date.toDateString() === selectedDay.value.toDateString()
  })
})

// Select a day
const selectDay = (date) => {
  selectedDay.value = date
  days.value.forEach(day => {
    day.isActive = day.date.toDateString() === date.toDateString()
  })
}

// Get status color
const getStatusColor = (status) => {
  switch (status) {
    case 'Confirmed':
      return 'green'
    case 'Pending':
      return 'yellow'
    case 'Cancelled':
      return 'red'
    default:
      return 'gray'
  }
}
</script>

<template>
  <UCard class="weekly-reservations">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium">Weekly Reservations</h3>
        <UButton icon="i-lucide-more-horizontal" color="gray" variant="ghost" />
      </div>
    </template>
    
    <!-- Days of the week -->
    <div class="flex border-b mb-4 overflow-x-auto">
      <div 
        v-for="day in days" 
        :key="day.date" 
        class="text-center px-4 py-2 min-w-[80px] cursor-pointer"
        :class="{'border-b-2 border-blue-500 font-medium': day.isActive}"
        @click="selectDay(day.date)"
      >
        <div class="text-sm">{{ day.name }}</div>
        <div class="text-xs text-gray-500">{{ day.displayDate }}</div>
      </div>
    </div>
    
    <!-- Reservations for selected day -->
    <div v-if="selectedDayReservations.length > 0" class="space-y-4">
      <div v-for="reservation in selectedDayReservations" :key="reservation.id" class="reservation-item">
        <div class="flex items-center">
          <div class="text-sm font-medium w-24">{{ reservation.time }}</div>
          <div class="flex-1">
            <div class="flex items-center">
              <img :src="reservation.vehicleImage" alt="Vehicle" class="w-12 h-12 object-cover rounded mr-3" />
              <div>
                <div class="font-medium">{{ reservation.vehicleName }}</div>
                <div class="text-xs text-gray-500">{{ reservation.vehicleType }}</div>
                <div class="text-xs text-gray-500">{{ reservation.vehicleSize }}</div>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <div class="font-medium">{{ reservation.customerName }}</div>
            <div class="text-xs text-gray-500">{{ reservation.customerEmail }}</div>
          </div>
          <div class="w-24 text-right">
            <UBadge :color="getStatusColor(reservation.status)" size="sm">
              {{ reservation.status }}
            </UBadge>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="py-8 text-center text-gray-500">
      No reservations for this day
    </div>
    
    <template #footer>
      <div class="text-center">
        <UButton to="/admin/schedules" variant="ghost" trailing-icon="i-lucide-arrow-right">
          View All Reservations
        </UButton>
      </div>
    </template>
  </UCard>
</template>


<style lang="scss" scoped>
.weekly-reservations {
  height: 100%;
  
  .reservation-item {
    padding: 0.75rem;
    border-radius: 0.375rem;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>
