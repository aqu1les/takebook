import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import Styles from './style';
import Advert from './advert';
import { useTranslation } from 'react-i18next';

export default (AdvertList = ({
    navigation,
    adverts,
    user,
    likes,
    refreshAdverts,
    onEndReached,
    loadingMore,
}) => {
    const { t } = useTranslation();
    const [refreshing, setRefreshing] = useState(false);
    const advList = useRef();

    async function refreshAds() {
        setRefreshing(true);
        refreshAdverts();
        setRefreshing(false);
    }

    function handleOnEndReached({ nativeEvent }) {
        if (_isAtTheEnd(nativeEvent)) {
            onEndReached();
        }
    }

    function _isAtTheEnd(nativeEvent) {
        return (
            nativeEvent.layoutMeasurement.height +
                nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height - 1
        );
    }

    return (
        <View style={Styles.Content}>
            <Text style={Styles.H1}>{t('advertList.recent')}</Text>
            {adverts.length > 0 ? (
                <>
                    <FlatList
                        ref={advList}
                        data={adverts}
                        renderItem={({ item }) => (
                            <Advert
                                item={item}
                                navigation={navigation}
                                owner={item.user}
                                user={user}
                                liked={
                                    likes.find(book => book.id === item.id)
                                        ? true
                                        : false
                                }
                            />
                        )}
                        onScroll={handleOnEndReached}
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
                    {loadingMore ? <ActivityIndicator color="#38C2FF" /> : null}
                </>
            ) : (
                <Text>{t('advertList.noBooks')}</Text>
            )}
        </View>
    );
});
