import { settings_api } from "@/api_factory/modules/settings";
const loading = ref(false)
const notificationOptions = ref({})

export const useFetchPreferences = () => {
	const getNotificationPreferences = async () => {
		loading.value = true
		const res = await  settings_api.$_fetch_notification_preferences() as any
        console.log(res, 'res hweere')
        if (res.type !== 'ERROR') {
            notificationOptions.value = res?.data?.notifications
        }
        loading.value = false
	}


    onMounted(() => {
        getNotificationPreferences()
    })

	return { loading, notificationOptions }
}
