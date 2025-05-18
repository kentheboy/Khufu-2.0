<script setup>
const { t } = useI18n();
const isMobileMenuOpen = ref(false);
const isSmallScreen = ref(false);

// Check for small screen on mount and window resize
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 750;
};

// Single source of menu data
const menuData = [
  {
    label: t("home.reserve a car"),
    icon: "lucide:calendar-clock",
    id: "reserve",
    command: () => {
      console.log("hello");
    }
  },
  {
    label: t("home.language"),
    icon: "lucide:globe",
    id: "language",
    children: [
      {
        label: "日本語",
        icon: "lucide:home",
        command: () => {
          console.log("menu2");
        }
      },
      {
        label: "한국어",
        icon: "lucide:home",
        command: () => {
          console.log("menu1");
        }
      },
      {
        label: "中文繁體（廣東話）",
        icon: "lucide:home",
        command: () => {
          console.log("menu1");
        }
      }
    ]
  },
  {
    label: t("home.menu"),
    icon: "lucide:milestone",
    id: "menu",
    children: [
      {
        label: t("home.Fees"),
        icon: "lucide:home",
        command: () => {
          console.log("menu1");
        }
      },
      {
        label: t("home.Guid"),
        icon: "lucide:home",
        command: () => {
          console.log("menu2");
        }
      },
      {
        label: t("home.Company info"),
        icon: "lucide:home",
        command: () => {
          console.log("menu2");
        }
      },
      {
        label: t("home.Terms and Conditions of Lease"),
        icon: "lucide:home",
        command: () => {
          console.log("menu2");
        }
      },
      {
        label: t("home.Privacy Policy"),
        icon: "lucide:home",
        command: () => {
          console.log("menu2");
        }
      },
      {
        label: t("home.Articles"),
        icon: "lucide:home",
        command: () => {
          console.log("menu2");
        }
      }
    ]
  }
];

// Computed properties to derive menu items for different components
const items = computed(() => {
  return menuData.map(item => {
    const newItem = { ...item };
    delete newItem.id;
    if (newItem.children) {
      newItem.children = newItem.children.map(child => ({ ...child }));
    }
    return newItem;
  });
});

const treeItems = computed(() => {
  return menuData.map(item => {
    const newItem = { ...item };
    if (newItem.id) {
      newItem.value = newItem.id;
      delete newItem.id;
    }
    if (newItem.children) {
      newItem.children = newItem.children.map(child => ({ ...child }));
    }
    return newItem;
  });
});
</script>
<template>
  <header class="header">
    <div
      class="headerChild flex justify-between h-full items-center w-9/10 mx-auto"
    >
      <a class="block" href="/">
        <img class="logo" alt="" src="/images/main_logo.png" />
      </a>
      <!-- Desktop navigation -->
      <UNavigationMenu v-if="!isSmallScreen" :items="items" class="justify-end" />
      
      <!-- Mobile hamburger menu -->
      <div v-else class="flex items-center">
        <UButton
          icon="i-heroicons-bars-3"
          color="white"
          variant="ghost"
          @click="isMobileMenuOpen = true"
          aria-label="Toggle menu"
        />
      </div>
    </div>
  </header>
  
  <!-- Mobile menu modal - placed outside header to avoid nesting issues -->
  <Transition name="modal-fade">
    <div v-if="isSmallScreen && isMobileMenuOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-gray-900/75" @click="isMobileMenuOpen = false"></div>
      <div class="relative z-10 bg-white dark:bg-gray-900 rounded-lg sm:max-w-md w-full max-h-[90vh] overflow-auto">
        <div class="p-4 w-full">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium">{{ t("home.menu") }}</h3>
            <UButton
              icon="i-heroicons-x-mark"
              color="gray"
              variant="ghost"
              @click="isMobileMenuOpen = false"
              aria-label="Close menu"
            />
          </div>
          <div class="mobile-menu">
            <UTree
              :items="treeItems"
              color="gray"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss">
.header {
  height: 7.6rem;
  background-color: var(--ui-primary);
  nav[aria-label="Main"] ul.isolate span{
    color: var(--font-contrast-style);
  }
  
  .mobile-menu {
    max-height: 70vh;
    overflow-y: auto;
    
    :deep(.u-tree) {
      width: 100%;
    }
  }
  
  @media screen and (max-width: 980px) {
    height: 6.5rem;
    
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
</style>
