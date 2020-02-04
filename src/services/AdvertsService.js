import AsyncStorage from '@react-native-community/async-storage';
import ApiService from "./ApiService";

async function loadAdverts() {
    try {
        const response = await ApiService.get('/books/approved');
        if (response.data) {
            await storeAdverts(response.data.data);
            return;
        }
    } catch (error) {
        console.log('FETCH ADVERTS ERROR');
        console.log(error);
    }
}

export async function getAdverts() {
    await loadAdverts();
    return JSON.parse(await AsyncStorage.getItem('TB:adverts'));
}

export async function refreshAdverts() {
    await loadAdverts();
    return await getAdverts();
}

export async function storeAdvert(advert) {
    const adverts = await getAdverts();
    await AsyncStorage.setItem('TB:adverts', JSON.stringify([advert, ...adverts]));
}

async function storeAdverts(adverts) {
    await AsyncStorage.setItem('TB:adverts', JSON.stringify(adverts));
}