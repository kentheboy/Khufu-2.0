<script setup>
// This file serves as the admin dashboard page
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import draggable from "vuedraggable";

// Dashboard sections configuration
const defaultSections = ref([
  { id: "stats", name: "Statistics Cards", component: "stats" },
  {
    id: "reservations-progress",
    name: "Reservations & Progress",
    component: "reservations-progress",
  },
  { id: "blogs-vehicles", name: "Blogs & Vehicles", component: "blogs-vehicles" },
]);

const dashboardSections = ref([...defaultSections.value]);
const isDragging = ref(false);

// Load saved layout from localStorage
onMounted(() => {
  if (process.client) {
    const savedLayout = localStorage.getItem("admin-dashboard-layout");
    if (savedLayout) {
      try {
        dashboardSections.value = JSON.parse(savedLayout);
      } catch (e) {
        console.warn("Failed to load saved dashboard layout");
      }
    }
  }
});

// Save layout changes to localStorage
watch(
  dashboardSections,
  (newSections) => {
    if (process.client) {
      localStorage.setItem("admin-dashboard-layout", JSON.stringify(newSections));
    }
  },
  { deep: true }
);

const onDragStart = () => {
  isDragging.value = true;
};

const onDragEnd = () => {
  isDragging.value = false;
};

const resetLayout = () => {
  dashboardSections.value = [...defaultSections.value];
  if (process.client) {
    localStorage.removeItem("admin-dashboard-layout");
  }
};
</script>

<template>
  <div class="admin-dashboard p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <UButton
        icon="i-lucide-layout-dashboard"
        variant="soft"
        size="sm"
        @click="resetLayout"
      >
        Reset Layout
      </UButton>
    </div>

    <draggable
      v-model="dashboardSections"
      group="dashboard"
      @start="onDragStart"
      @end="onDragEnd"
      item-key="id"
      class="space-y-8"
      :class="{ dragging: isDragging }"
    >
      <template #item="{ element }">
        <div
          class="dashboard-section transition-all duration-200"
          :class="{ 'dragging-item': isDragging }"
        >
          <!-- Stats Cards Section -->
          <div
            v-if="element.component === 'stats'"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
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

          <!-- Weekly Reservations and Progress Chart Section -->
          <div
            v-else-if="element.component === 'reservations-progress'"
            class="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <AdminDashboardWeeklyReservations />
            <AdminDashboardProgressChart />
          </div>

          <!-- Recent Blog Posts and Vehicle Carousel Section -->
          <div
            v-else-if="element.component === 'blogs-vehicles'"
            class="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <AdminDashboardRecentBlogs />
            <AdminDashboardVehicleCarousel />
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style lang="scss" scoped>
.admin-dashboard {
  max-width: 1400px;
  margin: 0 auto;

  .dashboard-section {
    cursor: grab;
    border: 2px solid transparent;
    border-radius: 0.5rem;
    padding: 0.5rem;

    &:hover {
      border-color: #e5e7eb;
    }

    &.dragging-item {
      cursor: grabbing;
      border-color: #3b82f6;
      background-color: rgba(59, 130, 246, 0.1);
    }
  }

  &.dragging {
    .dashboard-section:not(.dragging-item) {
      opacity: 0.7;
    }
  }

  @media screen and (max-width: 980px) {
    padding: 1rem;
    padding-top: 7rem; /* Account for fixed header on mobile */
    padding-bottom: 8rem; /* Account for fixed footer */
  }

  @media screen and (max-width: 480px) {
    padding: 0.75rem;
    padding-top: 6rem; /* Account for smaller fixed header on mobile */
    padding-bottom: 7rem; /* Account for fixed footer */
  }
}
</style>
