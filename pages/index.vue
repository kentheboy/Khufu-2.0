<script setup>
const { t } = useI18n();

const imageImports = import.meta.glob("@/public/images/hero/*.{jpg,png}", {
  eager: true,
  import: "default",
});
const replaceInArray = (arr, searchValue, replaceValue) => {
  return arr.map((item) => item.replace(searchValue, replaceValue));
};

const images = replaceInArray(Object.values(imageImports), "/_nuxt/public", "");


</script>
<template>
  <div class="home">
    <UContainer class="mb-24 mx-auto">
      <UCarousel
        v-slot="{ item }"
        loop
        :autoplay="{ delay: 3000 }"
        fade
        dots
        :items="images"
        :ui="{ item: 'flex justify-center items-center h-[400px]' }"
      >
        <img :src="item" class="max-h-full max-w-full object-contain rounded-lg" />
      </UCarousel>
    </UContainer>
    <ScrollToTop />
    <Section title="SCHEDULE" :subtitle="t('home.Search by dates')" :enableFadeIn="false">
      <FrontSchedule />
    </Section>
    <Section title="VEHICLE LIST" :subtitle="t('home.Car list')">
      <FrontVehicleList />
    </Section>
    <Section :enableFadeIn="false">
      <FrontFeatures />
    </Section>
  </div>
</template>
