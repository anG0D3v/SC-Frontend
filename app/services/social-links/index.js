import Api from '@/axios-utils/api';
import axiosInstance from '@/axios-utils/axios-instance';

const SocialLinkServices = {
    fetch: (data) => axiosInstance.get(Api.LINKS().RESOURCE + `?page=${data}`),
    addLink: (data) => axiosInstance.post(Api.LINKS().RESOURCE, data),
    updateLink: (data) => axiosInstance.put(Api.LINKS().RESOURCE + data?.id, data),
    deleteLink: (data) => axiosInstance.delete(Api.LINKS().RESOURCE + data?.id, { data }),
};

export default SocialLinkServices;
