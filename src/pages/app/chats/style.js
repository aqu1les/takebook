import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: '#eeeeee',
	},
	Divider: {
		width: '80%',
		backgroundColor: '#e5e5e5',
		height: 1,
	},
	EmptyList: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		padding: 10,
	},
	CenterText: {
		textAlign: 'center',
	},
	ListContainer: {
		width: '100%',
	},
	LoadButton: {
		marginTop: 15,
		width: 150,
		height: 35,
		backgroundColor: '#f98b0d',
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
