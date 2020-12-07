import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Modal: {
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	ModalCard: {
		width: '80%',
		minWidth: 340,
		minHeight: 175,
		maxHeight: 250,
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		flexDirection: 'column',
		alignItems: 'center',
		paddingBottom: 12,
		paddingHorizontal: 22,
		justifyContent: 'space-around',
	},
	ModalClose: {
		position: 'absolute',
		top: 15,
		right: 15,
	},
	Title: {
		fontWeight: 'bold',
		fontSize: 24,
		marginBottom: 24,
		marginTop: 24,
	},
	Content: {
		width: '100%',
		marginTop: 24,
	},
	ContentWrapper: {
		width: '100%',
	},
	Actions: {
		flexDirection: 'row',
		width: '100%',
		height: 45,
		marginTop: 15,
		justifyContent: 'center',
	},
	Deny: {
		width: '40%',
		backgroundColor: '#FFF',
		height: 45,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 8,
	},
	Confirm: {
		width: '40%',
		borderRadius: 8,
		backgroundColor: '#EB6339',
		height: 45,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 2,
	},
	ConfirmText: {
		color: '#ffffff',
		fontSize: 18,
	},
	DenyText: {
		color: '#000',
		borderBottomColor: '#000',
		borderBottomWidth: 1,
		fontSize: 14,
	},
	Animation: {
		width: 150,
		height: 150,
	},
});
