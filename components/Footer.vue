<script setup>
const { t } = useI18n();
</script>
<template>
  <footer class="footer w-full">
    <div
      class="footerChild flex flex-row flex-wrap justify-between h-full items-center w-9/10 mx-auto pt-10 pb-10"
    >
      <a class="block basis-1/3 mb-5" href="/">
        <img class="logo" alt="" src="/images/main_logo_sm.png" />
      </a>
      <div class="basis-2/3">
        <ul class="flex gap-4 justify-end">
          <li>
            <ULink as="button" class="inline-flex items-center gap-1.5 contrast">
              <UIcon name="i-lucide-book-open" class="size-4" />
              {{ t("home.Company info") }}
            </ULink>
          </li>
          <li>
            <ULink as="button" class="inline-flex items-center gap-1.5 contrast">
              <UIcon name="i-lucide-book-open" class="size-4" />
              {{ t("home.Terms and Conditions of Lease") }}
            </ULink>
          </li>
          <li>
            <ULink as="button" class="inline-flex items-center gap-1.5 contrast">
              <UIcon name="i-lucide-book-open" class="size-4" />
              {{ t("home.Privacy Policy") }}
            </ULink>
          </li>
          <li>
            <ULink as="button" class="inline-flex items-center gap-1.5 contrast">
              <UIcon name="i-lucide-book-open" class="size-4" />
              {{ t("home.Articles") }}
            </ULink>
          </li>
        </ul>
      </div>
      <div class="basis-1/3 flex flex-col justify-end">
        <ULink as="button" class="inline-flex items-center gap-1.5 contrast">
          {{ t("home.67 Nagado, Toyomigusuku City, Okinawa 901-0203, Japan") }}
        </ULink>
        <ULink as="button" class="inline-flex items-center gap-1.5 contrast">
          {{ t("home.Business hours") }} 09:00-18:00
        </ULink>
        <ULink as="button" class="inline-flex items-center gap-1.5 contrast">
          <UIcon name="i-lucide-phone-call" class="size-4" />
          098-996-7266
        </ULink>
      </div>
      <div class="basis-2/3 flex justify-end">
        <ULink as="button" class="inline-flex items-center gap-1.5 contrast">
          <UIcon name="i-simple-icons:instagram" class="size-4" />
        </ULink>
        <ULink as="button" class="inline-flex items-center gap-1.5 contrast pl-3">
          <UIcon name="i-simple-icons:line" class="size-5" />
        </ULink>
      </div>
    </div>
  </footer>
</template>
<style lang="scss">
.footer {
  background-color: var(--ui-primary);
  
  @media screen and (max-width: 980px) {
    .footerChild {
      width: 95%;
      padding: 8px 0;
    }
    
    ul {
      flex-wrap: wrap;
    }
  }
  
  @media screen and (max-width: 480px) {
    .footerChild {
      width: 90%;
      flex-direction: column;
      align-items: flex-start;
      
      & > div {
        width: 100%;
        flex-basis: 100% !important;
        margin-bottom: 10px;
        
        &:last-child {
          justify-content: flex-start;
        }
      }
      
      ul {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 8px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
