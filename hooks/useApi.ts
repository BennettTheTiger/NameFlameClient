import axios from 'axios';
import { useAuth } from '@/contexts/authCtx';


export default function useApi() {
    const { token } = useAuth();
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
            // Handle response errors
            return Promise.reject(error);
        }
    );

    return api;
}