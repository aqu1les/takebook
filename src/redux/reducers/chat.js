import {
	LOAD_CHAT,
	LOAD_CHAT_SUCCESS,
	LOAD_MESSAGES,
	LOAD_MESSAGES_SUCCESS,
	NEW_CHAT,
	NEW_MESSAGE,
} from '../actions/chat';
import _ from 'lodash';

const INITIAL_STATE = {
	loading: false,
	chats: [],
};

export default function chatsReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOAD_CHAT: {
			return { ...state, loading: true };
		}
		case NEW_CHAT: {
			const chats = _.uniqBy([...state.chats, action.room], 'room_id');

			return {
				...state,
				chats: chats,
			};
		}
		case LOAD_CHAT_SUCCESS: {
			const chats = action.chats
				.map((chat) => {
					chat.loadingMessages = false;
					chat.id = chat.room_id || chat.id;
					chat.room_id = chat.id;
					return chat;
				})
				.filter((c) => c.id !== undefined);
			return {
				...state,
				loading: false,
				chats: _.uniqBy([...chats], 'room_id'),
			};
		}
		case LOAD_MESSAGES: {
			const chats = state.chats.map((chat) => {
				if (chat.room_id === action.room_id) {
					chat.loadingMessages = true;
				}
				return chat;
			});

			return { ...state, chats: _.uniqBy(chats, 'room_id') };
		}
		case LOAD_MESSAGES_SUCCESS: {
			const newChats = state.chats.map((chat) => {
				if (chat.room_id === action.room_id) {
					chat.messages = _.uniqBy([...action.messages], 'id');
					chat.loadingMessages = false;
				}
				return chat;
			});

			return {
				...state,
				loading: false,
				chats: _.uniqBy([...newChats], 'room_id'),
				loadingMessages: false,
			};
		}
		case NEW_MESSAGE: {
			const chatsWithNewMessage = state.chats.map((chat) => {
				if (chat.room_id === action.room_id) {
					chat.messages = _.uniqBy(
						[action.message, ...chat.messages],
						'id',
					);
				}
				return chat;
			});

			return {
				...state,
				chats: chatsWithNewMessage,
			};
		}
		default:
			return state;
	}
}
