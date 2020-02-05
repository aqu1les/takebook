import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f1f3'
    },
    Card: {
        width: '90%',
        height: '90%',
        backgroundColor: '#F9F9F9',
        elevation: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 8
    },
    HeadingText: {
        color: '#000000',
        fontWeight: '600',
        fontSize: 24
    },
    CoverContainer: {
        flexDirection: 'row',
        height: 300,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Cover: {
        width: 180,
        height: '100%',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000000',
        marginHorizontal: 5
    },
    BackCover: {
        width: 140,
        height: 220,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000000',
        marginHorizontal: 5
    },
    ImageHolder: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#000000',
        backgroundColor: '#F1F1F1'
    },
    NextPageButton: {
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        backgroundColor: '#FB8C00',
        borderRadius: 12,
        elevation: 2
    },
    NextPageText: {
        color: '#FFFFFF',
        fontSize: 24,
    }
});
