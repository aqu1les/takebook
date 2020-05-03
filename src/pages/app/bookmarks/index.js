import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList } from 'react-native';
import Styles from './style';
import { loadFavoritesAction } from './../../../redux/actions/fav';
import Advert from '../main/advert-list/advert';

export default function AdList({ navigation }) {
    const dispatch = useDispatch();
    const likedAdverts = useSelector(state => state.likes.data);
    const user = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(loadFavoritesAction());
    }, [dispatch]);

    return (
        <View style={Styles.Container}>
            <FlatList
                data={likedAdverts}
                renderItem={({ item }) => (
                    <Advert
                        item={item}
                        navigation={navigation}
                        owner={item.owner}
                        user={user}
                        liked={true}
                    />
                )}
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
