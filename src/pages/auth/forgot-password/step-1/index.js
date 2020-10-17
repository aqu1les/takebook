import React, { useState, useMemo } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ToastAndroid,
} from 'react-native';
import Styles from './style';
import Template from './../../components/template/index';
import { useTranslation } from 'react-i18next';
import { EMAIL_REGEX } from '../../../../validators/LoginValidator';
import {
	forgotPassword,
	storeEmailToRecover,
} from './../../../../services/AuthService';

function ForgotPassword_1({ navigation }) {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [emailInput, setEmailInput] = useState('');

	const emailValid = useMemo(() => {
		return EMAIL_REGEX.test(emailInput);
	}, [emailInput]);

	function sendForm() {
		if (!loading) {
			setLoading(true);

			forgotPassword(emailInput)
				.then(() => {
					storeEmailToRecover(emailInput);
					ToastAndroid.show(
						'O e-mail foi enviado!',
						ToastAndroid.SHORT,
					);

					navigation.navigate('ForgotPassword_2');
				})
				.catch(() => {
					ToastAndroid.show(
						'Deu algo de errado, tente novamente mais tarde!',
						ToastAndroid.LONG,
					);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}

	return (
		<Template withLogo={false}>
			<View style={Styles.Wrapper}>
				<Text style={Styles.PageTitle}>Recuperar a senha</Text>
				<Text style={Styles.HelpText}>
					Digite o e-mail registrado para que possamos enviar o PIN
					para recuperar a sua senha.
				</Text>
				<View style={Styles.FormGroup}>
					<TextInput
						style={[
							Styles.Input,
							!emailValid &&
								emailInput !== '' &&
								Styles.InputError,
						]}
						placeholder={t('login.email')}
						placeholderTextColor="#666666"
						autoCapitalize="none"
						autoCorrect={false}
						underlineColorAndroid="transparent"
						value={emailInput}
						onChangeText={(text) => setEmailInput(text)}
						keyboardType="email-address"
						returnKeyType={'next'}
					/>
				</View>
				<TouchableOpacity
					style={[
						Styles.Button,
						!emailValid && Styles.ButtonDisabled,
					]}
					onPress={sendForm}
					disabled={!emailValid}>
					<Text style={Styles.ButtonText}>Enviar</Text>
				</TouchableOpacity>
			</View>
		</Template>
	);
}

export default ForgotPassword_1;
