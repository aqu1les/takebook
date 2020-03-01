import { StyleSheet, Platform } from 'react-native';

export default Styles = StyleSheet.create({
    Header: {
        backgroundColor: '#38C2FF',
        width: '100%',
        height: Platform.OS === 'ios' ? 90 : 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: Platform.OS === 'ios' ? 30 : 0,
        paddingBottom: 2,
    },
    Search: {
        height: '60%',
        minWidth: '30%',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    Input: {
        width: '95%',
        height: '100%',
        fontSize: 16,
        padding: 8,
    },
});
