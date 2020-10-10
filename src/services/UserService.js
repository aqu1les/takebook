import AsyncStorage from '@react-native-community/async-storage';
import ApiService from './ApiService';

export function getUser() {
	return ApiService.get('/users/me');
}

export async function getToken() {
	return await AsyncStorage.getItem('userToken:TB');
}

export async function storeToken(token) {
	await AsyncStorage.setItem('userToken:TB', token);
}

export async function removeToken() {
	await AsyncStorage.removeItem('userToken:TB');
	await AsyncStorage.removeItem('userLogin');
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

export function registerUser(body) {
	return ApiService.post('users', body);
}

export function registerUserDevice(token) {
	return ApiService.post('/users/mobile-token', { token });
}
