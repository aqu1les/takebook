import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Modal: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	ModalCard: {
		minHeight: 450,
		height: '95%',
		width: '85%',
		minWidth: 350,
		backgroundColor: '#FFFFFF',
		borderRadius: 8,
		flexDirection: 'column',
		padding: 15,
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	Title: {
		textAlign: 'center',
	},
	EmptyList: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	SwiperWrapper: {
		height: '90%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	SwiperContainer: {
		flex: 1,
		width: '100%',
	},
	Dot: {
		bottom: 50,
	},
	ActiveDot: {
		bottom: 50,
		width: 10,
		height: 10,
	},
});
