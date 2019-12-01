import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './style';
import Header from '../components/header';
import Advert from '../components/advert';

export default Main = (props) => {
    const categories = [
        { name: 'Destaques', icon: 'star' },
        { name: 'Terror', icon: 'star' },
        { name: 'Comédia', icon: 'star' },
        { name: 'Mistério', icon: 'star' },
        { name: 'Aventura', icon: 'star' }
    ];
    const books = [
        { name: 'Lorem Ipsum', price: '150', author: 'FELIPE' },
        { name: 'Lorem Ipsum1', price: '150', author: 'FELIPE' },
        { name: 'Lorem Ipsum2', price: '150', author: 'FELIPE' },
        { name: 'Lorem Ipsum3', price: '150', author: 'FELIPE' },
        { name: 'Lorem Ipsum4', price: '150', author: 'FELIPE' },
    ];
    function CategoryItem({ name, icon }) {
        return (
            <TouchableOpacity style={Styles.Category}>
                <Icon name={icon} size={26} color="#000000" />
                <Text>{name}</Text>
            </TouchableOpacity>
        );
    }
    function renderSeparator() {
        return (
            <View
                style={{
                    height: '60%',
                    backgroundColor: "#d1d1d1",
                    width: 1,
                    marginVertical: '15%'
                }}
            />
        );
    }
    return (
        <View style={Styles.Container}>
            <Header navigation={props.navigation} />
            <View style={Styles.Categories}>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => <CategoryItem name={item.name} icon={item.icon} />}
                    keyExtractor={item => item.name}
                    horizontal={true}
                    contentContainerStyle={{ justifyContent: 'space-around', width: '100%' }}
                    ItemSeparatorComponent={renderSeparator}
                />
            </View>
            <View style={Styles.Content}>
                <Text style={Styles.H1}>Mais Recentes</Text>
                <FlatList
                    data={books}
                    renderItem={({ item }) => <Advert name={item.name} price={item.price} author={item.author} />}
                    keyExtractor={item => item.name}
                />
            </View>
            <TouchableOpacity style={Styles.AddButton}>
                <Icon name="plus-circle" size={60} color="#fb8c00" />
            </TouchableOpacity>
        </View>
    );
}