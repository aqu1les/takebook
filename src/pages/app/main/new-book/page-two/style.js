import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	PageTwo: {
		flex: 1,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		position: 'relative',
		paddingTop: 5,
		paddingHorizontal: 20,
		paddingBottom: 35,
	},
	NextSectionButton: {
		position: 'absolute',
		bottom: 5,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		height: 45,
		marginTop: 10,
	},
	PreviousSectionButton: {
		position: 'absolute',
		top: 5,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		height: 45,
		marginBottom: 5,
	},
	FormGroup: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '90%',
		borderRadius: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#EAEAEA',
		height: 50,
		padding: 5,
		paddingBottom: -6,
		marginTop: 5,
		marginBottom: 5,
	},
	SectionTitle: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
	},
	HelpText: {
		textAlign: 'center',
		fontSize: 16,
		marginHorizontal: 30,
	},
});
