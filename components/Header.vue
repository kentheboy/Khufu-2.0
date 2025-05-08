<script setup>
const { t } = useI18n();
const items = [
  {
    label: t('greetings.hello'),
    icon: 'i-lucide-book-open',
    command: () => {
      console.log('hello');
    },
  },
  {
    label: t('greetings.sorry'),
    icon: 'i-lucide-database',
    command: () => {
      console.log('sorry');
    },
  },
];
</script>
<template>
  <header class="header">
    <div class="headerChild flex justify-between h-full">
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
    background-color: var(--color-skyblue);
    overflow: hidden;
}
</style>
