import api from './axiosInstance';

export async function getAllProduct() {
    const response = await api.get('/products');
    return response.data;
};