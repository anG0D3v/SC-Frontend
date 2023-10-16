import Api from '@/axios-utils/api';
import axiosInstance from '@/axios-utils/axios-instance';

const ProgramDescriptionServices = {
    fetch: (page, data) => axiosInstance.get(Api.PROGRAMDESCRIPTION().RESOURCE, { params: { page, ...data } }),
    // addLink: (data) => axiosInstance.post(Api.LINKS().RESOURCE, data),
    // updateLink: (data) => axiosInstance.put(Api.LINKS().RESOURCE + data?.id, data),
    // deleteLink: (data) => axiosInstance.delete(Api.LINKS().RESOURCE + data?.id, { data }),
};

export default ProgramDescriptionServices;
