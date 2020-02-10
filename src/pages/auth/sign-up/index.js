import React, { useState, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Styles from './style';
import Template from '../components/template';
import User from '../../../assets/icons/user.svg';
import Password from '../../../assets/icons/password.svg';
import Email from '../../../assets/icons/form-email.svg';
import CameraPlus from '../../../assets/icons/camera-plus-outline.svg';
import SuccessFeedback from '../../core/success-feedback';
import FailedFeedback from '../../core/failed-feedback';
import { getInfoByCEP } from '../../../services/IBGEService';


export default SignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswrodError] = useState(false);
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [cep, setCep] = useState('');
    const [street, setStreet] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [avatar, setAvatar] = useState(null);
    const nameField = useRef(null);
    const emailField = useRef(null);
    const passwordField = useRef(null);
    const passwordConfirmationField = useRef(null);

    const avatarPreview = useMemo(
        () => (avatar ? avatar.path : null),
        [avatar]
    );

    function handleSubmit() {
        console.log('submitted');
        setShowModal(true);
    }

    function handleModalHide() {
        // props.navigattion.navigate('App');
        setShowModal(false);
    }

    async function handleCepChange(value) {
        if (value.length === 5) {
            setCep(value + '-');
        } else if (value.length < 5) {
            setCep(value.replace('-', ''));
        } else {
            setCep(value);
            if (value.length === 9) {
                const addressInfo = await getInfoByCEP(value);
                setStreet(addressInfo.logradouro);
                setCity(addressInfo.localidade);
                setState(addressInfo.uf);
                setNeighborhood(addressInfo.bairro);
            }
        }
    }
    function handleAvatarPicker() {
        ImagePicker.showImagePicker({ title: 'Camera' }, image => {
            if (image.didCancel) {
                console.log('User cancelled image picker');
            } else if (image.error) {
                console.log('ImagePicker Error: ', image.error);
            } else if (image.customButton) {
                console.log(
                    'User tapped custom button: ',
                    image.customButton,
                );
            } else {
                setAvatar(image);
            }
        });
    }
    const newHeader =
        <TouchableOpacity onPress={handleAvatarPicker} style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
            {avatarPreview ? <Image source={{ uri: `file://${avatarPreview}` }} style={{ width: '100%', height: '100%', borderRadius: 100 }} /> : <CameraPlus style={{ height: 40, width: 40 }} />}
        </TouchableOpacity>;

    return (
        <Template newHeader={newHeader}>
            <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center', justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={[Styles.FormGroup, nameError && Styles.InputError]} onPress={() => nameField.current.focus()}>
                    <User style={Styles.Icon} />
                    <TextInput
                        ref={nameField}
                        placeholder="Nome"
                        placeholderTextColor="#666666"
                        autoCapitalize="words"
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        style={Styles.Input}
                        value={name}
                        onChangeText={text => setName(text)}
                        returnKeyType={"next"}
                        onSubmitEditing={() => emailField.current.focus()}
                        textContentType={'name'}
                        autoFocus
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.FormGroup, emailError && Styles.InputError]} onPress={() => emailField.current.focus()}>
                    <Email style={Styles.Icon} />
                    <TextInput
                        ref={emailField}
                        placeholder="E-mail"
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoCompleteType={'email'}
                        underlineColorAndroid="transparent"
                        style={Styles.Input}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        keyboardType="email-address"
                        returnKeyType={"next"}
                        onSubmitEditing={() => passwordField.current.focus()}
                        textContentType={'emailAddress'}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.FormGroup, passwordError && Styles.InputError]} onPress={() => passwordField.current.focus()}>
                    <Password style={Styles.Icon} />
                    <TextInput
                        ref={passwordField}
                        placeholder="Senha"
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoCompleteType={'password'}
                        underlineColorAndroid="transparent"
                        style={Styles.Input}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                        returnKeyType={"next"}
                        onSubmitEditing={() => passwordConfirmationField.current.focus()}
                        textContentType={'password'}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.FormGroup, passwordConfirmationError && Styles.InputError]} onPress={() => passwordConfirmationField.current.focus()}>
                    <Password style={Styles.Icon} />
                    <TextInput
                        ref={passwordConfirmationField}
                        placeholder="Digite a senha novamente"
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoCompleteType={'password'}
                        underlineColorAndroid="transparent"
                        style={Styles.Input}
                        value={passwordConfirmation}
                        onChangeText={text => setPasswordConfirmation(text)}
                        secureTextEntry={true}
                        returnKeyType={"send"}
                        onSubmitEditing={handleSubmit}
                        textContentType={'password'}
                    />
                </TouchableOpacity>
                <View style={Styles.Row}>
                    <TouchableOpacity style={Styles.FormGroupRow}>
                        <TextInput
                            placeholderTextColor="#666666"
                            placeholder="CEP"
                            value={cep}
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
                <TouchableOpacity style={[Styles.FormGroup, nameError && Styles.InputError]} onPress={() => nameField.current.focus()}>
                    <TextInput
                        ref={nameField}
                        placeholder="Rua"
                        placeholderTextColor="#666666"
                        autoCapitalize="words"
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        style={Styles.Input}
                        value={street}
                        onChangeText={text => setStreet(text)}
                        returnKeyType={"done"}
                        textContentType={'streetAddressLine1'}
                        editable={false}
                        enablesReturnKeyAutomatically={true}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.RegisterButton} onPress={handleSubmit}>
                    <Text style={Styles.RegisterText}>Cadastrar</Text>
                </TouchableOpacity>
            </ScrollView>
            <SuccessFeedback isVisible={showModal} handleModalHide={handleModalHide}>
                <Text style={Styles.TextH1}>Cadastro realizado!</Text>
                <Text style={Styles.TextP}>Sinta-se à vontade para publicar um livro ou adquirir novos!</Text>
                <TouchableOpacity style={Styles.ModalButton} onPress={handleModalHide}>
                    <Text style={Styles.ButtonText}>Começar</Text>
                </TouchableOpacity>
            </SuccessFeedback>
            {/* <FailedFeedback isVisible={showModal} handleModalHide={handleModalHide} /> */}
        </Template>
    )
}