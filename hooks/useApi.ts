import axios from 'axios';
import { useToken } from '@/contexts/authCtx';


export default function useApi() {
    const { token, signOut } = useToken();
    const api = axios.create({
        baseURL: `${process.env.EXPO_PUBLIC_NAME_FLAME_ENDPOINT}/api/v1`,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    api.interceptors.request.use(
        (config) => {
            // Modify the request config before sending
            return config;
        },
        (error) => {
            // Handle request errors
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response) => {
            // Process successful responses
            return response;
        },
        (error) => {
            if (error.response?.status === 401) {
                // Handle unauthorized responses
                if (error.response.data.error?.name === 'TokenExpiredError') {
                    signOut();
                    alert('Your session has expired. Please log in again.');
                }
            }
            // Handle response errors
            return Promise.reject(error);
        }
    );

    return api;
}