import Geocoder from 'react-native-geocoding';
import { GOOGLE_API_KEY } from 'react-native-dotenv';


export async function getAddress(latitude, longitude) {
    Geocoder.init(GOOGLE_API_KEY);
    return Geocoder.from({ latitude, longitude });
}
