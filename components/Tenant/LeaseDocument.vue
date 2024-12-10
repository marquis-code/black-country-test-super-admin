<template>
  <div v-if="!leaseDocumentsList?.length && !loading" class="text-center text-gray-500 py-12">
    <img src="@/assets/icons/config-illustration.svg" alt="No transactions" class="h-12 w-12 mx-auto mb-2" />
    <p>No Lease documents available</p>
  </div>
  <section class="my-6" v-if="!leaseDocumentsList?.length && loading">
    <div class="animate-pulse flex space-x-4 h-44 bg-slate-200 rounded"></div>
  </section>

  <section v-else class="grid lg:grid-cols-2 gap-4 mt-6">
  <div class="bg-white rounded-lg p-4 flex flex-col h-[300px]" v-for="itm in leaseDocumentsList" :key="itm">
      <div class="p-2 flex-1 text-sm object-cover rounded-lg shadow-sm overflow-hidden" v-if="!containsHttps(itm?.leaseAgreementContent)" v-html="itm?.leaseAgreementContent"></div>
      <div v-else>
          <iframe
            :src="`https://docs.google.com/viewer?url=${encodeURIComponent(extractUrl(itm?.leaseAgreementContent))}&embedded=true`"
            class="w-full h-44"
            frameborder="0"
           ></iframe>
      </div>
    <div class="flex justify-between items-center mt-4">
      <div class="space-y-1">
        <h6 class="text-base font-semibold text-gray-800">Lease document for {{ itm?.signeeName ?? 'Nil' }}</h6>
        <p class="text-xs text-gray-600">Tenant: <span class="font-medium text-[#1D2739]">{{ itm?.signeeName ?? 'Nil' }}</span></p>
        <p class="text-xs text-gray-600">Last updated: <span class="font-medium text-[#1D2739]">
            {{ moment(itm?.signedAt).format('DD MMMM YYYY, HH:mm:ss') }}</span></p>
      </div>
      <button class="p-2">
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.4922 12H12.5012" stroke="#1D2739" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12.4844 18H12.4934" stroke="#1D2739" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12.5 6H12.509" stroke="#1D2739" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </div>
</section>


</template>

<script lang="ts" setup>
import moment from "moment";
import { useUrlExtractor } from '@/composables/core/useUrlExtractor';
import { useHttpsDetector } from '@/composables/core/useUrlCheck'
import { useFetchLeaseDocuments } from '@/composables/modules/tenants/useFetchLeaseDocuments'
const { leaseDocumentsList, loading } = useFetchLeaseDocuments()
const { containsHttps } = useHttpsDetector();
const { extractUrl } = useUrlExtractor();
</script>

<style scoped>
/* Additional custom styles if needed */
</style>