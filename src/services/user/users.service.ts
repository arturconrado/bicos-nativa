import axios from 'axios';
// @ts-ignore
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';




const API_URL_LOCAL = `${API_URL}/users`;

export const createUser = async (userData) => {
    console.log(userData)
    try {
        const response = await axios.post(API_URL_LOCAL, userData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(API_URL_LOCAL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL_LOCAL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${API_URL_LOCAL}/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_URL_LOCAL}/${id}`);
    } catch (error) {
        console.error(error);
    }
};

export const loginUser = async (credentials) => {
    try {
        // Ajuste a URL para incluir o caminho do endpoint de login
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        if (response.data.access_token) {
            // Salva o token no armazenamento do dispositivo
            await AsyncStorage.setItem('userToken', response.data.access_token);
            return response.data.access_token;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
