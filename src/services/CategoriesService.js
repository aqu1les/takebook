import AsyncStorage from '@react-native-community/async-storage';
import ApiService from "./ApiService";

export async function loadCategories() {
    try {
        const response = await ApiService.get('/categories');
        if (response.data) {
            await storeCategories(response.data.data);
            return;
        }
    } catch (error) {
        console.log('FETCH CATEGORIES ERROR');
        console.log(error);
    }
}

export async function getCategories() {
    await loadCategories();
    return JSON.parse(await AsyncStorage.getItem('TB:categories'));
}

async function storeCategories(categories) {
    await AsyncStorage.setItem('TB:categories', JSON.stringify(categories));
}