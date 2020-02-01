import React, { useState, useRef } from 'react';
import { View, Text } from 'react-native';
import Template from '../components/template';
import User from '../../../assets/icons/user.svg';
import Password from '../../../assets/icons/password.svg';
import Email from '../../../assets/icons/form-email.svg';
import Styles from './style';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

export default SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswrodError] = useState(false);
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
    const nameField = useRef(null);
    const emailField = useRef(null);
    const passwordField = useRef(null);
    const passwordConfirmationField = useRef(null);

    function handleSubmit() {
        console.log('submitted');
    }
    return (
        <Template>
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
                    returnKeyType={"next"}
                    onSubmitEditing={() => passwordConfirmationField.current.focus()}
                    secureTextEntry={true}
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
                    enablesReturnKeyAutomatically={true}
                    textContentType={'password'}
                />
            </TouchableOpacity>
            <TouchableOpacity style={Styles.RegisterButton} onPress={handleSubmit}>
                <Text style={Styles.RegisterText}>Cadastrar</Text>
            </TouchableOpacity>
        </Template>
    )
}