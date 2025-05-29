<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="logo-container">
        <UIcon name="i-heroicons-fire" class="logo-icon" />
        <h1 class="logo-text">Khufu Admin</h1>
      </div>
      
      <div class="menu-container">
        <UButton
          variant="ghost"
          class="menu-item"
          to="/admin/index"
          block
        >
          <UIcon name="i-heroicons-home" class="menu-icon" />
          <span>Dashboard</span>
        </UButton>
        
        <UButton
          variant="ghost"
          class="menu-item"
          to="/admin/products"
          block
        >
          <UIcon name="i-heroicons-truck" class="menu-icon" />
          <span>Vehicles</span>
        </UButton>
        
        <UButton
          variant="ghost"
          class="menu-item"
          to="/admin/schedules"
          block
        >
          <UIcon name="i-heroicons-calendar" class="menu-icon" />
          <span>Reservations</span>
        </UButton>
        
        <UButton
          variant="ghost"
          class="menu-item"
          to="/admin/blogs"
          block
        >
          <UIcon name="i-heroicons-document-text" class="menu-icon" />
          <span>Blogs</span>
        </UButton>
        
        <UButton
          variant="ghost"
          class="menu-item"
          to="/admin/settings"
          block
        >
          <UIcon name="i-heroicons-cog-6-tooth" class="menu-icon" />
          <span>Settings</span>
        </UButton>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="main-content">
      <!-- Header -->
      <div class="header">
        <div class="search-container">
          <UInput
            placeholder="Search..."
            icon="i-heroicons-magnifying-glass"
            class="search-input"
          />
        </div>
        
        <div class="user-container">
          <UDropdown :items="userMenuItems">
            <UButton color="gray" variant="ghost">
              <UAvatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                alt="User"
                size="sm"
              />
              <span class="ml-2">Admin User</span>
              <UIcon name="i-heroicons-chevron-down" class="ml-1" />
            </UButton>
          </UDropdown>
        </div>
      </div>
      
      <!-- Page Content -->
      <div class="page-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userMenuItems = [
  [
    {
      label: 'Profile',
      icon: 'i-heroicons-user',
      click: () => {}
    },
    {
      label: 'Settings',
      icon: 'i-heroicons-cog-6-tooth',
      to: '/admin/settings'
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-heroicons-arrow-right-on-rectangle',
      click: () => {}
    }
  ]
]
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #1e293b;
  color: white;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.logo-container {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.logo-icon {
  font-size: 1.5rem;
  color: #f97316;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 0.5rem;
}

.menu-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  color: #e2e8f0;
  text-align: left;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-icon {
  margin-right: 0.75rem;
}

.main-content {
  flex: 1;
  background-color: #f1f5f9;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: white;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
}

.search-container {
  width: 300px;
}

.page-content {
  padding: 1.5rem;
  flex: 1;
}
</style>
