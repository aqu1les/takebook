import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';
import Message from './message';
import BackgroundTop from '../../../../../assets/background/background-chat-top-right.svg';
import BackgroundBottom from '../../../../../assets/background/background-chat-bottom-left.svg';
import ChatStore from '../../../../../stores/ChatStore';
import UserStore from '../../../../../stores/UserStore';
import { subscribeToChannel, unsubscribeChannel } from '../../../../../services/Pusher';
import { ScrollView } from 'react-native-gesture-handler';

export default function Room({ navigation }) {
    const [messages, setMessages] = useState([]);
    const roomId = navigation.getParam('room_id');
    const [loggedUser, setLoggedUser] = useState({});
    const [loading, setLoading] = useState(true);
    const messagesList = useRef();

    useEffect(() => {
        ChatStore.loadMessages(roomId);
        UserStore.loadUserInfo();
        navigation.setParams({ title: String(roomId) });
        const unsubscribeChatStore = ChatStore.subscribe(state => {
            const currentChat = state.chats.find(chat => chat.id === roomId);
            setMessages(currentChat.messages);
            setLoading(state.loadingMessages);
        });
        const unsubscribeUserStore = UserStore.subscribe(state => {
            setLoggedUser(state);
        });

        const roomSubscription = subscribeToChannel(`room${roomId}`);
        roomSubscription.bind('new-message', event => {
            ChatStore.onNewMessage(event.message);
            scrollToBottom();
        });
        return () => {
            unsubscribeChatStore();
            unsubscribeUserStore();
            unsubscribeChannel(`room${roomId}`);
        }
    }, []);

    function scrollToBottom() {
        setTimeout(() => {
            messagesList.current.scrollToEnd();
        }, 1000);
    }

    useEffect(() => {
        if (messagesList.current && !loading) {
            scrollToBottom();
        }
    }, [loading]);

    return (
        <View style={Styles.ChatContainer}>
            <FlatList
                ref={messagesList}
                data={messages}
                renderItem={({ item }) => (
                    <Message item={item} loggedUser={loggedUser} />
                )}
                keyExtractor={item => String(item.id)}
                contentContainerStyle={{
                    width: '100%',
                    flexDirection: 'column',
                    padding: 10,
                }}
                style={{ zIndex: 100 }}
            />
            <BackgroundTop style={Styles.BackgroundTopRight} />
            <BackgroundBottom style={Styles.BackgroundBottomLeft} />
            <View style={Styles.WriteMessageSection}>
                <TouchableOpacity style={Styles.MessageTouchable} >
                    <TextInput
                        style={Styles.MessageTextField}
                        placeholder='Digite uma mensagem'
                    />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.SendButton}>
                    <Icon name={'send'} size={36} color={'#FFFFFF'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
