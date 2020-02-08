import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
    Menu: {
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    UserInfo: {
        width: '100%',
        height: 175,
        backgroundColor: '#fb8c0d',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    Background: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    UserAvatar: {
        backgroundColor: '#f15c2b',
        width: 95,
        height: 95,
        borderRadius: 100,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    },
    LeftSide: {
        width: '50%',
        flexDirection: 'column',
        color: '#FFFFFF',
    },
    Name: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
    },
    RateSession: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
    },
    Rate: {
        color: '#FFFFFF',
        fontSize: 16,
        marginHorizontal: 5,
    },
    ProfileLink: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '400',
    },
    NavOptions: {
        flexGrow: 100,
        padding: 10,
    },
    ListItem: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
        marginHorizontal: 5,
        paddingHorizontal: 5,
    },
    ItemText: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    SignOutButton: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    }
});
