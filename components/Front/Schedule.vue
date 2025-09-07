<script setup>
const { t } = useI18n();
import { CalendarDate } from "@internationalized/date";

let date = ref([
  {
    start: null,
    end: null,
  },
]);

const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow;
};

const tomorrowDate = getTomorrowDate();
const minDate = new CalendarDate(
  tomorrowDate.getFullYear(),
  tomorrowDate.getMonth() + 1,
  tomorrowDate.getDate()
);

const { results, loading, error, queryDatabase } = useNotionQuery()

const handleSearch = async () => {
  if (!date.value[0]?.start) {
    return
  }

  await queryDatabase(date.value)
}

const getPageTitle = (page) => {
  const titleProperty = Object.values(page.properties).find(
    prop => prop.type === 'title'
  )

  if (titleProperty && titleProperty.title.length > 0) {
    return titleProperty.title[0].plain_text
  }

  return 'Untitled'
}

const getStartDate = (page) => {
  const startDateProp = page.properties.startDate
  if (startDateProp && startDateProp.date) {
    return startDateProp.date.start || 'No date'
  }
  return 'No date'
}
</script>
<template>
  <UContainer class="my-18 mx-auto text-center max-w-lg">
    <UCalendar range v-model="date" :min-value="minDate" />

    <UButton
      icon="i-lucide-search"
      size="md"
      class="mt-10 contrast"
      variant="solid"
      :loading="loading"
      :disabled="!date[0]?.start"
      @click="handleSearch"
    >
      {{ loading ? t("home.Searching...") : t("home.Search availability") }}
    </UButton>

    <UAlert
      v-if="error"
      color="red"
      variant="soft"
      class="mt-4"
      :title="t('home.Error')"
      :description="error"
    />

    <div v-if="results.length > 0" class="mt-8">
      <h3 class="text-lg font-semibold mb-4">
        {{ t("home.Search Results") }} ({{ results.length }})
      </h3>

      <div class="space-y-4">
        <UCard
          v-for="item in results"
          :key="item.id"
          class="text-left"
        >
          <template #header>
            <h4 class="font-medium">{{ getPageTitle(item) }}</h4>
          </template>

          <div class="space-y-2 text-sm text-gray-600">
            <p><strong>{{ t("home.Start Date") }}:</strong> {{ getStartDate(item) }}</p>
            <p><strong>{{ t("home.Created") }}:</strong> {{ new Date(item.created_time).toLocaleDateString() }}</p>
          </div>
        </UCard>
      </div>
    </div>

    <div v-else-if="!loading && results.length === 0 && !error" class="mt-8">
      <p class="text-gray-500">{{ t("home.No results found") }}</p>
    </div>
  </UContainer>
</template>
<style scoped lang="scss">
</style>
