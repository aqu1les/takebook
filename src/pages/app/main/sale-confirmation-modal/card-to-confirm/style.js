import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Container: {
		backgroundColor: '#FFF',
		elevation: 2,
		height: '99%',
		width: '99%',
		marginTop: 'auto',
		marginBottom: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 8,
		paddingHorizontal: 4,
	},
	CoverContainer: {
		borderRadius: 8,
		padding: 8,
		height: '65%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	Cover: {
		width: 180,
		height: '100%',
		borderRadius: 8,
	},
	OwnerInfoRow: {
		flexDirection: 'row',
		height: '15%',
		width: '100%',
		alignItems: 'center',
	},
	OwnerAvatar: {
		height: '60%',
	},
	OwnerInfo: {
		marginLeft: 6,
	},
	OwnerText: {
		marginBottom: 2,
	},
	BoldText: {
		fontWeight: 'bold',
	},
	UserAvatar: {
		height: '80%',
		borderRadius: 100,
	},
	ActionsRow: {
		flexDirection: 'row',
		width: '100%',
		height: 50,
		maxHeight: '20%',
		justifyContent: 'space-between',
		marginTop: 'auto',
		marginBottom: 10,
	},
	ActionsRowCenter: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	ActionButton: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		width: '45%',
		backgroundColor: '#EB6339',
		borderRadius: 8,
		elevation: 2,
	},
	ActionButtonText: {
		color: '#fff',
		fontSize: 16,
	},
	SecondaryButton: {
		height: '100%',
		width: '45%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	SecondaryButtonText: {
		color: '#EB6339',
		borderBottomColor: '#EB6339',
		borderBottomWidth: 1,
		fontSize: 14,
	},
});
