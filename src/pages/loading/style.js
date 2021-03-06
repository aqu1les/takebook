import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	Container: {
		backgroundColor: '#FFFFFF',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	ImageLeft: {
		width: 240,
		height: 253,
		position: 'absolute',
		left: -85,
		top: 0,
	},
	ImageRight: {
		width: 325,
		height: 368,
		position: 'absolute',
		right: -98,
		bottom: -90,
	},
	Logo: {
		width: '80%',
		height: '65%',
		backgroundColor: '#FFFFFF',
		borderRadius: 4,
		elevation: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	ActvIndicator: {
		display: 'flex',
		position: 'absolute',
		bottom: 20,
		alignSelf: 'center',
	},
});
