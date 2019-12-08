import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    Card: {
        width: '99%',
        height: 240,
        borderRadius: 8,
        marginVertical: 8,
        elevation: 2,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFFFFF'
    },
    Cover: {
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImgCover: {
        width: '90%',
        height: '90%',
        borderRadius: 10,
    },
    Infos: {
        width: '55%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 10
    },
    FavIcon: {
        position: 'absolute',
        top: 5,
        right: 5
    },
    Title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20
    },
    Author: {
        color: '#A5A5A5',
        fontSize: 18,
        fontWeight: '600',
    },
    Categories: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    TextCategory: {
        fontSize: 12,
        color: '#A5A5A5',
    },
    Details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    Badge: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00cc09'
    },
    Condition: {
        color: '#FFFFFF',
        fontSize: 12
    },
    Row: {
        flexDirection: 'row'
    },
    Locale: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    PriceButton: {
        backgroundColor: '#fb8c00',
        borderRadius: 20,
        width: '60%',
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    Price: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    CreationTime: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        color: '#c0c0c0',
        fontSize: 12,
        fontStyle: 'italic'
    }
});
