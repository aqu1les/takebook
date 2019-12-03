import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    Page: {
        flex: 1,
        flexDirection: 'column',
    },
    CoverContainer: {
        height: '45%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee'
    },
    BackgroundSvg: {
        position: 'absolute',
        left: -40,
        top: 0,
    },
    FavIcon: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    ImgCoverContainer: {
        width: '45%',
        height: '80%',
        borderRadius: 4,
        elevation: 2,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImgCover: {
        width: '95%',
        height: '95%'
    },
    InfoContainer: {
        height: '20%',
        backgroundColor: '#FFFFFF',
    },
    InfoSections: {
        height: '5%',
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderTopWidth: 0.5,
        borderTopColor: '#eaeaea',
        backgroundColor: '#FFFFFF',
    },
    SectionText: {
        flexGrow: 33,
        fontStyle: 'normal',
        color: '#A5A5A5',
        textAlign: 'center',
        padding: 10
    },
    SectionTextActive: {
        borderBottomColor: '#FB8C00',
        borderBottomWidth: 1.5,
        fontWeight: 'bold',
        color: '#000000',
        flexGrow: 33,
        textAlign: 'center',
        padding: 10
    },
    SectionContent: {
        height: '30%',
        backgroundColor: '#ddd',
        padding: 10
    },
});
