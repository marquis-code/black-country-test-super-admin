import { GATEWAY_ENDPOINT } from "../axios.config";

export const rental_api = {
  $_fetch_rentals: (id: string | number, metadata: { page: number; perPage: number }, filters: any) => {
    let url = `/rental-applications?page=${metadata.page}&perPage=${metadata.perPage}`;  
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_single_rental: (id: string | number) => {
    const url = `/rental-applications/${id}`;
    return GATEWAY_ENDPOINT.get(url);
  },
  $_cancel_rental_application: (id: string | number, payload: any) => {
    const url = `/rental-applications/${id}/declined`;
    return GATEWAY_ENDPOINT.patch(url, payload);
  },
  $_approve_rental_application: (id: string | number, payload: any) => {
    const url = `/rental-applications/${id}/approved`;
    return GATEWAY_ENDPOINT.patch(url, payload);
  },
};
