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
});
