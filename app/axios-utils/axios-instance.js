import axios from 'axios';
import { XML_HTTP_REQUEST } from '../utils/constants';
import { getTenantNameInUrl } from '../utils/utils';

const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        'X-Requested-With': XML_HTTP_REQUEST,
        'X-Tenant': typeof window !== 'undefined' ? getTenantNameInUrl(window.origin) : '',
    },
    withCredentials: true,
});

export default axiosInstance;
