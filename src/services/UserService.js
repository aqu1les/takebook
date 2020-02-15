import AsyncStorage from '@react-native-community/async-storage';
import ApiService from './ApiService';

export async function getUser() {
    return ApiService.get('/users/me');
}

export async function isTokenValid() {
    const token = await getToken();
    if (token) {
        const response = await ApiService.get('/users/me');
        if (response) {
            if (response.data) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export async function getToken() {
    return await AsyncStorage.getItem('userToken:TB');
}

export async function storeToken(token) {
    await AsyncStorage.setItem('userToken:TB', token);
    return;
}

export async function removeToken() {
    await AsyncStorage.removeItem('userToken:TB');
    return;
}

export async function getUserEmail() {
    return await AsyncStorage.getItem('userLogin');
}

export async function setUserEmail(email) {
    await AsyncStorage.setItem('userLogin', email);
    return;
}

export function authenticateUser(email, password, remind) {
    return ApiService.post('/auth/login', { email, password, remind });
}

export async function registerUser(body) {
    return await ApiService.post(`users`, body);
}