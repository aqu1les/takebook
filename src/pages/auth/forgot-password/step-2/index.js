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
import Template from './../../components/template/index';
import { useTranslation } from 'react-i18next';
import {
	checkTypedToken,
	getEmailToRecover,
	storeTokenToRecover,
} from '../../../../services/AuthService';

function ForgotPassword_2({ navigation }) {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
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
		async function loadEmail() {
			const result = await getEmailToRecover();
			setEmail(result);
		}

		loadEmail();
	}, []);

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
				ToastAndroid.show('PIN validado', ToastAndroid.SHORT);
				navigation.navigate('ForgotPassword_3');
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
				<Text style={Styles.PageTitle}>Digite o PIN</Text>
				<Text style={Styles.HelpText}>
					Enviamos um número de 6 dígitos para o seu e-mail, digite-o
					abaixo para continuar o processo de recuperação de senha
				</Text>
				<View
					style={[
						Styles.FormGroup,
						{
							flexDirection: 'row',
							justifyContent: 'space-between',
						},
					]}>
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
						style={{
							width: '15%',
							borderColor: '#000',
							borderBottomWidth: 1,
						}}
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
						style={{
							width: '15%',
							borderColor: '#000',
							borderBottomWidth: 1,
						}}
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
						style={{
							width: '15%',
							borderColor: '#000',
							borderBottomWidth: 1,
						}}
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
						style={{
							width: '15%',
							borderColor: '#000',
							borderBottomWidth: 1,
						}}
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
						style={{
							width: '15%',
							borderColor: '#000',
							borderBottomWidth: 1,
						}}
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
						style={{
							width: '15%',
							borderColor: '#000',
							borderBottomWidth: 1,
						}}
						maxLength={1}
						onSubmitEditing={submitForm}
					/>
				</View>
				<TouchableOpacity
					onPress={submitForm}
					style={[
						Styles.Button,
						(!tokenValid || !email) && {
							backgroundColor: '#e5e5e5',
						},
					]}
					disabled={!tokenValid || !email}>
					<Text style={Styles.ButtonText}>Continuar</Text>
				</TouchableOpacity>
			</View>
		</Template>
	);
}

export default ForgotPassword_2;
