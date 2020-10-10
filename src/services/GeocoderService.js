import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import { GOOGLE_API_KEY } from 'react-native-dotenv';

export async function getAddress(latitude, longitude) {
	Geocoder.init(GOOGLE_API_KEY);
	return Geocoder.from({ latitude, longitude });
}

export async function getCoords() {
	const promise = new Promise((resolve, reject) => {
		try {
			Geolocation.getCurrentPosition(
				({ coords }) => {
					console.log(coords);
					resolve(coords);
				},
				(err) => {
					reject(err);
				},
			);
		} catch (err) {
			reject(err);
		}
	});

	return promise;
}
