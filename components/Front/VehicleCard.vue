<script setup>
</script>
<template>
  <UCard variant="subtle" :ui="{ body: 'p-1 sm:p-0' }">
    <div class="p-0">
      <img src="/images/car-images/ALPHARD7/1.jpg" class="rounded-t-lg" />
    </div>
    <div class="p-4">
      <h3 class="text-xl font-semibold">ALPHARD</h3>
      <p class="text-sm">在庫7台</p>
    </div>

    <template #footer>
      <div
        class="flex items-center justify-center gap-1 text-sm"
      >
        <UIcon name="i-lucide-users-round" class="size-5" />
        <span>7</span>
      </div>
    </template>
  </UCard>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 750px) {
  :deep(.u-card) {
    width: 290px;
    height: 326.24px;
    
    .p-0 img {
      height: 160px;
      object-fit: cover;
    }
  }
}
</style>
