<template>
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" 
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 class="text-lg font-medium mb-4">Generate lease agreement</h2>
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm pb-1 font-medium text-gray-700">Lease template</label>
            <div class="flex items-center justify-between border border-gray-100 rounded-md px-4 py-3 text-sm bg-[#F0F2F5]">
              <span class="text-sm text-gray-800">{{`${templateObj?.name} Template` ?? 'Nil'}}</span>
              <button @click="closeModal" class="text-sm font-medium text-gray-800 hover:underline focus:outline-none">
                Change template
              </button>
            </div>
          </div>
  
          <div class="space-y-1">
            <label class="block text-sm pb-1 font-medium text-[#1D2739]">Property name</label>
            <select v-model="payload.propertyId"  v-if="!loadingProperties && propertiesList.length" class="w-full px-4 py-3.5 border-[0.5px] text-sm bg-[#F0F2F5] rounded-lg outline-none">
              <option v-for="item in  propertiesList" :key="item.id" :value="item.id">{{item.name}}</option>
            </select>
            <div v-else class="h-10 animate-pulse w-full bg-slate-200 rounded col-span-2"></div>
          </div>
  
          <div class="space-y-1">
            <label class="block text-sm pb-1 font-medium text-[#1D2739]">Tenant</label>
            <select v-model="payload.tenantId" v-if="!loadingTenants && tenantsList.length" class="w-full px-4 py-3.5 border-[0.5px] text-sm bg-[#F0F2F5] rounded-lg outline-none">
              <option v-for="item in  tenantsList" :key="item.id" :value="item.id">{{item.firstName}} {{item.lastName}}</option>
            </select>
            <div v-else class="h-10 animate-pulse w-full bg-slate-200 rounded col-span-2"></div>
          </div>
  
          <div>
            <label class="block text-sm pb-1 font-medium text-[#1D2739]">Lease document title</label>
            <input v-model="payload.documentName" type="text" placeholder="Enter title" class="w-full px-4 py-3.5 border-[0.5px] text-sm bg-[#F0F2F5] rounded-lg outline-none" />
          </div>
        </div>
        
        <div class="mt-10 flex justify-between gap-x-6">
          <button class="bg-[#EBE5E0] font-semibold text-[#292929] w-full px-4 py-3.5 text-sm rounded-md" @click="resetFilters">Reset</button>
          <button class="bg-[#292929] font-semibold w-full text-white px-4 py-3.5 text-sm rounded-md"  @click="applyFilters">Continue</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useGetTenants } from '@/composables/modules/tenants/fetch'
  import { useCreateLeaseTemplate } from '@/composables/modules/lease/create'
const { payload } = useCreateLeaseTemplate()
const { tenantsList, loading: loadingTenants } = useGetTenants()
  import { useGetProperties } from "@/composables/modules/property/fetchProperties";
  const router = useRouter()
  const {
  loadingProperties,
  propertiesList
} = useGetProperties();

const templateObj = ref({}) as any;
onMounted(() => {
  const parsedData = JSON.parse(localStorage.getItem("templateObj"));
  templateObj.value = parsedData;
});
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    // Emit an event to close the modal
    emit('close');
  };

  const props = defineProps({
    template: {
      type: Object
    }
  })
  
  const resetFilters = () => {
    // Logic to reset filters
    console.log('Filters reset');
  };
  
  const applyFilters = () => {
    router.push('/dashboard/property/lease-documents/create')
    // router.push(`/dashboard/property/lease-documents/${item.id}/edit`)
    closeModal();
  };
  
  const fromDate = ref<string>('');
  const toDate = ref<string>('');
  </script>
  