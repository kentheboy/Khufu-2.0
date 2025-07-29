<script setup>
import { ref } from 'vue'

// Mock blog data
const blogs = ref([
  {
    id: 1,
    title: 'Top 10 Electric Vehicles for 2025',
    category: 'Electric',
    date: 'May 25, 2025',
    image: '/assets/admin/image/j529_2_18.png',
    excerpt: 'Discover the most anticipated electric vehicles coming to market in 2025, featuring cutting-edge technology and impressive range capabilities.'
  },
  {
    id: 2,
    title: 'The Future of Autonomous Driving',
    category: 'Technology',
    date: 'May 20, 2025',
    image: '/assets/admin/image/j529_2_18.png',
    excerpt: 'Explore how autonomous driving technology is evolving and what to expect in the next generation of self-driving vehicles.'
  },
  {
    id: 3,
    title: 'Best Family SUVs of the Year',
    category: 'SUV',
    date: 'May 15, 2025',
    image: '/assets/admin/image/j529_2_18.png',
    excerpt: 'Our comprehensive guide to the most family-friendly SUVs on the market, with ratings for safety, comfort, and value.'
  }
])
</script>

<template>
  <UCard class="recent-blogs">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium">Recent Blog Posts</h3>
        <UButton icon="i-lucide-more-horizontal" color="gray" variant="ghost" />
      </div>
    </template>
    
    <div class="space-y-4">
      <div v-for="blog in blogs" :key="blog.id" class="blog-item">
        <div class="flex">
          <img :src="blog.image" alt="Blog" class="w-16 h-16 object-cover rounded mr-4" />
          <div class="flex-1">
            <div class="flex items-center">
              <span class="text-sm font-medium">{{ blog.category }}</span>
              <span class="text-xs text-gray-500 ml-2">{{ blog.date }}</span>
            </div>
            <h4 class="font-medium mt-1">{{ blog.title }}</h4>
            <p class="text-sm text-gray-600 line-clamp-2">{{ blog.excerpt }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <template #footer>
      <div class="text-center">
        <UButton to="/admin/blogs" variant="ghost" trailing-icon="i-lucide-arrow-right">
          View All Blog Posts
        </UButton>
      </div>
    </template>
  </UCard>
</template>


<style lang="scss" scoped>
.recent-blogs {
  height: 100%;
  
  .blog-item {
    padding: 0.75rem;
    border-radius: 0.375rem;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>
