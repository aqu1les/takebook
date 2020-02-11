import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    PageTwo: {
        height: '33.3333%',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'relative',
        paddingVertical: 30,
        padding: 20
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
    }
});
