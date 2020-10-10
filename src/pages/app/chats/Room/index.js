import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	View,
	TouchableOpacity,
	FlatList,
	TextInput,
	ActivityIndicator,
	KeyboardAvoidingView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';
import Message from './message';
import BackgroundTop from '../../../../assets/background/background-chat-top-right.svg';
import BackgroundBottom from '../../../../assets/background/background-chat-bottom-left.svg';
import { loadMessagesAction } from '../../../../redux/actions/chat';
import { sendNewMessage } from '../../../../services/ChatService';

export default function Room({ navigation, route }) {
	const dispatch = useDispatch();
	const { roomId } = route.params;
	const { t } = useTranslation();
	const loggedUser = useSelector((state) => state.auth);
	const user = useSelector((state) => {
		const chat = state.chats.chats.find(
			(chat) => chat.room_id == roomId || chat.id == roomId,
		);
		return chat.user;
	});
	const messages = useSelector((state) => {
		const chat = state.chats.chats.find((chat) => chat.room_id == roomId);
		return chat ? [...chat.messages].reverse() : [];
	});
	const loading = useSelector((state) => {
		const chat = state.chats.chats.find((chat) => chat.room_id == roomId);
		return chat ? chat.loadingMessages : false;
	});
	const messagesList = useRef();
	const [userMessage, setUserMessage] = useState('');

	const [sendingMsg, setSendingMsg] = useState(false);
	const canSendMessage = useMemo(() => !!userMessage && !sendingMsg, [
		userMessage,
		sendingMsg,
	]);

	useEffect(() => {
		loadChatMessages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (user) {
			navigation.setParams({
				title: `${user.first_name} ${user.last_name}`,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(() => {
		scrollToBottom();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages]);

	function scrollToBottom() {
		setTimeout(() => {
			if (messagesList.current) {
				messagesList.current.scrollToEnd({ animated: true });
			}
		}, 500);
	}

	function loadChatMessages() {
		dispatch(loadMessagesAction(roomId));
	}

	function handleSubmit() {
		setSendingMsg(true);

		if (!sendingMsg) {
			sendNewMessage(roomId, userMessage)
				.then(() => {
					setUserMessage('');
				})
				.catch(() => {
					console.log('err');
				})
				.finally(() => {
					setSendingMsg(false);
				});
		}
	}

	return loading && messages.length < 1 ? (
		<View style={Styles.LoadingContainer}>
			<ActivityIndicator color="#f98b0d" />
			<BackgroundTop style={Styles.BackgroundTopRight} />
			<BackgroundBottom style={Styles.BackgroundBottomLeft} />
		</View>
	) : (
		<KeyboardAvoidingView style={Styles.ChatContainer}>
			<View style={Styles.MessagesContainer}>
				<FlatList
					ref={messagesList}
					data={messages}
					renderItem={({ item }) => (
						<Message item={item} loggedUser={loggedUser} />
					)}
					keyExtractor={(item) => String(item.id)}
					contentContainerStyle={Styles.MessagesListContainer}
					style={Styles.MessagesList}
				/>
				<BackgroundTop style={Styles.BackgroundTopRight} />
				<BackgroundBottom style={Styles.BackgroundBottomLeft} />
			</View>
			<View style={Styles.WriteMessageSection}>
				<TouchableOpacity style={Styles.MessageTouchable}>
					<TextInput
						style={Styles.MessageTextField}
						placeholder={t('chats.type')}
						value={userMessage}
						onChangeText={setUserMessage}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						Styles.SendButton,
						!canSendMessage && { backgroundColor: '#e5e5e5' },
					]}
					onPress={handleSubmit}
					disabled={!canSendMessage}>
					<Icon name={'send'} size={26} color={'#FFFFFF'} />
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}
