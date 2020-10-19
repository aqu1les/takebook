import React, { useState, useEffect, useMemo } from 'react';
import Styles from './style';
import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getInfoByCEP } from '../../../../services/IBGEService';
import { getAddress, getCoords } from '../../../../services/GeocoderService';
import { useTranslation } from 'react-i18next';

export default function AddressForm({
	onSubmit,
	onDismiss,
	currentZipcode,
	currentStreet,
	currentNeighborhood,
	currentCity,
	currentState,
	currentLatitude,
	currentLongitude,
}) {
	const { t } = useTranslation();
	const [zipCode, setZipCode] = useState(currentZipcode || '');
	const [street, setStreet] = useState(currentStreet || '');
	const [neighborhood, setNeighborhood] = useState(currentNeighborhood || '');
	const [city, setCity] = useState(currentCity || '');
	const [state, setState] = useState(currentState || '');
	const [latitude, setLatitude] = useState(currentLatitude || null);
	const [longitude, setLongitude] = useState(currentLongitude || null);

	useEffect(() => {
		function getPosition() {
			getCoords()
				.then((result) => {
					console.log({ result });
					if (result) {
						setLatitude(result.latitude);
						setLongitude(result.longitude);
					}
				})
				.catch((err) => console.log({ err }));
			// 	getAddress(coords.latitude, coords.longitude)
			// 		.then((json) => {
			// 			const addressArray = json.results[0].formatted_address.split(
			// 				',',
			// 			);
			// 			const street = addressArray[0];
			// 			const neighborhood = addressArray[1].split('-')[1];
			// 			const city = addressArray[2].split('-')[0];
			// 			const state = addressArray[2].split('-')[1];
			// 			const zipCode = addressArray[3].replace('-', '');
			// 			setStreet(street);
			// 			setNeighborhood(neighborhood);
			// 			setCity(city);
			// 			setState(state);
			// 			setZipCode(zipCode);
			// 		})
			// 		.catch((error) => console.warn(error));
		}

		getPosition();
	}, []);

	async function handleCepChange(value) {
		if (value.length === 5) {
			setZipCode(value + '-');
		} else if (value.length < 5) {
			setZipCode(value.replace('-', ''));
		} else {
			setZipCode(value);
			if (value.length === 9) {
				try {
					const addressInfo = await getInfoByCEP(value);
					if (addressInfo.erro) {
						throw new Error('Not found');
					}
					setStreet(addressInfo.logradouro);
					setCity(addressInfo.localidade);
					setState(addressInfo.uf);
					setNeighborhood(addressInfo.bairro);
				} catch (error) {
					console.log(error);
				}
			}
		}
	}

	const isFormValid = useMemo(() => {
		return (
			zipCode.length >= 8 &&
			street !== '' &&
			neighborhood !== '' &&
			city !== '' &&
			state !== ''
		);
	}, [zipCode, street, neighborhood, city, state]);

	function onCancel() {
		if (onDismiss) {
			onDismiss();
		}
	}

	function onAction() {
		if (!isFormValid) {
			return;
		}

		if (onSubmit) {
			const formValue = {
				zip_code: zipCode,
				street,
				neighborhood,
				city,
				state,
			};

			if (latitude && longitude) {
				formValue.latitude = latitude;
				formValue.longitude = longitude;
			}

			onSubmit(formValue);
		}
	}

	return (
		<>
			<View style={Styles.Row}>
				<TouchableOpacity style={Styles.FormGroupRow}>
					<TextInput
						placeholderTextColor="#666666"
						placeholder={t('addressForm.zipcode')}
						value={zipCode}
						onChangeText={handleCepChange}
						maxLength={9}
						style={Styles.Input}
						textContentType={'postalCode'}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={Styles.FormGroupRow}>
					<TextInput
						placeholder={t('addressForm.neighborhood')}
						placeholderTextColor="#666666"
						value={neighborhood}
						editable={false}
						style={Styles.Input}
					/>
				</TouchableOpacity>
			</View>
			<View style={Styles.Row}>
				<TouchableOpacity style={Styles.FormGroupRow}>
					<TextInput
						placeholder={t('addressForm.city')}
						placeholderTextColor="#666666"
						value={city}
						editable={true}
						style={Styles.Input}
						textContentType={'addressCity'}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={Styles.FormGroupRow}>
					<TextInput
						placeholder={t('addressForm.state')}
						placeholderTextColor="#666666"
						value={state}
						editable={true}
						style={Styles.Input}
						textContentType={'addressState'}
					/>
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={Styles.FormGroup}>
				<TextInput
					placeholder={t('addressForm.street')}
					placeholderTextColor="#666666"
					autoCapitalize="words"
					autoCorrect={false}
					underlineColorAndroid="transparent"
					style={Styles.Input}
					value={street}
					onChangeText={(text) => setStreet(text)}
					returnKeyType={'done'}
					textContentType={'streetAddressLine1'}
					editable={true}
					enablesReturnKeyAutomatically={true}
				/>
			</TouchableOpacity>
			<View style={[Styles.Row, Styles.ButtonsRow]}>
				<RectButton
					onPress={onCancel}
					style={[
						Styles.FormGroupRow,
						Styles.Button,
						Styles.SecondaryButton,
					]}>
					<Text style={Styles.SecondaryButtonText}>
						{t('addressForm.secondaryButton')}
					</Text>
				</RectButton>
				<RectButton
					enabled={isFormValid}
					onPress={onAction}
					style={[
						Styles.FormGroupRow,
						Styles.Button,
						Styles.ActionButton,
						!isFormValid && Styles.ActionButtonDisabled,
					]}>
					<Text style={Styles.ButtonText}>
						{t('addressForm.actionButton')}
					</Text>
				</RectButton>
			</View>
		</>
	);
}
