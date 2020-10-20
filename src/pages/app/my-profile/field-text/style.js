import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	FormGroup: {
		flexDirection: 'column',
		borderRadius: 8,
		borderColor: '#fb8c00',
		borderWidth: 2,
		padding: 10,
		paddingVertical: 5,
		backgroundColor: '#fff',
		elevation: 1,
		marginBottom: 10,
	},
	Row: {
		flexDirection: 'row',
	},
	InputLabel: {
		fontWeight: 'bold',
		fontSize: 12,
	},
	InputText: {
		fontSize: 14,
	},
	TextInput: {
		padding: 0,
		margin: 0,
		width: '80%',
		height: '100%',
		paddingTop: 0,
	},
	ActionButtonsWrapper: {
		flexDirection: 'row',
		width: '20%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	ActionButton: {
		height: 24,
		width: 24,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
