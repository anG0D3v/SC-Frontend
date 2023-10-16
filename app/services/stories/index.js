import Api from '@/axios-utils/api'
import axiosInstance from '@/axios-utils/axios-instance'

const StoriesServices = {
    fetch: (page, data) => axiosInstance.get(Api.STORIES().RESOURCE, { params: { page, ...data } }),
    addStory: (data) => axiosInstance.post(Api.STORIES().RESOURCE, data),
    updateStory: (data) => axiosInstance.put(Api.STORIES().RESOURCE, data, { params: { id: data?.id } }),
    deleteStory: (data) => axiosInstance.delete(Api.STORIES().RESOURCE, data, { params: { id: data?.id } }),
};


export default StoriesServices;