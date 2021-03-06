import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	MyMessage: {
		backgroundColor: '#0692cb',
		alignSelf: 'flex-end',
		borderTopRightRadius: 0,
		paddingRight: 10,
	},
	NotMyMessage: {
		backgroundColor: '#f98b0d',
		alignSelf: 'flex-start',
		borderTopLeftRadius: 0,
		paddingLeft: 10,
	},
	Message: {
		minHeight: 40,
		height: 'auto',
		width: 'auto',
		minWidth: 90,
		maxWidth: '70%',
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingTop: 5,
		paddingBottom: 10,
		paddingHorizontal: 15,
		marginVertical: 5,
		elevation: 1,
	},
	Text: {
		color: '#FFFFFF',
		fontSize: 14,
		marginBottom: 3,
	},
	CreationTime: {
		position: 'absolute',
		bottom: 3,
		right: 15,
		color: '#FFFFFF',
		fontSize: 9,
	},
});
