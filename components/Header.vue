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
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="Toggle menu"
        />
        <UModal v-model="isMobileMenuOpen" :ui="{ width: 'w-full sm:w-1/2', height: 'h-auto' }">
          <div class="p-4">
            <div class="flex justify-end mb-4">
              <UButton
                icon="i-heroicons-x-mark"
                color="gray"
                variant="ghost"
                @click="isMobileMenuOpen = false"
                aria-label="Close menu"
              />
            </div>
            <nav class="flex flex-col gap-4">
              <UButton
                v-for="(item, index) in items"
                :key="index"
                :icon="item.icon"
                variant="ghost"
                block
                color="gray"
                @click="item.command && item.command()"
              >{{ item.label }}</UButton>
              <template v-for="(item, index) in items" :key="`submenu-${index}`">
                <template v-if="item.children">
                  <UButton 
                    v-for="(child, childIndex) in item.children" 
                    :key="`child-${childIndex}`"
                    :icon="child.icon"
                    variant="ghost"
                    block
                    color="gray"
                    class="ml-4"
                    @click="child.command && child.command()"
                  >{{ child.label }}</UButton>
                </template>
              </template>
            </nav>
          </div>
        </UModal>
      </div>
    </div>
  </header>
</template>
<style lang="scss">
.header {
  height: 7.6rem;
  background-color: var(--ui-primary);
  nav[aria-label="Main"] ul.isolate span{
    color: var(--font-contrast-style);
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
