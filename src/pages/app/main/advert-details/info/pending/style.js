import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Row: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	StatusChip: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 2,
	},
	StatusChipText: {
		fontSize: 12,
	},
	StatusChipPending: {
		backgroundColor: '#3877ff',
	},
	StatusChipTextPending: {
		color: '#ffffff',
	},
	StatusChipDeclined: {
		backgroundColor: '#ff6868',
	},
	StatusChipTextDeclined: {
		color: '#ffffff',
	},
	StatusChipApproved: {
		backgroundColor: '#47b728',
	},
	HorizontalDivider: {
		width: '90%',
		height: 2,
		backgroundColor: '#e5e5e5',
		marginVertical: 10,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	InfoContainer: {
		height: 60,
		width: '100%',
		borderWidth: 1,
		borderRadius: 8,
		padding: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
	},
	Warn: {
		borderColor: '#FFC107',
		backgroundColor: '#FFDF7E',
	},
	WarnText: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#000',
		textAlign: 'center',
	},
	Info: {
		borderColor: '#3877ff',
		backgroundColor: '#7fa7ff',
	},
	InfoText: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#FFFFFF',
		textAlign: 'center',
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
	ScrollContainer: {
		minHeight: '100%',
	},
	SituationRow: {
		marginBottom: 10,
		height: 40,
	},
});
