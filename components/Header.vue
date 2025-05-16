<script setup>
const { t } = useI18n();
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
      <UNavigationMenu :items="items" class="justify-end" />
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
