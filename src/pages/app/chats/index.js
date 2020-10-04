import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import { StackActions } from '@react-navigation/native';
import Styles from './style';
import { loadChatsAction } from '../../../redux/actions/chat';
import TalkItem from './talk-item';
import EmptyList from '../../../assets/empty-chat.svg';
import { useTranslation } from 'react-i18next';

export default function RoomList({ route, navigation }) {
    const { t: trans } = useTranslation();
    const dispatch = useDispatch();
    const { user: receiver } = route.params;
    const chats = useSelector(state => state.chats.chats);
    const loading = useSelector(state => state.chats.loading);

    useEffect(() => {
        getChats();
    }, [getChats]);

    const getChats = useCallback(() => {
        loadChats();
    }, []);

    useEffect(() => {
        if (receiver) {
            let push;
            if (chats.length > 0) {
                const chat = chats.find(c => c.user.id === receiver.id);
                if (chat) {
                    push = StackActions.push('Room', { roomId: chat.id });
                } else {
                    push = StackActions.push('Room', { receiver });
                }
            } else {
                push = StackActions.push('Room', { receiver });
            }
            navigation.dispatch(push);
            navigation.setParams({ user: null });
        }
    }, [receiver, chats]);

    function loadChats() {
        dispatch(loadChatsAction());
    }

    function renderSeparator() {
        return <View style={Styles.Divider} />;
    }

    return (
        <View style={Styles.Container}>
            {chats.length > 0 ? (
                <FlatList
                    data={chats}
                    renderItem={({ item }) => (
                        <TalkItem
                            user={item.user}
                            lastMessage={item.messages[0]}
                            room_id={item.id}
                            navigation={navigation}
                        />
                    )}
                    keyExtractor={item => String(item.id)}
                    contentContainerStyle={{
                        width: '100%',
                    }}
                    refreshControl={
                        <RefreshControl
                            colors={['#fb8c00', '#38C2FF']}
                            refreshing={loading}
                            onRefresh={loadChats}
                        />
                    }
                    ItemSeparatorComponent={renderSeparator}
                />
            ) : (
                <View style={Styles.EmptyList}>
                    <EmptyList width={'50%'} height={'50%'} />
                    <Text style={Styles.CenterText}>
                        {trans('chats.noChats_1')}
                    </Text>
                    <Text style={Styles.CenterText}>
                        {trans('chats.noChats_2')}
                    </Text>
                </View>
            )}
        </View>
    );
}
