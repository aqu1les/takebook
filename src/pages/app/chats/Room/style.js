import { StyleSheet } from 'react-native';

export default (Styles = StyleSheet.create({
    ChatContainer: {
        flexDirection: 'column',
        position: 'relative',
    },
    BackgroundTopRight: {
        position: 'absolute',
        top: -4,
        right: 0,
        height: 255,
        width: 205,
        zIndex: 1,
    },
    BackgroundBottomLeft: {
        position: 'absolute',
        bottom: 3,
        left: 0,
        height: 255,
        width: 205,
    },
    WriteMessageSection: {
        height: 55,
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
        paddingHorizontal: 10,
    },
    SendButton: {
        width: 45,
        height: '100%',
        backgroundColor: '#f98b0d',
        borderRadius: 100,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
}));
