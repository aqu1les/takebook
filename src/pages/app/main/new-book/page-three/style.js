import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	PageThree: {
		flex: 1,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		paddingVertical: 30,
		padding: 20,
	},
	ViewContainer: {
		width: '100%',
		alignItems: 'center',
		flex: 1,
		position: 'relative',
		paddingTop: 40,
	},
	PreviousSectionButton: {
		position: 'absolute',
		top: -20,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		height: 45,
		marginBottom: 5,
	},
	PostBookButton: {
		width: 120,
		height: 45,
		backgroundColor: '#ff8c00',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 1,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.0,
		borderRadius: 10,
	},
	PostBookText: {
		fontSize: 20,
		color: '#FFFFFF',
	},
	CategoriesContainer: {
		flexDirection: 'column',
	},
	CategoriesText: {
		textAlign: 'center',
		marginTop: 28,
	},
	CategoriesList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 28,
	},
	DescriptionText: {
		marginTop: 28,
	},
	DescriptionInput: {
		height: 150,
		width: '100%',
		borderWidth: 0.5,
		borderColor: '#000',
		borderRadius: 8,
		textAlignVertical: 'top',
		marginVertical: 28,
	},
	End: {
		height: 60,
	},
});
