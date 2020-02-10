import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    Modal: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    ModalCard: {
        width: '80%',
        minWidth: 340,
        minHeight: 400,
        height: '65%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 12,
        paddingHorizontal: 12,
        justifyContent: 'space-around',
    },
    ModalClose: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
});
