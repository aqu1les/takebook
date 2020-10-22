import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ToastAndroid,
} from 'react-native';
import Styles from './style';
import { useTranslation } from 'react-i18next';
import { updatePassword } from '../../../../services/AuthService';

function ForgotPassword_3({ email, token, next }) {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const isMounted = useRef(true);

	const passwordValid = useMemo(() => password !== '', [password]);

	const confirmationValid = useMemo(
		() => passwordValid && password === passwordConfirmation,
		[passwordValid, password, passwordConfirmation],
	);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

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
				if (isMounted.current) {
					ToastAndroid.show(
						t('forgotPassword.step_3.successFeedback'),
						ToastAndroid.SHORT,
					);
					next();
				}
			})
			.catch(() => {
				if (isMounted.current) {
					ToastAndroid.show(
						t('error.somethingWentWrong'),
						ToastAndroid.LONG,
					);
					setLoading(false);
				}
			});
	}

	return (
		<View style={Styles.Wrapper}>
			<Text style={Styles.PageTitle}>
				{t('forgotPassword.step_3.title')}
			</Text>
			<Text style={Styles.HelpText}>
				{t('forgotPassword.step_3.helpText')}
			</Text>
			<View style={Styles.FormGroup}>
				<TextInput
					style={Styles.Input}
					placeholder={t('forgotPassword.step_3.firstInput')}
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
					style={Styles.Input}
					placeholder={t('forgotPassword.step_3.secondInput')}
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
					(!password || !confirmationValid) && Styles.ButtonDisabled,
				]}
				disabled={!confirmationValid || !password}>
				<Text style={Styles.ButtonText}>
					{t('forgotPassword.step_3.button')}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default ForgotPassword_3;
