import React, { useState, useRef, useMemo } from 'react';
import {
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
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
import { useTranslation } from 'react-i18next';
import { EMAIL_REGEX } from './../../../validators/LoginValidator';
import { getCoords } from '../../../services/GeocoderService';

export default function SignUp(props) {
	const { t } = useTranslation();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [nameError, setNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
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

	const formValid = useMemo(() => {
		return (
			[nameError, emailError, passwordError, passwordConfError].every(
				(invalid) => !invalid,
			) &&
			[name, email, password, passwordConfirmation].every(
				(input) => !!input,
			)
		);
	}, [
		name,
		email,
		password,
		passwordConfirmation,
		nameError,
		emailError,
		passwordError,
		passwordConfError,
	]);

	async function handleSubmit() {
		const nameSplitted = name.split(' ');
		const firstName = nameSplitted[0];
		nameSplitted.splice(0, 1);

		const reqBody = {
			first_name: firstName,
			last_name: nameSplitted.join(' ') || ' ',
			email,
			password,
			is_admin: '0',
		};

		try {
			const coords = await getCoords();

			if (coords && coords.latitude && coords.longitude) {
				reqBody.address = {
					latitude: coords.latitude,
					longitude: coords.longitude,
				};
			}
		} catch (error) {
			console.log(error);
		}

		let data = reqBody;

		if (avatar) {
			data = createFormData([avatar], 'avatar_file', reqBody);
		}

		try {
			const response = await registerUser(data);

			if (response.data && !response.data.error) {
				setShowSuccessModal(true);
			} else {
				setShowFailModal(true);
			}
		} catch (error) {
			setShowFailModal(true);
		}
	}

	function handleModalHide() {
		setShowFailModal(false);
		setShowSuccessModal(false);
	}

	function handleAvatarPicker() {
		ImagePicker.showImagePicker({ title: 'Camera' }, (image) => {
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
		props.navigation.navigate('Login', { redirectEmail: email });
	}

	function handleNameInput(input) {
		const cleanInput = input.replace(/[^a-zA-Z áàâãéèêíïóôõöúüçñ]/gi, '');
		const names = cleanInput.split(' ');

		if (names.length < 2 || names.some((n) => !n)) {
			setNameError(true);
		} else {
			setNameError(false);
		}

		setName(cleanInput);
	}

	function handleEmailInput(input) {
		if (!EMAIL_REGEX.test(input)) {
			setEmailError(true);
		} else {
			setEmailError(false);
		}
		setEmail(input);
	}

	function handlePasswordConfInput(input) {
		if (input !== password) {
			setPasswordConfError(true);
		} else {
			setPasswordConfError(false);
		}
		setPasswordConfirmation(input);
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
						placeholder={t('signUp.name')}
						placeholderTextColor="#666666"
						autoCapitalize="words"
						autoCorrect={false}
						underlineColorAndroid="transparent"
						style={[Styles.Input, nameError && Styles.InputError]}
						value={name}
						onChangeText={handleNameInput}
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
						placeholder={t('signUp.email')}
						placeholderTextColor="#666666"
						autoCapitalize="none"
						autoCorrect={false}
						autoCompleteType={'email'}
						underlineColorAndroid="transparent"
						style={Styles.Input}
						value={email}
						onChangeText={handleEmailInput}
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
						placeholder={t('signUp.password')}
						placeholderTextColor="#666666"
						autoCapitalize="none"
						autoCorrect={false}
						autoCompleteType={'password'}
						underlineColorAndroid="transparent"
						style={Styles.Input}
						value={password}
						onChangeText={(text) => setPassword(text)}
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
						{ paddingLeft: 14 },
					]}
					onPress={() => passwordConfirmationField.current.focus()}>
					<Password style={Styles.Icon} />
					<TextInput
						ref={passwordConfirmationField}
						placeholder={t('signUp.confirmPassword')}
						placeholderTextColor="#666666"
						autoCapitalize="none"
						autoCorrect={false}
						autoCompleteType={'password'}
						underlineColorAndroid="transparent"
						style={Styles.Input}
						value={passwordConfirmation}
						onChangeText={handlePasswordConfInput}
						secureTextEntry={true}
						returnKeyType={'send'}
						onSubmitEditing={handleSubmit}
						textContentType={'password'}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						Styles.RegisterButton,
						!formValid && { backgroundColor: '#e5e5e5' },
					]}
					onPress={handleSubmit}
					disabled={!formValid}>
					<Text style={Styles.RegisterText}>
						{t('signUp.register')}
					</Text>
				</TouchableOpacity>
			</ScrollView>
			<SuccessFeedback
				isVisible={showSuccessModal}
				handleModalHide={handleModalHide}>
				<Text style={Styles.TextH1}>{t('signUp.success.title')}</Text>
				<Text style={Styles.TextP}>{t('signUp.success.content')}</Text>
				<TouchableOpacity
					style={Styles.ModalButton}
					onPress={navigateToLogin}>
					<Text style={Styles.ButtonText}>
						{t('signUp.success.button')}
					</Text>
				</TouchableOpacity>
			</SuccessFeedback>
			<FailedFeedback
				isVisible={showFailModal}
				handleModalHide={() => setShowFailModal(false)}>
				<Text style={[Styles.TextH1]}>{t('signUp.error.title')}</Text>
				<Text style={Styles.TextP}>{t('signUp.error.content')}</Text>
				<TouchableOpacity
					style={[
						Styles.ModalButton,
						{ height: 45, paddingVertical: 5 },
					]}
					onPress={navigateToLogin}>
					<Text style={Styles.ButtonText}>
						{t('signUp.error.button')}
					</Text>
				</TouchableOpacity>
			</FailedFeedback>
		</Template>
	);
}
