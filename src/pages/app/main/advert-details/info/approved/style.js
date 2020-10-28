import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Container: {
		flex: 1,
	},
	StatusChipApproved: {
		backgroundColor: '#47b728',
	},
	InfoAlert: {
		borderColor: '#47b728',
		backgroundColor: '#b1f29d',
		borderWidth: 1,
		height: 60,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		marginTop: 12,
	},
	InfoAlertText: {
		color: '#000000',
		fontSize: 14,
	},
	TitleText: {
		fontSize: 20,
		fontWeight: '600',
	},
	Button: {
		marginTop: 45,
		height: 50,
		width: '100%',
		elevation: 2,
		backgroundColor: '#EB6339',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
	},
	ButtonText: {
		color: '#fff',
		fontSize: 16,
	},
	HelpContainer: {
		width: '100%',
		height: 70,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		padding: 8,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#424242',
		marginTop: 12,
	},
	HelpText: {
		marginLeft: 8,
		width: '90%',
		color: '#424242',
	},
});
