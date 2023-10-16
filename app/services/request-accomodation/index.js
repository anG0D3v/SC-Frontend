import Api from '@/axios-utils/api';
import axiosInstance from '@/axios-utils/axios-instance';

const RequestAccomodationServices = {
    fetch: (page, data) => axiosInstance.get(Api.REQUEST_ACCOMMODATION().RESOURCE, { params: { page, ...data } }),
};

export default RequestAccomodationServices;
