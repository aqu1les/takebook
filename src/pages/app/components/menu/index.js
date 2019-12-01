import React from 'react';
import { View, StatusBar, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from "react-redux";
import Styles from './style';
import MenuBG from '../../../../assets/background/menubg.svg';
import DefaultProfile from '../../../../assets/icons/defaultProfile.svg';

export default SideBar = (props) => {
    const user = useSelector(state => state.auth);
    const { isDrawerOpen, routeName } = props.navigation.state;
    const menuItens = [
        {
            title: 'Início',
            icon: 'home',
            active: routeName === 'App' ? true : false,
        },
        {
            title: 'Anúncios',
            icon: 'book',
            active: routeName === 'Adv' ? true : false,
        },
        {
            title: 'Mensagens',
            icon: 'comment-o',
            active: routeName === 'Chats' ? true : false,
        },
        {
            title: 'Meus Favoritos',
            icon: 'heart',
            active: routeName === 'Favorites' ? true : false,
        },
    ];
    function Item({ title, icon, active }) {
        return (
            <TouchableOpacity style={Styles.ListItem}>
                <Icon name={icon} size={26} color={active ? "#4285f4" : "#000000"} />
                <Text style={Styles.ItemText}>{title}</Text>
            </TouchableOpacity>
        );
    }
    return (
        <View style={Styles.Menu}>
            <StatusBar backgroundColor={isDrawerOpen ? "#c98d2d" : "#0092CC"} barStyle="light-content" />
            <View style={Styles.UserInfo}>
                <MenuBG style={Styles.Background} />
                <View style={Styles.UserAvatar}>
                    {user.avatar_url ? <Image source={user.avatar_url} /> :
                        <DefaultProfile height="100%" width="100%" />}
                </View>
                <View style={Styles.LeftSide}>
                    <Text style={Styles.Name}>{`${user.first_name} ${user.last_name}`}</Text>
                    <View style={Styles.RateSession}>
                        <Icon name="star" size={20} color="#fedf43" />
                        <Text style={Styles.Rate}>4,8</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={Styles.ProfileLink}>Ver seu Perfil</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={Styles.NavOptions}>
                <FlatList
                    data={menuItens}
                    renderItem={({ item }) => <Item title={item.title} icon={item.icon} active={item.active} />}
                    keyExtractor={item => item.title}
                />
            </View>
        </View>
    );
}