import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './style';
import defaultBook from '../../../../assets/bookDefault.jpg';

export default Advert = (props) => {
    const { title, price, author, categories, condition_id, covers_url, id } = props.item;
    const likes = useSelector(state => state.auth.likes);
    const fav = likes.find(advert_id => advert_id == id);

    return (
        <TouchableOpacity style={Styles.Card}>
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
                    <View style={Styles.Row}>
                        <Text style={Styles.TextCategory}>Estado:</Text>
                        <Text style={Styles.Condition}>{condition_id === 1 ? "Novo" : "Usado"}</Text>
                    </View>
                    <Text style={Styles.TextCategory}>Local: Recife - PE</Text>
                </View>
                <View style={Styles.PriceButton}>
                    <Text style={Styles.Price}>R$ {String(price)}</Text>
                </View>
                <Icon color="#e64c3c" size={24} name={fav ? "heart" : "heart-o"} style={Styles.FavIcon} />
            </View>
        </TouchableOpacity>
    );
}