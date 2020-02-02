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
    }
});
