import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    TextCenter: { textAlign: 'center' },
    PageOne: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'relative',
        paddingVertical: 30,
        padding: 20,
    },
    HeadingText: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 24,
    },
    CoverContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
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
});
