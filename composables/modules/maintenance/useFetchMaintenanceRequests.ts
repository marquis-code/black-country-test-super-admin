import { ref } from 'vue'
import { maintenance_api } from '@/api_factory/modules/maintenance'

export const useFetchMaintenanceRequests = () => {
  const loading = ref(false)
  const maintenanceRequests = ref([])

  const queryObj = ref({
    tenantId: '',
    houseId : '',
    page: 1,
    perPage: 1000000,
    status: ''
  })

  const fetchMaintenanceRequests = async () => {
    loading.value = true
  
      const res = await maintenance_api.$_fetch_maitenence_request(
        queryObj.value.page,
        queryObj.value.perPage,
        queryObj.value.status,
        queryObj.value.tenantId,
        queryObj.value.houseId
      ) as any

      console.log(res, 'here')

      if (res.type !== 'ERROR') {
        maintenanceRequests.value = res?.data?.result || []
    }
    loading.value = false

  }

  watch(
    () => queryObj.value.status,
    (newStatus, oldStatus) => {
      if (newStatus !== oldStatus) {
        fetchMaintenanceRequests();
      }
    }
  );

  onMounted(() => {
    fetchMaintenanceRequests()
})

  return {
    fetchMaintenanceRequests,
    loading,
    maintenanceRequests,
    queryObj
  }
}
