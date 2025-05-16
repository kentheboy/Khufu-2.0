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


<style>
</style>
