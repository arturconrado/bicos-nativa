import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Supondo que você já tenha configurado seu arquivo .env e esteja usando react-native-dotenv
import { API_URL } from '@env';

// Cria uma instância do Axios com a URL base da API e configuração do interceptador
const api = axios.create({
    baseURL: API_URL,
});

// Interceptor de requisição para incluir o token JWT automaticamente
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(token)
    return config;
}, (error) => {
    console.log(error)
    return Promise.reject(error);
});

// Utilitário para lidar com erros de API e lançar uma exceção
const handleError = (error) => {
    console.error('API call error:', error.response?.data || error.message);
    throw error;
};

export const createUser = async (userData) => {
    try {
        const response = await api.post('/users', userData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getAllUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getUserById = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/users/${id}`, userData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteUser = async (id) => {
    try {
        await api.delete(`/users/${id}`);
    } catch (error) {
        handleError(error);
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        const { access_token } = response.data;
        if (access_token) {
            await AsyncStorage.setItem('userToken', access_token);
            return access_token;
        } else {
            throw new Error('Token não recebido');
        }
    } catch (error) {
        handleError(error);
    }
};