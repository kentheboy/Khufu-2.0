export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/admin/index') {
    return navigateTo('/admin', { replace: true })
  }
  
  if (to.path === '/admin/dashboard') {
    return navigateTo('/admin', { replace: true })
  }
})
