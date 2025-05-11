<script setup>
const { t } = useI18n();
import { CalendarDate } from '@internationalized/date'

const imageImports = import.meta.glob("@/public/images/hero/*.{jpg,png}", {
  eager: true,
  import: "default",
});
const replaceInArray = (arr, searchValue, replaceValue) => {
  return arr.map((item) => item.replace(searchValue, replaceValue));
};

const images = replaceInArray(Object.values(imageImports), "/_nuxt/public", "");

let date = ref([
  {
    start: null,
    end: null,
  },
]);
const getTomorrowDate = () => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  return tomorrow
}
const tomorrowDate = getTomorrowDate()
const minDate = new CalendarDate(tomorrowDate.getFullYear(), tomorrowDate.getMonth() + 1, tomorrowDate.getDate());
console.log(minDate);

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
    <Section title="SCHEDULE" :subtitle="t('home.Search by dates')">
      <UCalendar range v-model="date" :min-value="minDate"/>
      <!-- <UCalendar range v-model="date"/> -->
    </Section>
  </div>
</template>
