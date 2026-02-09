import api from "./axiosInstance"


export const registerUser = (userData) => {
    return api.post('/auth/register', userData)
};

export const verifyEmail = (data) => {
    return api.post('/auth/verify-email', data);
}

export const loginUser = (credentials) => {
    return api.post('/auth/login', credentials)
};

export const getMe = () => {
    return api.get('/auth/me')
};

export const logoutUser = () => {
    return api.post('/auth/logout');
};

export const forgotPassword = (email) => {
    return api.post('/auth/forgot-password', { email });
};

export const resetPassword = (token, password) => {
    return api.post(`/auth/reset-password/${token}`, { password });
};