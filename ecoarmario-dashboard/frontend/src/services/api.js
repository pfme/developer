import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8099';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getLiveStats = async () => {
    try {
        const response = await api.get('/api/live/stats');
        return response.data;
    } catch (error) {
        console.error("Error fetching live stats:", error);
        return null;
    }
};

export const submitClientForm = async (data) => {
    try {
        const response = await api.post('/api/form/cliente', data);
        return response.data;
    } catch (error) {
        console.error("Error submitting form:", error);
        throw error;
    }
};

export default api;
