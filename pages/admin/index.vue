<template>
  <div class="dashboard-container">
    <h1 class="page-title">Dashboard</h1>
    
    <!-- Stats Cards -->
    <div class="stats-grid">
      <UCard v-for="(stat, index) in stats" :key="index" class="stat-card">
        <div class="stat-content">
          <div class="stat-icon" :class="stat.iconClass">
            <UIcon :name="stat.icon" class="icon" />
          </div>
          <div class="stat-info">
            <h3 class="stat-title">{{ stat.title }}</h3>
            <div class="stat-value-container">
              <p class="stat-value">{{ stat.value }}</p>
              <p class="stat-subtitle" v-if="stat.subtitle">{{ stat.subtitle }}</p>
            </div>
            <p class="stat-change" :class="stat.changeClass">
              <UIcon :name="stat.changeIcon" class="change-icon" />
              {{ stat.change }}
            </p>
          </div>
        </div>
      </UCard>
    </div>
    
    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Weekly Reservations -->
      <div class="reservations-section">
        <UCard>
          <template #header>
            <div class="card-header">
              <h2 class="card-title">Weekly Reservations</h2>
              <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal" />
            </div>
          </template>
          
          <div class="days-container">
            <div 
              v-for="(day, index) in days" 
              :key="index" 
              class="day-tab"
              :class="{ 'active': activeDay === index }"
              @click="activeDay = index"
            >
              <p class="day-name">{{ day.name }}</p>
              <p class="day-date">{{ day.date }}</p>
              <div class="day-indicator" :class="{ 'active': activeDay === index }"></div>
            </div>
          </div>
          
          <div class="reservations-container">
            <template v-if="currentDayReservations.length > 0">
              <div v-for="(reservation, index) in currentDayReservations" :key="index" class="reservation-item">
                <div class="reservation-time">
                  <p>{{ reservation.time }}</p>
                </div>
                <div class="reservation-content">
                  <div class="reservation-vehicle">
                    <UAvatar
                      :src="reservation.vehicleImage"
                      size="sm"
                      class="vehicle-image"
                    />
                    <div class="vehicle-info">
                      <p class="vehicle-name">{{ reservation.vehicleName }}</p>
                      <p class="vehicle-type">{{ reservation.vehicleType }}</p>
                    </div>
                  </div>
                  <div class="reservation-customer">
                    <p class="customer-name">{{ reservation.customerName }}</p>
                    <p class="customer-email">{{ reservation.customerEmail }}</p>
                  </div>
                  <UBadge :color="getStatusColor(reservation.status)" size="sm">
                    {{ reservation.status }}
                  </UBadge>
                </div>
              </div>
            </template>
            <div v-else class="no-reservations">
              <UIcon name="i-heroicons-calendar" class="no-reservations-icon" />
              <p>No reservations for this day</p>
            </div>
          </div>
          
          <template #footer>
            <div class="card-footer">
              <UButton to="/admin/schedules" color="gray" variant="ghost">
                View All Reservations
                <template #trailing>
                  <UIcon name="i-heroicons-arrow-right" />
                </template>
              </UButton>
            </div>
          </template>
        </UCard>
      </div>
      
      <!-- Progress Chart -->
      <div class="progress-section">
        <UCard>
          <template #header>
            <div class="card-header">
              <h2 class="card-title">Overall Progress</h2>
              <USelect
                v-model="selectedPeriod"
                :options="periodOptions"
                placeholder="Select period"
                class="period-select"
              />
            </div>
          </template>
          
          <div class="chart-container">
            <div class="progress-chart">
              <div class="progress-circle">
                <div class="progress-value">
                  <h3 class="value">{{ progressData.percentage }}%</h3>
                  <p class="label">Completed</p>
                </div>
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#e2e8f0"
                    stroke-width="20"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#3b82f6"
                    stroke-width="20"
                    stroke-dasharray="502.4"
                    :stroke-dashoffset="502.4 - (502.4 * progressData.percentage) / 100"
                    transform="rotate(-90 100 100)"
                  />
                </svg>
              </div>
              
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-value">{{ progressData.total }}</div>
                  <div class="stat-label">Total vehicles</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value green">{{ progressData.available }}</div>
                  <div class="stat-label">Available</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value yellow">{{ progressData.reserved }}</div>
                  <div class="stat-label">Reserved</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value red">{{ progressData.maintenance }}</div>
                  <div class="stat-label">Maintenance</div>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
      
      <!-- Recent Blogs -->
      <div class="blogs-section">
        <UCard>
          <template #header>
            <div class="card-header">
              <h2 class="card-title">Recent Blog Posts</h2>
              <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal" />
            </div>
          </template>
          
          <div class="blogs-container">
            <div v-for="(blog, index) in blogs" :key="index" class="blog-item">
              <div class="blog-image-container">
                <img :src="blog.image" :alt="blog.title" class="blog-image" />
              </div>
              <div class="blog-content">
                <div class="blog-meta">
                  <UBadge :color="getCategoryColor(blog.category)" size="sm">
                    {{ blog.category }}
                  </UBadge>
                  <p class="blog-date">{{ formatDate(blog.date) }}</p>
                </div>
                <h3 class="blog-title">{{ blog.title }}</h3>
                <p class="blog-excerpt">{{ blog.excerpt }}</p>
                <div class="blog-author">
                  <UAvatar
                    :src="blog.authorImage"
                    size="sm"
                    class="author-image"
                  />
                  <p class="author-name">{{ blog.author }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <template #footer>
            <div class="card-footer">
              <UButton to="/admin/blogs" color="gray" variant="ghost">
                View All Blog Posts
                <template #trailing>
                  <UIcon name="i-heroicons-arrow-right" />
                </template>
              </UButton>
            </div>
          </template>
        </UCard>
      </div>
      
      <!-- Vehicle Carousel -->
      <div class="vehicles-section">
        <UCard>
          <template #header>
            <div class="card-header">
              <h2 class="card-title">Featured Vehicles</h2>
              <div class="carousel-controls">
                <UButton 
                  color="gray" 
                  variant="ghost" 
                  icon="i-heroicons-arrow-left" 
                  :disabled="currentIndex === 0"
                  @click="prevSlide"
                />
                <UButton 
                  color="gray" 
                  variant="ghost" 
                  icon="i-heroicons-arrow-right" 
                  :disabled="currentIndex >= vehicles.length - slidesToShow"
                  @click="nextSlide"
                />
              </div>
            </div>
          </template>
          
          <div class="carousel-container">
            <div 
              class="carousel-track"
              :style="{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }"
            >
              <div 
                v-for="(vehicle, index) in vehicles" 
                :key="index" 
                class="carousel-slide"
                :style="{ width: `${100 / slidesToShow}%` }"
              >
                <div class="vehicle-card">
                  <div class="vehicle-image-container">
                    <img :src="vehicle.image" :alt="vehicle.name" class="vehicle-image" />
                    <UBadge 
                      :color="getVehicleStatusColor(vehicle.status)" 
                      class="vehicle-status"
                    >
                      {{ vehicle.status }}
                    </UBadge>
                  </div>
                  <div class="vehicle-content">
                    <h3 class="vehicle-name">{{ vehicle.name }}</h3>
                    <p class="vehicle-type">{{ vehicle.type }}</p>
                    <div class="vehicle-details">
                      <div class="detail-item">
                        <UIcon name="i-heroicons-currency-dollar" class="detail-icon" />
                        <span>{{ vehicle.price }}/day</span>
                      </div>
                      <div class="detail-item">
                        <UIcon name="i-heroicons-star" class="detail-icon" />
                        <span>{{ vehicle.rating }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <template #footer>
            <div class="card-footer">
              <UButton to="/admin/products" color="gray" variant="ghost">
                View All Vehicles
                <template #trailing>
                  <UIcon name="i-heroicons-arrow-right" />
                </template>
              </UButton>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Stats Cards Data
const stats = [
  {
    title: 'Total Vehicles',
    value: '24',
    subtitle: '/30',
    change: '2 new vehicles this month',
    icon: 'i-heroicons-truck',
    iconClass: 'bg-blue-100 text-blue-500',
    changeIcon: 'i-heroicons-arrow-up',
    changeClass: 'text-green-500'
  },
  {
    title: 'Reservations',
    value: '18',
    subtitle: 'this week',
    change: '10% increase from last week',
    icon: 'i-heroicons-calendar',
    iconClass: 'bg-orange-100 text-orange-500',
    changeIcon: 'i-heroicons-arrow-up',
    changeClass: 'text-green-500'
  },
  {
    title: 'Blog Posts',
    value: '42',
    subtitle: 'total',
    change: '3 new posts this month',
    icon: 'i-heroicons-document-text',
    iconClass: 'bg-purple-100 text-purple-500',
    changeIcon: 'i-heroicons-arrow-up',
    changeClass: 'text-green-500'
  },
  {
    title: 'Active Users',
    value: '156',
    subtitle: 'this month',
    change: '5% increase from last month',
    icon: 'i-heroicons-user-group',
    iconClass: 'bg-green-100 text-green-500',
    changeIcon: 'i-heroicons-arrow-up',
    changeClass: 'text-green-500'
  }
]

// Weekly Reservations
// Generate days for the current week
const today = new Date()
const days = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(today)
  date.setDate(today.getDate() - today.getDay() + i)
  
  return {
    name: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
    date: date.getDate(),
    fullDate: date
  }
})

const activeDay = ref(today.getDay())

// Mock reservation data
const reservations = [
  {
    day: 1, // Monday
    time: '09:00 AM',
    vehicleName: 'Tesla Model 3',
    vehicleType: 'Electric Sedan',
    vehicleImage: 'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVzbGElMjBtb2RlbCUyMDN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    customerName: 'John Smith',
    customerEmail: 'john.smith@example.com',
    status: 'Confirmed'
  },
  {
    day: 1, // Monday
    time: '02:30 PM',
    vehicleName: 'Toyota Camry',
    vehicleType: 'Sedan',
    vehicleImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG95b3RhJTIwY2Ftcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    customerName: 'Emily Johnson',
    customerEmail: 'emily.j@example.com',
    status: 'Pending'
  },
  {
    day: 2, // Tuesday
    time: '10:15 AM',
    vehicleName: 'Honda CR-V',
    vehicleType: 'SUV',
    vehicleImage: 'https://images.unsplash.com/photo-1568844293986-ca9c5c1bc7b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZGElMjBjcnZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    customerName: 'Michael Brown',
    customerEmail: 'michael.b@example.com',
    status: 'Confirmed'
  },
  {
    day: 3, // Wednesday
    time: '01:00 PM',
    vehicleName: 'Ford F-150',
    vehicleType: 'Truck',
    vehicleImage: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZCUyMGYlMjAxNTB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    customerName: 'David Wilson',
    customerEmail: 'david.w@example.com',
    status: 'Confirmed'
  },
  {
    day: 3, // Wednesday
    time: '04:45 PM',
    vehicleName: 'BMW X5',
    vehicleType: 'Luxury SUV',
    vehicleImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym13JTIweDV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    customerName: 'Sarah Martinez',
    customerEmail: 's.martinez@example.com',
    status: 'Cancelled'
  },
  {
    day: 4, // Thursday
    time: '11:30 AM',
    vehicleName: 'Chevrolet Tahoe',
    vehicleType: 'Full-size SUV',
    vehicleImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hldnJvbGV0JTIwdGFob2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    customerName: 'Robert Taylor',
    customerEmail: 'robert.t@example.com',
    status: 'Confirmed'
  },
  {
    day: 5, // Friday
    time: '09:45 AM',
    vehicleName: 'Jeep Wrangler',
    vehicleType: 'Off-road SUV',
    vehicleImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amVlcCUyMHdyYW5nbGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    customerName: 'Jennifer Adams',
    customerEmail: 'jennifer.a@example.com',
    status: 'Confirmed'
  },
  {
    day: 5, // Friday
    time: '03:15 PM',
    vehicleName: 'Audi A4',
    vehicleType: 'Luxury Sedan',
    vehicleImage: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXVkaSUyMGE0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    customerName: 'Thomas Johnson',
    customerEmail: 't.johnson@example.com',
    status: 'Pending'
  }
]

const currentDayReservations = computed(() => {
  return reservations.filter(reservation => reservation.day === activeDay.value)
})

const getStatusColor = (status: string) => {
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

// Progress Chart
const selectedPeriod = ref('month')

const periodOptions = [
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'This Quarter', value: 'quarter' },
  { label: 'This Year', value: 'year' }
]

// Mock progress data
const progressData = computed(() => {
  // Different data based on selected period
  switch (selectedPeriod.value) {
    case 'week':
      return {
        percentage: 65,
        total: 24,
        available: 16,
        reserved: 5,
        maintenance: 3
      }
    case 'month':
      return {
        percentage: 72,
        total: 24,
        available: 17,
        reserved: 4,
        maintenance: 3
      }
    case 'quarter':
      return {
        percentage: 80,
        total: 24,
        available: 19,
        reserved: 3,
        maintenance: 2
      }
    case 'year':
      return {
        percentage: 85,
        total: 24,
        available: 20,
        reserved: 2,
        maintenance: 2
      }
    default:
      return {
        percentage: 72,
        total: 24,
        available: 17,
        reserved: 4,
        maintenance: 3
      }
  }
})

// Recent Blogs
// Mock blog data
const blogs = [
  {
    title: 'Top 10 Electric Vehicles for 2025',
    excerpt: 'Discover the most anticipated electric vehicles coming to market in 2025, featuring cutting-edge technology and impressive range.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bfcf2dd8b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3RyaWMlMjB2ZWhpY2xlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    date: new Date('2025-05-25'),
    author: 'Alex Johnson',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    category: 'Electric'
  },
  {
    title: 'The Ultimate Guide to Off-Road Adventures',
    excerpt: 'Planning an off-road trip? Here\'s everything you need to know about preparing your vehicle and staying safe on rough terrain.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amVlcCUyMHdyYW5nbGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    date: new Date('2025-05-18'),
    author: 'Sarah Miller',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29026024e',
    category: 'Off-Road'
  },
  {
    title: 'Luxury Cars: Worth the Investment?',
    excerpt: 'We analyze whether luxury vehicles are worth their premium price tags by examining performance, features, and long-term value.',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym13JTIweDV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    date: new Date('2025-05-10'),
    author: 'Michael Chen',
    authorImage: 'https://i.pravatar.cc/150?u=a042581f4e29026024f',
    category: 'Luxury'
  }
]

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date)
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Electric':
      return 'blue'
    case 'Off-Road':
      return 'green'
    case 'Luxury':
      return 'purple'
    default:
      return 'gray'
  }
}

// Vehicle Carousel
// Mock vehicle data
const vehicles = [
  {
    name: 'Tesla Model 3',
    type: 'Electric Sedan',
    price: '$85',
    rating: '4.9',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVzbGElMjBtb2RlbCUyMDN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Toyota Camry',
    type: 'Sedan',
    price: '$65',
    rating: '4.7',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG95b3RhJTIwY2Ftcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Honda CR-V',
    type: 'SUV',
    price: '$75',
    rating: '4.6',
    status: 'Reserved',
    image: 'https://images.unsplash.com/photo-1568844293986-ca9c5c1bc7b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9uZGElMjBjcnZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Ford F-150',
    type: 'Truck',
    price: '$95',
    rating: '4.8',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZCUyMGYlMjAxNTB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'BMW X5',
    type: 'Luxury SUV',
    price: '$120',
    rating: '4.9',
    status: 'Maintenance',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym13JTIweDV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Jeep Wrangler',
    type: 'Off-road SUV',
    price: '$90',
    rating: '4.7',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amVlcCUyMHdyYW5nbGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  }
]

const currentIndex = ref(0)
const windowWidth = ref(0)
const slidesToShow = computed(() => {
  if (windowWidth.value < 640) return 1
  if (windowWidth.value < 1024) return 2
  return 3
})

const nextSlide = () => {
  if (currentIndex.value < vehicles.length - slidesToShow.value) {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const getVehicleStatusColor = (status: string) => {
  switch (status) {
    case 'Available':
      return 'green'
    case 'Reserved':
      return 'blue'
    case 'Maintenance':
      return 'yellow'
    default:
      return 'gray'
  }
}

onMounted(() => {
  if (process.client) {
    // Set initial width on client-side
    windowWidth.value = window.innerWidth
    
    window.addEventListener('resize', () => {
      windowWidth.value = window.innerWidth
      // Reset index if needed when resizing
      if (currentIndex.value > vehicles.length - slidesToShow.value) {
        currentIndex.value = Math.max(0, vehicles.length - slidesToShow.value)
      }
    })
  }
})
</script>

<style scoped>
.dashboard-container {
  padding: 1rem 0;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  height: 100%;
}

.stat-content {
  display: flex;
  align-items: center;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  margin-right: 1rem;
}

.icon {
  font-size: 1.5rem;
}

.stat-info {
  flex: 1;
}

.stat-title {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.stat-value-container {
  display: flex;
  align-items: baseline;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 0.25rem;
}

.stat-subtitle {
  font-size: 0.875rem;
  color: #64748b;
}

.stat-change {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
}

.change-icon {
  margin-right: 0.25rem;
}

.text-green-500 {
  color: #22c55e;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  gap: 1.5rem;
}

.reservations-section {
  grid-column: 1;
  grid-row: 1;
}

.progress-section {
  grid-column: 2;
  grid-row: 1;
}

.blogs-section {
  grid-column: 1;
  grid-row: 2;
}

.vehicles-section {
  grid-column: 2;
  grid-row: 2;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
  }
  
  .reservations-section,
  .progress-section,
  .blogs-section,
  .vehicles-section {
    grid-column: 1;
  }
  
  .reservations-section {
    grid-row: 1;
  }
  
  .progress-section {
    grid-row: 2;
  }
  
  .blogs-section {
    grid-row: 3;
  }
  
  .vehicles-section {
    grid-row: 4;
  }
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
}

/* Weekly Reservations */
.days-container {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1rem;
  overflow-x: auto;
}

.day-tab {
  flex: 1;
  text-align: center;
  padding: 0.75rem 0;
  cursor: pointer;
  position: relative;
  min-width: 80px;
}

.day-tab.active {
  color: #3b82f6;
}

.day-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.day-date {
  font-size: 0.875rem;
  color: #64748b;
}

.day-indicator {
  position: absolute;
  bottom: -1px;
  left: 25%;
  width: 50%;
  height: 2px;
  background-color: transparent;
}

.day-indicator.active {
  background-color: #3b82f6;
}

.reservations-container {
  min-height: 300px;
}

.reservation-item {
  display: flex;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.reservation-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.reservation-time {
  width: 80px;
  font-weight: 500;
}

.reservation-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reservation-vehicle {
  display: flex;
  align-items: center;
}

.vehicle-image {
  margin-right: 0.75rem;
}

.vehicle-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.vehicle-type {
  font-size: 0.75rem;
  color: #64748b;
}

.reservation-customer {
  margin-left: 1rem;
}

.customer-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.customer-email {
  font-size: 0.75rem;
  color: #64748b;
}

.no-reservations {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #64748b;
}

.no-reservations-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

/* Progress Chart */
.period-select {
  width: 150px;
}

.chart-container {
  padding: 1rem 0;
}

.progress-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.progress-circle {
  position: relative;
  width: 200px;
  height: 200px;
}

.progress-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.progress-value .value {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.progress-value .label {
  font-size: 0.875rem;
  color: #64748b;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.stat-item {
  text-align: center;
}

.stat-item .stat-value {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.stat-item .stat-label {
  font-size: 0.75rem;
  color: #64748b;
}

.green {
  color: #22c55e;
}

.yellow {
  color: #eab308;
}

.red {
  color: #ef4444;
}

/* Recent Blogs */
.blogs-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.blog-item {
  display: flex;
  gap: 1rem;
}

.blog-image-container {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.blog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.blog-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.blog-date {
  font-size: 0.75rem;
  color: #64748b;
}

.blog-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.blog-excerpt {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
}

.author-name {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Vehicle Carousel */
.carousel-controls {
  display: flex;
  gap: 0.5rem;
}

.carousel-container {
  position: relative;
  overflow: hidden;
  margin: 0 -1rem;
  padding: 0 1rem;
}

.carousel-track {
  display: flex;
  transition: transform 0.3s ease;
}

.carousel-slide {
  flex-shrink: 0;
  padding: 0.5rem;
}

.vehicle-card {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: white;
  height: 100%;
}

.vehicle-image-container {
  position: relative;
  height: 160px;
}

.vehicle-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vehicle-status {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.vehicle-content {
  padding: 1rem;
}

.vehicle-details {
  display: flex;
  justify-content: space-between;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
}

.detail-icon {
  color: #3b82f6;
}

/* Card Footer */
.card-footer {
  display: flex;
  justify-content: center;
}
</style>
