import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from './ApiService';

export function getUser() {
	return ApiService.get('/users/me');
}

export async function getToken() {
	return await AsyncStorage.getItem('userToken:TB');
}

export async function storeToken(token) {
	if (token) {
		await AsyncStorage.setItem('userToken:TB', token);
	}
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

export async function registerUserDevice(token) {
	const userToken = await getToken();

	if (userToken) {
		return ApiService.post('/users/mobile-token', { token });
	}

	return null;
}

export async function storeLanguage(value) {
	return await AsyncStorage.setItem('language:TB', value);
}

export async function getStoredLanguage() {
	return await AsyncStorage.getItem('language:TB');
}

export function updateUserInfo(data) {
	return ApiService.put('/users/me', data);
}

export function updateUserAvatar(formData, uploadProgress = null) {
	const config = {};

	if (uploadProgress) {
		config.onUploadProgress = uploadProgress;
	}
	return ApiService.post('/users/me/avatar', formData, config);
}

export function confirmBookPurchase(bookId, answer = true) {
	return ApiService.put(`/users/me/sale-confirmation/${bookId}`, {
		answer,
	});
}
