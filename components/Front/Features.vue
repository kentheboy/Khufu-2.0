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
      class="my-18 text-center max-w-5xl mx-auto flex flex-col justify-center"
    >
      <FeatureCard
        :mainStatement="t('home.with no complicated procedures')+'<br/>'+t('home.depart immediately')"
        :description="t('home.required documents are sent by e-mail')+'<br/>'+t('home.The procedure is easy to complete')"
        number="01"
      >
      </FeatureCard>
      <FeatureCard
        :mainStatement="t('home.located close to the highway')+'<br/>'+t('home.which is less crowded, so its easy to get around')"
        :description="t('home.to uncrowded interchanges')+'<br/>'+t('home.shortest possible access')"
        number="02"
      >
      </FeatureCard>
      <FeatureCard
        :mainStatement="t('home.pay smartly!')"
        :description="t('home.indemnity coverage included')+'<br/>'+t('home.with no extra options,')+'<br/>'+t('home.with no redundant coverages')"
        number="03"
      >
      </FeatureCard>
    </UContainer>
  </UContainer>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 980px) {
  .container {
    max-width: 95%;
  }
}

@media screen and (max-width: 480px) {
  .container {
    max-width: 90%;
  }
}
</style>
