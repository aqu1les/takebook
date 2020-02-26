import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Styles from './style';
import { loadChatsAction } from '../../../../redux/actions/chat';

export default function RoomList({ navigation }) {
    const dispatch = useDispatch();
    const chats = useSelector(state => state.chats.chats);
    const loggedUser = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(loadChatsAction());
    }, [dispatch]);

    function Chat({ ad_id, b_id, room_id }) {
        function goToChat() {
            navigation.navigate('Room', { room_id });
        }
        return (
            <TouchableOpacity
                style={{ height: 100, backgroundColor: '#fafe', width: '100%' }}
                onPress={goToChat}>
                <Text>
                    Chat {ad_id} with {b_id}
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={Styles.Container}>
            <Text>
                {loggedUser.firstName} {loggedUser.lastName}
            </Text>
            <FlatList
                data={chats}
                renderItem={({ item }) => (
                    <Chat
                        ad_id={item.advertiser_id}
                        b_id={item.buyer_id}
                        room_id={item.id}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                    width: '100%',
                }}
            />
        </View>
    );
}
