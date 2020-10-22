import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Row: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	CategoriesRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginHorizontal: -5,
		marginVertical: 8,
	},
	SimpleText: {
		color: '#000',
		fontSize: 16,
		fontWeight: '600',
	},
	InputContainer: {
		position: 'relative',
		marginTop: 8,
		elevation: 2,
		backgroundColor: '#fff',
		borderRadius: 8,
		paddingHorizontal: 6,
		paddingVertical: 6,
		height: 50,
		alignItems: 'center',
		width: '95%',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	TextareaContainer: {
		minHeight: 80,
		marginBottom: 10,
	},
	Input: {
		width: '100%',
		height: '100%',
		paddingBottom: 0,
		paddingTop: 12,
		fontSize: 12,
		marginBottom: 0,
		marginTop: 8,
	},
	TextareaInput: {
		marginTop: 10,
	},
	InputText: {
		marginBottom: 0,
		position: 'absolute',
		left: 8,
		top: 4,
		zIndex: 1000,
		fontWeight: 'bold',
		color: '#000',
	},
	Wrapper: {
		flex: 1,
	},
	ActionsRow: {
		width: '100%',
		justifyContent: 'space-between',
	},
	ActionButton: {
		width: '48%',
		height: 45,
		elevation: 2,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	ActionButtonText: {
		color: '#fff',
		fontSize: 18,
	},
	PrimaryAction: {
		backgroundColor: '#EB6339',
	},
	SecondaryAction: {
		backgroundColor: '#ddd',
	},
});
