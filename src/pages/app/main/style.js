import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#eeeeee'
    },
    Categories: {
        height: 55,
        width: '100%',
        elevation: 2,
        backgroundColor: '#eeeeee'
    },
    Category: {
        height: '100%',
        width: 70,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    H1: {
        fontSize: 20,
        color: '#a5a5a5'
    },
    AddButton: {
        elevation: 5,
        position: 'absolute',
        right: 20,
        bottom: 40,
        borderRadius: 100,
        height: 51,
        width: 52,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fb8c00'
    },
    LoadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Modal: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    ModalClose: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    ModalCard: {
        height: 450,
        minHeight: 450,
        width: '80%',
        minWidth: 350,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        flexDirection: 'column',
        padding: 15,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    TextHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    TextP: {
        fontSize: 22,
        marginHorizontal: 30,
        textAlign: 'center'
    },
    ModalButton: {
        backgroundColor: '#fb8c00',
        borderRadius: 24,
        width: 120,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    ModalButtonText: {
        color: '#FFFFFF',
        fontSize: 22
    },
    Divider: {
        height: 1,
        width: '90%',
        borderWidth: 1,
        borderColor: '#ebebe4'
    },
    Texplanation: {
        marginHorizontal: 20,
        textAlign: 'justify',
        fontSize: 16
    },
    Modal2Button: {
        elevation: 5,
        borderRadius: 100,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fb8c00'
    }
});
