import axios from 'axios';
import { useToken } from '@/contexts/authCtx';

export default function useApi() {
    const { token } = useToken();
    const api = axios.create({
        baseURL: 'http://localhost:5000/api/v1',
        timeout: 10000,
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