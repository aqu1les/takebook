import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    Header: {
        width: 180,
        height: 180,
        backgroundColor: '#EAEAEA',
        borderRadius: 100,
        marginTop: -80,
        marginBottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    View: {
        backgroundColor: '#EAEAEA',
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
    Card: {
        width: '80%',
        height: '65%',
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 480,
        paddingBottom: 5
    },
    ActvIndicator: {
        display: 'flex',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
});
