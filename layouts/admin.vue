<template>
  <div class="admin-layout min-h-screen flex flex-col">
    <AdminHeader />
    <main class="flex-1 pb-16">
      <slot />
    </main>
    <AdminFooter />
  </div>
</template>
