<template>
  <Layout>
    <template #header-content>
      <div v-if="!loading"
        class="flex justify-between items-center p-4 w-full"
      >
        <div class="flex items-center space-x-5">
          <button
            @click="router.back()"
            class="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-md"
          >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 5C12.5 5 7.50001 8.68242 7.5 10C7.49999 11.3177 12.5 15 12.5 15" stroke="#292929" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
            Back
          </button>
          <span class="text-xl font-medium text-[#1D2739]">{{rentalObj?.tenant?.firstName}} {{rentalObj?.tenant?.lastName}}</span>
        </div>

        <p
          :class="`${computedColorMap(rentalObj.status)} text-sm px-3 py-2 rounded-lg border-[0.5px]`"
        >
          {{ rentalObj.status }}
        </p>

        <!-- <p class="text-sm px-3 py-2 rounded-lg border-[0.5px]">{{ rentalObj.status }}</p> -->
        <!-- <div v-if="rentalObj.status !== 'PENDING'" class="flex space-x-4">
          <button v-if="rentalObj.status === 'APPROVED'" @click="declineModal = true" class="bg-[#EBE5E0] text-sm text-[#292929] px-6 py-2.5 rounded-md">
            Decline
          </button>
          <button v-if="rentalObj.status !== 'APPROVED'" @click="approveModal = true" class="bg-[#292929] text-white px-6 py-2.5 text-sm rounded-md">
            Approve
          </button>
        </div> -->
        <div v-if="rentalObj.status === 'PENDING'" class="flex space-x-4">
          <button @click="declineModal = true" class="bg-[#EBE5E0] text-sm text-[#292929] px-6 py-2.5 rounded-md">
            Decline
          </button>
          <button @click="approveModal = true" class="bg-[#292929] text-white px-6 py-2.5 text-sm rounded-md">
            Approve
          </button>
        </div>
      </div>
      <section v-else>
          <div class="h-16 animate-pulse bg-slate-400 rounded w-full"></div>
       </section>
    </template>
    <main v-if="!loading && Object.keys(rentalObj).length" class="min-h-screen">
      <div class="md:flex max-w-6xl mx-auto">
        <!-- Sidebar -->
        <div class="lg:mr-6 lg:max-w-5xl lg:w-96">
          <PropertyApplicantProfile :rentalObj="rentalObj" />
        </div>

        <!-- Main Content -->
        <div class="flex-1 p-6 lg:max-w-6xl">
          <div>
            <PropertyApplicantDetails :rentalObj="rentalObj" />
          </div>
        </div>
      </div>
    </main>
    <section v-else>
      <div class="rounded-md p-4 w-full mx-auto mt-10">
        <div class="animate-pulse flex space-x-4">
          <!-- <div class="rounded-md bg-slate-200 h-44 w-44"></div> -->
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

             <!-- Reusable Modal for Delete Property -->
             <CoreReusableModal :isOpen="approveModal" :loading="approving" @close="approveModal = false" @confirm="handleConfirmApproval"
             title="Approve application"  :message="`You are confirming yor decision to approve the application sent by ${rentalObj?.tenant?.firstName} ${rentalObj?.tenant?.lastName}`" confirmButtonText="Yes, continue"
             cancelButtonText="No, Cancel" />
       
           <!-- Reusable Modal for Deactivate Property -->
           <CoreReusableModal :isOpen="declineModal" :loading="declining" @close="declineModal = false" @confirm="handleDisapproval"
           title="Decline application" :message="`You are confirming yor decision to reject the application sent by ${rentalObj?.tenant?.firstName} ${rentalObj?.tenant?.lastName}`"
           confirmButtonText="Yes, Continue" cancelButtonText="No, Cancel" />

           <CoreModal :showCloseBtn="false" :isOpen="showReasonModal" title="Decline application">
              <div class="bg-white rounded-lg shadow-lgw-full max-w-md">
          
                <!-- Subtitle -->
                <p class="text-gray-600 mb-2 text-sm">What’s your reason for rejecting this application</p>
          
                <!-- Textarea for reason input -->
                <textarea
                  v-model="reason"
                  placeholder="Enter your reason"
                  class="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:border-gray-400 resize-none"
                  rows="4"
                ></textarea>
          
                <!-- Buttons -->
                <div class="flex justify-between w-full gap-x-4 items-center mt-6">
                  <button
                    @click="showReasonModal = false"
                    class="py-3.5 px-6 border w-full border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                      :disabled="declining"
                    @click="continueAction"
                    class="py-3.5 px-6 bg-gray-800 w-full disabled:cursor-not-allowed disabled:opacity-25 text-white rounded-lg hover:bg-gray-900 focus:outline-none"
                  >
                     {{declining ? 'processing....' : 'Continue'}}
                  </button>
                </div>
              </div>
           </CoreModal>
  </Layout>
</template>

<script lang="ts" setup>
import { useDeclineRental } from '@/composables/modules/rentals/decline'
import { useApproveRental } from '@/composables/modules/rentals/approve'
import { useFetchRental } from '@/composables/modules/rentals/fetchRentalsById';
const { rentalObj, loading } = useFetchRental();
const { declineRentalApplication, loading: declining } = useDeclineRental()
const { approveRentalApplication, loading: approving } = useApproveRental()
const router = useRouter()
import Layout from "@/layouts/dashboard.vue";
const approveModal = ref(false);
const declineModal = ref(false);
const showReasonModal = ref(false)

// State for reason
const reason = ref('');

// Cancel action
const cancel = () => {
  reason.value = '';
  // You can add other logic if needed
};

// const  computedColorMap = (status: any) => {
//     const colorMap = {
//        'PENDING' : 'text-[#DD900D] bg-[#FEF6E7]',
//        'APPROVED' : 'bg-[#E7F6EC] text-[#099137]',
//        'DECLINED' : 'bg-[#FBEAE9] text-[#D92D20]'
//     }

//     return colorMap[status] ?? 'Nil'
// }

const computedColorMap = (status) => {
  const colorMap = {
    PENDING: 'text-[#DD900D] bg-[#FEF6E7]',
    APPROVED: 'bg-[#E7F6EC] text-[#099137]',
    REJECTED: 'bg-[#FBEAE9] text-[#D92D20]',
    RENT_ACTIVE: 'text-[#1D4ED8] bg-[#E8EDFB]'
  };

  return colorMap[status] ?? 'Nil';
};

// Continue action
const continueAction = async () => {
  const payload = { reason: reason.value }
  await declineRentalApplication(rentalObj.value.id, payload)
  showReasonModal.value = false
};



const handleConfirmApproval = async () => {
  const payload = { reason: reason.value }
    await approveRentalApplication(rentalObj.value.id, payload)
    approveModal.value = false
}

const handleDisapproval = async () => {
  showReasonModal.value = true
   declineModal.value = false
};

definePageMeta({
     middleware: 'auth'
});

</script>

<style scoped>
/* Additional custom styles if needed */
</style>
