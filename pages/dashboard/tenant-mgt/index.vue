<template>
  <Layout>
    <template #header-content>
      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-between">
        <div class="flex items-center gap-x-4">
          <h4 class="text-[#1D2739] text-lg">Tenant Management</h4>
          <div class="hidden lg:flex gap-x-4">
            <button
              type="button"
              @click="setActiveTab('tenants')"
              :class="[
                activeTab === 'tenants'
                  ? 'bg-[#5B8469] text-white'
                  : 'text-[#292929] text-sm bg-[#F0F2F5]',
              ]"
              class="font-medium text-sm px-4 py-2 rounded-md"
            >
              Tenants
            </button>
            <button
             type="button"
              @click="setActiveTab('maintenance-request')"
              :class="[
                activeTab === 'maintenance-request'
                  ? 'bg-[#5B8469] text-white'
                  : 'text-[#292929] text-sm bg-[#F0F2F5]',
              ]"
              class="px-4 py-2 text-sm rounded-md"
            >
              Manintenance request
            </button>
          </div>
        </div>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <NuxtLink
            to="/dashboard/notification"
            class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">View notifications</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </NuxtLink>
          <div
            class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
            aria-hidden="true"
          ></div>
          <div class="relative">
            <button
              type="button"
              @click="router.push('/dashboard/profile')"
              class="-m-1.5 flex items-center p-1.5"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span class="sr-only">Open user menu</span>
              <p class="bg-gray-900 text-white p-3 font-semibold rounded-lg">
                {{ initials }}
              </p>

              <span class="hidden lg:flex lg:items-center">
                <div>
                  <span
                    v-if="user"
                    class="ml-4 text-sm py-0 my-0 font-semibold block leading-6 text-gray-900"
                    aria-hidden="true"
                  >
                    {{ user?.firstName }} {{ user?.lastName }}</span
                  >
                  <span
                    class="text-sm py-0 my-0 font-light text-[#667185] block"
                    >Super admin</span
                  >
                </div>
                <svg
                  class="cursor-pointer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
                    stroke="#1D2739"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </template>
    
    <TenantsList v-if="activeTab === 'tenants'" />
    <TenantsMaintenenceRequests :showTabs="true"  v-if="activeTab === 'maintenance-request'" />
  </Layout>
</template>

<script lang="ts" setup>
import { useUserInitials } from "@/composables/core/useUserInitials";
import { useUser } from "@/composables/auth/user";
import Layout from "@/layouts/dashboard.vue";
const { user } = useUser();
const router = useRouter();
const route = useRoute();

const initials = ref("") as any;

const activeTab = ref(""); // Default active tab

onMounted(() => {
  // Get initials from the composable
  const { getInitials } = useUserInitials(user.value);
  initials.value = getInitials.value;
  watch(
      () => route.query.activeTab,
      (newActiveTab) => {
        if (!newActiveTab?.length) {
          setActiveTab('tenants'); // Set default active tab
        } else {
          setActiveTab(newActiveTab); // Update active tab
        }
      },
      { immediate: true } // Trigger the watcher immediately on page load
    );
});



const setTab = (item: string) => {
  activeTab.value = item;
};

// Function to change the active tab and update the query parameter
const setActiveTab = (tab: string) => {
  activeTab.value = tab;
  // Update the URL query parameter to reflect the active tab
  router.push({ query: { ...route.query, activeTab: tab } });
};

</script>
