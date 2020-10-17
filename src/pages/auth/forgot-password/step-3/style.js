import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Wrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '80%',
	},
	PageTitle: {
		textAlign: 'center',
		marginTop: 40,
		fontSize: 24,
		fontWeight: 'bold',
	},
	HelpText: {
		textAlign: 'center',
		marginTop: 20,
	},
	FormGroup: {
		width: '100%',
		height: 56,
		padding: 5,
		paddingBottom: 0,
		marginTop: 'auto',
		marginBottom: 'auto',
	},
	Input: {
		width: '100%',
		borderRadius: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#EAEAEA',
		height: 54,
		padding: 5,
		paddingBottom: 0,
	},
	InputError: {
		borderBottomColor: 'red',
	},
	Button: {
		marginTop: 'auto',
		width: 126,
		padding: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.0,
		elevation: 1,
		marginBottom: 40,
		borderRadius: 8,
		backgroundColor: '#EB6339',
		alignItems: 'center',
	},
	ButtonDisabled: {
		backgroundColor: '#dfdfdf',
	},
	ButtonText: {
		textAlign: 'center',
		fontSize: 28,
		color: '#FFFFFF',
	},
});
