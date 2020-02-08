import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './style';
import defaultBook from '../../../../assets/bookDefault.jpg';
import { Badge } from 'native-base';

export default Advert = ({ item, navigation, owner, user }) => {
    const { id, title, price, author, categories, condition_id, covers_url, approved_at } = item;
    const liked = user.likes.find(like => like.id === id) ? true : false;
    let condition;
    let badgeColor;
    switch (condition_id) {
        case 1:
            condition = "Novo";
            badgeColor = '#00cc09';
            break;
        case 2:
            condition = "Semi-Novo";
            badgeColor = '#38c2ff';
            break;
        case 3:
            condition = "Usado";
            badgeColor = '#ff3d00';
            break;
        default:
            break;
    }

    function handleClick() {
        navigation.navigate('AdvertDetails', { advert: item, logged_user: user });
    }

    return (
        <TouchableOpacity style={Styles.Card} activeOpacity={0.8} onPress={handleClick}>
            <View style={Styles.Cover}>
                <Image source={covers_url.length > 0 ? { uri: covers_url[0].url } : defaultBook} style={Styles.ImgCover} />
            </View>
            <View style={Styles.Infos}>
                <Text style={Styles.Title}>{title}</Text>
                <Text style={Styles.Author}>{author}</Text>
                <View style={Styles.Categories}>
                    {categories.map(({ id, name }) => (
                        <Text key={id} style={Styles.TextCategory}>{name}</Text>
                    ))}
                </View>
                <View style={Styles.Details}>
                    <Badge style={[Styles.Badge, { backgroundColor: badgeColor }]}>
                        <Text style={Styles.Condition}>{condition}</Text>
                    </Badge>
                    <View style={Styles.Row}>
                        <Text style={Styles.TextCategory}>Local: </Text>
                        <Text style={Styles.Locale}>{owner.address_city} - {owner.address_state}</Text>
                    </View>
                </View>
                <View style={Styles.PriceButton}>
                    <Text style={Styles.Price}>R$ {String(price)}</Text>
                </View>
                <Icon color="#e64c3c" size={24} name={liked ? "heart" : "heart-o"} style={Styles.FavIcon} />
                <Text style={Styles.CreationTime}>{formatDistance(new Date(approved_at), Date.now(), { addSuffix: true, locale: pt })}</Text>
            </View>
        </TouchableOpacity>
    );
}