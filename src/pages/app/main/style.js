import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: '#eeeeee',
	},
	AddButton: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		position: 'absolute',
		right: 20,
		bottom: 40,
		borderRadius: 100,
		height: 51,
		width: 52,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fb8c00',
	},
});
