import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    Header: {
        elevation: 4,
        width: 180,
        height: 180,
        backgroundColor: '#EAEAEA',
        borderRadius: 100,
        padding: 20,
        marginTop: -80,
        marginBottom: 0,
        alignItems: "center",
        justifyContent: "center",
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
        elevation: 1,
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 480
    },
    ActvIndicator: {
        display: 'flex',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center'
    }
});
