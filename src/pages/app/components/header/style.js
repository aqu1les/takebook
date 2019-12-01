import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    Header: {
        backgroundColor: '#38C2FF',
        width: '100%',
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 3
    },
    Search: {
        height: '65%',
        elevation: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        width: '75%',
        flexDirection: 'row',
        alignItems: 'center',

        paddingHorizontal: 15,
    },
    Input: {
        width: '95%',
        height: '100%',
        fontSize: 16
    }
});
