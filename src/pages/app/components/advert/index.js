import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './style';
import defaultBook from '../../../../assets/bookDefault.jpg';
import { Badge } from 'native-base';

export default Advert = (props) => {
    const { id, title, price, author, categories, condition_id, covers_url, approved_at } = props.item;

    return (
        <TouchableOpacity style={Styles.Card} activeOpacity={0.8} onPress={() => props.navigation.navigate('AdvertDetails', { advert: props.item })}>
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
                    <Badge style={Styles.Badge}>
                        <Text style={Styles.Condition}>{condition_id === 1 ? "Novo" : "Usado"}</Text>
                    </Badge>
                    <View style={Styles.Row}>
                        <Text style={Styles.TextCategory}>Local: </Text>
                        <Text style={Styles.Locale}>Recife - PE</Text>
                    </View>
                </View>
                <View style={Styles.PriceButton}>
                    <Text style={Styles.Price}>R$ {String(price)}</Text>
                </View>
                <Icon color="#e64c3c" size={24} name={"heart"} style={Styles.FavIcon} />
                <Text style={Styles.CreationTime}>{formatDistance(new Date(approved_at), Date.now(), { addSuffix: true, locale: pt })}</Text>
            </View>
        </TouchableOpacity>
    );
}