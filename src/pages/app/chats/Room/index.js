import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';
import Message from './message';
import BackgroundTop from '../../../../assets/background/background-chat-top-right.svg';
import BackgroundBottom from '../../../../assets/background/background-chat-bottom-left.svg';
import {
    subscribeToChannel,
    unsubscribeChannel,
} from '../../../../services/Pusher';
import {
    addNewMessage,
    loadMessagesAction,
} from '../../../../redux/actions/chat';

export default function Room({ navigation, route }) {
    const dispatch = useDispatch();
    const { roomId, user: receiver } = route.params;
    const { t } = useTranslation();
    const loggedUser = useSelector(state => state.auth);
    const user = useSelector(state => {
        let chat = state.chats.chats.find(chat => chat.id == roomId);
        return chat ? chat.user[0] : receiver;
    });
    const messages = useSelector(state => {
        const chat = state.chats.chats.find(chat => chat.id == roomId);
        return chat ? chat.messages : [];
    });
    const loading = useSelector(state => {
        const chat = state.chats.chats.find(chat => chat.id == roomId);
        return chat ? chat.loadingMessages : false;
    });
    const messagesList = useRef();

    useEffect(() => {
        if (roomId) {
            loadChatMessages();
            const roomSubscription = subscribeToChannel(`room${roomId}`);
            roomSubscription.bind('new-message', event => {
                dispatch(addNewMessage(roomId, event.message));
                scrollToBottom();
            });

            return () => {
                unsubscribeChannel(`room${roomId}`);
                console.log('destroy room');
            };
        }
    }, [dispatch, roomId]);

    useEffect(() => {
        if (user) {
            navigation.setParams({
                title: `${user.first_name} ${user.last_name}`,
            });
        }
    }, [user]);

    function scrollToBottom() {
        messagesList.current.scrollToEnd({ animated: true });
    }

    function loadChatMessages() {
        dispatch(loadMessagesAction(roomId));
    }

    return loading && messages.length < 1 ? (
        <View
            style={{
                width: '100%',
                height: '100%',
                alignContent: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}>
            <ActivityIndicator color="#f98b0d" />
            <BackgroundTop style={Styles.BackgroundTopRight} />
            <BackgroundBottom style={Styles.BackgroundBottomLeft} />
        </View>
    ) : (
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
                style={{
                    zIndex: 100,
                    minHeight: '92.3%',
                    maxHeight: '92.3%',
                }}
            />
            <BackgroundTop style={Styles.BackgroundTopRight} />
            <BackgroundBottom style={Styles.BackgroundBottomLeft} />
            <View style={Styles.WriteMessageSection}>
                <TouchableOpacity style={Styles.MessageTouchable}>
                    <TextInput
                        style={Styles.MessageTextField}
                        placeholder={t('chats.type')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.SendButton}>
                    <Icon name={'send'} size={26} color={'#FFFFFF'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
