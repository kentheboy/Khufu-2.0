<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        <a href="https://notion.so" target="_blank" class="hover:text-blue-600 transition-colors">
          Blog
        </a>
      </h1>
      <UButton 
        icon="i-lucide-plus" 
        color="primary" 
        @click="showNewPostModal = true"
      >
        New post
      </UButton>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div 
        v-for="post in paginatedPosts" 
        :key="post.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        @click="viewPost(post.id)"
      >
        <div class="aspect-video relative">
          <img 
            :src="post.coverImage" 
            :alt="post.title"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="p-4">
          <div class="flex items-center gap-2 mb-2">
            <UIcon name="i-lucide-file-text" class="text-gray-500" />
            <h3 class="font-medium text-gray-900 truncate">{{ post.title }}</h3>
          </div>
          <p class="text-sm text-gray-600 mb-2">{{ formatDate(post.createdDate) }}</p>
          <UBadge 
            :color="post.status === 1 ? 'green' : 'gray'"
            :label="post.status === 1 ? 'Published' : 'Draft'"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center">
      <div class="text-sm text-gray-500">
        Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, totalPosts) }} of {{ totalPosts }} posts
      </div>
      <UPagination
        v-model="currentPage"
        :page-count="pageSize"
        :total="totalPosts"
        :max="5"
      />
    </div>

    <UModal v-model="showNewPostModal">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-plus" />
            <h3 class="text-lg font-semibold">Create New Post</h3>
          </div>
        </template>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Post Title</label>
            <UInput
              v-model="newPostTitle"
              placeholder="Enter post title..."
              class="w-full"
            />
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              variant="outline"
              @click="cancelNewPost"
            >
              Cancel
            </UButton>
            <UButton
              color="primary"
              @click="createNewPost"
              :disabled="!newPostTitle.trim()"
            >
              Create
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'admin'
})

interface BlogPost {
  id: number
  title: string
  coverImage: string
  createdDate: string
  status: number
  description: string
}

const showNewPostModal = ref(false)
const newPostTitle = ref('')
const currentPage = ref(1)
const pageSize = 12

const blogPosts = ref<BlogPost[]>([
  {
    id: 1,
    title: "Getting Started with Vue.js 3",
    coverImage: "/images/car-images/sample/1.png",
    createdDate: "2024-01-15",
    status: 1,
    description: "A comprehensive guide to Vue.js 3 features and best practices."
  },
  {
    id: 2,
    title: "Modern CSS Grid Layouts",
    coverImage: "/images/car-images/sample/2.jpeg",
    createdDate: "2024-01-20",
    status: 1,
    description: "Learn how to create responsive layouts with CSS Grid."
  },
  {
    id: 3,
    title: "TypeScript Best Practices",
    coverImage: "/images/car-images/sample/3.jpeg",
    createdDate: "2024-01-25",
    status: 0,
    description: "Essential TypeScript patterns for better code quality."
  },
  {
    id: 4,
    title: "Nuxt.js Performance Optimization",
    coverImage: "/images/car-images/sample/4.jpeg",
    createdDate: "2024-02-01",
    status: 1,
    description: "Tips and tricks to optimize your Nuxt.js applications."
  },
  {
    id: 5,
    title: "Building Responsive Components",
    coverImage: "/images/car-images/sample/5.jpeg",
    createdDate: "2024-02-05",
    status: 1,
    description: "Create components that work across all device sizes."
  },
  {
    id: 6,
    title: "Advanced JavaScript Patterns",
    coverImage: "/images/car-images/sample/1.png",
    createdDate: "2024-02-10",
    status: 0,
    description: "Explore advanced JavaScript concepts and patterns."
  },
  {
    id: 7,
    title: "API Design with REST",
    coverImage: "/images/car-images/sample/2.jpeg",
    createdDate: "2024-02-15",
    status: 1,
    description: "Best practices for designing RESTful APIs."
  },
  {
    id: 8,
    title: "Database Optimization Techniques",
    coverImage: "/images/car-images/sample/3.jpeg",
    createdDate: "2024-02-20",
    status: 1,
    description: "Improve your database performance with these techniques."
  },
  {
    id: 9,
    title: "Frontend Testing Strategies",
    coverImage: "/images/car-images/sample/4.jpeg",
    createdDate: "2024-02-25",
    status: 0,
    description: "Comprehensive testing approaches for frontend applications."
  },
  {
    id: 10,
    title: "Docker for Developers",
    coverImage: "/images/car-images/sample/5.jpeg",
    createdDate: "2024-03-01",
    status: 1,
    description: "Getting started with Docker in development workflows."
  },
  {
    id: 11,
    title: "GraphQL vs REST",
    coverImage: "/images/car-images/sample/1.png",
    createdDate: "2024-03-05",
    status: 1,
    description: "Comparing GraphQL and REST API approaches."
  },
  {
    id: 12,
    title: "Microservices Architecture",
    coverImage: "/images/car-images/sample/2.jpeg",
    createdDate: "2024-03-10",
    status: 0,
    description: "Understanding microservices design patterns."
  },
  {
    id: 13,
    title: "Progressive Web Apps",
    coverImage: "/images/car-images/sample/3.jpeg",
    createdDate: "2024-03-15",
    status: 1,
    description: "Building PWAs with modern web technologies."
  },
  {
    id: 14,
    title: "State Management in Vue",
    coverImage: "/images/car-images/sample/4.jpeg",
    createdDate: "2024-03-20",
    status: 1,
    description: "Managing application state effectively in Vue.js."
  },
  {
    id: 15,
    title: "CSS-in-JS Solutions",
    coverImage: "/images/car-images/sample/5.jpeg",
    createdDate: "2024-03-25",
    status: 0,
    description: "Exploring different CSS-in-JS approaches and libraries."
  },
  {
    id: 16,
    title: "Web Accessibility Guidelines",
    coverImage: "/images/car-images/sample/1.png",
    createdDate: "2024-04-01",
    status: 1,
    description: "Making your web applications accessible to everyone."
  },
  {
    id: 17,
    title: "Server-Side Rendering",
    coverImage: "/images/car-images/sample/2.jpeg",
    createdDate: "2024-04-05",
    status: 1,
    description: "Benefits and implementation of SSR in modern apps."
  },
  {
    id: 18,
    title: "Mobile-First Design",
    coverImage: "/images/car-images/sample/3.jpeg",
    createdDate: "2024-04-10",
    status: 0,
    description: "Designing for mobile devices from the ground up."
  },
  {
    id: 19,
    title: "Performance Monitoring",
    coverImage: "/images/car-images/sample/4.jpeg",
    createdDate: "2024-04-15",
    status: 1,
    description: "Tools and techniques for monitoring web performance."
  },
  {
    id: 20,
    title: "Security Best Practices",
    coverImage: "/images/car-images/sample/5.jpeg",
    createdDate: "2024-04-20",
    status: 1,
    description: "Essential security practices for web applications."
  },
  {
    id: 21,
    title: "CI/CD Pipeline Setup",
    coverImage: "/images/car-images/sample/1.png",
    createdDate: "2024-04-25",
    status: 0,
    description: "Setting up continuous integration and deployment."
  },
  {
    id: 22,
    title: "Code Review Guidelines",
    coverImage: "/images/car-images/sample/2.jpeg",
    createdDate: "2024-05-01",
    status: 1,
    description: "Best practices for effective code reviews."
  },
  {
    id: 23,
    title: "Design Systems",
    coverImage: "/images/car-images/sample/3.jpeg",
    createdDate: "2024-05-05",
    status: 1,
    description: "Building and maintaining design systems."
  },
  {
    id: 24,
    title: "Agile Development",
    coverImage: "/images/car-images/sample/4.jpeg",
    createdDate: "2024-05-10",
    status: 0,
    description: "Implementing agile methodologies in development teams."
  },
  {
    id: 25,
    title: "Cloud Deployment Strategies",
    coverImage: "/images/car-images/sample/5.jpeg",
    createdDate: "2024-05-15",
    status: 1,
    description: "Deploying applications to cloud platforms effectively."
  }
])

const paginatedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return blogPosts.value.slice(startIndex, endIndex)
})

const totalPosts = computed(() => blogPosts.value.length)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const viewPost = (id: number) => {
  navigateTo(`/admin/blogs/${id}`)
}

const createNewPost = () => {
  if (newPostTitle.value.trim()) {
    console.log('Creating new post:', newPostTitle.value)
    showNewPostModal.value = false
    newPostTitle.value = ''
  }
}

const cancelNewPost = () => {
  showNewPostModal.value = false
  newPostTitle.value = ''
}
</script>
