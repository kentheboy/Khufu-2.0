<template>
  <div class="admin-dashboard p-6">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <AdminDashboardStatsCard 
        title="Total Vehicles" 
        value="24" 
        subValue="/30" 
        icon="i-lucide-car"
        iconBgColor="bg-blue-100"
        iconColor="text-blue-500"
        trend="up"
        trendValue="2 new vehicles this month"
      />
      <AdminDashboardStatsCard 
        title="Reservations" 
        value="18" 
        subValue="this week" 
        icon="i-lucide-calendar"
        iconBgColor="bg-indigo-100"
        iconColor="text-indigo-500"
        trend="up"
        trendValue="10% increase from last week"
      />
      <AdminDashboardStatsCard 
        title="Blog Posts" 
        value="42" 
        subValue="total" 
        icon="i-lucide-file-text"
        iconBgColor="bg-purple-100"
        iconColor="text-purple-500"
        trend="up"
        trendValue="3 new posts this month"
      />
      <AdminDashboardStatsCard 
        title="Active Users" 
        value="156" 
        subValue="this month" 
        icon="i-lucide-users"
        iconBgColor="bg-green-100"
        iconColor="text-green-500"
        trend="up"
        trendValue="5% increase from last month"
      />
    </div>
    
    <!-- Weekly Reservations and Progress Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <AdminDashboardWeeklyReservations />
      <AdminDashboardProgressChart />
    </div>
    
    <!-- Recent Blog Posts and Vehicle Carousel -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AdminDashboardRecentBlogs />
      <AdminDashboardVehicleCarousel />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Import dashboard components
import AdminDashboardStatsCard from '~/components/Admin/Dashboard/StatsCard.vue'
import AdminDashboardWeeklyReservations from '~/components/Admin/Dashboard/WeeklyReservations.vue'
import AdminDashboardProgressChart from '~/components/Admin/Dashboard/ProgressChart.vue'
import AdminDashboardRecentBlogs from '~/components/Admin/Dashboard/RecentBlogs.vue'
import AdminDashboardVehicleCarousel from '~/components/Admin/Dashboard/VehicleCarousel.vue'
</script>

<style lang="scss" scoped>
.admin-dashboard {
  max-width: 1400px;
  margin: 0 auto;
  
  @media screen and (max-width: 980px) {
    padding: 1rem;
    padding-top: 7rem; /* Account for fixed header on mobile */
  }
  
  @media screen and (max-width: 480px) {
    padding: 0.75rem;
    padding-top: 6rem; /* Account for smaller fixed header on mobile */
  }
}
</style>
