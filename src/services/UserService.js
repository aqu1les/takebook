import AsyncStorage from '@react-native-community/async-storage';
import ApiService from './ApiService';

export async function storeUser(user_info) {
    await AsyncStorage.setItem('TB:user_info', JSON.stringify(user_info));
}

export async function getUser() {
    return JSON.parse(await AsyncStorage.getItem('TB:user_info'));
}

export async function isTokenValid() {
    const token = await getToken();
    if (token) {
        const response = await ApiService.get('/users/me');
        if (response) {
            if (response.data) {
                await storeUser(response.data);
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

export async function authenticateUser(email, password, remind) {
    const response = await ApiService.post('/auth/login', { email, password, remind });
    return response;
}

export async function registerUser(body) {
    return await ApiService.post(`users`, body);
}