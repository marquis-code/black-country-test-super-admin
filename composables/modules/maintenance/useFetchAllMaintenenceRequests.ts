import { ref } from 'vue'
import { maintenance_api } from '@/api_factory/modules/maintenance'

export const useFetchAdminMaintenanceRequests = () => {
  const fetching = ref(false)
  const maintenanceRequestsList = ref([])

  const queryObj = ref({
    page: 1,
    perPage: 1000000,
    status: ''
  })

  const fetchAdminMaintenanceRequests = async () => {
    fetching.value = true
  
      const res = await maintenance_api.$_fetch_all_maitenence_requests(
        queryObj.value.page,
        queryObj.value.perPage,
        queryObj.value.status
      ) as any

      console.log(res, 'here')

      if (res.type !== 'ERROR') {
        maintenanceRequestsList.value = res?.data?.result || []
    }
    fetching.value = false

  }

  watch(
    () => queryObj.value.status,
    (newStatus, oldStatus) => {
      console.log('watchung here')
      if (newStatus !== oldStatus) {
        fetchAdminMaintenanceRequests();
      }
    }
  );

  onMounted(() => {
    fetchAdminMaintenanceRequests()
})

  return {
    fetchAdminMaintenanceRequests,
    fetching,
    maintenanceRequestsList,
    queryObj
  }
}
