<template>
    <div class="overflow-hidden rounded-lg space-y-3">
        <div
          class="px-4 py-5 bg-white sm:px-6 flex justify-between rounded-lg items-center border [#F9FAFB] border-gray-50">
          <p>Upcoming(Due) payment</p>
          <p>View all</p>
        </div>
        <div v-if="upcomingPayments.length" class="px-4 sm:px-6 lg:px-8 rounded-lg border border-gray-25 bg-white">
            <div class="flow-root">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle">
                  <table class="min-w-full divide-y divide-gray-50">
                    <thead>
                      <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">Tenant name</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Category</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Amount</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Date</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                      <tr @click="router.push('/dashboard/payment-list')" class="cursor-pointer" v-for="(item, idx) in upcomingPayments" :key="idx">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 lg:pl-8">{{ item.tenant_name ?? 'Nil'}}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.category ?? 'Nil'}}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.amount ?? 'Nil'}}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.date ?? 'Nil'}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        <div v-else
          class="bg-white px-4 py-5 sm:p-6 h-80 rounded-lg flex flex-col gap-y-4 justify-center border items-center border-gray-50">
          <img :src="dynamicIcons('payment-empty-state')" alt="leases empty state" class="" />
          <p class="text-[#1D2739]">No applications to review</p>
        </div>
      </div>
</template>

<script setup lang="ts">
import { dynamicIcons } from "@/utils/assets";

const router = useRouter()

const props = defineProps({
    upcomingPayments: {
    type: Array,
  },
});
</script>
