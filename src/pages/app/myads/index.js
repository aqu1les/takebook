import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, RefreshControl } from 'react-native';
import Styles from './style';
import { loadMyAdvertsAction } from '../../../redux/actions/myads';
import Advert from '../main/advert-list/advert';

export default function MyAdsList({ navigation }) {
    const dispatch = useDispatch();
    const myAdverts = useSelector(state => state.myads.data);
    const loading = useSelector(state => state.myads.loading);

    useEffect(() => {
        dispatch(loadMyAdvertsAction());
    }, [dispatch]);

    function loadMyAdverts() {
        dispatch(loadMyAdvertsAction());
    }

    return (
        <View style={Styles.Container}>
            <FlatList
                data={myAdverts}
                renderItem={({ item }) => (
                    <Advert item={item} navigation={navigation} />
                )}
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        colors={['#fb8c00', '#38C2FF']}
                        refreshing={loading}
                        onRefresh={loadMyAdverts}
                    />
                }
            />
        </View>
    );
}
