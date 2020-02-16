import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Styles from './style';
import ChatStore from '../../../../stores/ChatStore';
import UserStore from '../../../../stores/UserStore';

export default function RoomList({ navigation }) {
    const [chats, setChats] = useState([]);
    const [loggedUser, setLoggedUser] = useState({});

    useEffect(() => {
        ChatStore.loadRooms();
        const unsubscribeChats = ChatStore.subscribe(state => {
            setChats(state.chats);
        });
        const unsubscribeUser = UserStore.subscribe(state => {
            setLoggedUser(state);
        });

        return () => {
            unsubscribeChats();
            unsubscribeUser();
        }
    }, []);

    function Chat({ ad_id, b_id, room_id }) {
        function goToChat() {
            navigation.navigate('Room', { room_id });
        }
        return (
            <TouchableOpacity style={{ height: 100, backgroundColor: '#fafe', width: '100%' }} onPress={goToChat}>
                <Text>Chat {ad_id} with {b_id}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={Styles.Container}>
            <Text>{loggedUser.firstName} {loggedUser.lastName}</Text>
            <FlatList
                data={chats}
                renderItem={({ item }) => (
                    <Chat ad_id={item.advertiser_id} b_id={item.buyer_id} room_id={item.id} />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                    width: '100%',
                }}
            />
        </View>
    );
};
