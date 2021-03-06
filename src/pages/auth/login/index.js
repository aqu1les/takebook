import React, { useState, useRef, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Switch,
	ToastAndroid,
	StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './style';
import Template from '../components/template';
import User from '../../../assets/icons/user.svg';
import Password from '../../../assets/icons/password.svg';
import {
	getUserEmail,
	setUserEmail,
	authenticateUser,
	storeToken,
	getUser,
} from '../../../services/UserService';
import {
	loadAuthErrorAction,
	loadAuthAction,
	setUserAction,
	tokenValidated,
} from '../../../redux/actions/authentication';
import { loadAdvertsAction } from '../../../redux/actions/advert';
import { loadCategoriesAction } from '../../../redux/actions/category';
import { setNotificationsAction } from '../../../redux/actions/notification';
import { loadFavoritesAction } from '../../../redux/actions/fav';
import { useTranslation } from 'react-i18next';
import { EMAIL_REGEX } from '../../../validators/LoginValidator';

export default function Login(props) {
	const dispatch = useDispatch();
	const { redirectEmail } = props.route.params;
	const loading = useSelector((state) => state.auth.loading);
	const loginInput = useRef(null);
	const passwordInput = useRef(null);
	const [login, setLogin] = useState('');
	const [loginError, setLoginError] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [remind, setRemind] = useState(true);
	const invalid =
		loginError || passwordError || login === '' || password === '';
	const { t } = useTranslation();
	const isMounted = useRef(true);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (passwordInput.current) {
			passwordInput.current.setNativeProps({
				secureTextEntry: true,
				style: {
					fontFamily: 'Roboto',
				},
			});
		}
	}, [passwordInput]);

	useEffect(() => {
		async function getUserInfo() {
			const storedEmail = await getUserEmail();
			if (isMounted.current) {
				setLogin(storedEmail || '');
			}
		}

		if (redirectEmail) {
			return setLogin(redirectEmail);
		} else {
			getUserInfo();
		}
	}, [redirectEmail]);

	useEffect(() => {
		if (password.length >= 1) {
			setPasswordError(false);
		} else {
			setPasswordError(true);
		}
	}, [password]);

	useEffect(() => {
		!EMAIL_REGEX.test(login) ? setLoginError(true) : setLoginError(false);
	}, [login]);

	function handleLoginChange(value) {
		setLogin(value);
	}

	function handlePasswordChange(value) {
		setPassword(value);
	}

	function navigateSignUp() {
		return props.navigation.navigate('SignUp');
	}

	function navigateForgotPassword() {
		return props.navigation.navigate('ForgotPassword');
	}

	async function submitForm() {
		passwordInput.current.blur();
		if (!login || !password || invalid) {
			if (!login) {
				setLoginError(true);
			} else if (!password) {
				setPasswordError(true);
			}
			return;
		}

		if (remind) {
			await setUserEmail(login);
		}

		try {
			dispatch(loadAuthAction());
			const response = await authenticateUser(login, password, remind);

			switch (response) {
				case '':
					dispatch(loadAuthErrorAction());
					return ToastAndroid.show(
						t('error.noConnection'),
						ToastAndroid.LONG,
					);
				case 'Senha Inválida!':
					dispatch(loadAuthErrorAction());
					ToastAndroid.show(
						t('error.wrongPassword'),
						ToastAndroid.SHORT,
					);

					if (isMounted.current) {
						setPasswordError(true);
						setPassword('');
						passwordInput.current.focus();
					}

					break;
				case 'E-mail inválido!':
					dispatch(loadAuthErrorAction());
					ToastAndroid.show(
						t('error.invalidEmail'),
						ToastAndroid.SHORT,
					);
					if (isMounted.current) {
						setLoginError(true);
						loginInput.current.focus();
					}
					break;
				default: {
					await storeToken(response.data.token);

					const userInfo = await getUser();

					if (userInfo && userInfo.status === 200) {
						await dispatch(
							setNotificationsAction(userInfo.data.notifications),
						);
						await dispatch(
							setUserAction({
								...userInfo.data,
								token: response.data.token,
							}),
						);
						await dispatch(tokenValidated());
						await dispatch(loadFavoritesAction());

						StatusBar.setHidden(false);
						StatusBar.setBarStyle('light-content');

						ToastAndroid.show(
							t('global.welcome'),
							ToastAndroid.SHORT,
						);

						await dispatch(loadAdvertsAction());
						await dispatch(
							setNotificationsAction(
								response.data.user.notifications,
							),
						);
						await dispatch(loadCategoriesAction());
						dispatch(loadFavoritesAction());
					} else {
						dispatch(loadAuthErrorAction());
					}
					break;
				}
			}
		} catch (e) {
			dispatch(loadAuthErrorAction());
			ToastAndroid.show(t('error.somethingWentWrong'), ToastAndroid.LONG);
		}
	}

	return (
		<Template loading={loading}>
			<TouchableOpacity
				style={[
					Styles.FormGroup,
					loginError && login !== '' && Styles.InputError,
				]}
				onPress={() => loginInput.current.focus()}>
				<User style={Styles.Icon} />
				<TextInput
					ref={loginInput}
					placeholder={t('login.email')}
					placeholderTextColor="#666666"
					autoCapitalize="none"
					autoCorrect={false}
					underlineColorAndroid="transparent"
					style={Styles.Input}
					value={login}
					onChangeText={handleLoginChange}
					keyboardType="email-address"
					returnKeyType={'next'}
					onSubmitEditing={() => passwordInput.current.focus()}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				style={[
					Styles.FormGroup,
					passwordError && password !== '' && Styles.InputError,
				]}
				onPress={() => passwordInput.current.focus()}>
				<Password style={Styles.Icon} />
				<TextInput
					ref={passwordInput}
					placeholder={t('login.password')}
					placeholderTextColor="#666666"
					autoCapitalize="none"
					autoCorrect={false}
					underlineColorAndroid="transparent"
					style={Styles.Input}
					value={password}
					onChangeText={handlePasswordChange}
					secureTextEntry={true}
					onSubmitEditing={submitForm}
					blurOnSubmit={true}
				/>
			</TouchableOpacity>
			<View style={Styles.Options}>
				<Switch
					trackColor={{ false: '', true: '#FFBB89' }}
					thumbColor="#EB6339"
					value={remind}
					accessibilityLabel={t('login.remindMe')}
					onValueChange={(value) => setRemind(value)}
				/>
				<TouchableOpacity onPress={() => navigateForgotPassword()}>
					<Text style={Styles.Forgot}>{t('login.forgot')}</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={[Styles.Button, invalid && Styles.ButtonDisabled]}
				onPress={submitForm}
				disabled={invalid}>
				<Text style={Styles.ButtonText}>{t('login.login')}</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={navigateSignUp}>
				<Text style={Styles.Register}>{t('login.register')}</Text>
			</TouchableOpacity>
		</Template>
	);
}
