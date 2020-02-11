import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    Input: {
        marginLeft: 5,
        padding: 5,
        flexGrow: 100,
        fontSize: 18,
    },
    FormGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        height: 54,
        padding: 5,
        paddingBottom: -6,
        marginTop: 8,
        marginBottom: 8,
    },
    InputError: {
        borderBottomColor: 'red',
    },
    RegisterButton: {
        width: 140,
        padding: 10,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 8,
        backgroundColor: '#EB6339',
        alignItems: 'center',
    },
    RegisterText: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    TextH1: {
        fontSize: 24,
        color: '#000',
        fontWeight: '700',
    },
    TextP: {
        fontSize: 16,
        textAlign: 'center',
        color: '#000',
    },
    ModalButton: {
        width: '60%',
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 50,
        backgroundColor: '#3eb3e5',
        alignItems: 'center',
    },
    ButtonText: {
        fontSize: 28,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    FormGroupRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        height: 50,
        padding: 5,
        paddingBottom: -6,
        marginTop: 5,
        marginBottom: 5,
    },
    Row: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-around',
    },
    AvatarHolder: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    AvatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        opacity: 0.6
    },
    CameraIcon: {
        height: 40,
        width: 40
    },
    HeaderClickable: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ContentContainerStyle: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
