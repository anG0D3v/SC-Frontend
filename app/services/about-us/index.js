import Api from '@/axios-utils/api';
import axiosInstance from '@/axios-utils/axios-instance';

const AboutUsServices = {
    fetch: (page, data) => axiosInstance.get(Api.ABOUT_US().RESOURCE, { params: { page, ...data } }),
    addContent: (data) => axiosInstance.post(Api.ABOUT_US().RESOURCE, data),
    updateContent: (data) => axiosInstance.put(Api.ABOUT_US().RESOURCE, data, { params: { id: data?.id } }),
    deleteContent: (data) => axiosInstance.delete(Api.ABOUT_US().RESOURCE, data, { params: { id: data?.id } }),
};

export default AboutUsServices;
