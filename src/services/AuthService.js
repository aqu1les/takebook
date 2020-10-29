import ApiService from './ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function forgotPassword(email) {
	return ApiService.post('auth/forgot', { email });
}

export function checkTypedToken(token, email) {
	return ApiService.post('auth/checkToken', { email, token });
}

export function updatePassword({
	email,
	token,
	password,
	password_confirmation,
} = {}) {
	return ApiService.post('auth/reset', {
		email,
		token,
		password,
		password_confirmation,
	});
}

export async function storeEmailToRecover(email) {
	await AsyncStorage.setItem('userEmailToRecover:TB', email);
}

export async function removeEmailToRecover() {
	await AsyncStorage.removeItem('userEmailToRecover:TB');
}

export async function getEmailToRecover() {
	return await AsyncStorage.getItem('userEmailToRecover:TB');
}

export async function storeTokenToRecover(token) {
	await AsyncStorage.setItem('userTokenToRecover:TB', token);
}

export async function removeTokenToRecover() {
	await AsyncStorage.removeItem('userTokenToRecover:TB');
}

export async function getTokenToRecover() {
	return await AsyncStorage.getItem('userTokenToRecover:TB');
}
