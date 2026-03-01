import api from './axiosInstance';

export async function getAllProduct() {
    const response = await api.get('/products');
    return response.data;
}

export async function getBestsellers(page = 1, limit = 12) {
    const response = await api.get('/products/bestsellers', { params: { page, limit } });
    return response.data;
}