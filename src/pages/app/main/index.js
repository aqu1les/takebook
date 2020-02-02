import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './style';
import Header from '../components/header';
import Advert from '../components/advert';
import Plus from '../../../assets/icons/add-book.svg';
import RemotePushController from '../../../services/RemotePushController';
import { subscribeToChannel, unsubscribeChannel } from '../../../services/Pusher';
import { getCategories } from '../../../services/CategoriesService';
import { getAdverts, refreshAdverts, storeAdvert } from '../../../services/AdvertsService';
import { getUser } from '../../../services/UserService';

export default Main = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [adverts, setAdverts] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        setLoading(true);
        async function loadData() {
            const responseCat = await getCategories();
            const responseAd = await getAdverts();
            setUser(await getUser());
            setCategories([{ name: 'Destaques' }, ...responseCat]);
            setAdverts(responseAd);
            setLoading(false);
        }
        loadData();
    }, []);

    useEffect(() => {
        if (user) {
            const globalChannel = subscribeToChannel('all-clients');
            globalChannel.bind('book-accepted', (event) => {
                console.log('BOOK ACCEPTED', event);
                storeAdvert(event.message);
                setAdverts(adverts => [event.message, ...adverts])
            });

            const privateChannel = subscribeToChannel(`userID${user.id}`);
            privateChannel.bind('new-notification', (event) => {
                console.log(event);
            });
        }
        return function cleanup() {
            unsubscribeChannel(`userID${user.id}`);
            unsubscribeChannel('all-clients');
        }
    }, []);

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
        setAdverts(await refreshAdverts());
    }

    return (
        <View style={Styles.Container}>
            <Header navigation={props.navigation} />
            {loading ? (
                <View style={Styles.LoadingContainer}>
                    <ActivityIndicator></ActivityIndicator>
                </View>) :
                <>
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
                            adverts.length > 0 ? <FlatList
                                data={adverts}
                                renderItem={({ item }) => <Advert item={item} navigation={props.navigation} />}
                                keyExtractor={item => String(item.id)}
                                refreshControl={<RefreshControl colors={['#fb8c00', '#38C2FF']} refreshing={refreshing} onRefresh={refreshAds} />}
                            /> :
                                <Text>Nenhum livro foi cadastrado!</Text>
                        }
                    </View>
                    <TouchableOpacity style={Styles.AddButton}>
                        <Plus />
                    </TouchableOpacity>
                </>
            }
            <RemotePushController />
        </View>
    );
}