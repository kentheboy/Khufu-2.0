<template>
  <div class="vehicle-edit-page p-6">
    <!-- Top Navigation Bar -->
    <div class="flex items-center justify-between mb-6">
      <!-- Left: Back Button -->
      <UButton
        icon="i-lucide-arrow-left"
        variant="outline"
        @click="goBack"
        class="flex items-center gap-2"
      >
        Back
      </UButton>

      <!-- Right: Action Buttons -->
      <div class="flex items-center gap-4">
        <!-- Published Switch -->
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">Published</span>
          <UToggle
            v-model="isPublished"
            @change="onPublishedChange"
          />
        </div>

        <!-- Save Button -->
        <UButton
          color="primary"
          @click="saveVehicle"
          :loading="saving"
        >
          Save
        </UButton>

        <!-- Delete Button -->
        <UButton
          icon="i-lucide-trash"
          color="red"
          variant="outline"
          @click="showDeleteModal = true"
        >
        </UButton>
      </div>
    </div>

    <!-- Main Content: Two Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Column: Image Preview Area -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Images</h2>
        
        <!-- Image Slider -->
        <div class="relative bg-gray-50 rounded-lg overflow-hidden" style="height: 400px;">
          <div v-if="vehicleImages.length > 0" class="relative h-full">
            <!-- Current Image Display -->
            <img
              :src="vehicleImages[currentImageIndex]"
              :alt="`Vehicle image ${currentImageIndex + 1}`"
              class="w-full h-full object-cover"
            />
            
            <!-- Navigation Arrows (only show if more than 1 image) -->
            <div v-if="vehicleImages.length > 1" class="absolute inset-0 flex items-center justify-between p-4">
              <UButton
                icon="i-lucide-chevron-left"
                variant="outline"
                size="sm"
                @click="previousImage"
                :disabled="currentImageIndex === 0"
                class="bg-white/80 hover:bg-white"
              />
              <UButton
                icon="i-lucide-chevron-right"
                variant="outline"
                size="sm"
                @click="nextImage"
                :disabled="currentImageIndex === vehicleImages.length - 1"
                class="bg-white/80 hover:bg-white"
              />
            </div>

            <!-- Image Counter -->
            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {{ currentImageIndex + 1 }} / {{ vehicleImages.length }}
            </div>
          </div>

          <!-- No Images State with Upload -->
          <div v-else class="h-full flex flex-col items-center justify-center text-gray-500">
            <UIcon name="i-lucide-image" class="size-16 mb-4" />
            <p class="text-lg mb-4">No images uploaded</p>
            <UButton
              icon="i-lucide-upload"
              @click="triggerImageUpload"
            >
              Upload Images
            </UButton>
          </div>
        </div>

        <!-- Image Upload Area (always visible at top) -->
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div class="flex items-center justify-center">
            <UButton
              icon="i-lucide-plus"
              variant="outline"
              @click="triggerImageUpload"
              :disabled="vehicleImages.length >= 5"
            >
              {{ vehicleImages.length >= 5 ? 'Maximum 5 images' : 'Add Image' }}
            </UButton>
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            multiple
            class="hidden"
            @change="handleImageUpload"
          />
        </div>

        <!-- Image Thumbnails -->
        <div v-if="vehicleImages.length > 1" class="flex gap-2 overflow-x-auto">
          <div
            v-for="(image, index) in vehicleImages"
            :key="index"
            class="relative flex-shrink-0 cursor-pointer"
            @click="currentImageIndex = index"
          >
            <img
              :src="image"
              :alt="`Thumbnail ${index + 1}`"
              class="w-20 h-16 object-cover rounded border-2"
              :class="currentImageIndex === index ? 'border-blue-500' : 'border-gray-300'"
            />
            <UButton
              icon="i-lucide-x"
              size="xs"
              color="red"
              variant="solid"
              class="absolute -top-2 -right-2"
              @click.stop="removeImage(index)"
            />
          </div>
        </div>
      </div>

      <!-- Right Column: Vehicle Details Form -->
      <div class="space-y-6">
        <h2 class="text-lg font-semibold">Vehicle Details</h2>

        <!-- Primary Information -->
        <div class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium mb-2">Title</label>
            <UInput
              v-model="vehicleForm.name"
              placeholder="Enter vehicle title"
              :error="errors.name"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium mb-2">Description</label>
            <UTextarea
              v-model="vehicleForm.description"
              placeholder="Enter vehicle description (HTML allowed)"
              rows="4"
              :error="errors.description"
            />
          </div>

          <!-- Price -->
          <div>
            <label class="block text-sm font-medium mb-2">Price (¥/day)</label>
            <UInput
              v-model.number="vehicleForm.price"
              type="number"
              min="1000"
              placeholder="Minimum ¥1,000"
              :error="errors.price"
            />
          </div>

          <!-- Start Date -->
          <div>
            <label class="block text-sm font-medium mb-2">Start Date</label>
            <UInput
              v-model="vehicleForm.startDate"
              type="date"
              :min="todayDate"
              :error="errors.startDate"
            />
          </div>

          <!-- End Date -->
          <div>
            <label class="block text-sm font-medium mb-2">End Date</label>
            <UInput
              v-model="vehicleForm.endDate"
              type="date"
              :min="vehicleForm.startDate || todayDate"
              :error="errors.endDate"
            />
          </div>
        </div>

        <!-- Customized Input Area -->
        <div class="border-t pt-6">
          <h3 class="text-md font-medium mb-4">Custom Fields</h3>
          <div class="text-gray-500 text-sm italic">
            Custom input area - to be implemented later
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-alert-triangle" class="text-red-500" />
            <h3 class="text-lg font-semibold">Delete Vehicle</h3>
          </div>
        </template>

        <div class="space-y-4">
          <p>Are you sure you want to delete this vehicle?</p>
          <p class="text-sm text-gray-600">
            <strong>{{ vehicleForm.name }}</strong>
          </p>
          <p class="text-sm text-red-600">This action cannot be undone.</p>
        </div>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              variant="outline"
              @click="showDeleteModal = false"
            >
              Cancel
            </UButton>
            <UButton
              color="red"
              @click="deleteVehicle"
              :loading="deleting"
            >
              Delete
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

definePageMeta({
  layout: 'admin'
})

interface Vehicle {
  id: number
  name: string
  main_image: string | null
  price: number
  status: number
  startDate: string
  endDate: string
  customfields: string
}

interface VehicleForm {
  name: string
  description: string
  price: number
  startDate: string
  endDate: string
}

const route = useRoute()
const router = useRouter()

const vehicleId = computed(() => parseInt(route.params.id as string))

const vehicleForm = ref<VehicleForm>({
  name: '',
  description: '',
  price: 1000,
  startDate: '',
  endDate: ''
})

const isPublished = ref(false)
const saving = ref(false)
const deleting = ref(false)
const showDeleteModal = ref(false)
const currentImageIndex = ref(0)
const vehicleImages = ref<string[]>([])
const fileInput = ref<HTMLInputElement>()

const errors = ref<Record<string, string>>({})

const todayDate = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const mockVehicles = ref<Vehicle[]>([
  {
    id: 18,
    name: "ALPHARD",
    main_image: "/images/car-images/ALPHARD7/1.jpg",
    price: 15000,
    status: 1,
    startDate: "2024-08-01",
    endDate: "2025-12-31",
    customfields: "{\"passenger\": 7, \"syakenDate\": \"\", \"tenkenDate\": \"\", \"licenseNumber\": \"okinawa K W\", \"isSmokingAllowed\": false}"
  },
  {
    id: 19,
    name: "ALPHARD",
    main_image: "/images/car-images/ALPHARD8/1.png",
    price: 12000,
    status: 1,
    startDate: "2024-07-01",
    endDate: "2024-07-31",
    customfields: "{\"passenger\": 7, \"syakenDate\": \"\", \"tenkenDate\": \"\", \"licenseNumber\": \"\", \"isSmokingAllowed\": false}"
  },
  {
    id: 20,
    name: "ALPHARD",
    main_image: "/images/car-images/HIACE/1.png",
    price: 8000,
    status: 0,
    startDate: "2024-07-01",
    endDate: "2024-07-30",
    customfields: "{\"passenger\": 7, \"syakenDate\": \"\", \"tenkenDate\": \"\", \"licenseNumber\": \"\", \"isSmokingAllowed\": false}"
  },
  {
    id: 21,
    name: "test",
    main_image: "/images/car-images/VELLFIRE/1.jpg",
    price: 16000,
    status: 1,
    startDate: "2024-06-17",
    endDate: "2024-08-31",
    customfields: "{\"passenger\": 7, \"syakenDate\": \"\", \"tenkenDate\": \"\", \"licenseNumber\": \"\", \"isSmokingAllowed\": false}"
  }
])

const currentVehicle = computed(() => {
  return mockVehicles.value.find(v => v.id === vehicleId.value)
})

const loadVehicleData = () => {
  const vehicle = currentVehicle.value
  if (!vehicle) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Vehicle not found'
    })
  }

  vehicleForm.value = {
    name: vehicle.name,
    description: '',
    price: vehicle.price,
    startDate: vehicle.startDate,
    endDate: vehicle.endDate
  }

  isPublished.value = vehicle.status === 1

  if (vehicle.main_image) {
    vehicleImages.value = [vehicle.main_image]
  }
}

const validateForm = (): boolean => {
  errors.value = {}

  if (!vehicleForm.value.name.trim()) {
    errors.value.name = 'Title is required'
  }

  if (vehicleForm.value.price < 1000) {
    errors.value.price = 'Price must be at least ¥1,000'
  }

  if (!vehicleForm.value.startDate) {
    errors.value.startDate = 'Start date is required'
  } else if (new Date(vehicleForm.value.startDate) < new Date(todayDate.value)) {
    errors.value.startDate = 'Start date must be today or later'
  }

  if (!vehicleForm.value.endDate) {
    errors.value.endDate = 'End date is required'
  } else if (vehicleForm.value.startDate && new Date(vehicleForm.value.endDate) < new Date(vehicleForm.value.startDate)) {
    errors.value.endDate = 'End date must be after start date'
  }

  return Object.keys(errors.value).length === 0
}

const saveVehicle = async () => {
  if (!validateForm()) {
    return
  }

  saving.value = true
  
  try {
    const vehicleIndex = mockVehicles.value.findIndex(v => v.id === vehicleId.value)
    if (vehicleIndex !== -1) {
      mockVehicles.value[vehicleIndex] = {
        ...mockVehicles.value[vehicleIndex],
        name: vehicleForm.value.name,
        price: vehicleForm.value.price,
        startDate: vehicleForm.value.startDate,
        endDate: vehicleForm.value.endDate,
        status: isPublished.value ? 1 : 0,
        main_image: vehicleImages.value[0] || null
      }
    }

    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const toast = useToast()
    toast.add({
      title: 'Success',
      description: 'Vehicle updated successfully',
      color: 'green'
    })
  } catch (error) {
    const toast = useToast()
    toast.add({
      title: 'Error',
      description: 'Failed to update vehicle',
      color: 'red'
    })
  } finally {
    saving.value = false
  }
}

const deleteVehicle = async () => {
  deleting.value = true
  
  try {
    const vehicleIndex = mockVehicles.value.findIndex(v => v.id === vehicleId.value)
    if (vehicleIndex !== -1) {
      mockVehicles.value.splice(vehicleIndex, 1)
    }

    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const toast = useToast()
    toast.add({
      title: 'Success',
      description: 'Vehicle deleted successfully',
      color: 'green'
    })

    router.push('/admin/products')
  } catch (error) {
    const toast = useToast()
    toast.add({
      title: 'Error',
      description: 'Failed to delete vehicle',
      color: 'red'
    })
  } finally {
    deleting.value = false
    showDeleteModal.value = false
  }
}

const goBack = () => {
  router.push('/admin/products')
}

const onPublishedChange = (value: boolean) => {
  isPublished.value = value
}

const triggerImageUpload = () => {
  fileInput.value?.click()
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  
  if (!files) return

  const remainingSlots = 5 - vehicleImages.value.length
  const filesToProcess = Array.from(files).slice(0, remainingSlots)

  filesToProcess.forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          vehicleImages.value.push(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  })

  target.value = ''
}

const removeImage = (index: number) => {
  vehicleImages.value.splice(index, 1)
  if (currentImageIndex.value >= vehicleImages.value.length) {
    currentImageIndex.value = Math.max(0, vehicleImages.value.length - 1)
  }
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

const nextImage = () => {
  if (currentImageIndex.value < vehicleImages.value.length - 1) {
    currentImageIndex.value++
  }
}

watch(() => vehicleForm.value.startDate, (newStartDate) => {
  if (newStartDate && vehicleForm.value.endDate && new Date(vehicleForm.value.endDate) < new Date(newStartDate)) {
    vehicleForm.value.endDate = newStartDate
  }
})

onMounted(() => {
  loadVehicleData()
})
</script>

<style scoped>
.vehicle-edit-page {
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .vehicle-edit-page {
    padding: 1rem;
  }
}
</style>
