import Api from '@/axios-utils/api'
import axiosInstance from '@/axios-utils/axios-instance'

const CheckoutInstructionServices = {
    fetch: (page, data) => axiosInstance.get(Api.CHECKOUT_INSTRUCTION().RESOURCE, { params: { page, ...data } }),
};


export default CheckoutInstructionServices;