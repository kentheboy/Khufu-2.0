<script setup>
import { watch, ref, computed, onMounted, onUnmounted } from 'vue'
const { t } = useI18n();
const isMobileMenuOpen = ref(false);
const isSmallScreen = ref(false);
const isLoggedIn = ref(false); // This would be replaced with actual auth state

// Check for small screen on mount and window resize
onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
  
  // For demo purposes - in a real app, this would be from auth service
  // Check if user is on login page or already logged in
  const route = useRoute();
  isLoggedIn.value = route.path !== '/admin/login';
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 750;
};

// Admin menu data
const menuData = [
  {
    label: "Schedules",
    icon: "lucide:calendar",
    id: "schedules",
    command: () => {
      console.log("schedules");
    },
  },
  {
    label: "Vehicles",
    icon: "lucide:car",
    id: "vehicles",
    command: () => {
      console.log("vehicles");
    },
  },
  {
    label: "Blog",
    icon: "lucide:file-text",
    id: "blog",
    command: () => {
      console.log("blog");
    },
  },
  {
    label: t("home.language"),
    icon: "lucide:globe",
    id: "language",
    children: [
      {
        label: "日本語",
        icon: "lucide:flag",
        command: () => {
          console.log("ja");
        },
      },
      {
        label: "English",
        icon: "lucide:flag",
        command: () => {
          console.log("en");
        },
      },
      {
        label: "한국어",
        icon: "lucide:flag",
        command: () => {
          console.log("ko");
        },
      },
      {
        label: "中文繁體（廣東話）",
        icon: "lucide:flag",
        command: () => {
          console.log("zh-yue");
        },
      },
    ],
  },
];

// Computed properties to derive menu items for different components
const items = computed(() => {
  if (!isLoggedIn.value) return []; // Hide menu items if not logged in
  
  return menuData.map((item) => {
    const newItem = { ...item };
    delete newItem.id;
    if (newItem.children) {
      newItem.children = newItem.children.map((child) => ({ ...child }));
    }
    return newItem;
  });
});

const treeItems = computed(() => {
  if (!isLoggedIn.value) return []; // Hide menu items if not logged in
  
  return menuData.map((item) => {
    const newItem = { ...item };
    if (newItem.id) {
      newItem.value = newItem.id;
      delete newItem.id;
    }
    if (newItem.children) {
      newItem.children = newItem.children.map((child) => ({ ...child }));
    }
    return newItem;
  });
});

watch(isMobileMenuOpen, (val) => {
  const method = val ? 'add' : 'remove';
  document.body.style.overflow = val ? 'hidden' : '';
  document.documentElement.style.overflow = val ? 'hidden' : '';
});
</script>

<template>
  <header class="admin-header">
    <div class="headerChild flex justify-between h-full items-center w-9/10 mx-auto">
      <a class="block" href="/admin">
        <img class="logo" alt="Admin" src="/images/main_logo.png" />
      </a>
      
      <!-- Desktop navigation - only shown when logged in -->
      <UNavigationMenu v-if="!isSmallScreen && isLoggedIn" :items="items" class="justify-end" />
      
      <!-- Login status indicator -->
      <div v-if="!isSmallScreen && !isLoggedIn" class="text-white">
        Admin Portal
      </div>

      <!-- Mobile hamburger menu - only shown when logged in -->
      <div v-if="isSmallScreen" class="flex items-center">
        <UButton
          v-if="isLoggedIn"
          icon="i-heroicons-bars-3"
          color="white"
          variant="ghost"
          @click="isMobileMenuOpen = true"
          aria-label="Toggle menu"
        />
        <div v-else class="text-white text-sm">
          Admin Portal
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile menu modal - placed outside header to avoid nesting issues -->
  <Transition name="modal-fade">
    <div
      v-if="isSmallScreen && isMobileMenuOpen && isLoggedIn"
      class="sp-menu-modal fixed inset-0 z-50 flex items-center justify-center"
    >
      <div class="fixed inset-0 bg-gray-900/75" @click="isMobileMenuOpen = false"></div>
      <div class="relative z-10 bg-white dark:bg-gray-900 rounded-lg sm:max-w-md w-full">
        <div class="p-4 w-full">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium">Admin Menu</h3>
            <UButton
              icon="i-heroicons-x-mark"
              color="gray"
              variant="ghost"
              @click="isMobileMenuOpen = false"
              aria-label="Close menu"
            />
          </div>
          <div
            class="mobile-menu-container"
            style="height: 400px; max-height: 400px; overflow: hidden"
          >
            <div
              class="mobile-menu"
              style="height: 100%; max-height: 400px; overflow-y: auto"
            >
              <UTree :items="treeItems" class="custom-tree-menu" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.admin-header {
  height: 7.6rem;
  background-color: #2c3e50; // Different color for admin header
  
  nav[aria-label="Main"] ul.isolate span {
    color: var(--font-contrast-style);
  }

  .mobile-menu-container {
    height: 400px;
    max-height: 400px !important;
    overflow: hidden !important;
    position: relative;
    box-sizing: border-box;
  }

  .mobile-menu {
    height: 100%;
    max-height: 400px !important;
    overflow-y: auto;
    position: absolute !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .custom-tree-menu {
    width: 100%;
  }

  @media screen and (max-width: 980px) {
    height: 6.5rem;
    position: fixed;
    top: 0;
    z-index: 10000;
    width: 100%;

    .headerChild {
      width: 95%;
    }
  }

  @media screen and (max-width: 480px) {
    height: 5.5rem;

    .headerChild {
      width: 90%;

      img.logo {
        max-width: 120px;
      }
    }
  }
}

/* Fade-in/out transition for menu modal */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.sp-menu-modal {
  z-index: 10001;
}
</style>
