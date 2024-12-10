import { GATEWAY_ENDPOINT } from '../axios.config'
export const maintenance_api = {
    $_assign_maintenance_to_service_provider: (reqId: string, spid: string) => {
        let url = `/maintenance-requests/${reqId}/service-providers/${spid}/assign`
        return GATEWAY_ENDPOINT.patch(url);
      },
      $_fetch_maitenence_request: (page = 1, perPage = 100000, status = '', tenantId = '', houseId = '') => {
        let url = `/maintenance-requests?page=${page}&perPage=${perPage}`
        
    
      // Add search query to the URL if provided
        if (status) {
                  url += `&status=${status}`
              }

           // Add search query to the URL if provided
           if (tenantId) {
            url += `&tenantId=${tenantId}`
        }

           // Add search query to the URL if provided
           if (houseId) {
            url += `&houseId=${houseId}`
        }
    
      
        return GATEWAY_ENDPOINT.get(url)
      },
      $_fetch_all_maitenence_requests: (page = 1, perPage = 100000, status = '') => {
             let url = `/maintenance-requests?page=${page}&perPage=${perPage}`
      // Add search query to the URL if provided
              if (status) {
                url += `&status=${status}`
            }

        return GATEWAY_ENDPOINT.get(url)
      }
}
