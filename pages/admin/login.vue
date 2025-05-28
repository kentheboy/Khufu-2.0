<script setup>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const { t } = useI18n();
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref('');
const emailError = ref('');
const passwordError = ref('');

// Form validation
const validateEmail = () => {
  if (!email.value) {
    emailError.value = t('login.email_required');
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.value = t('login.email_invalid');
    return false;
  }
  
  emailError.value = '';
  return true;
};

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = t('login.password_required');
    return false;
  }
  
  passwordError.value = '';
  return true;
};

const handleLogin = async () => {
  // Reset errors
  error.value = '';
  emailError.value = '';
  passwordError.value = '';
  
  // Validate form
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  
  if (!isEmailValid || !isPasswordValid) {
    return;
  }
  
  isLoading.value = true;
  
  try {
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random success/failure
    const success = Math.random() > 0.3;
    
    if (!success) {
      throw new Error();
    }
    
    // Redirect to admin dashboard or handle success
    // navigateTo('/admin/dashboard');
  } catch (err) {
    error.value = err.message || t('login.login_failed');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <NuxtLayout name="admin">
    <div class="login-page min-h-screen flex items-center justify-center">
      <div class="login-container bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">{{ t('login.welcome_back') }}</h1>
          <p class="text-gray-600 mt-2">{{ t('login.lets_see') }}</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded-md text-sm mb-4">
            {{ error }}
          </div>
          
          <UFormGroup :label="t('login.email')" :error="emailError">
            <UInput
              v-model="email"
              type="email"
              :placeholder="t('login.email_placeholder')"
              autocomplete="email"
              @blur="validateEmail"
              class="w-full"
              :ui="{ 
                base: 'relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                focus: 'ring-primary focus:ring-primary',
                error: 'ring-red-500 focus:ring-red-500'
              }"
            />
          </UFormGroup>
          
          <UFormGroup :label="t('login.password')" :error="passwordError">
            <UInput
              v-model="password"
              type="password"
              :placeholder="t('login.password_placeholder')"
              autocomplete="current-password"
              @blur="validatePassword"
              class="w-full"
              :ui="{ 
                base: 'relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                focus: 'ring-primary focus:ring-primary',
                error: 'ring-red-500 focus:ring-red-500'
              }"
            />
          </UFormGroup>
          
          <UButton
            type="submit"
            color="primary"
            variant="solid"
            :loading="isLoading"
            block
            class="w-full py-3 mt-8"
            :ui="{
              base: 'focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium rounded-md',
              padding: 'py-3 px-4',
              size: {
                xl: 'text-base'
              },
              color: {
                primary: {
                  solid: 'bg-primary hover:bg-primary-dark text-white focus:ring-primary'
                }
              }
            }"
          >
            {{ t('login.login_button') }}
          </UButton>
        </form>
        
        <div class="mt-10 text-center">
          <img src="/images/main_logo_sm.png" alt="Khufu 2.0" class="h-10 mx-auto" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.login-page {
  background-color: var(--color-aliceblue);
  padding-top: 2rem;
  padding-bottom: 2rem;
  
  @media screen and (max-width: 980px) {
    padding: 1.5rem;
    padding-top: 6.5rem; /* Account for fixed header on mobile */
  }
  
  @media screen and (max-width: 480px) {
    padding: 1rem;
    padding-top: 5.5rem; /* Account for smaller fixed header on mobile */
  }
}

.login-container {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  
  @media screen and (max-width: 980px) {
    max-width: 90%;
  }
  
  @media screen and (max-width: 480px) {
    padding: 1.5rem;
    max-width: 100%;
  }
}
</style>
