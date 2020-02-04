import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    Input: {
        marginLeft: 5,
        padding: 5,
        flexGrow: 100,
        fontSize: 18
    },
    FormGroup: {
        flexDirection: "row",
        alignItems: "center",
        width: "85%",
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        height: 54,
        padding: 5,
        paddingBottom: -6,
        marginTop: 8,
        marginBottom: 8
    },
    InputError: {
        borderBottomColor: 'red',
    },
    RegisterButton: {
        width: 126,
        padding: 10,
        elevation: 1,
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 8,
        backgroundColor: "#EB6339",
        alignItems: 'center'
    },
    RegisterText: {
        fontSize: 28,
        color: '#FFFFFF'
    },
    Modal: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    ModalCard: {
        width: '80%',
        minWidth: 340,
        minHeight: 340,
        height: 340,
        backgroundColor: '#69d088',
        borderRadius: 12,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        justifyContent: 'space-evenly',
    },
    TextH1: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: "700"
    },
    TextP: {
        fontSize: 16,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    ModalButton: {
        width: 140,
        padding: 10,
        elevation: 5,
        borderRadius: 40,
        backgroundColor: "#FFFFFF",
        alignItems: 'center'
    },
    ButtonText: {
        fontSize: 28,
        textAlign: 'center',
        color: '#000000'
    }
});