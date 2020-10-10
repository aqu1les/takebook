import React, { useState } from 'react';
import Styles from './style';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { getInfoByCEP } from '../../../../services/IBGEService';
import Geolocation from '@react-native-community/geolocation';
import { getAddress } from '../../../../services/GeocoderService';

export default function AddressForm() {
    const [zipCode, setZipCode] = useState('');
    const [street, setStreet] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    async function handleCepChange(value) {
        if (value.length === 5) {
            setZipCode(value + '-');
        } else if (value.length < 5) {
            setZipCode(value.replace('-', ''));
        } else {
            setZipCode(value);
            if (value.length === 9) {
                const addressInfo = await getInfoByCEP(value);
                setStreet(addressInfo.logradouro);
                setCity(addressInfo.localidade);
                setState(addressInfo.uf);
                setNeighborhood(addressInfo.bairro);
            }
        }
    }

    function getPosition() {
        Geolocation.getCurrentPosition(({ coords }) => {
            getAddress(coords.latitude, coords.longitude)
                .then((json) => {
                    const addressArray = json.results[0].formatted_address.split(
                        ',',
                    );
                    const street = addressArray[0];
                    const neighborhood = addressArray[1].split('-')[1];
                    const city = addressArray[2].split('-')[0];
                    const state = addressArray[2].split('-')[1];
                    const zipCode = addressArray[3].replace('-', '');
                    setStreet(street);
                    setNeighborhood(neighborhood);
                    setCity(city);
                    setState(state);
                    setZipCode(zipCode);
                })
                .catch((error) => console.warn(error));
        });
    }

    return (
        <>
            <View style={Styles.Row}>
                <TouchableOpacity style={Styles.FormGroupRow}>
                    <TextInput
                        placeholderTextColor="#666666"
                        placeholder="CEP"
                        value={zipCode}
                        onChangeText={handleCepChange}
                        maxLength={9}
                        style={Styles.Input}
                        textContentType={'postalCode'}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.FormGroupRow}>
                    <TextInput
                        placeholder="Bairro"
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
                        placeholder="Cidade"
                        placeholderTextColor="#666666"
                        value={city}
                        editable={false}
                        style={Styles.Input}
                        textContentType={'addressCity'}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.FormGroupRow}>
                    <TextInput
                        placeholder="Estado"
                        placeholderTextColor="#666666"
                        value={state}
                        editable={false}
                        style={Styles.Input}
                        textContentType={'addressState'}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => nameField.current.focus()}>
                <TextInput
                    placeholder="Rua"
                    placeholderTextColor="#666666"
                    autoCapitalize="words"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    style={Styles.Input}
                    value={street}
                    onChangeText={(text) => setStreet(text)}
                    returnKeyType={'done'}
                    textContentType={'streetAddressLine1'}
                    editable={false}
                    enablesReturnKeyAutomatically={true}
                />
            </TouchableOpacity>
        </>
    );
}
