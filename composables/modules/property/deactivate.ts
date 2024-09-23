import { property_api } from "@/api_factory/modules/property";
import { useGetProperties } from "@/composables/modules/property/fetchProperties";

export const usePropertyDeactivate = () => {
  const { getProperties } = useGetProperties();

  const loading = ref(false);
  const { $_update_property } = property_api;

  const deactivateProperty = (id: any) => {
    const updatedProperty = {
      isPublished: false
    };

    // // Call the update function with the modified property data
    updateProperty(id, updatedProperty);
  };

  const updateProperty = async (id: any, updatedData: any) => {
    console.log(updatedData, 'fROM UPDATE PROPERTY')
    loading.value = true;
    const res = await $_update_property(id, updatedData) as any;
      if (res.type !== "ERROR") {
        getProperties();
      }

    loading.value = false;
  };

  return { deactivateProperty, loading, getProperties };
};