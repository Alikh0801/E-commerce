import api from "./axiosInstance"


export const registerUser = (userData) => {
    return api.post('/auth/register', userData)
};

export const loginUser = (credentials) => {
    return api.post('/auth/login', credentials)
};

export const getMe = () => {
    return api.get('/auth/me')
};