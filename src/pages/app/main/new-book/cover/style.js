import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    ImageWrapper: {
        width: 140,
        height: '100%',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000000',
        marginHorizontal: 5,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Cover: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        opacity: 0.6
    },
    ImageHolder: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#000000',
        backgroundColor: '#F1F1F1',
    }
});
