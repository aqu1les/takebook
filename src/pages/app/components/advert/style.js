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
        justifyContent: 'space-around'
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
        color: '#A5A5A5',
    },
    Details: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    Condition: {
        color: '#FFFFFF',
        backgroundColor: '#00cc09',
        borderRadius: 6,
        textAlign: 'center',
        padding: 1
    },
    Row: {
        flexDirection: 'row'
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
    }
});
