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
} from '../../../services/UserService';
import {
    loadAuthErrorAction,
    loadAuthAction,
    setUserAction,
} from '../../../redux/actions/authentication';
import { loadAdvertsAction } from '../../../redux/actions/advert';
import { loadCategoriesAction } from '../../../redux/actions/category';
import { setNotificationsAction } from '../../../redux/actions/notification';
import { loadFavoritesAction } from '../../../redux/actions/fav';
import { useTranslation } from 'react-i18next';

export default function Login(props) {
    const dispatch = useDispatch();
    const { redirectEmail } = props.route.params;
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const loading = useSelector(state => state.auth.loading);
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

    useEffect(() => {
        async function getUserInfo() {
            setLogin((await getUserEmail()) || '');
        }
        if (redirectEmail) {
            return setLogin(redirectEmail);
        } else {
            getUserInfo();
        }
    }, [redirectEmail]);

    function handleLoginChange(value) {
        setLogin(value);
        !EMAIL_REGEX.test(value) ? setLoginError(true) : setLoginError(false);
    }

    function handlePasswordChange(value) {
        setPassword(value);
        return value.length < 5
            ? setPasswordError(true)
            : setPasswordError(false);
    }

    function navigateSignUp() {
        return props.navigation.navigate('SignUp');
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
                    return ToastAndroid.show(
                        t('error.noConnection'),
                        ToastAndroid.LONG,
                    );
                case 'Senha Inválida!':
                    ToastAndroid.show(
                        t('error.wrongPassword'),
                        ToastAndroid.SHORT,
                    );
                    setPasswordError(true);
                    return passwordInput.current.focus();
                case 'E-mail inválido!':
                    ToastAndroid.show(
                        t('error.invalidEmail'),
                        ToastAndroid.SHORT,
                    );
                    setLoginError(true);
                    return loginInput.current.focus();
                default: {
                    await storeToken(response.data.token);
                    await dispatch(
                        setUserAction({
                            ...response.data.user,
                            token: response.data.token,
                        }),
                    );
                    StatusBar.setHidden(false);
                    StatusBar.setBarStyle('light-content');
                    ToastAndroid.show(t('global.welcome'), ToastAndroid.SHORT);
                    await dispatch(loadAdvertsAction());
                    await dispatch(
                        setNotificationsAction(
                            response.data.user.notifications,
                        ),
                    );
                    await dispatch(loadCategoriesAction());
                    dispatch(loadFavoritesAction());
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
                style={[Styles.FormGroup, loginError && Styles.InputError]}
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
                style={[Styles.FormGroup, passwordError && Styles.InputError]}
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
                    onValueChange={value => setRemind(value)}
                />
                <TouchableOpacity>
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
