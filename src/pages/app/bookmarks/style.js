import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: '#eeeeee',
		padding: 10,
	},
	EmptyListContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	Text: {
		textAlign: 'center',
		marginVertical: 5,
	},
	LoadButton: {
		marginTop: 15,
		width: '90%',
		height: 40,
		backgroundColor: '#EB6339',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 1,
		borderRadius: 12,
		padding: 8,
	},
	LoadButtonText: {
		color: '#fff',
		fontSize: 16,
	},
});
