<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <UIcon name="i-heroicons-fire" class="logo-icon" />
        <h1 class="login-title">Khufu Admin</h1>
      </div>
      
      <form class="login-form" @submit.prevent="handleLogin">
        <UFormGroup label="Email" name="email">
          <UInput
            v-model="email"
            placeholder="Enter your email"
            type="email"
            required
          />
        </UFormGroup>
        
        <UFormGroup label="Password" name="password">
          <UInput
            v-model="password"
            placeholder="Enter your password"
            type="password"
            required
          />
        </UFormGroup>
        
        <div class="form-options">
          <UCheckbox v-model="rememberMe" label="Remember me" />
          <UButton variant="link" to="#" color="primary">Forgot password?</UButton>
        </div>
        
        <UButton
          type="submit"
          color="primary"
          block
          :loading="isLoading"
        >
          Login
        </UButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)

const handleLogin = () => {
  isLoading.value = true
  
  // Simulate login process
  setTimeout(() => {
    isLoading.value = false
    router.push('/admin')
  }, 1500)
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f1f5f9;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.logo-icon {
  font-size: 2.5rem;
  color: #f97316;
  margin-bottom: 0.5rem;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
