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
    }
});