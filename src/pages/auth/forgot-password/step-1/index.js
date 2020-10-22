import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ToastAndroid,
} from 'react-native';
import Styles from './style';
import { useTranslation } from 'react-i18next';
import { EMAIL_REGEX } from '../../../../validators/LoginValidator';
import {
	forgotPassword,
	storeEmailToRecover,
} from './../../../../services/AuthService';

function ForgotPassword_1({ setTypedEmail, next }) {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [emailInput, setEmailInput] = useState('');

	const emailValid = useMemo(() => {
		return EMAIL_REGEX.test(emailInput);
	}, [emailInput]);
	const isMounted = useRef(true);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	function sendForm() {
		if (!loading) {
			setLoading(true);

			forgotPassword(emailInput)
				.then(() => {
					if (isMounted.current) {
						storeEmailToRecover(emailInput);
						ToastAndroid.show(
							t('forgotPassword.step_1.successFeedback'),
							ToastAndroid.SHORT,
						);
						setTypedEmail(emailInput);
						next();
					}
				})
				.catch(() => {
					if (isMounted.current) {
						ToastAndroid.show(
							t('forgotPassword.step_1.errorFeedback'),
							ToastAndroid.LONG,
						);
						setLoading(false);
					}
				});
		}
	}

	return (
		<View style={Styles.Wrapper}>
			<Text style={Styles.PageTitle}>
				{t('forgotPassword.step_1.title')}
			</Text>
			<Text style={Styles.HelpText}>
				{t('forgotPassword.step_1.helpText')}
			</Text>
			<View style={Styles.FormGroup}>
				<TextInput
					style={[
						Styles.Input,
						!emailValid && emailInput !== '' && Styles.InputError,
					]}
					placeholder={t('forgotPassword.step_1.input')}
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
				style={[Styles.Button, !emailValid && Styles.ButtonDisabled]}
				onPress={sendForm}
				disabled={!emailValid}>
				<Text style={Styles.ButtonText}>
					{t('forgotPassword.step_1.button')}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default ForgotPassword_1;
