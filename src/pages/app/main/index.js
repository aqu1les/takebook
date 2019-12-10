import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './style';
import Header from '../components/header';
import Advert from '../components/advert';
import { loadAdvertsAction } from '../../../services/redux/actions/adverts';

export default Main = (props) => {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const adverts = useSelector(state => state.adverts.data);
    const categories = useSelector(state => state.categories.data);
    const { authenticated } = useSelector(state => state.auth);
    function CategoryItem({ name }) {
        return (
            <TouchableOpacity style={Styles.Category}>
                <Icon name="star" size={26} color="#000000" />
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
                    marginVertical: '15%',
                    marginHorizontal: 5
                }}
            />
        );
    }
    async function refreshAds() {
        setRefreshing(true);
        await dispatch(loadAdvertsAction());
        setRefreshing(false);
    }
    return (
        <View style={Styles.Container}>
            <Header navigation={props.navigation} />
            <View style={Styles.Categories}>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => <CategoryItem name={item.name} />}
                    keyExtractor={item => item.name}
                    horizontal={true}
                    contentContainerStyle={{ justifyContent: 'space-around', width: '100%' }}
                    ItemSeparatorComponent={renderSeparator}
                />
            </View>
            <View style={Styles.Content}>
                <Text style={Styles.H1}>Mais Recentes</Text>
                {
                    adverts !== null ? <FlatList
                        data={adverts}
                        renderItem={({ item }) => <Advert item={item} navigation={props.navigation} />}
                        keyExtractor={item => String(item.id)}
                        refreshControl={<RefreshControl colors={['#fb8c00', '#38C2FF']} refreshing={refreshing} onRefresh={refreshAds} />}
                    /> :
                        <Text>Nenhum livro foi cadastrado!</Text>
                }
            </View>
            {authenticated && <TouchableOpacity style={Styles.AddButton}>
                <Icon name="plus-circle" size={60} color="#fb8c00" />
            </TouchableOpacity>}
        </View>
    );
}