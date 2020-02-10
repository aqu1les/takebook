import AsyncStorage from '@react-native-community/async-storage';
import ApiService from './ApiService';

export async function setUserLikes(books) {
    if (books && books.length > 0) {
        await AsyncStorage.setItem('TB:user_likes', JSON.stringify(books));
    } else {
        await AsyncStorage.setItem('TB:user_likes', JSON.stringify([]));
    }
}

export async function getUserLikes() {
    await loadUserLikes();
    return JSON.parse(await AsyncStorage.getItem('TB:user_likes'));
}

export async function loadUserLikes() {
    const response = await ApiService.get('users/me/likes');
    await setUserLikes(response.data);
}

export async function likeBook(bookId) {
    await ApiService.post(`users/me/likes/${bookId}`);
    await loadUserLikes();
}

export async function unlikeBook(bookId) {
    await ApiService.post(`users/me/likes/${bookId}`);
    await loadUserLikes();
}