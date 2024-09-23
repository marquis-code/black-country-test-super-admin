import { property_api } from '@/api_factory/modules/property';

export const useGetCommonAreas = () => {
    const loading = ref(false);
    const commonAreasList = ref([]) as any
    const interiorAreas = ref([]) as any
    const exteriorAreas = ref([]) as any
    const exteriorFurnishedAreasList = ref([]) as any
    const exteriorUnFurnishedAreasList = ref([]) as any
    const interiorFurnishedAreasList = ref([]) as any
    const interiorUnFurnishedAreasList = ref([]) as any

    const { $_fetch_common_areas } = property_api;

    const getCommonAreas = async () => {
        loading.value = true;

        const res = await $_fetch_common_areas() as any

        if (res.type !== 'ERROR') {
            commonAreasList.value = res.data ?? [];
            console.log(res.data, 'here')

            // Group properties into interior and exterior
            interiorAreas.value = commonAreasList.value.filter((area: any) => area.type === 'interior');
            exteriorAreas.value = commonAreasList.value.filter((area: any) => area.type === 'exterior');
            exteriorFurnishedAreasList.value =  commonAreasList.value.filter((area: any) => area.type === 'exterior' && area.canBeFurnished);
            exteriorUnFurnishedAreasList.value =  commonAreasList.value.filter((area: any) => area.type === 'exterior' && !area.canBeFurnished);
            interiorFurnishedAreasList.value =  commonAreasList.value.filter((area: any) => area.type === 'interior' && area.canBeFurnished);
            interiorUnFurnishedAreasList.value =  commonAreasList.value.filter((area: any) => area.type === 'interior' && !area.canBeFurnished);
        }
        
        loading.value = false;
    };

    onMounted(() => {
        getCommonAreas();
    });

    return { getCommonAreas, loading, commonAreasList, interiorAreas, exteriorAreas, exteriorFurnishedAreasList, exteriorUnFurnishedAreasList, interiorFurnishedAreasList, interiorUnFurnishedAreasList };
};