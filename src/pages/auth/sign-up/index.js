import React, { useState, useRef, useMemo } from 'react';
import {
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { RNPhotoEditor } from 'react-native-photo-editor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from './style';
import Template from '../components/template';
import User from '../../../assets/icons/user.svg';
import Password from '../../../assets/icons/password.svg';
import Email from '../../../assets/icons/form-email.svg';
import CameraPlus from '../../../assets/icons/camera-plus-outline.svg';
import SuccessFeedback from '../../core/success-feedback';
import FailedFeedback from '../../core/failed-feedback';
import { registerUser } from '../../../services/UserService';
import { createFormData } from '../../../services/FormDataService';
import ImageEditor from '../../../services/ImageEditor';

export default function SignUp(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswrodError] = useState(false);
    const [passwordConfError, setPasswordConfError] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const nameField = useRef(null);
    const emailField = useRef(null);
    const passwordField = useRef(null);
    const passwordConfirmationField = useRef(null);

    const avatarPreview = useMemo(() => (avatar ? avatar.path : null), [
        avatar,
    ]);

    async function handleSubmit() {
        const reqBody = {
            first_name: name.split(' ')[0],
            last_name: name.split(' ')[1] || ' ',
            email,
            password,
            address_street: street,
            address_neighborhood: neighborhood,
            address_city: city,
            address_state: state,
            address_zip_code: cep,
        };
        const data = createFormData(avatar, 'avatar_file', reqBody);

        const response = await registerUser(data);
        if (response.data) {
            setShowSuccessModal(true);
        } else {
            setShowFailModal(true);
        }
    }

    function handleModalHide() {
        // props.navigattion.navigate('App');
        setShowFailModal(false);
        setShowSuccessModal(false);
    }



    function handleAvatarPicker() {
        ImagePicker.showImagePicker({ title: 'Camera' }, image => {
            if (image.didCancel) {
                console.log('User cancelled image picker');
            } else if (image.error) {
                console.log('ImagePicker Error: ', image.error);
            } else if (image.customButton) {
                console.log('User tapped custom button: ', image.customButton);
            } else {
                setAvatar(image);
            }
        });
    }

    function handleEditImage() {
        ImageEditor(avatar.path, setNewPath, onCancel);

        function setNewPath(path) {
            setAvatar({ ...avatar, path });
        }

        function onCancel() {
            console.log('cancelled');
        }
    }

    function navigateToLogin() {
        props.navigation.navigate('Login', { email });
    }

    const newHeader = avatarPreview ? (
        <TouchableOpacity
            style={Styles.HeaderClickable}
            onPress={handleEditImage}>
            <Image
                source={{ uri: `file://${avatarPreview}` }}
                style={Styles.AvatarImage}
            />
            <FontAwesome
                name="edit"
                color="#000"
                size={24}
                style={{ position: 'absolute', alignSelf: 'center' }}
            />
        </TouchableOpacity>
    ) : (
            <TouchableOpacity
                style={Styles.AvatarHolder}
                onPress={handleAvatarPicker}>
                <CameraPlus style={Styles.CameraIcon} />
            </TouchableOpacity>
        );

    return (
        <Template newHeader={newHeader}>
            <ScrollView
                contentContainerStyle={Styles.ContentContainerStyle}
                showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    style={[Styles.FormGroup, nameError && Styles.InputError]}
                    onPress={() => nameField.current.focus()}>
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
                        returnKeyType={'next'}
                        onSubmitEditing={() => emailField.current.focus()}
                        textContentType={'name'}
                        autoFocus
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[Styles.FormGroup, emailError && Styles.InputError]}
                    onPress={() => emailField.current.focus()}>
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
                        returnKeyType={'next'}
                        onSubmitEditing={() => passwordField.current.focus()}
                        textContentType={'emailAddress'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        Styles.FormGroup,
                        passwordError && Styles.InputError,
                    ]}
                    onPress={() => passwordField.current.focus()}>
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
                        returnKeyType={'next'}
                        onSubmitEditing={() =>
                            passwordConfirmationField.current.focus()
                        }
                        textContentType={'password'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        Styles.FormGroup,
                        passwordConfError && Styles.InputError,
                    ]}
                    onPress={() => passwordConfirmationField.current.focus()}>
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
                        returnKeyType={'send'}
                        onSubmitEditing={handleSubmit}
                        textContentType={'password'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={Styles.RegisterButton}
                    onPress={handleModalHide}>
                    <Text style={Styles.RegisterText}>Cadastrar</Text>
                </TouchableOpacity>
            </ScrollView>
            <SuccessFeedback
                isVisible={showSuccessModal}
                handleModalHide={handleModalHide}>
                <Text style={Styles.TextH1}>Cadastro realizado!</Text>
                <Text style={Styles.TextP}>
                    Sinta-se à vontade para publicar um livro ou adquirir novos!
                </Text>
                <TouchableOpacity
                    style={Styles.ModalButton}
                    onPress={navigateToLogin}>
                    <Text style={Styles.ButtonText}>Começar</Text>
                </TouchableOpacity>
            </SuccessFeedback>
            <FailedFeedback
                isVisible={showFailModal}
                handleModalHide={handleModalHide}
            />
        </Template>
    );
}
