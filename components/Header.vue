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

// Tree items for mobile menu
const treeItems = [
  {
    label: t("home.reserve a car"),
    icon: "lucide:calendar-clock",
    value: "reserve",
    command: () => {
      console.log("hello");
    }
  },
  {
    label: t("home.language"),
    icon: "lucide:globe",
    value: "language",
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
    value: "menu",
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

const items = [
  {
    label: t("home.reserve a car"),
    icon: "lucide:calendar-clock",
    command: () => {
      console.log("hello");
    },
  },
  {
    label: t("home.language"),
    icon: "lucide:globe",
    children: [
      {
        label: "日本語",
        icon: "lucide:home",
        command: () => {
          console.log("menu2");
        },
      },
      {
        label: "한국어",
        icon: "lucide:home",
        command: () => {
          console.log("menu1");
        },
      },
      {
        label: "中文繁體（廣東話）",
        icon: "lucide:home",
        command: () => {
          console.log("menu1");
        },
      },
    ],
  },
  {
    label: t("home.menu"),
    icon: "lucide:milestone",
    children: [
      {
        label: t("home.Fees"),
        icon: "lucide:home",
        command: () => {
          console.log("menu1");
        },
      },
      {
        label: t("home.Guid"),
        icon: "lucide:home",
        command: () => {
          console.log("menu2");
        },
      },
      {
        label: t("home.Company info"),
        icon: "lucide:home",
        command: () => {
          console.log("menu2");
        },
      },
      {
        label: t("home.Terms and Conditions of Lease"),
        icon: "lucide:home",
        command: () => {
          console.log("menu2");
        },
      },
      {
        label: t("home.Privacy Policy"),
        icon: "lucide:home",
        command: () => {
          console.log("menu2");
        },
      },
      {
        label: t("home.Articles"),
        icon: "lucide:home",
        command: () => {
          console.log("menu2");
        },
      },
    ],
  }
];
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
  <UModal 
    v-model="isMobileMenuOpen"
    :ui="{
      width: 'sm:max-w-md',
      height: 'sm:max-h-[90vh]',
      container: 'flex flex-col bg-white dark:bg-gray-900 rounded-lg',
      overlay: {
        base: 'fixed inset-0 bg-gray-900/75'
      },
      base: 'fixed inset-0 z-50 flex items-center justify-center'
    }"
  >
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
          :default-expanded="['reserve', 'language', 'menu']"
          color="gray"
        />
      </div>
    </div>
  </UModal>
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
</style>
