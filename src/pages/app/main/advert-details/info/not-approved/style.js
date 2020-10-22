import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Row: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	Button: {
		width: 'auto',
		marginLeft: 'auto',
		height: '100%',
		borderColor: '#FFC107',
		borderWidth: 1,
		borderRadius: 20,
	},
	SimpleText: {
		color: '#000',
		fontSize: 16,
		fontWeight: '600',
	},
	Wrapper: {
		flex: 1,
	},
});
