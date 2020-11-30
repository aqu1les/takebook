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
		minHeight: 450,
		height: '85%',
		width: '85%',
		minWidth: 350,
		backgroundColor: '#FFFFFF',
		borderRadius: 8,
		flexDirection: 'column',
		padding: 15,
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	SearchContainer: {
		flexDirection: 'row',
		width: '100%',
		height: 50,
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 8,
	},
	UserAvatar: {
		height: '80%',
		borderRadius: 100,
	},
	Input: {
		width: '88%',
		paddingBottom: 6,
	},
	ListContainer: {
		flex: 1,
		width: '100%',
		maxHeight: '60%',
		marginTop: 10,
	},
	EmptyList: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	Separator: {
		height: 1,
		width: '80%',
		backgroundColor: '#e5e5e5',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	ActionButton: {
		height: 50,
		elevation: 2,
		backgroundColor: '#EB6339',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		zIndex: 1000,
	},
	ActionButtonDisabled: {
		backgroundColor: '#d5d5d5',
	},
	ActionButtonText: {
		color: '#fff',
		fontSize: 16,
	},
	SecondaryButton: {
		backgroundColor: '#FFF',
	},
	SecondaryButtonText: {
		color: '#38C2FF',
		borderBottomColor: '#38C2FF',
		borderBottomWidth: 1,
		fontSize: 12,
	},
});
