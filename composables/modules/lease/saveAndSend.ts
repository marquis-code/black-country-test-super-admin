import { lease_api } from "@/api_factory/modules/lease";
import { useCustomToast } from "@/composables/core/useCustomToast";
const { showToast } = useCustomToast();
import { useUser } from "@/composables/auth/user";
const { user } = useUser();

const leaseSignatureUrl = localStorage.getItem('lease-signature-url')
const processingSaveAndSend = ref(false);
const assignPayload = ref({
  leaseAgreement: "<html></html>",
  isPublished: true,
  houseOwnerSigneeName: "",
  houseOwnerSignatureUrl: "",
  startDate: "",
  endDate: "",
  agreementName: ""

});
const router = useRouter();

export const useSaveAndSend = () => {
  const handleSaveAndSend = async (
    tenantId: string | number,
    houseId: string | number
  ) => {
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    const payloadObj = JSON.parse(localStorage.getItem('lease-template-payload') || '{}')
    processingSaveAndSend.value = true;
    const res = (await lease_api.$_assign_lease_to_property(tenantId, houseId, {
      leaseAgreement: assignPayload.value.leaseAgreement,
      isPublished: true,
      houseOwnerSigneeName: `${localUser.firstName || ''} ${localUser.lastName || ''}`.trim() || assignPayload.value.houseOwnerSigneeName,
      houseOwnerSignatureUrl: leaseSignatureUrl || assignPayload.value.houseOwnerSignatureUrl,
      startDate: payloadObj?.startDate || assignPayload.value.startDate,
      endDate: payloadObj?.endDate || assignPayload.value?.endDate,
      agreementName: payloadObj?.documentName || assignPayload?.value?.agreementName,
    })) as any;
    console.log(res, 'res here')
    if (res.type !== "ERROR") {
      showToast({
        title: "Success",
        message: "Lease was successfully saved and sent to tenant.",
        toastType: "success",
        duration: 3000,
      });
      localStorage.removeItem('lease-signature-url')
      localStorage.removeItem('lease-template-payload')
      localStorage.removeItem('selected-property')
      window.location.href = '/dashboard/property/lease-documents/lease-document-success'
    } else {
      showToast({
        title: "Error",
        message: res.data.error || "Something went wrong!",
        toastType: "error",
        duration: 3000,
      });
    }
    processingSaveAndSend.value = false;
  };

  const setSaveAndSendPayloadObj = (data: any) => {
    assignPayload.value.leaseAgreement = data.leaseAgreement || '';
        assignPayload.value.houseOwnerSigneeName = data.houseOwnerSigneeName || '';
        assignPayload.value.houseOwnerSignatureUrl = data.houseOwnerSignatureUrl || '';
        assignPayload.value.startDate = data.startDate || '';
        assignPayload.value.endDate = data.endDate || '';
        assignPayload.value.agreementName = data.agreementName || '';
  };

  return {
    handleSaveAndSend,
    processingSaveAndSend,
    assignPayload,
    setSaveAndSendPayloadObj,
  };
};
