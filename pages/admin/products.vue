<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Vehicle List</h1>
      <UButton 
        icon="i-lucide-plus" 
        color="primary" 
        @click="addVehicle"
      >
        Add Vehicle
      </UButton>
    </div>

    <div class="mb-6 flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <UInput
          v-model="searchQuery"
          icon="i-lucide-search"
          placeholder="Search vehicles..."
          class="w-full"
        />
      </div>
      <div class="flex gap-2">
        <USelect
          v-model="statusFilter"
          :options="statusOptions"
          placeholder="Filter by status"
          class="w-40"
        />
        <UPopover>
          <UButton 
            icon="i-lucide-calendar" 
            variant="outline"
            :label="dateFilterLabel"
          />
          <template #panel>
            <div class="p-4 space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Start Date</label>
                <UInput
                  v-model="dateFilter.start"
                  type="date"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">End Date</label>
                <UInput
                  v-model="dateFilter.end"
                  type="date"
                />
              </div>
              <div class="flex gap-2">
                <UButton @click="applyDateFilter" size="sm">Apply</UButton>
                <UButton @click="clearDateFilter" variant="outline" size="sm">Clear</UButton>
              </div>
            </div>
          </template>
        </UPopover>
      </div>
    </div>

    <UTable
      :data="filteredVehicles"
      :columns="columns"
      :loading="loading"
      @select="onRowSelect"
    >
    </UTable>

    <div class="flex justify-between items-center mt-6">
      <div class="text-sm text-gray-500">
        Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, totalVehicles) }} of {{ totalVehicles }} vehicles
      </div>
      <UPagination
        v-model="currentPage"
        :page-count="pageSize"
        :total="totalVehicles"
        :max="5"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, h, resolveComponent } from 'vue'

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

interface ParsedCustomFields {
  passenger: number
  syakenDate: string
  tenkenDate: string
  licenseNumber: string
  isSmokingAllowed: boolean
}

const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const pageSize = 10
const sort = ref({ column: 'id', direction: 'asc' as const })

const dateFilter = ref({
  start: '',
  end: ''
})

const vehicles = ref<Vehicle[]>([
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
  },
  {
    id: 23,
    name: "ALPHARD",
    main_image: null,
    price: 10000,
    status: 1,
    startDate: "2024-07-01",
    endDate: "2024-07-31",
    customfields: "{\"passenger\": 7, \"syakenDate\": \"\", \"tenkenDate\": \"\", \"licenseNumber\": \"\", \"isSmokingAllowed\": false}"
  },
  {
    id: 24,
    name: "Toyota Hiace",
    main_image: "/images/car-images/HIACE.jpg",
    price: 9000,
    status: 1,
    startDate: "2024-02-15",
    endDate: "2024-11-15",
    customfields: "{\"passenger\": 10, \"syakenDate\": \"\", \"tenkenDate\": \"\", \"licenseNumber\": \"\", \"isSmokingAllowed\": false}"
  },
  {
    id: 25,
    name: "BMW X5",
    main_image: "/images/car-images/sample/1.png",
    price: 18000,
    status: 0,
    startDate: "2024-04-01",
    endDate: "2024-09-30",
    customfields: "{\"passenger\": 5, \"syakenDate\": \"\", \"tenkenDate\": \"\", \"licenseNumber\": \"\", \"isSmokingAllowed\": true}"
  },
  {
    id: 26,
    name: "Mercedes-Benz V-Class",
    main_image: "/images/car-images/sample/2.jpeg",
    price: 20000,
    status: 1,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    customfields: "{\"passenger\": 8, \"syakenDate\": \"\", \"tenkenDate\": \"\", \"licenseNumber\": \"\", \"isSmokingAllowed\": false}"
  },
  {
    id: 27,
    name: "Nissan Serena",
    main_image: "/images/car-images/sample/3.jpeg",
    price: 9000,
    status: 1,
    startDate: "2024-03-15",
    endDate: "2024-10-15",
    customfields: "{\"passenger\": 8, \"syakenDate\": \"\", \"tenkenDate\": \"\", \"licenseNumber\": \"\", \"isSmokingAllowed\": false}"
  },
  {
    id: 28,
    name: "Mazda CX-5",
    main_image: "/images/car-images/sample/4.jpeg",
    price: 7500,
    status: 0,
    startDate: "2024-05-01",
    endDate: "2024-08-31",
    customfields: "{\"passenger\": 5, \"syakenDate\": \"\", \"tenkenDate\": \"\", \"licenseNumber\": \"\", \"isSmokingAllowed\": false}"
  },
  {
    id: 29,
    name: "Lexus LX",
    main_image: "/images/car-images/sample/5.jpeg",
    price: 25000,
    status: 1,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    customfields: "{\"passenger\": 7, \"syakenDate\": \"\", \"tenkenDate\": \"\", \"licenseNumber\": \"\", \"isSmokingAllowed\": false}"
  },
  {
    id: 30,
    name: "Subaru Forester",
    main_image: "/images/car-images/main1.png",
    price: 6500,
    status: 1,
    startDate: "2024-06-01",
    endDate: "2024-07-31",
    customfields: "{\"passenger\": 5, \"syakenDate\": \"\", \"tenkenDate\": \"\", \"licenseNumber\": \"\", \"isSmokingAllowed\": false}"
  }
])

const columns = [
  {
    id: 'id',
    accessorKey: 'id',
    header: 'ID'
  },
  {
    id: 'main_image',
    accessorKey: 'main_image',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl = row.getValue('main_image') || '/images/car-images/main1.png'
      return h('img', {
        src: imageUrl,
        alt: row.getValue('name'),
        class: 'w-16 h-12 object-cover rounded'
      })
    }
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Title',
    cell: ({ row }) => {
      return h(resolveComponent('UButton'), {
        label: row.getValue('name'),
        variant: 'link',
        onClick: () => viewDetails(row.getValue('id')),
        class: 'p-0 h-auto font-medium'
      })
    }
  },
  {
    id: 'price',
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = row.getValue('price') || 0
      return h('div', { class: 'flex flex-col' }, [
        h('span', { class: 'font-medium' }, `¥${price.toLocaleString()}`),
        h('span', { class: 'text-gray-500 text-sm' }, '/day')
      ])
    }
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status')
      return h(resolveComponent('UBadge'), {
        color: status === 1 ? 'green' : 'gray',
        label: status === 1 ? 'Published' : 'Unpublished',
        class: 'cursor-pointer',
        onClick: () => toggleStatus(row.original)
      })
    }
  },
  {
    id: 'startDate',
    accessorKey: 'startDate',
    header: 'Publish Start',
    cell: ({ row }) => formatDate(row.getValue('startDate'))
  },
  {
    id: 'endDate',
    accessorKey: 'endDate',
    header: 'Publish End',
    cell: ({ row }) => formatDate(row.getValue('endDate'))
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return h(resolveComponent('UDropdownMenu'), {
        items: getActionItems(row.original),
        'aria-label': 'Actions dropdown'
      }, () => 
        h(resolveComponent('UButton'), {
          icon: 'i-heroicons-ellipsis-horizontal-20-solid',
          variant: 'ghost',
          color: 'gray',
          size: 'sm',
          'aria-label': 'Actions dropdown'
        })
      )
    }
  }
]

const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Published', value: '1' },
  { label: 'Unpublished', value: '0' }
]

const parseCustomFields = (customfields: string): ParsedCustomFields => {
  try {
    return JSON.parse(customfields)
  } catch {
    return {
      passenger: 0,
      syakenDate: '',
      tenkenDate: '',
      licenseNumber: '',
      isSmokingAllowed: false
    }
  }
}

const filteredVehicles = computed(() => {
  let filtered = vehicles.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(vehicle => 
      vehicle.name.toLowerCase().includes(query) ||
      vehicle.id.toString().includes(query) ||
      parseCustomFields(vehicle.customfields).licenseNumber.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(vehicle => vehicle.status.toString() === statusFilter.value)
  }

  if (dateFilter.value.start || dateFilter.value.end) {
    filtered = filtered.filter(vehicle => {
      const startDate = new Date(vehicle.startDate)
      const endDate = new Date(vehicle.endDate)
      const filterStart = dateFilter.value.start ? new Date(dateFilter.value.start) : null
      const filterEnd = dateFilter.value.end ? new Date(dateFilter.value.end) : null

      if (filterStart && filterEnd) {
        return startDate >= filterStart && endDate <= filterEnd
      } else if (filterStart) {
        return startDate >= filterStart
      } else if (filterEnd) {
        return endDate <= filterEnd
      }
      return true
    })
  }

  if (sort.value.column) {
    filtered.sort((a, b) => {
      let aVal: any = a[sort.value.column as keyof Vehicle]
      let bVal: any = b[sort.value.column as keyof Vehicle]
      
      if (sort.value.column === 'startDate' || sort.value.column === 'endDate') {
        aVal = new Date(aVal).getTime()
        bVal = new Date(bVal).getTime()
      }
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sort.value.direction === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sort.value.direction === 'asc' 
          ? aVal - bVal
          : bVal - aVal
      }
      
      return 0
    })
  }

  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return filtered.slice(startIndex, endIndex)
})

const totalVehicles = computed(() => {
  let filtered = vehicles.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(vehicle => 
      vehicle.name.toLowerCase().includes(query) ||
      vehicle.id.toString().includes(query) ||
      parseCustomFields(vehicle.customfields).licenseNumber.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(vehicle => vehicle.status.toString() === statusFilter.value)
  }

  if (dateFilter.value.start || dateFilter.value.end) {
    filtered = filtered.filter(vehicle => {
      const startDate = new Date(vehicle.startDate)
      const endDate = new Date(vehicle.endDate)
      const filterStart = dateFilter.value.start ? new Date(dateFilter.value.start) : null
      const filterEnd = dateFilter.value.end ? new Date(dateFilter.value.end) : null

      if (filterStart && filterEnd) {
        return startDate >= filterStart && endDate <= filterEnd
      } else if (filterStart) {
        return startDate >= filterStart
      } else if (filterEnd) {
        return endDate <= filterEnd
      }
      return true
    })
  }

  return filtered.length
})

const dateFilterLabel = computed(() => {
  if (dateFilter.value.start && dateFilter.value.end) {
    return `${formatDate(dateFilter.value.start)} - ${formatDate(dateFilter.value.end)}`
  } else if (dateFilter.value.start) {
    return `From ${formatDate(dateFilter.value.start)}`
  } else if (dateFilter.value.end) {
    return `Until ${formatDate(dateFilter.value.end)}`
  }
  return 'Filter by date'
})

watch([searchQuery, statusFilter], () => {
  currentPage.value = 1
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const toggleStatus = (vehicle: Vehicle) => {
  const index = vehicles.value.findIndex(v => v.id === vehicle.id)
  if (index !== -1) {
    vehicles.value[index].status = vehicle.status === 1 ? 0 : 1
  }
}

const getActionItems = (vehicle: Vehicle) => [
  [
    {
      label: 'Edit',
      icon: 'i-lucide-edit',
      click: () => editVehicle(vehicle.id)
    },
    {
      label: 'Delete',
      icon: 'i-lucide-trash-2',
      click: () => deleteVehicle(vehicle.id)
    }
  ]
]

const addVehicle = () => {
  console.log('Add vehicle clicked')
}

const editVehicle = (id: number) => {
  console.log('Edit vehicle:', id)
}

const deleteVehicle = (id: number) => {
  console.log('Delete vehicle:', id)
}

const viewDetails = (id: number) => {
  navigateTo(`/admin/products/${id}`)
}

const onRowSelect = (row: Vehicle) => {
  viewDetails(row.id)
}

const applyDateFilter = () => {
  currentPage.value = 1
}

const clearDateFilter = () => {
  dateFilter.value.start = ''
  dateFilter.value.end = ''
  currentPage.value = 1
}
</script>
