import React, { useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import Styles from './style';
import Advert from './advert';

export default AdvertList = ({ navigation, adverts, user, likes, setRefreshLikes, refreshAdverts }) => {
    const [refreshing, setRefreshing] = useState(false);

    async function refreshAds() {
        setRefreshing(true);
        setRefreshLikes(v => !v);
        refreshAdverts(v => !v);
        setRefreshing(false);
    }

    return (
        <View style={Styles.Content}>
            <Text style={Styles.H1}>Mais Recentes</Text>
            {adverts.length > 0 ?
                <FlatList
                    data={adverts}
                    renderItem={({ item }) => (
                        <Advert
                            item={item}
                            navigation={navigation}
                            owner={item.user}
                            user={user}
                            liked={likes.find((book) => book.id === item.id) ? true : false}
                        />
                    )}
                    onEndReached={() => console.log('bateu no fundo')}
                    keyExtractor={item => String(item.id)}
                    refreshControl={
                        <RefreshControl
                            colors={['#fb8c00', '#38C2FF']}
                            refreshing={refreshing}
                            onRefresh={refreshAds}
                        />
                    }
                    showsVerticalScrollIndicator={false}

                />
                : <Text>Nenhum livro foi cadastrado!</Text>}
        </View>
    );
}