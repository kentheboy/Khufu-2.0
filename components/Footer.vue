<script setup>
</script>
<template>
  <footer class="footer w-max">
    <div
      class="footerChild flex justify-between h-full items-center w-9/10 mx-auto"
    >
      <div class="sites">
        <div class="logo-container">
          <img alt="" src="/images/main_logo_sm.png" />
        </div>
        <div>
          <a href="/company">{{ $t("home.Company info") }}</a>
          <a href="/terms">{{ $t("home.Terms and Conditions of Lease") }}</a>
          <a href="/files/privacy_policy.pdf" target="_blank"
            >{{ $t("home.Privacy Policy") }} <i class="pi pi-external-link"></i
          ></a>
          <a href="https://column.class-rental-car.com/" target="_blank"
            >{{ $t("home.Articles") }} <i class="pi pi-external-link"></i
          ></a>
        </div>
      </div>
      <div class="footer__content--postal-code">
        {{ $t("home.67 Nagado, Toyomigusuku City, Okinawa 901-0203, Japan") }}
      </div>
      <div class="footer__content--contact">
        <div class="sns-links">
          <a
            class="instagram"
            href="https://www.instagram.com/class_rentalcar"
            target="_blank"
          >
            <i class="pi pi-instagram"></i>
          </a>
          <a class="line" href="https://lin.ee/w5vv7ng" target="_blank">
            <img src="/images/icons/LINE_Brand_icon.png" alt="" class="h-32px"/>
          </a>
        </div>
        <div class="hours">
          {{ $t("home.Business hours") }} 09:00-18:00
        </div>
        <a href="tel:098-996-7266">098-996-7266</a>
      </div>
    </div>
  </footer>
</template>
<style lang="scss">
.footer {
  height: 7.6rem;
  background-color: var(--ui-primary);
}
</style>
