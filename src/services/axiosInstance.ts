import axios from 'axios';
import useAuthStore from '@/store';
import { isAccessTokenValid } from '@/util/isAccessTokenValid';
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {  
  const accessToken = useAuthStore.getState().accessToken;
  if (!accessToken || !isAccessTokenValid(accessToken)) {
    useAuthStore.getState().resetAuth();
    return config;
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default axiosInstance;
