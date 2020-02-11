import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    PageThree: {
        height: '33.3333%',
        width: '100%',
        position: 'relative',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 30,
        padding: 20
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
    PostBookButton: {
        width: 120,
        height: 45,
        backgroundColor: '#ff8c00',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        borderRadius: 10,
    },
    PostBookText: {
        fontSize: 20,
        color: '#FFFFFF',
    },
});
