<template>
    <main>
      <div class="flex flex-wrap gap-5 justify-between items-center mb-4">
        <div class="flex space-x-2">
          <button @click="propertyFilterModal = true" class="flex items-center text-sm space-x-1 bg-[#F0F2F5] border-[#F0F2F5] border text-gray-700 px-2 py-2 rounded transition-all">
            <img :src="dynamicIcons('gray-filter')" />
            <span>Filter</span>
          </button>
          <div class="relative w-full">
            <input  v-model="filters.searchQuery" type="text" placeholder="Search members by name..." class="bg-[#F0F2F5] pl-10 border-[#F0F2F5] border text-sm text-gray-700 px-4 py-3 rounded w-full sm:w-64 focus:outline-none focus:bg-white transition-all"/>
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
          <button  @click="toggleDownloadDropdown" class="flex items-center space-x-1 text-sm px-2 bg-[#F0F2F5] border-[#F0F2F5] border text-gray-700 py-2 rounded hover:bg-gray-200 transition-all">
            <img :src="dynamicIcons('gray-download')" />
            <span>Export</span>
          </button>
          <div
          v-if="downloadDropdown"
          class="absolute right-0 sm:right-4 z-50 top-[150px] mt-2 bg-white border border-gray-200 w-44 rounded-lg shadow-lg"
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
                          <!-- New Property Button -->
                          <button @click="isInviteModalOpen =  true" class="bg-[#292929] px-2 flex items-center text-sm text-white py-2 rounded hover:bg-gray-800 transition-all">
                            <img :src="dynamicIcons('white-add')" /> New Member
                          </button>
        </div>
      </div>
  
      <div>
        <div
          v-if="membersList && !loadingMembers"
          class="bg-white rounded-lg overflow-hidden"
        >
          <div class="custom-scrollbar-container">
            <table class="min-w-full bg-white">
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
              <tbody class="divide-y divide-gray-50 z-10">
                <tr
                  class="cursor-pointer"
                  v-for="(member, index) in processedData"
                  :key="member.id"
                >
                <td
                    @click.prevent="handleDropdownClick('view', member)"
                    v-for="column in visibleColumns"
                    :key="column.key"
                    class="py-5 px-5 whitespace-nowrap text-sm text-[#667185] font-semibold relative"
                  >
                    <!-- Handle Full Name -->
                    <p v-if="column.label === 'Full Name'">
                      {{ `${member.firstName ?? "--"} ${member.lastName ?? "--"}` }}
                    </p>

                    <!-- Handle other columns except Role and Status -->
                    <p v-if="column.label !== 'Status' && column.label !== 'Role' && column.label !== 'Full Name'">
                      {{ getPropertyValue(member, column.key) }}
                    </p>

                    <!-- Handle Role column -->
                    <p v-if="column.label === 'Role'">
                      {{ member.group === 'INVITATION' ? member.role : member.group }}
                    </p>

                    <!-- Handle Status column -->
                    <p class="absolute left-0 top-10" v-if="column.label === 'Status'">
                      <span :class="[member.isActive ? 'bg-green-500' : 'bg-red-500']" class="rounded-full px-3 py-2 text-white text-sm">
                        {{ member.isActive ? 'active' : 'Pending' }}
                      </span>
                    </p>
                  </td>

                  <!-- <td
                    @click.prevent="handleDropdownClick('view', member)"
                    v-for="column in visibleColumns"
                    :key="column.key"
                    class="py-5 px-5 whitespace-nowrap text-sm text-[#667185] font-semibold relative"
                  >
                    <p v-if="column.label !== 'Status'">{{ getPropertyValue(member, column.key) }}</p>
          
                    <p v-if="column.label === 'Role'">
                      {{ member.group === 'INVITATION' ? member.role : member.group }}
                    </p>
                    <p class="absolute left-0 top-10" v-if="column.label === 'Status'">
                      <span :class="[ member.isActive ? 'bg-green-500' : 'bg-red-500']" class="rounded-full  px-3 py-2 text-white text-sm">
                       {{ member.isActive ? 'active' : 'Pending'}}
                      </span>
                    </p>
                  </td> -->
                  <td class="py-5 px-5 whitespace-nowrap text-sm text-right">
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
                      class="absolute right-16 z-50 mt-2 w- bg-white border border-gray-200 rounded-md shadow-lg"
                    >
                      <ul class="py-1 text-sm text-gray-700 divide divide-y-[0.5px]">
                        <li>
                          <a
                            @click.prevent="handleDropdownClick('view', member)"
                            href="#"
                            class="block flex items-center gap-x-2 px-4 py-3 hover:bg-gray-100 text-start"
                          >
                            <img :src="dynamicIcons('view-property')" />
                            View Member
                          </a>
                        </li>
                        <li>
                          <a
                            @click.prevent="handleDropdownClick('deactivate', member)"
                            href="#"
                            class="block flex items-center gap-x-2 px-4 py-3 hover:bg-gray-100 text-start"
                          >
                            <img :src="dynamicIcons('edit-property')" />
                            Deactivate User
                          </a>
                        </li>
                        <li>
                          <a
                            @click.prevent="handleDropdownClick('remove', member)"
                            href="#"
                            class="block flex items-center gap-x-2 px-4 py-3 hover:bg-gray-100 text-start"
                          >
                            <img :src="dynamicIcons('duplicate-property')" />
                            Remove User
                          </a>
                        </li>
                        <!-- <li>
                          <a
                            @click.prevent="handleDropdownClick('deactivate', property)"
                            href="#"
                            class="block flex items-center gap-x-2 px-4 py-3 hover:bg-gray-100 text-start"
                          >
                            <img :src="dynamicIcons('deactivate-property')" />
                            {{property.isPublished ? 'Deactivate property' : 'Activate property'}}
                          </a>
                        </li>
                        <li>
                          <a
                            @click.prevent="handleDropdownClick('delete', property)"
                            href="#"
                            class="block flex items-center gap-x-2 px-4 py-3 hover:bg-gray-100 text-start"
                          >
                            <img :src="dynamicIcons('delete-property')" />
                            Delete property
                          </a>
                        </li> -->
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            v-if="activeDropdown !== null"
            @click="closeDropdown"
            class="fixed inset-0 z-40 bg-black opacity-25"
          ></div>
          <CorePagination
            v-if="!loadingMembers && membersList.length > 0"
            :total="metadata.total"
            :page="metadata.page"
            :perPage="metadata.perPage"
            :pages="metadata.pages"
            @page-changed="handlePageChange"
          />
        </div>
        <div
          v-if="loadingMembers && membersList.length === 0"
          class="h-32 bg-slate-200 rounded animate-pulse w-full m-3"
        ></div>
        <div
          v-if="!loadingMembers && membersList.length === 0"
          class="flex justify-center items-center flex-col my-20"
        >
          <div class="flex justify-center items-center">
            <!-- SVG and text content for "No properties found" -->
          </div>
        </div>
      </div>
      
  
      <PropertyConfigTableModal
        v-if="propertyConfigModal"
        @close="propertyConfigModal = false"
      />
      <PropertyFilterModal
        v-if="propertyFilterModal"
        @close="propertyFilterModal = false"
        @applyFilters="handleApplyFilters"
      />
  
      <CoreModal :showCloseBtn="false" title="Configure Table" :isOpen="showModal" @close="showModal = false">
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

      <MembersInviteMemberModal class="" :isOpen="isInviteModalOpen" @close="closeInviteModal" />
    </main>
  </template>
  
  <script lang="ts" setup>
  import { usePaginatedFetchAndDownload } from '@/composables/core/exportData';
  import { useGetMembers } from "@/composables/modules/member/fetch";
  import { dynamicIcons } from "@/utils/assets";
  import { exportData } from "@/composables/core/exportData";
  import {  downloadableColumns } from '@/composables/core/exportData'
  import { useRouter, useRoute } from "vue-router";
  const { exportPaginatedData, isDownloading }  = usePaginatedFetchAndDownload()

  const downloadData = (exportType: any) => {
    exportPaginatedData('/members', exportType, 'members_data_export', ['firstName', 'lastName', 'email', 'status', 'role' ]);
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
    loadingMembers,
    membersList,
    searchQuery,
    filters,
    metadata,
    getMembers,
    applyFilters,
  } = useGetMembers();
  
  const handlePageChange = (val: any) => {
    metadata.value.page = val || 1;
    getMembers(); // Explicitly call the method to fetch new data
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
  
  const propertyConfigModal = ref(false);
  const propertyFilterModal = ref(false);
  
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
    console.log(item)
    if (action === "view") {
      return router.push(`/dashboard/members/${item.id}`);
    }

    if (action === "deactivate") {
      // return router.push(`/dashboard/members/${item.id}`);
    }

    if (action === "remive") {
      // return router.push(`/dashboard/members/${item.id}`);
    }
  
    // if (action === "edit") {
    //   return router.push(`/dashboard/members/${item.id}/edit`);
    // }
    closeDropdown();
    emit(action, item);
  };
  
  const handleExport = (type: string) => {
    if (type === "csv") {
      exportData(membersList.value, "csv", "property-listings");
    }
  
    if (type === "pdf") {
      exportData(membersList.value, "pdf", "property-listings");
    }
  
    if (type === "excel") {
      exportData(membersList.value, "excel", "property-listings");
    }
    downloadDropdown.value = false;
  };
  
  const openFilterModal = () => {
    propertyFilterModal.value = true;
  };
  
  const handleApplyFilters = (filters: any) => {
    applyFilters(filters);
  };
  
  const showModal = ref(false);
  
  // // Columns data
  const columns = ref([
    { label: "Full Name", key: "fullName", visible: true },
    { label: "Email", key: "email", visible: true },
    { label: "Role", key: "group", visible: true },
    { label: "Status", key: "isActive", visible: true },
    { label: "Last Active", key: "lastActive", visible: false },
    { label: "Group", key: "group", visible: false },
    { label: "Date Added", key: "createdAt", visible: false },
  ]);

// // Columns data
// const columns = ref([
//   { label: "Full Name", key: "fullName", visible: true },
//   { label: "Email", key: "email", visible: true },
//   {
//     label: "Role",
//     key: checkKey("group", "role"),
//     visible: true,
//   },
//   { label: "Status", key: "isActive", visible: true },
//   { label: "Last Active", key: "lastActive", visible: false },
//   { label: "Group", key: "group", visible: false },
//   { label: "Date Added", key: "createdAt", visible: false },
// ]);

// // Helper function to check key availability
// function checkKey(primaryKey, fallbackKey) {
//   const sampleMember = members.value[0];
//   return sampleMember && primaryKey in sampleMember ? primaryKey : fallbackKey;
// }

  // Concatenate firstName and lastName into fullName
const processedData = computed(() => {
  return membersList.value.map((item: any) => ({
    ...item,
    fullName: `${item.firstName} ${item.lastName}`
  }));
});
  
  // Computed property to get only visible columns
  const visibleColumns = computed(() => {
    return columns.value.filter((column) => column.visible);
  });
  
  downloadableColumns.value = columns.value
  
  // Function to extract nested properties
  const getPropertyValue = (property: any, key: string) => {
    return key.split(".").reduce((obj, k) => obj && obj[k], property) || "N/A";
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


  const isInviteModalOpen = ref(false);

const openInviteModal = () => {
  isInviteModalOpen.value = true;
};

const closeInviteModal = () => {
    isInviteModalOpen.value = false;
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
    max-height: 600px;
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
  