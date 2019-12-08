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
        backgroundColor: '#eeeeee',
        paddingVertical: 10
    },
    BackgroundSvg: {
        position: 'absolute',
        left: -80,
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
        borderRadius: 4,
        width: '90%',
        height: '90%',
        margin: 10
    },
    InfoContainer: {
        height: '20%',
        backgroundColor: '#FFFFFF',
        padding: 15
    },
    Row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    Title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000000'
    },
    Author: {
        fontSize: 18,
        color: '#9E9E9E'
    },
    Price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FB8C00',
        alignSelf: 'flex-end'
    },
    Category: {
        color: '#9E9E9E'
    },
    TabHeading: {
        backgroundColor: '#FFFFFF',
    },
    TabHeadingText: {
        color: '#A5A5A5',
        fontSize: 18
    },
    SectionTextActive: {
        backgroundColor: '#FFFFFF',
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 18
    },
    SectionContent: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        padding: 10,
        textAlign: "justify"
    },
    SectionContentRow: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        padding: 10,
        textAlign: "justify",
        flexDirection: 'row'
    },
    RowLeftSide: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    RowRightSide: {
        flex: 0.5,
        borderLeftWidth: 0.5,
        borderLeftColor: '#00000020',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ElipseAvatar: {
        borderWidth: 1,
        borderColor: '#FF7714',
        borderRadius: 100,
        width: '75%',
        height: '90%',
        maxHeight: 117,
        maxWidth: 115,
        alignItems: 'center',
        justifyContent: 'center'
    },
    MessageButton: {
        width: '80%',
        height: 30,
        elevation: 1,
        backgroundColor: '#FF7714',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5
    },
    ButtonText: {
        color: '#FFFFFF',
        fontSize: 16
    }
});
