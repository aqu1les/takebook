import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './style';
import defaultBook from '../../../../assets/bookDefault.jpg';

export default Advert = (props) => {
    const { name, price, author } = props;
    return (
        <TouchableOpacity style={Styles.Card}>
            <View style={Styles.Cover}>
                <Image source={defaultBook} style={Styles.ImgCover} />
            </View>
            <View style={Styles.Infos}>
                <Text style={Styles.Title}>{name}</Text>
                <Text style={Styles.Author}>{author}</Text>
                <View style={Styles.Categories}>
                    <Text style={Styles.TextCategory}>Categoria</Text>
                    <Text style={Styles.TextCategory}>Categoria</Text>
                    <Text style={Styles.TextCategory}>Categoria</Text>
                </View>
                <View style={Styles.Details}>
                    <View style={Styles.Row}>
                        <Text style={Styles.TextCategory}>Estado:</Text>
                        <Text style={Styles.Condition}>Ótimo</Text>
                    </View>
                    <Text style={Styles.TextCategory}>Local: Recife - PE</Text>
                </View>
                <View style={Styles.PriceButton}>
                    <Text style={Styles.Price}>R$ {parseFloat(price)}</Text>
                </View>
                <Icon color="#e64c3c" size={24} name="heart" style={Styles.FavIcon} />
            </View>
        </TouchableOpacity>
    );
}