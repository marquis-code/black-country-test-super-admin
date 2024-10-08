import { GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_V2 } from "../axios.config";

export const property_api = {
  $_create: (payload: any) => {
    const url = "/houses";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_fetch_properties: (metadata: { page: number; perPage: number }, filters: any) => {
    let url = `/houses?page=${metadata.page}&perPage=${metadata.perPage}`;
  
    // Check if search query exists and add it to the URL
    if (filters.searchQuery && filters.searchQuery.trim() !== "") {
      url += `&search=${encodeURIComponent(filters.searchQuery.trim())}`;
    }
  
    // Add other filters to the URL
    if (filters.isPublished !== null) { // Check if isPublished is not null
      url += `&isPublished=${filters.isPublished}`;
    }
    if (filters.fromDate) {
      url += `&fromDate=${encodeURIComponent(filters.fromDate)}`;
    }
    if (filters.toDate) {
      url += `&toDate=${encodeURIComponent(filters.toDate)}`;
    }
    if (filters.agentId) {
      url += `&agentId=${encodeURIComponent(filters.agentId)}`;
    }
  
    return GATEWAY_ENDPOINT.get(url);
  },
  

  $_fetch_single_property: (id: string | number) => {
    const url = `/houses/${id}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_floorings: () => {
    const url = "/house-flooring-types";
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_property_types: () => {
    const url = "/house-types";
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_common_areas: () => {
    const url = "/common-areas";
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_room_features: () => {
    const url = "/rooms/features";
    return GATEWAY_ENDPOINT.get(url);
  },
  $_update_property: (id: any, payload: any) => {
    const url = `/houses/${id}`;
    return GATEWAY_ENDPOINT.patch(url, payload);
  },
  $_delete_property: (id: string | number) => {
    const url = `/houses/${id}`;
    return GATEWAY_ENDPOINT.delete(url);
  },
  $_duplicate_property: (id: string | number) => {
    const url = `/houses/${id}/duplicates`;
    return GATEWAY_ENDPOINT.post(url);
  },
  $_add_interior_common_area: (id: string | number) => {
    const url = `/houses/${id}/duplicates`;
    return GATEWAY_ENDPOINT.post(url);
  },
};
