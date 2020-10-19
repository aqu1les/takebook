import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Input: {
		marginLeft: 5,
		padding: 5,
		width: '100%',
		fontSize: 18,
	},
	FormGroup: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		borderRadius: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#EAEAEA',
		height: 54,
		padding: 5,
		paddingBottom: -6,
		marginTop: 8,
		marginBottom: 8,
	},
	FormGroupRow: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '46%',
		borderRadius: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#EAEAEA',
		height: 50,
		padding: 5,
		paddingBottom: -6,
		marginTop: 5,
		marginBottom: 5,
	},
	Row: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
	},
	ButtonText: {
		color: '#fff',
		fontSize: 20,
	},
	Button: {
		elevation: 2,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 0,
	},
	ButtonsRow: {
		marginTop: 20,
	},
	SecondaryButton: {
		borderWidth: 1,
		borderColor: '#727272',
		backgroundColor: '#fff',
	},
	SecondaryButtonText: {
		color: '#727272',
		fontSize: 20,
	},
	ActionButton: {
		backgroundColor: '#3eb3e5',
	},
	ActionButtonDisabled: {
		opacity: 0.3,
		elevation: 0,
	},
});
