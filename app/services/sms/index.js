import Api from '@/axios-utils/api'
import axiosInstance from '@/axios-utils/axios-instance'

const SmsService = {
    fetchSms: () => axiosInstance.get(Api.SMS().FETCH)
}

export default SmsService;