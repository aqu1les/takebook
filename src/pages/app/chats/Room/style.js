import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    ChatContainer: {
        flex: 1,
        flexDirection: 'column',
        position: 'relative'
    },
    BackgroundTopRight: {
        position: 'absolute',
        top: -52,
        right: 0,
        height: '50%',
        width: '50%',
        zIndex: 1
    },
    BackgroundBottomLeft: {
        position: 'absolute',
        bottom: 17,
        left: 0,
        height: '50%',
        width: '50%'
    },
    WriteMessageSection: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        backgroundColor: '#d2d2d2',
        padding: 5,
    },
    MessageTouchable: {
        width: '80%',
        height: '90%',
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 2,
    },
    MessageTextField: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        fontSize: 16,
        paddingHorizontal: 10
    },
    SendButton: {
        width: 60,
        height: '100%',
        backgroundColor: '#f98b0d',
        borderRadius: 100,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
