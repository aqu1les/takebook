import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    MyMessage: {
        backgroundColor: '#0692cb',
        alignSelf: 'flex-end',
        borderTopRightRadius: 0,
        paddingRight: 10
    },
    NotMyMessage: {
        backgroundColor: '#f98b0d',
        alignSelf: 'flex-start',
        borderTopLeftRadius: 0,
        paddingLeft: 10
    },
    Message: {
        minHeight: 40,
        height: 'auto',
        width: 'auto',
        minWidth: 60,
        maxWidth: '70%',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 15,
        marginVertical: 5
    },
    Text: {
        color: '#FFFFFF',
        fontSize: 14
    },
    CreationTime: {
        position: 'absolute',
        bottom: 3,
        right: 15,
        color: '#FFFFFF',
        fontSize: 10,
    },
});
