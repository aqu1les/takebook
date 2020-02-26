import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';
import Message from './message';
import BackgroundTop from '../../../../assets/background/background-chat-top-right.svg';
import BackgroundBottom from '../../../../assets/background/background-chat-bottom-left.svg';
import {
    subscribeToChannel,
    unsubscribeChannel,
} from '../../../../services/Pusher';
import { addNewMessage } from '../../../../redux/actions/chat';

export default function Room({ navigation }) {
    const dispatch = useDispatch();
    const messages = useSelector(state => state.chats.chats.find.messages);
    const roomId = navigation.getParam('room_id');
    const loggedUser = useSelector(state => state.auth);
    const loading = useSelector(state => state.chats.loadingMessages);
    const messagesList = useRef();

    useEffect(() => {
        navigation.setParams({ title: String(roomId) });
        const roomSubscription = subscribeToChannel(`room${roomId}`);
        roomSubscription.bind('new-message', event => {
            dispatch(addNewMessage(event.message));
            scrollToBottom();
        });
        return () => {
            unsubscribeChannel(`room${roomId}`);
        };
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
                <TouchableOpacity style={Styles.MessageTouchable}>
                    <TextInput
                        style={Styles.MessageTextField}
                        placeholder="Digite uma mensagem"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.SendButton}>
                    <Icon name={'send'} size={36} color={'#FFFFFF'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
