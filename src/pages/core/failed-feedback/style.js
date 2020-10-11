import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Modal: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	ModalCard: {
		width: '80%',
		minWidth: 340,
		minHeight: 400,
		height: '65%',
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		flexDirection: 'column',
		alignItems: 'center',
		paddingBottom: 12,
		paddingHorizontal: 12,
		justifyContent: 'space-around',
	},
	ModalClose: {
		position: 'absolute',
		top: 15,
		right: 15,
	},
	Animation: { width: 150, height: 150 },
});
