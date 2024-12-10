import { GATEWAY_ENDPOINT } from "../axios.config";

export const settings_api = {
      $_create_notification_preferences: (payload: any) => {
        const url = '/preferences/users';
        return GATEWAY_ENDPOINT.post(url, payload);
      },
      $_fetch_notification_preferences: () => {
        const url = '/preferences/users';
        return GATEWAY_ENDPOINT.get(url);
      }
};
