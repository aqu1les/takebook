import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    Text,
    FlatList,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';
import MenuBG from '../../../../assets/background/menubg.svg';
import DefaultProfile from '../../../../assets/icons/defaultProfile.svg';
import Book from '../../../../assets/open-book.png';
import { logOutAction } from '../../../../redux/actions/authentication';

function SideBar(props) {
    const dispatch = useDispatch();
    const { isDrawerOpen } = props.navigation.state;
    const user = useSelector(state => state.auth);

    const menuItens = [
        {
            title: 'Início',
            icon: 'home-outline',
            active: props.activeItemKey === 'Main' ? true : false,
            route: 'Main',
        },
        {
            title: 'Perfil',
            icon: 'clipboard-account-outline',
            active: props.activeItemKey === 'Profile' ? true : false,
            route: 'App',
        },
        {
            title: 'Meus Anúncios',
            icon: 'book-open-page-variant',
            active: props.activeItemKey === 'Adv' ? true : false,
            route: 'App',
        },
        {
            title: 'Mensagens',
            icon: 'forum-outline',
            active: props.activeItemKey === 'Chats' ? true : false,
            route: 'Chats',
        },
        {
            title: 'Meus Favoritos',
            icon: 'heart-outline',
            active: props.activeItemKey === 'Favorites' ? true : false,
            route: 'App',
        },
    ];
    function Item({ title, icon, active, route }) {
        return (
            <TouchableOpacity
                style={[Styles.ListItem, active ? Styles.ListItemActive : {}]}
                onPress={e => navigateByRoute(route)}>
                <Icon
                    name={icon}
                    size={26}
                    color={active ? '#f06922' : '#000000'}
                />
                <Text
                    style={[
                        Styles.ItemText,
                        active ? { fontWeight: 'bold' } : {},
                    ]}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    }
    function navigateByRoute(route) {
        props.navigation.navigate(route);
    }
    async function logOut() {
        dispatch(logOutAction());
        navigateByRoute('Auth');
    }
    return (
        <SafeAreaView style={Styles.Menu}>
            <StatusBar
                backgroundColor={isDrawerOpen && user ? '#c98d2d' : '#0092CC'}
                barStyle="light-content"
            />
            {user.authenticated ? (
                <>
                    <View style={Styles.UserInfo}>
                        <MenuBG style={Styles.Background} />
                        <View style={Styles.UserAvatar}>
                            {user.avatar_url ? (
                                <Image
                                    source={{ uri: user.avatar_url }}
                                    style={{
                                        height: '90%',
                                        width: '90%',
                                        borderRadius: 100,
                                    }}
                                />
                            ) : (
                                <DefaultProfile height="100%" width="100%" />
                            )}
                        </View>
                        <View style={Styles.LeftSide}>
                            <Text
                                style={
                                    Styles.Name
                                }>{`${user.first_name} ${user.last_name}`}</Text>
                            <View style={Styles.RateSession}>
                                <Icon name="star" size={20} color="#fedf43" />
                                <Text style={Styles.Rate}>4,8</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={Styles.ProfileLink}>
                                    Ver seu Perfil
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={Styles.NavOptions}>
                        <FlatList
                            data={menuItens}
                            renderItem={({ item }) => (
                                <Item
                                    title={item.title}
                                    icon={item.icon}
                                    active={item.active}
                                    route={item.route}
                                />
                            )}
                            keyExtractor={item => item.title}
                        />
                        <TouchableOpacity
                            onPress={logOut}
                            disabled={!user.authenticated}
                            style={Styles.ListItem}>
                            <Icon name="logout" size={26} color="#000" />
                            <Text style={Styles.ItemText}>Desconectar-se</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                    }}>
                    <TouchableOpacity onPress={() => navigateByRoute('Auth')}>
                        <Image source={Book} />
                        <Text>Clique aqui para fazer login</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

export default memo(SideBar);
