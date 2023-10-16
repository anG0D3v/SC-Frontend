import Api from '@/axios-utils/api';
import axiosInstance from '@/axios-utils/axios-instance';

const AuthService = {
    login: (data) => axiosInstance.post(Api.AUTH().LOGIN, data),
    logout: () => axiosInstance.get(Api.AUTH().LOGOUT),
    refresh: () => axiosInstance.get(Api.AUTH().REFRESH_TOKEN),
};

export default AuthService;
