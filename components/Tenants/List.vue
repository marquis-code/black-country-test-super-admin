<template>
  <main class="">
    <div class="flex flex-wrap gap-3  justify-between items-center mb-4">
      <!-- Left: Filter and Search -->
      <div class="flex space-x-2">
        <!-- Filter Button -->
        <button @click="tenantFilterModal = true" class="flex items-center text-sm space-x-1 bg-[#F0F2F5] border-[#F0F2F5] border-2 text-gray-700 px-6 py-2 rounded transition-all">
          <img :src="dynamicIcons('gray-filter')" />
          <span>Filter</span>
        </button>
  
        <!-- Search Bar -->
        <div class="relative">
          <input  v-model="filters.searchQuery" type="text" placeholder="Search properties by name..." class="bg-[#F0F2F5] pl-10 border-[#F0F2F5] border text-sm text-gray-700 px-4 py-3 rounded w-full sm:w-[500px] focus:outline-none focus:bg-white transition-all"/>
          <span class="absolute inset-y-0 left-3 flex items-center pr-2">
            <img
            class=""
            :src="dynamicIcons('gray-search')"
          />
          </span>
        </div>
      </div>
  
      <!-- Right: Configure Table, Export, and New Property -->
      <div class="flex space-x-2">
        <!-- Configure Table Button -->
        <button @click="showModal = true" class="flex items-center space-x-1 text-sm px-2  bg-[#F0F2F5] border-[#F0F2F5] border text-gray-700 py-2 rounded hover:bg-gray-200 transition-all">
          <img :src="dynamicIcons('gray-settings')" />
          <span>Configure table</span>
        </button>
  
        <!-- Export Button -->
        <button @click="toggleDownloadDropdown" class="flex items-center space-x-1 text-sm px-2 bg-[#F0F2F5] border-[#F0F2F5] border text-gray-700 py-2 rounded hover:bg-gray-200 transition-all">
          <img :src="dynamicIcons('gray-download')" />
          <span>Export</span>
        </button>
        <div
        v-if="downloadDropdown"
        class="absolute right-0 sm:right-4 z-50 mt-2 bg-white border border-gray-200 w-44 rounded-lg shadow-lg"
      >
        <ul class="py-1 text-sm text-gray-700 divide-gray-100 divide-y-[0.5px]">
          <li>
            <a
              @click="downloadData('pdf')"
              href="#"
              class="block flex items-center gap-x-2 px-4 py-3 hover:bg-gray-100 text-start"
            >
              <img :src="dynamicIcons('gray-pdf')" />
              PDF
            </a>
          </li>
          <li>
            <a
              @click="downloadData('excel')"
              href="#"
              class="block flex items-center gap-x-2 px-4 py-3 hover:bg-gray-100 text-start"
            >
              <img :src="dynamicIcons('gray-excel')" />
              Excel/Spreadsheet
            </a>
          </li>
          <li>
            <a
              @click="downloadData('csv')"
              href="#"
              class="block flex items-center gap-x-2 px-4 py-3 hover:bg-gray-100 text-start"
            >
              <img :src="dynamicIcons('gray-csv')" />
              CSV
            </a>
          </li>
        </ul>
      </div>
      </div>
    </div>
    <!-- v-if="tenantsList && !loadingTenants" -->
    <div>
      <div
        class="bg-white rounded-lg overflow-hidden"
      >
        <div class="custom-scrollbar-container w-full">
          <table class="min-w-full bg-white w-full">
            <thead class="border-b-[0.5px] border-gray-50 z-30 bg-gray-25 sticky top-0">
              <tr>
                <th
                  v-for="column in visibleColumns"
                  :key="column.key"
                  class="py-5 px-5 text-left text-sm font-medium text-gray-500 tracking-wider"
                >
                  {{ column.label }}
                </th>
                <th class="py-5 px-5 text-right text-sm font-medium text-gray-500 tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody  v-if="!loadingTenants" class="divide-y divide-gray-50 z-10">
              <tr
                class="cursor-pointer"
                v-for="(tenant, index) in tenantsList"
                :key="tenant.id"
              >
                <!-- <td
                  @click.prevent="handleDropdownClick('view', property)"
                  v-for="column in visibleColumns"
                  :key="column.key"
                  class="py-5 px-5 whitespace-nowrap text-sm text-[#667185] font-semibold relative"
                >
                <p v-if="column.key === 'address'">{{property.address.slice(0, 10)}}</p>
                  <p v-if="column.key !== 'isPublished'">{{ getTenantValue(property, column.key) }}</p>
                  <p class="absolute left-0 top-0" v-if="column.key === 'name'">
                    <span class="bg-[#F7D394] text-[#1D2739] text-sm px-2 py-1" v-if="!property.isPublished">
                      Draft
                    </span>
                  </p>
                  <p v-if="column.key === 'isPublished'">{{ property.isPublished ? 'Published' : 'Draft' }}</p>
                </td> -->
                <td
  @click.prevent="handleDropdownClick('view', tenant)"
  v-for="column in visibleColumns"
  :key="column.key"
  class="py-5 px-5 whitespace-nowrap text-sm text-[#667185] font-semibold relative"
>
  <p v-if="column.key === 'address'">
    <span v-if="tenant">{{ `${tenant?.address?.slice(0, 30)}...` }}</span>
  </p>
  <p v-else-if="column.key === 'firstName'">
    {{ tenant.firstName }} {{ tenant.lastName }}
  </p>
  <p class="inline px-3 py-2 rounded-full text-sm" :class="[tenant.status === 'not paid' ? 'text-[#BA110B] bg-[#FBEAE9]' : 'bg-[#E7F6EC] text-[#099137]']" v-else-if="column.key === 'status'">{{ tenant.status === 'not paid' ? 'Not Paid' : 'Paid' }}</p>
  <p v-else>{{ getTenantValue(tenant, column.key) }}</p>
</td>
                <td class="py-5 px-5 relative whitespace-nowrap text-sm text-right">
                  <button
                    @click="toggleDropdown(index)"
                    class="inline-flex items-center text-sm font-medium text-[#667185] hover:text-black"
                  >
                    <svg
                      width="48"
                      height="44"
                      viewBox="0 0 48 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.9966 22H22.0041"
                        stroke="#292929"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M27 22H27.0075"
                        stroke="#1D2739"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17 22H17.0075"
                        stroke="#1D2739"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                   <div
                    v-if="activeDropdown === index"
                    class="absolute -top-2 right-10 z-50 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg"
                  >
                    <ul class="py-1 text-sm text-gray-700 divide divide-y-[0.5px]">
                      <li>
                        <a
                          @click.prevent="handleDropdownClick('view', tenant)"
                          href="#"
                          class="block flex items-center gap-x-2 px-4 py-3 hover:bg-gray-100 text-start"
                        >
                          <img :src="dynamicIcons('view-property')" />
                          View Tenant
                        </a>
                      </li>
                      <li>
                        <a
                          @click.prevent="handleDropdownClick('send-message', tenant)"
                          href="#"
                          class="block flex items-center gap-x-2 px-4 py-3 text-sm hover:bg-gray-100 text-start"
                        >
                          <img :src="dynamicIcons('send-message')" />
                          Send Message
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <section id="loader" class="w-full" v-if="loadingTenants">
            <div class="rounded-md p-4 w-full">
              <div class="animate-pulse flex space-x-4 w-full">
                <div class="h-44 w-full bg-slate-200 rounded"></div>
              </div>
            </div>
          </section>
        </div>
        <div
          v-if="activeDropdown !== null"
          @click="closeDropdown"
          class="fixed inset-0 z-40 bg-black opacity-25"
        ></div>
        <CorePagination
          v-if="!loadingTenants && tenantsList.length > 0"
          :total="metadata.total"
          :page="metadata.page"
          :perPage="metadata.perPage"
          :pages="metadata.pages"
          @page-changed="handlePageChange"
        />
      </div>
      <!-- <div
        v-if="loadingTenants && tenantsList.length === 0"
        class="h-32 bg-slate-200 rounded animate-pulse w-full m-3"
      ></div> -->
      <div
        v-if="!loadingTenants && tenantsList.length === 0"
        class="flex justify-center items-center flex-col my-20"
      >
        <div class="flex justify-center flex-col items-center gap-y-4 items-center">
          <img src="@/assets/icons/activities-empty-state.svg" />
          <p class="font-medium text-gray-400">No tenant found for search key <span class="text-gray-800">"{{filters.searchQuery}}"</span></p>
        </div>
      </div>
    </div>
    

    <TenantConfigTableModal
      v-if="tenantConfigModal"
      @close="tenantConfigModal = false"
    />
    <TenantFilterModal
      v-if="tenantFilterModal"
      @close="tenantFilterModal = false"
      @applyFilters="handleApplyFilters"
    />

    <CoreModal :showCloseBtn="true" title="Configure Table" :isOpen="showModal" @close="showModal = false">
      <div>
        <div
          v-for="(column, index) in columns"
          :key="index"
          class="flex items-center mb-2"
        >
          <span class="flex-1 text-sm text-[#1D2739]">{{ column.label }}</span>
          <!-- <label :for="column.label" class="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100">
            <span class="relative">
              <input :id="column.label" type="checkbox" v-model="column.visible" class="hidden peer toggle">
              <div class="w-10 h-6 rounded-full shadow-inner dark:bg-[#F0F2F5] peer-checked:dark:bg-[#099137]"></div>
              <div class="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-[#FFFFFF]"></div>
            </span>
          </label> -->
          <label :for="column.label" class="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100">
            <span class="relative">
              <input :id="column.label" type="checkbox" v-model="column.visible" class="hidden peer toggle">
              <div class="w-10 h-6 rounded-full shadow-inner bg-gray-300 dark:bg-[#F0F2F5] peer-checked:bg-green-500 peer-checked:dark:bg-[#099137]">
              </div>
              <div class="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow bg-white peer-checked:right-0 peer-checked:left-auto dark:bg-[#FFFFFF]"></div>
            </span>
          </label>
        </div>
        <div class="flex justify-between mt-10 gap-x-6">
          <button
            @click="resetColumns"
            class="bg-[#EBE5E0] w-full font-medium text-[#292929] text-sm px-4 py-2.5 rounded-lg"
          >
            Reset
          </button>
          <button
            @click="saveColumns"
            class="bg-[#292929] text-sm font-medium w-full text-white px-4 py-2.5 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </CoreModal>
  </main>
</template>

<script lang="ts" setup>
import { usePaginatedFetchAndDownload } from '@/composables/core/exportData';
import { useGetTenants } from '@/composables/modules/tenants/fetch'
import { dynamicIcons } from "@/utils/assets";
import { exportData } from "@/composables/core/exportData";
import {  downloadableColumns } from '@/composables/core/exportData'
import { useRouter, useRoute } from "vue-router";
const { exportPaginatedData, isDownloading }  = usePaginatedFetchAndDownload()

import { useClearLocalStorage } from '@/composables/core/useClearLocalStorage';
const { clearLocalStorage } = useClearLocalStorage();
// Define the method to handle the download
const downloadData = (exportType: any) => {
  // Call the export function with the desired format (csv, pdf, or excel)
  exportPaginatedData('/tenants', exportType, 'tenant_data_export', ['firstName', 'rentalApplication.house.name', 'rentalApplication.room.name', 'rentalApplication.room.rentFrequency', 'house.paymentCount', 'status']);
}
const route = useRoute();
const router = useRouter();
const testConfigModal = ref(true);

const deleteModal = ref(false);
const onCancel = () => {
  deleteModal.value = false;
};

const onConfirm = () => {
  deleteModal.value = false;
};

const {
        getTenants,
        loadingTenants,
        tenantsList,
        searchQuery,
        metadata,
        filters,
        setPaginationObj,
        applyFilters, 
} = useGetTenants();

const handlePageChange = (val: any) => {
  metadata.value.page = val || 1;
  getTenants(); // Explicitly call the method to fetch new data
};

const downloadDropdown = ref(false);

const toggleDownloadDropdown = () => {
  downloadDropdown.value = !downloadDropdown.value;
};

const activeTab = ref("property") as any; // Default to step 1

// Set the active tab based on the query parameter
onMounted(() => {
  if (route.query.activeTab) {
    activeTab.value = route.query.activeTab;
  }
});

const tenantConfigModal = ref(false);
const tenantFilterModal = ref(false);

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// State to manage which dropdown is active
const activeDropdown = ref<number | null>(null);

// Function to toggle the dropdown visibility
const toggleDropdown = (index: number) => {
  if (activeDropdown.value === index) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = index;
  }
};

// Function to close the dropdown
const closeDropdown = () => {
  activeDropdown.value = null;
};

const emit = defineEmits(["delete", "deactivate", "duplicate"]);

// Function to handle dropdown option click
const handleDropdownClick = (action: any, item: any) => {
  if (action === "view") {
    return router.push(`/dashboard/tenant-mgt/${item.id}`);
  }

  if (action === "send-message") {
    // return router.push(`/dashboard/messages?userId=${item.id}`);
    router.push({ path: '/dashboard/messages', query: { userId: item.id }})
  }
  closeDropdown();
  emit(action, item);
};

const handleExport = (type: string) => {
  if (type === "csv") {
    exportData(tenantsList.value, "csv", "tenant-listings");
  }

  if (type === "pdf") {
    exportData(tenantsList.value, "pdf", "tenant-listings");
  }

  if (type === "excel") {
    exportData(tenantsList.value, "excel", "tenant-listings");
  }
  downloadDropdown.value = false;
};

const openFilterModal = () => {
  tenantFilterModal.value = true;
};

const handleApplyFilters = (filters: any) => {
  applyFilters(filters);
};

const showModal = ref(false);

// Columns data
const columns = ref([
  { label: "Tenant Name", key: "firstName", visible: true },
  { label: "Current Home", key: "rentalApplication.house.name", visible: true },
  { label: "Room Number", key: "rentalApplication.room.name", visible: true },
  { label: "Frequency", key: "rentalApplication.room.rentFrequency", visible: true },
  { label: "Payment Count", key: "house.paymentCount", visible: false },
  { label: "Current Rental Status", key: "status", visible: true }
]);

// Computed property to get only visible columns
const visibleColumns = computed(() => {
  return columns.value.filter((column) => column.visible);
});

downloadableColumns.value = columns.value

// Function to extract nested properties
const getTenantValue = (tenant: any, key: string) => {
  return key.split(".").reduce((obj, k) => obj && obj[k], tenant) || "N/A";
};

// Function to reset columns visibility
const resetColumns = () => {
  columns.value.forEach((column) => {
    column.visible = true; // Reset all to visible
  });
  showModal.value = false;
};

// Function to save the changes and close modal
const saveColumns = () => {
  showModal.value = false;
};
</script>

<style scoped>
/* Custom styles */
.toggle {
  --tw-translate-x: -100%;
  appearance: none;
  background-color: #ccc;
  width: 3rem;
  height: 1.5rem;
  border-radius: 9999px;
  position: relative;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.toggle::before {
  content: '';
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 1.25rem;
  height: 1.25rem;
  background-color: white;
  border-radius: 9999px;
  transition: transform 0.3s ease;
}

.toggle:checked {
  background-color: #48bb78;
}

.toggle:checked::before {
  transform: translateX(1.5rem);
}

.custom-scrollbar-container {
  max-height: 700px;
  overflow-y: auto;
  overflow-x: auto;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: #5B8469 #F1F1F1; /* For Firefox */
}

.custom-scrollbar-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar-container::-webkit-scrollbar-thumb {
  background-color: #5B8469;
  border-radius: 10px;
}

.custom-scrollbar-container::-webkit-scrollbar-track {
  background-color: #F1F1F1;
}

.custom-scrollbar-container:hover::-webkit-scrollbar-thumb {
  background-color: #5B8469; /* Change on hover for better visibility */
}

</style>
