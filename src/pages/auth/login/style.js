import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
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
    Icon: {},
    Input: {
        marginLeft: 5,
        padding: 5,
        flexGrow: 100,
        fontSize: 18,
    },
    Button: {
        width: 126,
        padding: 10,
        elevation: 1,
        marginTop: 30,
        marginBottom: 0,
        borderRadius: 8,
        backgroundColor: '#EB6339',
        alignItems: 'center',
    },
    ButtonDisabled: {
        backgroundColor: '#dfdfdf',
    },
    ButtonText: {
        textAlign: 'center',
        fontSize: 28,
        color: '#FFFFFF',
    },
    Options: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    Forgot: {
        fontStyle: 'normal',
        lineHeight: 24,
        fontWeight: '300',
        fontSize: 16,
        alignContent: 'center',
        color: '#909090',
    },
    Register: {
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: 16,
        alignContent: 'center',
        color: '#909090',
        marginVertical: 10,
    },
});
