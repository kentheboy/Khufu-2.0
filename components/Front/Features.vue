<script setup>
import FeatureCard from "./FeatureCard.vue";
const { t } = useI18n();
</script>
<template>
  <UContainer class="mt-[150px] text-center max-w-5xl mx-auto text-left">
    <h3 class="font-bold">
      {{ t("home.feature") }}
    </h3>
    <h1 class="text-3xl font-bold">FEATURE</h1>
    <UContainer
      class="my-18 text-center max-w-5xl mx-auto flex flex-row justify-center"
    >
      <FeatureCard
        :mainStatement="t('home.with no complicated procedures')+'<br/>'+t('home.depart immediately')"
        :description="t('home.required documents are sent by e-mail')+'<br/>'+t('home.The procedure is easy to complete')"
      >
      </FeatureCard>
    </UContainer>
  </UContainer>
</template>
