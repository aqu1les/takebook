import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	StatusChip: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		right: 0,
	},
	StatusChipText: {
		fontSize: 12,
	},
	StatusChipApproved: {
		backgroundColor: '#47b728',
	},
	StatusChipTextApproved: {
		color: '#ffffff',
	},
	HorizontalDivider: {
		width: '90%',
		height: 2,
		backgroundColor: '#e5e5e5',
		marginVertical: 10,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
});
