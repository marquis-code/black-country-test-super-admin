<template>
  <main>
    <main class="min-h-screen">
      <div>
        <section class="lg:flex justify-between items-center overflow-x-auto">
  <div class="flex space-x-6 mb-4 overflow-x-auto scrollbar-hide">
    <span
      @click="activeTab = 'all'"
      :class="[
        activeTab === 'all'
          ? 'border-[#5B8469] border-b-2 text-[#5B8469]'
          : 'text-gray-700',
      ]"
      class="text-sm font-medium text-gray-500 pb-2 cursor-pointer whitespace-nowrap"
    >
      All lease documents
    </span>
    <span
      @click="activeTab = 'pending'"
      :class="[
        activeTab === 'pending'
          ? 'border-[#5B8469] border-b-2 text-[#5B8469]'
          : 'text-gray-700',
      ]"
      class="text-sm font-medium text-gray-500 pb-2 cursor-pointer whitespace-nowrap"
    >
      Pending lease
    </span>
    <span
      @click="activeTab = 'signed'"
      :class="[
        activeTab === 'signed'
          ? 'border-[#5B8469] border-b-2 text-[#5B8469]'
          : 'text-gray-700',
      ]"
      class="text-sm font-medium text-gray-500 pb-2 cursor-pointer whitespace-nowrap"
    >
      Signed lease
    </span>
    <span
      @click="activeTab = 'draft'"
      :class="[
        activeTab === 'draft'
          ? 'border-[#5B8469] border-b-2 text-[#5B8469]'
          : 'text-gray-700',
      ]"
      class="text-sm font-medium text-gray-500 pb-2 cursor-pointer whitespace-nowrap"
    >
      Draft
    </span>
  </div>
  <div class="pb-3">
    <button
      @click="generateLeaseDocument = true"
      class="bg-[#292929] text-white py-3 flex items-center gap-x-2 px-4 text-sm rounded-md whitespace-nowrap"
    >
      <img :src="dynamicIcons('white-add')" />
      New Lease
    </button>
  </div>
</section>

        <section
          v-if="filteredLeaseAgreements.length && !loading"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div
            class="bg-white rounded-lg shadow p-4"
            v-for="lease in filteredLeaseAgreements"
            :key="lease.id"
          >
            <div class="flex justify-between items-start">
              <div class="space-y-2 w-full">
                <div
                  v-if="isLeaseAgreementContentEmpty(lease.leaseAgreementContent)"
                  class="flex justify-center items-center w-full"
                >
                  <img
                    src="@/assets/icons/no-document.svg"
                    alt=""
                    class="h-32 w-full"
                  />
                </div>
                <!-- v-if="!isUrl(selectedLease?.leaseAgreementContent)" -->
              <section v-else>
                <!-- {{ lease.leaseAgreementContent }} -->
                <div
                  v-if="!containsHttps(lease?.leaseAgreementContent)"
                  v-html="shortenedText(lease?.leaseAgreementContent)"
                  class="p-4 rounded-lg text-[10px] overflow-hidden min-h-[150px] max-h-[150px]"
                ></div>
                <div v-else>
                  <iframe
                      :src="`https://docs.google.com/viewer?url=${encodeURIComponent(extractUrl(lease?.leaseAgreementContent))}&embedded=true`"
                      class="w-full h-60"
                      frameborder="0"
                    ></iframe>
                </div>
              </section>
                <div class="flex justify-between items-center">
                  <h6 class="text-base font-semibold text-gray-800 truncate">
                    {{ lease.signeeName ?? "Nil" }}
                  </h6>
                  <div
                    class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                  >
                    <button
                      class="p-2"
                      @click="toggleDropdown(lease.id)"
                      :id="'drop-options-' + lease.id"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4a4a4a"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </button>
                    <div
                      v-if="openDropdown === lease.id"
                      class="absolute right-0 z-10 mt-2 w-60 bg-gray-25 shadow-lg rounded-md"
                    >
                      <ul class="divide-y divide-gray-100">
                        <li class="p-2 text-sm cursor-pointer">
                          <button
                            @click="viewTemplate(lease)"
                            class="flex py-1.5 text-[#1D2739] items-center font-medium gap-x-3"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.9527 9.20449C18.206 9.55974 18.3327 9.73741 18.3327 10.0003C18.3327 10.2632 18.206 10.4409 17.9527 10.7962C16.8143 12.3925 13.907 15.8337 9.99935 15.8337C6.09167 15.8337 3.18443 12.3925 2.04605 10.7962C1.79269 10.4409 1.66602 10.2632 1.66602 10.0003C1.66602 9.73741 1.79269 9.55974 2.04605 9.20449C3.18443 7.60819 6.09167 4.16699 9.99935 4.16699C13.907 4.16699 16.8143 7.60819 17.9527 9.20449Z"
                                stroke="#5B8469"
                                stroke-width="1.5"
                              />
                              <path
                                d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z"
                                stroke="#5B8469"
                                stroke-width="1.5"
                              />
                            </svg>

                            View
                          </button>
                        </li>
                        <li
                          v-if="lease.status === 'DRAFT'"
                          class="p-2 text-sm cursor-pointer"
                        >
                          <button
                            @click="sendNow(lease)"
                            class="flex py-1.5 text-[#1D2739] items-center font-medium gap-x-3"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.5404 2.54378C15.7254 0.589142 2.07272 5.37734 2.08399 7.12551C2.09677 9.10792 7.41572 9.71776 8.88998 10.1314C9.77657 10.3801 10.014 10.6351 10.2184 11.5648C11.1442 15.7751 11.6091 17.8693 12.6685 17.916C14.3571 17.9907 19.3117 4.45134 17.5404 2.54378Z"
                                stroke="#5B8469"
                                stroke-width="1.5"
                              />
                              <path
                                d="M9.58398 10.4167L12.5007 7.5"
                                stroke="#5B8469"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>

                            Send now
                          </button>
                        </li>
                        <li
                          v-if="lease.status === 'DRAFT'"
                          class="p-2 text-sm cursor-pointer"
                        >
                          <button
                            @click="duplicateTemplate(lease)"
                            class="flex py-1.5 text-[#1D2739] items-center font-medium gap-x-3"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.3333 1.66699H10C7.64298 1.66699 6.46447 1.66699 5.73223 2.45555C5 3.24411 5 4.51328 5 7.05161V7.94904C5 10.4874 5 11.7566 5.73223 12.5451C6.46447 13.3337 7.64298 13.3337 10 13.3337H13.3333C15.6903 13.3337 16.8688 13.3337 17.6011 12.5451C18.3333 11.7566 18.3333 10.4874 18.3333 7.94904V7.05161C18.3333 4.51328 18.3333 3.24411 17.6011 2.45555C16.8688 1.66699 15.6903 1.66699 13.3333 1.66699Z"
                                stroke="#5B8469"
                                stroke-width="1.5"
                              />
                              <path
                                d="M14.9993 13.8405C14.9893 15.7951 14.9088 16.8536 14.2685 17.5441C13.5362 18.3337 12.3575 18.3337 10.0003 18.3337H6.66656C4.30928 18.3337 3.13064 18.3337 2.39833 17.5441C1.66602 16.7544 1.66602 15.4836 1.66602 12.9418V12.0432C1.66602 9.50149 1.66602 8.23064 2.39833 7.44103C2.93281 6.86474 3.70503 6.70905 4.99971 6.66699"
                                stroke="#5B8469"
                                stroke-width="1.5"
                              />
                            </svg>

                            Duplicate
                          </button>
                        </li>
                        <li
                          v-if="lease.status === 'SIGNED'"
                          class="p-2 text-sm cursor-pointer"
                        >
                          <button
                            :disabled="isDownloading"
                             @click="downloadTemplate(lease)"
                            class="flex py-1.5 text-[#1D2739] disabled:cursor-not-allowed disabled:opacity-25 items-center font-medium gap-x-3"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.99935 12.0833V3.75M9.99935 12.0833C9.41585 12.0833 8.32562 10.4214 7.91602 10M9.99935 12.0833C10.5828 12.0833 11.6731 10.4214 12.0827 10"
                                stroke="#5B8469"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M16.6673 13.75C16.6673 15.8183 16.2357 16.25 14.1673 16.25H5.83398C3.76565 16.25 3.33398 15.8183 3.33398 13.75"
                                stroke="#5B8469"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            {{ isDownloading ? 'downloading...' : 'Preview & Download'}}
                          </button>
                        </li>
                        <li
                         v-if="lease.status === 'DRAFT'"
                          class="p-2 text-sm cursor-pointer"
                        >
                          <button
                            @click="deleteLeaseAgreement(lease)"
                            :disabled="deleting"
                            class="flex py-1.5 text-[#1D2739] disabled:cursor-not-allowed disabled:opacity-25 items-center font-medium gap-x-3"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.25 4.58301L15.9152 10.0048M3.75 4.58301L4.25384 12.937C4.38287 15.0765 4.4474 16.1463 4.98223 16.9155C5.24667 17.2958 5.58733 17.6169 5.98254 17.8582C6.54196 18.1997 7.23423 18.3023 8.33333 18.333"
                                stroke="#5B8469"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                              <path
                                d="M16.6673 12.5L10.834 18.3329M16.6673 18.3333L10.834 12.5004"
                                stroke="#5B8469"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M2.5 4.58366H17.5M13.3797 4.58366L12.8109 3.4101C12.433 2.63054 12.244 2.24076 11.9181 1.99767C11.8458 1.94374 11.7693 1.89578 11.6892 1.85424C11.3283 1.66699 10.8951 1.66699 10.0287 1.66699C9.14067 1.66699 8.69667 1.66699 8.32973 1.86209C8.24842 1.90533 8.17082 1.95524 8.09774 2.0113C7.76803 2.26424 7.58386 2.66828 7.21551 3.47638L6.71077 4.58366"
                                stroke="#5B8469"
                                stroke-width="1.5"
                                stroke-linecap="round"
                              />
                            </svg>

                            {{ deleting ? "processing..." : "Delete" }}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p class="text-xs text-gray-600">
                  Tenant:
                  <span class="font-medium text-[#1D2739]"
                    >{{ user.firstName }} {{ user.lastName }}</span
                  >
                </p>
                <p class="text-xs text-gray-600">
                  Last updated:
                  <span class="font-medium text-[#1D2739]">{{
                    moment(lease.createdAt).format("DD MMM, YYYY")
                  }}</span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section v-else-if="!filteredLeaseAgreements.length && fetching">
          <div class="rounded-md p-4 w-full mx-auto">
            <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-6 py-1">
                <div class="h-32 bg-slate-200 rounded"></div>
                <div class="space-y-3">
                  <div class="grid grid-cols-3 gap-4">
                    <div
                      class="h-32 w-full bg-slate-200 rounded col-span-2"
                    ></div>
                    <div
                      class="h-32 w-full bg-slate-200 rounded col-span-1"
                    ></div>
                  </div>
                  <div class="h-32 w-full bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          v-else
          class="flex justify-center items-center flex-col h-96 bg-white rounded-md border-[0.5px] border-gray-100"
        >
          <img src="@/assets/icons/empty-state.svg" alt="" />
          <p class="text-[#1D2739]">No document found</p>
        </div>
      </div>
    </main>

    <div
      v-if="showPreview"
      class="fixed inset-0 bg-gray-800 z-50 bg-opacity-50 flex items-center justify-center"
    >
   <section class="bg-white py-4 rounded-t-lg">
      <h2 class="text-lg font-semibold mb-4 pl-10">Preview Document and download</h2>
    <div class="bg-white p-6 rounded-lg max-w-2xl w-full h-[500px] overflow-y-auto">
     <div  ref="leaseAgreementContent">
      <div
      v-html="selectedLease?.leaseAgreementContent"
      class="p-4"
    ></div>
    <div class="mt-6 px-6">
      <h2 class="text- font-medium mb-2">Signature</h2>
      <p class="text-gray-500 mb-6">
        The parties hereto have executed this Lease Agreement as of the
        date first above written.
      </p>

      <div class="mb-4">
        <h3 class="text-sm font-medium mb-2">
          Landlord/Property Manager:
        </h3>
        <label class="block text-sm text-gray-500 mb-1">Signature</label>
        <img :src="selectedLease?.houseOwnerSignatureUrl" alt="Signature"
        class="w-full border-b-2 border-dotted py-2 mb-4  bg-transparent outline-none placeholder-gray-400" />
        <label class="block text-sm text-gray-500 mb-1">Full Name</label>
        <div class="border-b-2 border-dotted text-gray-800 py-2 mb-4">
          {{ selectedLease?.houseOwnerSigneeName }}
        </div>
        <label class="block text-sm text-gray-500 mb-1">Date</label>
        <div class="border-b-2 border-dotted text-gray-800 py-2 mb-8">
          {{ moment(selectedLease?.signedAt).format('DD MMMM YYYY, HH:mm:ss') }}
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-base font-medium mb-2">Tenant:</h3>
        <label class="block text-sm text-gray-500 mb-1">Full Name</label>
          <div class="border-b-2 border-dotted text-gray-800 py-2 mb-4">
              {{ selectedLease?.signeeName }}
            </div>
        <label class="block text-sm text-gray-500 mb-1">Signature</label>
        <img :src="selectedLease?.signatureUrl" alt="Signature"
          class="w-full border-b-2 border-dotted py-2 mb-4 bg-transparent outline-none placeholder-gray-400" />
        <label class="block text-sm text-gray-500 mb-1">Date</label>
        <div class="border-b-2 border-dotted text-gray-800 py-2 mb-8">
          {{ moment(selectedLease?.createdAt).format('DD MMMM YYYY, HH:mm:ss') }}
        </div>
      </div>
    </div>
     </div>
   <div class="w-full flex justify-between items-center gap-x-4">
    <button
    @click="showPreview = false"
    class="px-4 py-3.5 bg-red-500 w-full text-white rounded-md flex justify-center items-center"
  >
    Close
  </button>
  <button :disabled="isDownloading"  @click="downloadAgreement" class="bg-[#292929] w-full disabled:cursor-not-allowed disabled:opacity-25 text-white px-6 py-3.5 rounded-lg flex justify-center items-center gap-x-2">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99935 12.0833V3.75M9.99935 12.0833C9.41585 12.0833 8.32562 10.4214 7.91602 10M9.99935 12.0833C10.5828 12.0833 11.6731 10.4214 12.0827 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.6673 13.75C16.6673 15.8183 16.2357 16.25 14.1673 16.25H5.83398C3.76565 16.25 3.33398 15.8183 3.33398 13.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {{  isDownloading ? 'downloading...' : 'Download' }}
</button>
   </div>
    </div>
   </section>
    </div>

    <PropertyGenerateLeaseAgreementModal
      v-if="generateLeaseDocument"
      @close="generateLeaseDocument = false"
    />
  </main>
</template>

<script setup lang="ts">
import moment from "moment";
import { useUrlExtractor } from '@/composables/core/useUrlExtractor';
import { useHttpsDetector } from '@/composables/core/useUrlCheck'
import { useSaveAndSend } from '@/composables/modules/lease/saveAndSend';
import { useUser } from "@/composables/auth/user";
import { useDeleteLeaseTemplate } from "@/composables/modules/lease/delete";
import { useFetchLeaseAgreement } from "@/composables/modules/lease/fetchLeaseAgreements";
import { useFetchLeaseTemplate } from "@/composables/modules/lease/fetch";
import { dynamicIcons } from "@/utils/assets";
import { useDownloadPdf } from '@/composables/core/useDownloadPdf'; 
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
import { useRouter } from "vue-router";
const { deleteLeaseTemplate, loading: deleting } = useDeleteLeaseTemplate();
const { setSaveAndSendPayloadObj, handleSaveAndSend, processingSaveAndSend } = useSaveAndSend();
const { containsHttps } = useHttpsDetector();
const { extractUrl } = useUrlExtractor();

const { downloadPdf, isDownloading } = useDownloadPdf();

const leaseAgreementContent = ref(null); // Reference for the lease agreement content

const openDropdown = ref<number | null>(null);
const toggleDropdown = (id: number) => {
  openDropdown.value = openDropdown.value === id ? null : id;
};

// Close dropdown when clicking outside the specific row
const handleClickOutside = (event: MouseEvent) => {
  const dropdownId = `drop-options-${openDropdown.value}`;
  const dropdownButton = document.getElementById(dropdownId);
  if (dropdownButton && !dropdownButton.contains(event.target as Node)) {
    openDropdown.value = null;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const { user } = useUser();
const { loading: fetching, leaseAgreementList } = useFetchLeaseAgreement();
const { loading, leaseTemplateList } = useFetchLeaseTemplate();
const generateLeaseDocument = ref(false);
const dropdownVisible = ref<null | number>(null);
const activeTab = ref("all");
const router = useRouter();
const selectedLease = ref({});

// Grouping the lease agreements based on their status
const groupedLeaseAgreements = computed(() => {
  return {
    all: leaseAgreementList.value,
    pending: leaseAgreementList.value.filter(
      (lease) => lease.status === "PENDING_SIGNAGE"
    ),
    signed: leaseAgreementList.value.filter(
      (lease) => lease.status === "SIGNED"
    ),
    draft: leaseAgreementList.value.filter((lease) => lease.status === "DRAFT"),
  };
});

// Filtered list based on the active tab
const filteredLeaseAgreements = computed(() => {
  if (activeTab.value === "all") return groupedLeaseAgreements.value.all;
  if (activeTab.value === "pending")
    return groupedLeaseAgreements.value.pending;
  if (activeTab.value === "signed") return groupedLeaseAgreements.value.signed;
  if (activeTab.value === "draft") return groupedLeaseAgreements.value.draft;
  return [];
});

const shortenedText = (text: string) => {
  const maxLength = 2000;
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const showPreview = ref(false);

// const toggleDropdown = (id: number) => {
//   dropdownVisible.value = dropdownVisible.value === id ? null : id;
// };

const viewTemplate = (itm: any) => {
  // showPreview.value = true
  selectedLease.value = itm;
  localStorage.setItem("selected-lease-document", JSON.stringify(itm));
  router.push(`/dashboard/property/lease-documents/${itm.id}/preview`);
  dropdownVisible.value = null;
};

const sendNow = async (item: any) => {
  console.log(item, 'item here')
  selectedLease.value = item
  if (!item?.signatureUrl) {
    showToast({
      title: "Error",
      message: 'You need to sign before you can send the lease agreement.',
      toastType: "error",
      duration: 3000,
    });
    return;
  }

  const reqPayload = {
    leaseAgreement: item.leaseAgreementContent,
    isPublished: true,
    houseOwnerSigneeName: item?.houseOwnerSigneeName,
    houseOwnerSignatureUrl: item?.houseOwnerSignatureUrl
  };

  setSaveAndSendPayloadObj(reqPayload);
  await handleSaveAndSend(item?.rentalApplication?.tenant?.id, item?.rentalApplication?.house?.id);
  // dropdownVisible.value = null;
};

const duplicateTemplate = (itm: any) => {
  dropdownVisible.value = null;
};

const downloadAgreement = async () => {
  console.log(selectedLease.value)
  if (selectedLease.value) {
    await downloadPdf(leaseAgreementContent.value, `${selectedLease.value?.rentalApplication?.house?.name}-lease-agreement`); // Pass the ref element directly
    showPreview.value = false
  } else {
    showToast({
          title: "Error",
          message: "No lease agreement content available",
          toastType: "error",
          duration: 3000
        });
  }
};

const downloadTemplate = (item: any) => {
  selectedLease.value = item
  showPreview.value = true
};

const deleteLeaseAgreement = async (itm: any) => {
  await deleteLeaseTemplate(itm.id);
  // dropdownVisible.value = null;
};

const isLeaseAgreementContentEmpty = (content: string) => {
  // Create a new DOM parser to parse the HTML content
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  // Check if the parsed HTML body is empty (no text or meaningful content)
  return !doc.body.textContent?.trim();
};
</script>


<style scoped>
.pdf-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
