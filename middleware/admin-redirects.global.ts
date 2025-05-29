import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/admin/index') {
    return navigateTo('/admin', { redirectCode: 301 })
  }
  
  if (to.path === '/admin/dashboard') {
    return navigateTo('/admin', { redirectCode: 301 })
  }
})
