<template>
  <section class="space-y-4">
    <div class="lg:flex w-full gap-x-2">
      <div class="w-full lg:max-w-5xl lg:flex p-3 border border-gray-25 rounded-lg bg-white">
        <div v-for="(item, idx) in firstSection" :key="idx" class="h-32 cursor-pointer space-y-4 w-full border-gray-100 lg:border-r last:border-r-0 p-4">
          <div class="flex justify-end items-end ">
            <img :src="dynamicIcons(item.icon)" :alt="item.label" class="h-10 w-10 bg-gray-100 p-2 rounded-md" />
          </div>
          <div>
            <p class="text-[#1D2739] font-semibold text-2xl">{{item.value}}</p>
            <h6 class="text-[#667185] font-medium text-sm">{{item.label}}</h6>
          </div>
        </div>
      </div>
      <div class="w-full lg:max-w-lg lg:flex p-3 border border-gray-25 rounded-lg bg-white">
        <div v-for="(item, idx) in secondSection" :key="idx" class="h-32 space-y-4 w-full border-gray-100 lg:border-r last:border-r-0 p-4">
          <div class="flex justify-end items-end ">
            <img :src="dynamicIcons(item.icon)" :alt="item.label" class="h-10 w-10 bg-gray-100 p-2 rounded-md" />
          </div>
          <div>
            <p class="text-[#1D2739] font-semibold text-2xl">{{item.value}}</p>
            <h6 class="text-[#667185] font-medium text-sm">{{item.label}}</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="lg:flex w-full gap-x-2">
      <div class="w-full lg:max-w-5xl lg:flex p-3 border border-gray-25 rounded-lg bg-white">
        <div v-for="(item, idx) in thirdSection" :key="idx" class="h-32 space-y-4 w-full border-gray-100 lg:border-r last:border-r-0 p-4">
          <div class="flex justify-end items-end ">
            <img :src="dynamicIcons(item.icon)" :alt="item.label" class="h-10 w-10 bg-gray-100 p-2 rounded-md" />
          </div>
          <div>
            <p class="text-[#1D2739] font-semibold text-2xl">{{item.value}}</p>
            <h6 class="text-[#667185] font-medium text-sm">{{item.label}}</h6>
          </div>
        </div>
      </div>
      <div class="w-full lg:max-w-lg lg:flex p-3 border border-gray-25 rounded-lg bg-white">
        <div v-for="(item, idx) in fourthSection" :key="idx" class="h-32 space-y-4 w-full border-gray-100 lg:border-r last:border-r-0 p-4">
          <div class="flex justify-end items-end ">
            <img :src="dynamicIcons(item.icon)" :alt="item.label" class="h-10 w-10 bg-gray-100 p-2 rounded-md" />
          </div>
          <div>
            <p class="text-[#1D2739] font-semibold text-2xl">{{item.value}}</p>
            <h6 class="text-[#667185] font-medium text-sm">{{item.label}}</h6>
          </div>
        </div>
      </div>
    </div>
  </section>
  </template>
  
  <script setup lang="ts">
  import { useGetProperties } from '@/composables/modules/property/fetchProperties'
  import { dynamicIcons } from '@/utils/assets'; // assuming you have a dynamicIcons function in utils
  const { loadingProperties, propertiesList } = useGetProperties()
  const router = useRouter()
  const firstSection = ref([
  { icon: 'total-properties', value: '0', label: 'Total Properties', path: '/dashboard/property' },
  { icon: 'total-tenants', value: '0', label: 'Total tenants', path: '#' },
  { icon: 'total-income', value: '₦0.00', label: 'Total Income', path: '#' },
])

const secondSection = ref([
  { icon: 'total-rooms', value: '0', label: 'Total members', path: '#' },
  { icon: 'total-rooms', value: '0', label: 'Total rooms', path: '#' },
])

const thirdSection = ref([
  { icon: 'total-rooms', value: '0', label: 'Available rooms', path: '/#' },
  { icon: 'total-rooms', value: '0', label: 'Occupied rooms', path: '#' },
  { icon: 'total-rooms', value: '0%', label: 'Occupancy rate', path: '#' },
])

const fourthSection = ref([
  { icon: 'total-rooms', value: '0', label: 'Agents', path: '#' },
  { icon: 'total-rooms', value: '0', label: 'Service providers' , path: '#'},
])


// Watch for changes in propertiesList and update the total properties count
watch(
  propertiesList,
  (newList) => {
    const totalProperties = newList.length; // Adjust based on how the count should be derived
    const propertiesItem = firstSection.value.find(item => item.label === 'Total Properties');
    if (propertiesItem) {
      propertiesItem.value = totalProperties;
    }
  },
  { immediate: true }
);
  </script>
  
  <style scoped>
  /* Customize additional styles if necessary */
  </style>
  