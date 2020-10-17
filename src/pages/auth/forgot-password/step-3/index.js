import React, { useMemo, useState, useEffect } from 'react';
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
import {
	getEmailToRecover,
	getTokenToRecover,
	removeEmailToRecover,
	removeTokenToRecover,
	updatePassword,
} from '../../../../services/AuthService';

function ForgotPassword_3({ navigation }) {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [email, setEmail] = useState('');
	const [token, setToken] = useState('');

	useEffect(() => {
		async function loadData() {
			const resultEmail = await getEmailToRecover();
			const resultToken = await getTokenToRecover();

			setEmail(resultEmail);
			setToken(resultToken);
		}

		loadData();
	}, []);

	const passwordValid = useMemo(() => password !== '', [password]);

	const confirmationValid = useMemo(
		() => passwordValid && password === passwordConfirmation,
		[passwordValid, password, passwordConfirmation],
	);

	function submitPasswords() {
		if (loading || !email || !token || !confirmationValid) {
			return;
		}
		setLoading(true);

		updatePassword({
			email,
			token,
			password,
			password_confirmation: passwordConfirmation,
		})
			.then(() => {
				removeTokenToRecover();
				removeEmailToRecover();

				ToastAndroid.show(
					'Senha alterada com sucesso!',
					ToastAndroid.SHORT,
				);
				navigation.navigate('Login', { redirectEmail: email });
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

	return (
		<Template withLogo={false}>
			<View style={Styles.Wrapper}>
				<Text style={Styles.PageTitle}>Escolha sua nova senha</Text>
				<Text style={Styles.HelpText}>
					Agora que finalizamos todos os passos, digite uma nova senha
					para a sua conta! =D
				</Text>
				<View style={Styles.FormGroup}>
					<TextInput
						style={[Styles.Input]}
						placeholder="Digite sua nova a senha"
						placeholderTextColor="#666666"
						autoCapitalize="none"
						autoCorrect={false}
						underlineColorAndroid="transparent"
						keyboardType="default"
						returnKeyType={'next'}
						secureTextEntry={true}
						value={password}
						onChangeText={(text) => setPassword(text)}
					/>
					<TextInput
						style={[Styles.Input]}
						placeholder="Confirme a senha"
						placeholderTextColor="#666666"
						autoCapitalize="none"
						autoCorrect={false}
						underlineColorAndroid="transparent"
						keyboardType="default"
						returnKeyType={'send'}
						secureTextEntry={true}
						value={passwordConfirmation}
						onChangeText={(text) => setPasswordConfirmation(text)}
					/>
				</View>
				<TouchableOpacity
					onPress={submitPasswords}
					style={[
						Styles.Button,
						(!password || !confirmationValid) && {
							backgroundColor: '#e5e5e5',
						},
					]}
					disabled={!confirmationValid || !password}>
					<Text style={Styles.ButtonText}>Alterar</Text>
				</TouchableOpacity>
			</View>
		</Template>
	);
}

export default ForgotPassword_3;
