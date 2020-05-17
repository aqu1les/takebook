import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, RefreshControl } from 'react-native';
import { StackActions } from '@react-navigation/native';
import Styles from './style';
import { loadChatsAction } from '../../../redux/actions/chat';
import TalkItem from './talk-item';
import EmptyList from '../../../assets/empty-chat.svg';

export default function RoomList({ route, navigation }) {
    const dispatch = useDispatch();
    const { user: receiver } = route.params;
    const chats = useSelector(state => state.chats.chats);
    const loading = useSelector(state => state.chats.loading);
    const loggedUser = useSelector(state => state.auth);

    useEffect(() => {
        loadChats();
    }, []);

    useEffect(() => {
        if (receiver) {
            let push;
            if (chats.length > 0) {
                const chat = chats.find(chat => chat.user[0].id == receiver.id);
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
                            user={item.user[0]}
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
                <EmptyList />
            )}
        </View>
    );
}
