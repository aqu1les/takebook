import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ToastAndroid } from 'react-native';
import Styles from './style';
import Template from '../components/template';
import User from '../../../assets/icons/user.svg';
import Password from '../../../assets/icons/password.svg';
import { getUserEmail, setUserEmail, authenticateUser, storeToken } from '../../../services/UserService';

export default function Login(props) {
    const redirectEmail = props.navigation.getParam('email');
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [loading, setLoading] = useState(false);
    const loginInput = useRef(null);
    const passwordInput = useRef(null);
    const [login, setLogin] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [remind, setRemind] = useState(true);
    const invalid =
        loginError || passwordError || login.length == '' || password == '';


    useEffect(() => {
        async function getUserInfo() {

            const userEmail = await getUserEmail();
            return userEmail ? setLogin(userEmail) : setLogin('');
        }
        if (redirectEmail) {
            setLogin(redirectEmail);
        } else {
            getUserInfo();
        }
    });

    function handleLoginChange(value) {
        setLogin(value);
        return !EMAIL_REGEX.test(value)
            ? setLoginError(true)
            : setLoginError(false);
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
        setLoading(true);
        passwordInput.current.blur();
        if (!login || !password || invalid) {
            if (!login) setLoginError(true);
            else if (!password) setPasswordError(true);
            return setLoading(false);
        }
        if (remind) {
            await setUserEmail(login);
        }
        const response = await authenticateUser(login, password, remind);
        setLoading(false);
        if (!response)
            return ToastAndroid.show(
                'Não foi possível contactar o servidor!',
                ToastAndroid.LONG,
            );
        if (response === 'Senha Inválida!' || response === 'E-mail inválido!')
            return ToastAndroid.show(response, ToastAndroid.SHORT);
        if (response.data.status === 'success') {
            await storeToken(response.data.token);
            ToastAndroid.show('Bem vindo ao Takebook !', ToastAndroid.SHORT);
            props.navigation.navigate('App');
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
                    placeholder="Digite aqui o seu e-mail"
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
                    placeholder="Digite aqui a sua senha"
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
                    accessibilityLabel="Mantenha-se conectado"
                    onValueChange={value => setRemind(value)}
                />
                <TouchableOpacity>
                    <Text style={Styles.Forgot}>Esqueceu a senha?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[Styles.Button, invalid && Styles.ButtonDisabled]}
                onPress={submitForm}
                disabled={invalid}>
                <Text style={Styles.ButtonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateSignUp}>
                <Text style={Styles.Register}>Cadastre-se</Text>
            </TouchableOpacity>
        </Template>
    );
};
