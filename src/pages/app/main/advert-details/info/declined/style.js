import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Row: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	Wrapper: {
		flex: 1,
	},
	StatusRow: {
		marginBottom: 10,
		height: 40,
	},
	StatusChipDeclined: {
		marginLeft: 8,
		backgroundColor: '#FAE7E7',
		borderWidth: 1,
		borderColor: '#F93E3E',
	},
	StatusChipTextDeclined: {
		color: '#3b4151',
	},
	InfoWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	InfoTitle: {
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 8,
		fontSize: 16,
	},
	InfoContent: {
		textAlign: 'center',
	},
});
