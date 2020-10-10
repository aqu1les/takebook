import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Modal: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	ModalClose: {
		position: 'absolute',
		top: 15,
		right: 15,
	},
	ModalCard: {
		height: 450,
		minHeight: 450,
		width: '80%',
		minWidth: 350,
		backgroundColor: '#FFFFFF',
		borderRadius: 18,
		flexDirection: 'column',
		padding: 15,
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	TextHeader: {
		fontSize: 28,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	TextP: {
		fontSize: 22,
		marginHorizontal: 30,
		textAlign: 'center',
	},
	ModalButton: {
		backgroundColor: '#fb8c00',
		borderRadius: 24,
		width: 120,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	ModalButtonText: {
		color: '#FFFFFF',
		fontSize: 22,
	},
});
