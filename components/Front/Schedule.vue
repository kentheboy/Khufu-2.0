<script setup>
const { t } = useI18n();
import { CalendarDate } from '@internationalized/date'

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
</script>
<template>
    <UCalendar range v-model="date" :min-value="minDate"/>
    <UButton icon="i-lucide-search" size="md" class="mt-10 contrast" variant="solid">{{ t('home.Search availability') }}</UButton>
</template>
<style scoped lang="scss">

</style>
