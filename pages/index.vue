<script setup>
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
    <UContainer>
      <UCarousel
        v-slot="{ item }"
        loop
        :autoplay="{ delay: 2000 }"
        dots
        :items="images"
        :ui="{ item: 'flex justify-center items-center h-[400px]' }"
      >
        <img :src="item" class="max-h-full max-w-full object-contain rounded-lg" />
      </UCarousel>
    </UContainer>
  </div>
</template>
