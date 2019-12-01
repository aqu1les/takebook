import React from 'react';
import { View, StatusBar, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from "react-redux";
import Styles from './style';
import MenuBG from '../../../../assets/background/menubg.svg';
import DefaultProfile from '../../../../assets/icons/defaultProfile.svg';

export default SideBar = (props) => {
    const user = useSelector(state => state.auth);
    const isDrawerOpen = props.navigation.state.isDrawerOpen;
    const menuItens = [
        {
            id: '58694a0f-3da1-471f-bd96-145571e239d72',
            title: 'Início',
            icon: 'home'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d272',
            title: 'Anúncios',
            icon: 'book'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d712',
            title: 'Mensagens',
            icon: 'comment-o'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d472',
            title: 'Meus Favoritos',
            icon: 'heart'
        },
    ];
    function Item({ title, icon }) {
        return (
            <TouchableOpacity style={Styles.ListItem}>
                <Icon name={icon} size={26} color="#000000" />
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
                    renderItem={({ item }) => <Item title={item.title} icon={item.icon} />}
                    keyExtractor={item => item.title}
                />
            </View>
        </View>
    );
}