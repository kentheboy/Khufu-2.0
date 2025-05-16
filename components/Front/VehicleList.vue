<script setup>
import VehicleCard from "./VehicleCard.vue";

const { t } = useI18n();
</script>

<template>
  <UContainer
    class="my-18 text-center max-w-5xl mx-auto flex justify-center gap-4"
  >
    <VehicleCard />
    <VehicleCard />
    <VehicleCard />
    <VehicleCard />
  </UContainer>
</template>


<style lang="scss">
@media screen and (max-width: 750px) {
  .my-18 {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
}
</style>
