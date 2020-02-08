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
        paddingVertical: 10,
    },
    BackgroundSvg: {
        position: 'absolute',
        left: -80,
        top: 0,
    },
    IconButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    ImgCoverContainer: {
        width: '45%',
        height: '80%',
        borderRadius: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImgCover: {
        borderRadius: 4,
        width: '90%',
        height: '90%',
        margin: 10,
    },
    InfoContainer: {
        height: '20%',
        backgroundColor: '#FFFFFF',
        padding: 15,
        justifyContent: 'space-between'
    },
    Row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    Title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#000000',
    },
    Author: {
        fontSize: 20,
        color: '#9E9E9E',
    },
    Price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FB8C00',
        alignSelf: 'flex-end',
    },
    Category: {
        color: '#9E9E9E',
        marginTop: 10,
        marginHorizontal: 5
    },
    TabHeading: {
        backgroundColor: '#FFFFFF',
    },
    TabHeadingText: {
        color: '#A5A5A5',
        fontSize: 18,
    },
    SectionTextActive: {
        backgroundColor: '#FFFFFF',
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 18,
    },
    SectionContent: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        padding: 10,
        textAlign: 'justify',
    },
    SectionContentRow: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        padding: 10,
        textAlign: 'justify',
        flexDirection: 'row',
    },
    RowLeftSide: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    RowRightSide: {
        flex: 0.5,
        borderLeftWidth: 0.5,
        borderLeftColor: '#00000020',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 40
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
        justifyContent: 'center',
    },
    MessageButton: {
        width: '80%',
        height: 30,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        backgroundColor: '#FF7714',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5,
    },
    ButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
