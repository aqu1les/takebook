import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Wrapper: {
		height: 90,
		backgroundColor: '#FCFCFD',
		width: '100%',
		padding: 15,
		flexDirection: 'row',
		position: 'relative',
		alignItems: 'center',
	},
	UserAvatar: {
		backgroundColor: '#f15c2b',
		width: 60,
		height: 60,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 15,
	},
	MiddleContainer: {
		flexDirection: 'column',
		height: '80%',
		justifyContent: 'space-between',
	},
	UserName: {
		fontWeight: '700',
		fontSize: 18,
	},
	LastMessage: {
		fontWeight: '600',
		fontSize: 14,
		color: '#A5A5A5',
	},
	Time: {
		position: 'absolute',
		top: 20,
		right: 15,
		fontWeight: '600',
		fontSize: 14,
		color: '#A5A5A5',
	},
});
