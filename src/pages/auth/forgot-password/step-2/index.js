import React, {
	useState,
	useCallback,
	useEffect,
	useRef,
	useMemo,
} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ToastAndroid,
} from 'react-native';
import Styles from './style';
import { useTranslation } from 'react-i18next';
import {
	checkTypedToken,
	storeTokenToRecover,
} from '../../../../services/AuthService';

function ForgotPassword_2({ next, setTypedToken, email }) {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState('');
	const [digits, setDigits] = useState([null, null, null, null, null, null]);
	const input_1 = useRef(null);
	const input_2 = useRef(null);
	const input_3 = useRef(null);
	const input_4 = useRef(null);
	const input_5 = useRef(null);
	const input_6 = useRef(null);

	const inputsArray = useMemo(() => {
		return [input_1, input_2, input_3, input_4, input_5, input_6];
	}, [input_1, input_2, input_3, input_4, input_5, input_6]);

	const updateDigits = useCallback((value, index) => {
		setDigits((v) => v.map((v, i) => (i === index ? value : v)));
	}, []);

	const tokenValid = useMemo(() => token.length === 6, [token]);

	useEffect(() => {
		const newToken = digits.reduce(
			(acc, value) => (value !== null ? acc + value : acc),
			'',
		);
		setToken(newToken);
	}, [digits]);

	function onInputDigit(text, position) {
		updateDigits(text, position);

		if (position !== 5) {
			if (text !== '') {
				return inputsArray[position + 1].current.focus();
			}
		} else if (position === 5 && text === '') {
			return inputsArray[position - 1].current.focus();
		}
	}

	function submitForm() {
		if (loading || !token || !email) {
			return;
		}

		setLoading(true);
		checkTypedToken(token, email)
			.then(() => {
				storeTokenToRecover(token);
				ToastAndroid.show(
					t('forgotPassword.step_2.successFeedback'),
					ToastAndroid.SHORT,
				);
				setTypedToken(token);
				next();
			})
			.catch((err) => {
				if (err.status === 422) {
					ToastAndroid.show(
						t('forgotPassword.step_2.errorFeedback'),
						ToastAndroid.LONG,
					);
				} else {
					ToastAndroid.show(
						t('error.somethingWentWrong'),
						ToastAndroid.LONG,
					);
				}
				setLoading(false);
			});
	}

	return (
		<View style={Styles.Wrapper}>
			<Text style={Styles.PageTitle}>
				{t('forgotPassword.step_2.title')}
			</Text>
			<Text style={Styles.HelpText}>
				{t('forgotPassword.step_2.helpText')}
			</Text>
			<View style={[Styles.FormGroup, Styles.FormRow]}>
				<TextInput
					ref={input_1}
					autoFocus={true}
					autoCorrect={false}
					underlineColorAndroid="transparent"
					keyboardType="numeric"
					returnKeyType={'next'}
					blurOnSubmit={false}
					value={digits[0]}
					onChangeText={(text) => onInputDigit(text, 0)}
					style={Styles.Input}
					maxLength={1}
				/>
				<TextInput
					ref={input_2}
					autoCorrect={false}
					underlineColorAndroid="transparent"
					keyboardType="numeric"
					returnKeyType={'next'}
					blurOnSubmit={false}
					value={digits[1]}
					onChangeText={(text) => onInputDigit(text, 1)}
					style={Styles.Input}
					maxLength={1}
				/>
				<TextInput
					ref={input_3}
					autoCorrect={false}
					underlineColorAndroid="transparent"
					keyboardType="numeric"
					returnKeyType={'next'}
					blurOnSubmit={false}
					value={digits[2]}
					onChangeText={(text) => onInputDigit(text, 2)}
					style={Styles.Input}
					maxLength={1}
				/>
				<TextInput
					ref={input_4}
					autoCorrect={false}
					underlineColorAndroid="transparent"
					keyboardType="numeric"
					returnKeyType={'next'}
					blurOnSubmit={false}
					value={digits[3]}
					onChangeText={(text) => onInputDigit(text, 3)}
					style={Styles.Input}
					maxLength={1}
				/>
				<TextInput
					ref={input_5}
					autoCorrect={false}
					underlineColorAndroid="transparent"
					keyboardType="numeric"
					returnKeyType={'next'}
					blurOnSubmit={false}
					value={digits[4]}
					onChangeText={(text) => onInputDigit(text, 4)}
					style={Styles.Input}
					maxLength={1}
				/>
				<TextInput
					ref={input_6}
					autoCorrect={false}
					underlineColorAndroid="transparent"
					keyboardType="numeric"
					returnKeyType={'send'}
					blurOnSubmit={true}
					value={digits[5]}
					onChangeText={(text) => onInputDigit(text, 5)}
					style={Styles.Input}
					maxLength={1}
					onSubmitEditing={submitForm}
				/>
			</View>
			<TouchableOpacity
				onPress={submitForm}
				style={[
					Styles.Button,
					(!tokenValid || !email) && Styles.ButtonDisabled,
				]}
				disabled={!tokenValid || !email}>
				<Text style={Styles.ButtonText}>
					{t('forgotPassword.step_2.button')}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default ForgotPassword_2;
