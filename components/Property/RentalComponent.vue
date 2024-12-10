<template>
  <main class="min-h-screen ">
    <div v-if="!loadingRentals && rentalsList.length" class="border-[0.5px] border-gray-100 rounded-lg">
      <nav class="mb-4">
        <ul class="flex space-x-4 border-b border-gray-100 py-4 px-6">
          <li>
            <a class="pb-3" href="#" @click="setActiveTab('ALL')" :class="activeTab === 'ALL' ? 'text-green-700 font-medium border-b-4 border-[#326543] pb-1' : 'text-[#475367] font-medium'">
              All Applications
            </a>
          </li>
          <li>
            <a class="pb-3" href="#" @click="setActiveTab('PENDING')" :class="activeTab === 'PENDING' ? 'text-green-700 font-medium border-b-4 border-[#326543] pb-1' : 'text-[#475367] font-medium'">
              Pending
            </a>
          </li>
          <li>
            <a class="pb-3" href="#" @click="setActiveTab('APPROVED')" :class="activeTab === 'APPROVED' ? 'text-green-700 font-medium border-b-4 border-[#326543] pb-1' : 'text-[#475367] font-medium'">
              Approved
            </a>
          </li>
          <li>
            <a class="pb-3" href="#" @click="setActiveTab('REJECTED')" :class="activeTab === 'REJECTED' ? 'text-green-700 font-medium border-b-4 border-[#326543] pb-1' : 'text-[#475367] font-medium'">
              Declined
            </a>
          </li>
        </ul>
      </nav>

      <div v-if="filteredApplications.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        <div v-for="(application, index) in filteredApplications" :key="index"
          class="bg-white p-4 rounded-lg cursor-pointer border-[0.5px] border-gray-100"
          @click="router.push(`/dashboard/property/rental-applications/${application?.id}`)">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img v-if="application.tenant.profilePicture" :src="application.tenant.profilePicture"
                alt="Applicant Image" class="w-12 h-12 rounded-lg object-cover mr-4" />
              <img v-else src="@/assets/img/user-avatar.png" alt="Applicant Image"
                class="w-12 h-12 rounded-lg object-cover mr-4" />
              <div>
                <h3 class="text-[#1D2739]">{{ application?.tenant?.firstName }} {{ application?.tenant?.lastName }}</h3>
                <p class="text-sm text-gray-500">{{ application?.tenant?.email }}</p>
              </div>
            </div>
            <div v-if="application.status === 'RENT_ACTIVE'"
              class="bg-blue-100 text-blue-700 px-2.5 py-1.5 rounded-full text-xs font-semibold">
              New
            </div>
            <div v-if="application.status === 'APPROVED'"
              class="bg-green-100 text-green-700 px-2.5 py-1.5 rounded-full text-xs font-semibold">
              Approved
            </div>
            <div v-if="application.status === 'PENDING'"
              class="bg-yellow-100 text-yellow-700 px-2.5 py-1.5 rounded-full text-xs font-semibold">
              Pending
            </div>
            <div v-if="application.status === 'REJECTED'"
              class="bg-red-100 text-red-700 px-2.5 py-1.5 rounded-full text-xs font-semibold">
              Declined
            </div>
          </div>
          <div class="mt-4">
            <p class="text-[#1D2739]">{{ application?.house?.name }}</p>
            <p class="text-sm text-[#667185] font-light">{{ application?.house?.address }}</p>
          </div>
        </div>
      </div>

      <!-- Empty state for filtered results -->
      <div v-else class="text-center py-10 flex justify-center items-center flex-col border rounded-md border-gray-100">
        <svg width="153" height="124" viewBox="0 0 153 124" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="76.5" cy="58" r="52" fill="#EAEAEA"/>
          <circle cx="21.5" cy="25" r="5" fill="#BDBDBD"/>
          <circle cx="18.5" cy="109" r="7" fill="#BDBDBD"/>
          <circle cx="145.5" cy="41" r="7" fill="#BDBDBD"/>
          <circle cx="134.5" cy="14" r="4" fill="#BDBDBD"/>
          <g filter="url(#filter0_b_5289_82141)">
          <rect x="52.5" y="34" width="48" height="48" rx="24" fill="#9D9D9D"/>
          <path d="M77.0294 48C81.0225 48 83.019 48 84.2595 49.1716C85.5 50.3432 85.5 52.2288 85.5 56V60C85.5 63.7712 85.5 65.6569 84.2595 66.8284C83.019 68 81.0225 68 77.0294 68H75.9706C71.9775 68 69.981 68 68.7405 66.8284C67.5 65.6569 67.5 63.7712 67.5 60V56C67.5 52.2288 67.5 50.3432 68.7405 49.1716C69.981 48 71.9775 48 75.9706 48H77.0294Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <path d="M72.5 53H80.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M72.5 58H80.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M72.5 63H76.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </g>
          <defs>
          <filter id="filter0_b_5289_82141" x="44.5" y="26" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="4"/>
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5289_82141"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_5289_82141" result="shape"/>
          </filter>
          </defs>
          </svg>
          
          
        <p class="text-gray-500">No applications found for {{ activeTab }} status.</p>
      </div>
      <CorePagination
      class="mt-10"
     v-if="!loadingRentals && rentalsList.length > 0"
     :total="metadata.total"
     :page="metadata.page"
     :perPage="metadata.perPage"
     :pages="metadata.pages"
     @page-changed="handlePageChange"
   />
    </div>
    <section v-else>
      <div class="rounded-md p-4 w-full mx-auto ">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-6 py-1">
            <div class="h-32 bg-slate-200 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-32 w-full bg-slate-200 rounded col-span-2"></div>
                <div class="h-32 w-full bg-slate-200 rounded col-span-1"></div>
              </div>
              <div class="h-32 w-full bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
     </section>
  </main>
</template>

<script setup lang="ts">
import { useGetRentals } from '@/composables/modules/rentals/fetchAllRentals';
const { loadingRentals, rentalsList, metadata, getRentals } = useGetRentals();
const router = useRouter();

const activeTab = ref('ALL');

// Function to change active tab
const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};

const handlePageChange = (val: any) => {
  metadata.value.page = val || 1;
  getRentals(); // Explicitly call the method to fetch new data
};


// Computed property to filter rental applications based on the active tab
const filteredApplications = computed(() => {
  if (activeTab.value === 'ALL') {
    return rentalsList.value;
  } else {
    return rentalsList.value.filter(application => application.status === activeTab.value);
  }
});
</script>

<style scoped>
/* Optional: Custom styles for better UI control */
</style>
